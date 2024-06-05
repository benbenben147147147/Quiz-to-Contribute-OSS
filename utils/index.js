// Reading the JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('container');

    // Function to get a random object from the JSON list
    function randomnum() {
      return data[Math.floor(Math.random() * data.length)];
    }

    // Display a random question
    const item = randomnum();
    const itemCategory = document.createElement('div');
    const itemQuestion = document.createElement('div');
    const answersList = document.createElement('div');
    const resultMessage = document.createElement('div');

    itemCategory.className = 'text-lg font-bold mb-2';
    itemQuestion.className = 'text-md font-semibold mb-2';
    answersList.className = 'space-y-2';
    resultMessage.className = 'mt-4 text-lg font-bold';

    item.Answer_possibilities.forEach((answer, index) => {
      const answerItem = document.createElement('div');
      answerItem.className = 'cursor-pointer p-2 bg-blue-100 hover:bg-blue-200 rounded';
      answerItem.textContent = answer;
      
      // Event listener to highlight the correct/incorrect answer and display the result message
      answerItem.addEventListener('click', (event) => {
        if (index === item.Correct_answer) {
          event.target.className = 'p-2 bg-green-300 rounded';
          resultMessage.textContent = 'Correct!';
          resultMessage.className = 'mt-4 text-lg font-bold text-green-500';
        } else {
          event.target.className = 'p-2 bg-red-300 rounded';
          resultMessage.textContent = 'Incorrect!';
          resultMessage.className = 'mt-4 text-lg font-bold text-red-500';
        }
      });

      answersList.appendChild(answerItem);
    });

    itemCategory.textContent = `Category: ${item.category}`;
    itemQuestion.textContent = `${item.question_id}. ${item.question}`;
    container.appendChild(itemCategory);
    container.appendChild(itemQuestion);
    container.appendChild(answersList);
    container.appendChild(resultMessage);
  });
