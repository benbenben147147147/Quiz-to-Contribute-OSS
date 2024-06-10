const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
const PORT = 3000

// Import the leaderboard route
const leaderboardRoute = require('./routes/leaderboard');

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

app.use(leaderboardRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})


