const express = require('express')
const path = require('path')

const app = express()

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

// Serve static files in frontend folder
app.use(express.static(path.resolve(__dirname, "../frontend")));

// Serve index.html for all routes
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "index.html"));
});