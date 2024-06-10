document.addEventListener('DOMContentLoaded', () => {
    fetch('/leaderboard')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const tableBody = document.getElementById('data-table');
            data.forEach(item => {
                const row = document.createElement('tr');
                const cellId = document.createElement('td');
                cellId.textContent = item.rank;
                const cellName = document.createElement('td');
                cellName.textContent = item.name;
                const cellAge = document.createElement('td');
                cellAge.textContent = item.score;
                row.appendChild(cellId);
                row.appendChild(cellName);
                row.appendChild(cellAge);
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});