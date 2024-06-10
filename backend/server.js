const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs'); // Allows you to interact with the file system

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
const PORT = 3000

// Serve static files in frontend folder
app.use(express.static(path.resolve(__dirname, '../frontend')))

// Serve index.html for all routes
app.get('/', (req, res) => {
  console.log('hi')
  res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'))
})

app.post('/api/user', (req, res) => {
  const { username, bio } = req.body

  res.status(200).json({ data: username, bio })
})

// New path to save questions
app.post('/save-questions', (req, res) => {
  const questions = req.body;

  if (!questions) {
    return res.status(400).send('No questions provided');
  }

  const filePath = path.join(__dirname, '../frontend/new_questions.json');

  fs.writeFile(filePath, JSON.stringify(questions, null, 2), (err) => {
    if (err) {
      console.error('Error writing file', err);
      return res.status(500).send('Error writing file');
    }
    res.send('Questions saved successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
