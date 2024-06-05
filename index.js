// Reading the json file
fetch('questions.json')
.then(response => {return response.json();})
.then(data => {
  const container = document.getElementById('container');
  // Function to get a random object from the json list!!
  function randomnum () {
    randomitem = data[(Math.floor(Math.random() * data.length))];
    return randomitem;
  }
// Grabbing the items from the json file!!
  data.forEach(item => {
    if (`${item.question_id}`== randomnum().question_id) {

    const itemcategory = document.createElement('div');
    const itemquestion = document.createElement('div');
    const answerslist = document.createElement('div');
    item.Answer_possibilities.forEach(answer => {
      const answeritem = document.createElement('ul');
      answeritem.textContent = `${answer}`;
      // For each item that displays, event listener added to console log that item clicked
      answeritem.addEventListener('click', (event) => {
        console.log(event.target.textContent);
      });
      answerslist.appendChild(answeritem);
    });



    itemcategory.textContent = `Category: ${item.category}`;
    itemquestion.textContent = `${item.question_id}. ${item.question}`;
    container.appendChild(itemcategory);
    container.appendChild(itemquestion);
    container.appendChild(answerslist);

};
  });
});
