// routes/leaderboard.js

const express = require('express');
const router = express.Router();

const leaderboardData = [
    {rank: 1, name: "John", score: 50},
    {rank: 2, name: "Dave", score: 49},
    {rank: 3, name: "Blake", score: 45},
    {rank: 4, name: "Jeff", score: 40},
    {rank: 5, name: "Linda", score: 39}
]

router.get('/api/leaderboard', (req, res) => {
    //console.log('GET /data request received');
    res.json(leaderboardData);
});

module.exports = router;