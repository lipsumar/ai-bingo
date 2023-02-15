import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { items as allQuestions } from "../data/items";
import { shuffle } from "lodash";
import invariant from "tiny-invariant";

type Question = {
  id: string;
  prompt: string;
  images: { image: string; ai: string }[];
};

function isAnswerCorrect(answer: string[], question: Question) {
  return question.images
    .reduce((acc, image, i) => {
      acc.push(image.ai === answer[i] ? true : false);
      return acc;
    }, [] as boolean[])
    .every((b) => b === true);
}

function isAiCorrect(
  answer: string[],
  question: Question,
  ai: string
): boolean {
  const correctIndex = question.images.map((im) => im.ai).indexOf(ai);
  const userIndex = answer.indexOf(ai);
  return correctIndex === userIndex;
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function randomId() {
  return Array(7 + 1)
    .join((Math.random().toString(36) + "00000000000000000").slice(2, 18))
    .slice(0, 7);
}

export const usePlayStore = defineStore("play", () => {
  const currentQuestion = ref<Question>({ id: "", images: [], prompt: "" });
  const questions = ref<Question[]>();
  const currentQuestionIndex = ref(0);
  const selection = ref<(string | null)[]>([null, null, null]);
  const answers = ref<string[][]>([]);
  const scorePerAi = ref<{ de: number; sd: number; mj: number }>({
    de: 0,
    sd: 0,
    mj: 0,
  });
  const gameId = ref<string>("");

  const total = computed(() => questions.value?.length || 0);
  const canContinue = computed(
    () => selection.value.filter((s) => s === null).length === 0
  );
  const isComplete = computed(() => currentQuestionIndex.value === total.value);
  function init() {
    questions.value = shuffle(allQuestions)
      .slice(0, 10)
      .map((q) => ({
        ...q,
        images: shuffle(q.images),
      }));
    currentQuestionIndex.value = 0;
    currentQuestion.value = questions.value[0];
    selection.value = [null, null, null];
    answers.value = [];
    scorePerAi.value = { sd: 0, de: 0, mj: 0 };
    gameId.value = randomId();
  }

  function next() {
    invariant(questions.value);
    answers.value.push(selection.value as string[]);
    const question = currentQuestion.value;
    const answer = selection.value as string[];

    scorePerAi.value = {
      sd: scorePerAi.value.sd + (isAiCorrect(answer, question, "sd") ? 1 : 0),
      de: scorePerAi.value.de + (isAiCorrect(answer, question, "de") ? 1 : 0),
      mj: scorePerAi.value.mj + (isAiCorrect(answer, question, "mj") ? 1 : 0),
    };

    currentQuestionIndex.value = currentQuestionIndex.value + 1;
    currentQuestion.value = questions.value[currentQuestionIndex.value];
    selection.value = [null, null, null];
  }

  function select(index: number, ai: string) {
    if (selection.value[index] === ai) {
      selection.value[index] = null;
      return;
    }
    if (selection.value.includes(ai)) {
      const index = selection.value.indexOf(ai);
      selection.value[index] = null;
    }
    selection.value[index] = ai;

    // if (selection.value.filter((a) => a === null).length === 1) {
    //   // auto-fill last value
    //   const possible = ["de", "mj", "sd"].filter(
    //     (a) => !selection.value.includes(a)
    //   );
    //   console.log("auto set to", possible);
    //   selection.value[selection.value.indexOf(null)] = possible[0];
    // }
  }

  return {
    questions,
    currentQuestion,
    init,
    next,
    selection,
    select,
    total,
    currentIndex: currentQuestionIndex,
    canContinue,
    isComplete,
    answers,
    scorePerAi,
    gameId,
  };
});
