import { shuffle } from "./shuffle.js";

const MAX_QUESTIONS = 7;

// Fetch the JSON file containing questions
fetch("new_questions.json")
  .then((response) => response.json()) // Convert the response to JSON
  .then((data) => {
    const numberOfQuestions = Math.min(MAX_QUESTIONS, data.length);
    let currentQuestionIndex = 0; // Track the current question index

    const container = document.getElementById("container"); // Get the container element

    // Function to display a question
    function displayQuestion(index) {
      const item = data[index]; // Get the current question
      container.innerHTML = ""; // Clear the container

      const itemCategory = document.createElement("div"); // Create a div for the category
      const itemQuestion = document.createElement("div"); // Create a div for the question
      const answersList = document.createElement("div"); // Create a div for the answers list
      const resultMessage = document.createElement("div"); // Create a div for the result message

      // Apply CSS classes for styling
      itemCategory.className = "item-category";
      itemQuestion.className = "item-question";
      answersList.className = "answers-list";
      resultMessage.className = "result-message";

      var possibleAnswers = [...item.incorrect_answers];
      possibleAnswers.push(item.correct_answer);
      shuffle(possibleAnswers);
      possibleAnswers.forEach((answer, index) => {
        const answerItem = document.createElement("div");
        answerItem.className = "answer-item";
        answerItem.textContent = answer;
        answerItem.addEventListener("click", (event) => {
          if (possibleAnswers[index] === item.correct_answer) {
            event.target.className = "answer-item correct-answer"; // Change class to indicate correct answer
            resultMessage.textContent = "Correct!";
            resultMessage.className = "result-message text-green-500";
            currentQuestionIndex++; // Move to the next question
            setTimeout(() => {
              if (currentQuestionIndex < numberOfQuestions) {
                displayQuestion(currentQuestionIndex); // Display the next question
              } else {
                container.innerHTML =
                  '<div class="text-lg font-bold text-center text-gray-800">Quiz Completed!</div>'; // yay completed
                clearInterval(window.intervalId); // stop the timer when the user completes the quiz
              }
            }, 1000); // Wait 1 second before showing the next question
          } else {
            event.target.className = "answer-item incorrect-answer"; // Change class to indicate incorrect answer
            resultMessage.textContent = "Incorrect!";
            resultMessage.className = "result-message text-red-500";
          }
        });
        answersList.appendChild(answerItem); // Add the answer item to the answers list
      });

      // Set the content of the category and question divs
      itemCategory.textContent = `Category: ${item.category}`;
      itemQuestion.textContent = `${index + 1}. ${item.question}`;

      // Append all elements to the container
      container.appendChild(itemCategory);
      container.appendChild(itemQuestion);
      container.appendChild(answersList);
      container.appendChild(resultMessage);
    }

    // Display the first question initially
    displayQuestion(currentQuestionIndex);
  });
