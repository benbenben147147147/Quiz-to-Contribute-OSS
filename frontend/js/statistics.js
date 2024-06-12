let totalQuestions = 0;
let correctAnswers = 0;

// Function to get statistics
export function getStatistics() {
  return {
    totalQuestions,
    correctAnswers
  };
}

// Function to update statistics
export function updateStatistics(isCorrect) {
  totalQuestions++;
  if (isCorrect) {
    correctAnswers++;
  }
}