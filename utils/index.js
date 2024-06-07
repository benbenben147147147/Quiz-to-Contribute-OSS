const MAX_QUESTIONS = 7;
// Fetch the JSON file containing questions
fetch('questions.json')
  .then(response => response.json())  // Convert the response to JSON
  .then(data => {
    const numberOfQuestions = Math.min(MAX_QUESTIONS, data.length);
    let currentQuestionIndex = 0;  // Track the current question index

    const container = document.getElementById('container');  // Get the container element

    // Function to display a question
    function displayQuestion(index) {
      const item = data[index];  // Get the current question
      container.innerHTML = '';  // Clear the container

      const itemCategory = document.createElement('div');  // Create a div for the category
      const itemQuestion = document.createElement('div');  // Create a div for the question
      const answersList = document.createElement('div');  // Create a div for the answers list
      const resultMessage = document.createElement('div');  // Create a div for the result message

      // Apply Tailwind CSS classes for styling
      itemCategory.className = 'text-lg font-bold mb-2';
      itemQuestion.className = 'text-md font-semibold mb-2';
      answersList.className = 'space-y-2';
      resultMessage.className = 'mt-4 text-lg font-bold';

      // Loop through each answer possibility and create a div for each
      item.Answer_possibilities.forEach((answer, answerIndex) => {
        const answerItem = document.createElement('div');
        answerItem.className = 'cursor-pointer p-2 bg-blue-100 hover:bg-blue-200 rounded';
        answerItem.textContent = answer.option;

        // Event listener to handle the answer selection
        answerItem.addEventListener('click', (event) => {
          if (answerIndex === item.Correct_answer) {
            event.target.className = 'p-2 bg-green-300 rounded';  // Change class to indicate correct answer
            resultMessage.textContent = 'Correct!';
            resultMessage.className = 'mt-4 text-lg font-bold text-green-500';
            currentQuestionIndex++;  // Move to the next question
            setTimeout(() => {
              if (currentQuestionIndex < numberOfQuestions) {
                displayQuestion(currentQuestionIndex);  // Display the next question
              } else {
                container.innerHTML = '<div class="text-lg font-bold item-center justify-center text-center">Quiz Completed!</div>'; //yayy compelted
                clearInterval(window.intervalId); // stop the timer when the user completes the quiz
              }
            }, 1000);  // Wait 1 second before showing the next question
          } else {
            event.target.className = 'p-2 bg-red-300 rounded';  // Change class to indicate incorrect answer
            resultMessage.textContent = `Incorrect! ${answer.info}`;
            resultMessage.className = 'mt-4 text-lg font-bold text-red-500';
          }
        });

        answersList.appendChild(answerItem);  // Add the answer item to the answers list
      });

      // Set the content of the category and question divs
      itemCategory.textContent = `Category: ${item.category}`;
      itemQuestion.textContent = `${item.question_id}. ${item.question}`;

      // Append all elements to the container
      container.appendChild(itemCategory);
      container.appendChild(itemQuestion);
      container.appendChild(answersList);
      container.appendChild(resultMessage);
    }

    // Display the first question initially
    displayQuestion(currentQuestionIndex);
  });
