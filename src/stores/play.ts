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

export const usePlayStore = defineStore("play", () => {
  const currentQuestion = ref<Question>({ id: "", images: [], prompt: "" });
  const questions = ref<Question[]>();
  const currentQuestionIndex = ref(0);
  const selection = ref<(string | null)[]>([null, null, null]);
  const answers = ref<string[][]>([]);
  const score = ref(0);

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
    score.value = 0;
  }

  function next() {
    invariant(questions.value);
    answers.value.push(selection.value as string[]);
    score.value += isAnswerCorrect(
      selection.value as string[],
      currentQuestion.value
    )
      ? 1
      : 0;
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

    console.log(
      "after",
      selection.value,
      selection.value.filter((a) => a === null)
    );

    if (selection.value.filter((a) => a === null).length === 1) {
      // auto-fill last value
      const possible = ["de", "mj", "sd"].filter(
        (a) => !selection.value.includes(a)
      );
      console.log("auto set to", possible);
      selection.value[selection.value.indexOf(null)] = possible[0];
    }
  }

  return {
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
    score,
  };
});
