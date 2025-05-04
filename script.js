// Initial league table data (simplified, based on web results)
const teams = [
    { name: "Bayern", matches: 31, wins: 22, draws: 7, losses: 2, goalsFor: 90, goalsAgainst: 30, points: 73 },
    { name: "Leverkusen", matches: 31, wins: 19, draws: 7, losses: 5, goalsFor: 67, goalsAgainst: 35, points: 64 },
    { name: "Frankfurt", matches: 31, wins: 16, draws: 7, losses: 8, goalsFor: 60, goalsAgainst: 42, points: 55 },
    { name: "Dortmund", matches: 31, wins: 15, draws: 6, losses: 10, goalsFor: 55, goalsAgainst: 47, points: 51 },
    { name: "Freiburg", matches: 31, wins: 15, draws: 6, losses: 10, goalsFor: 50, goalsAgainst: 42, points: 51 },
    { name: "Leipzig", matches: 31, wins: 14, draws: 8, losses: 9, goalsFor: 62, goalsAgainst: 52, points: 50 },
    { name: "Mainz", matches: 31, wins: 13, draws: 8, losses: 10, goalsFor: 50, goalsAgainst: 42, points: 47 },
    { name: "Bremen", matches: 31, wins: 12, draws: 8, losses: 11, goalsFor: 42, goalsAgainst: 40, points: 44 },
    { name: "M'gladbach", matches: 31, wins: 11, draws: 9, losses: 11, goalsFor: 52, goalsAgainst: 50, points: 42 },
    { name: "Stuttgart", matches: 31, wins: 12, draws: 8, losses: 11, goalsFor: 50, goalsAgainst: 47, points: 44 },
    { name: "Augsburg", matches: 31, wins: 12, draws: 7, losses: 12, goalsFor: 45, goalsAgainst: 47, points: 43 },
    { name: "Wolfsburg", matches: 31, wins: 11, draws: 6, losses: 14, goalsFor: 40, goalsAgainst: 47, points: 39 },
    { name: "Union Berlin", matches: 31, wins: 10, draws: 7, losses: 14, goalsFor: 35, goalsAgainst: 42, points: 37 },
    { name: "St. Pauli", matches: 31, wins: 8, draws: 7, losses: 16, goalsFor: 30, goalsAgainst: 52, points: 31 },
    { name: "Heidenheim", matches: 31, wins: 7, draws: 7, losses: 17, goalsFor: 32, goalsAgainst: 57, points: 28 },
    { name: "Bochum", matches: 31, wins: 6, draws: 8, losses: 17, goalsFor: 30, goalsAgainst: 57, points: 26 },
    { name: "Hoffenheim", matches: 31, wins: 6, draws: 7, losses: 18, goalsFor: 35, goalsAgainst: 60, points: 25 },
    { name: "Holstein Kiel", matches: 31, wins: 5, draws: 7, losses: 19, goalsFor: 30, goalsAgainst: 62, points: 22 }
];

// Matchday 32 fixtures
const fixturesMatchday32 = [
    { home: "Heidenheim", away: "Bochum" },
    { home: "Leipzig", away: "Bayern" },
    { home: "M'gladbach", away: "Hoffenheim" },
    { home: "Union Berlin", away: "Bremen" },
    { home: "St. Pauli", away: "Stuttgart" }
];

// Matchday 33 fixtures
const fixturesMatchday33 = [
    { home: "Bayern", away: "Union Berlin" },
    { home: "Bremen", away: "St. Pauli" },
    { home: "Stuttgart", away: "Leipzig" },
    { home: "Hoffenheim", away: "Heidenheim" },
    { home: "Bochum", away: "M'gladbach" }
];

// Variable to track the currently edited match
let currentlyEditedMatch = null;

// Function to update table
function updateTable(highlightTeams = []) {
    // Reset team stats to initial state
    const initialTeams = JSON.parse(JSON.stringify(teams)); // Deep copy to preserve initial data
    initialTeams.forEach(team => {
        team.matches = 31;
        team.wins = Math.floor((team.points - team.draws) / 3);
        team.losses = team.matches - team.wins - team.draws;
        team.goalsFor = team.goalsFor || 0;
        team.goalsAgainst = team.goalsAgainst || 0;
    });

    // Process Matchday 32 predictions
    const matches32 = document.querySelectorAll('#predictor-form .match');
    matches32.forEach((match, index) => {
        const homeScore = parseInt(match.querySelector('.home-score').value) || 0;
        const awayScore = parseInt(match.querySelector('.away-score').value) || 0;
        const homeTeam = initialTeams.find(t => t.name === fixturesMatchday32[index].home);
        const awayTeam = initialTeams.find(t => t.name === fixturesMatchday32[index].away);

        if (homeScore >= 0 && awayScore >= 0) {
            homeTeam.matches++;
            awayTeam.matches++;
            homeTeam.goalsFor += homeScore;
            homeTeam.goalsAgainst += awayScore;
            awayTeam.goalsFor += awayScore;
            awayTeam.goalsAgainst += homeScore;

            if (homeScore > awayScore) {
                homeTeam.wins++;
                homeTeam.points += 3;
                awayTeam.losses++;
            } else if (awayScore > homeScore) {
                awayTeam.wins++;
                awayTeam.points += 3;
                homeTeam.losses++;
            } else {
                homeTeam.draws++;
                awayTeam.draws++;
                homeTeam.points++;
                awayTeam.points++;
            }
        }
    });

    // Process Matchday 33 predictions
    const matches33 = document.querySelectorAll('#next-matchday .match');
    matches33.forEach((match, index) => {
        const homeScore = parseInt(match.querySelector('.home-score').value) || 0;
        const awayScore = parseInt(match.querySelector('.away-score').value) || 0;
        const homeTeam = initialTeams.find(t => t.name === fixturesMatchday33[index].home);
        const awayTeam = initialTeams.find(t => t.name === fixturesMatchday33[index].away);

        if (homeScore >= 0 && awayScore >= 0) {
            homeTeam.matches++;
            awayTeam.matches++;
            homeTeam.goalsFor += homeScore;
            homeTeam.goalsAgainst += awayScore;
            awayTeam.goalsFor += awayScore;
            awayTeam.goalsAgainst += homeScore;

            if (homeScore > awayScore) {
                homeTeam.wins++;
                homeTeam.points += 3;
                awayTeam.losses++;
            } else if (awayScore > homeScore) {
                awayTeam.wins++;
                awayTeam.points += 3;
                homeTeam.losses++;
            } else {
                homeTeam.draws++;
                awayTeam.draws++;
                homeTeam.points++;
                awayTeam.points++;
            }
        }
    });

    // Sort teams by points, goal difference, goals for
    initialTeams.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const gdA = a.goalsFor - a.goalsAgainst;
        const gdB = b.goalsFor - b.goalsAgainst;
        if (gdB !== gdA) return gdB - gdA;
        return b.goalsFor - a.goalsFor;
    });

    // Update table display
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    initialTeams.forEach((team, index) => {
        const row = document.createElement('tr');
        const gd = team.goalsFor - team.goalsAgainst;
        const goals = `${team.goalsFor}:${team.goalsAgainst}`;
        
        // Determine the class for GD based on its value
        let gdClass = 'gd-zero';
        if (gd > 0) {
            gdClass = 'gd-positive';
        } else if (gd < 0) {
            gdClass = 'gd-negative';
        }

        // Add "+" for positive GD
        const gdDisplay = gd > 0 ? `+${gd}` : gd;

        // Add highlight class if the team is in the highlightTeams array
        const rowClass = highlightTeams.includes(team.name) ? 'highlight' : '';

        row.className = rowClass;
        row.setAttribute('data-team', team.name); // Add data-team attribute for identification
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.matches}</td>
            <td>${team.wins}</td>
            <td>${team.draws}</td>
            <td>${team.losses}</td>
            <td>${goals}</td>
            <td class="${gdClass}">${gdDisplay}</td>
            <td>${team.points}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to initialize table
function initTable() {
    teams.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const gdA = a.goalsFor - a.goalsAgainst;
        const gdB = b.goalsFor - b.goalsAgainst;
        if (gdB !== gdA) return gdB - gdA;
        return b.goalsFor - a.goalsFor;
    });

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    teams.forEach((team, index) => {
        const row = document.createElement('tr');
        const gd = team.goalsFor - team.goalsAgainst;
        const goals = `${team.goalsFor}:${team.goalsAgainst}`;
        
        // Determine the class for GD based on its value
        let gdClass = 'gd-zero';
        if (gd > 0) {
            gdClass = 'gd-positive';
        } else if (gd < 0) {
            gdClass = 'gd-negative';
        }

        // Add "+" for positive GD
        const gdDisplay = gd > 0 ? `+${gd}` : gd;

        row.setAttribute('data-team', team.name); // Add data-team attribute for identification
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.matches}</td>
            <td>${team.wins}</td>
            <td>${team.draws}</td>
            <td>${team.losses}</td>
            <td>${goals}</td>
            <td class="${gdClass}">${gdDisplay}</td>
            <td>${team.points}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Attach event listeners to buttons
function setupButtonListeners() {
    const buttons = document.querySelectorAll('.increment, .decrement');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentElement.querySelector('input');
            let value = parseInt(input.value) || 0;
            if (button.classList.contains('increment')) {
                value++;
            } else if (button.classList.contains('decrement') && value > 0) {
                value--;
            }
            input.value = value;

            // Get the match being edited
            const matchElement = button.closest('.match');
            const matchId = matchElement.getAttribute('data-match-id');
            const matchday = input.getAttribute('data-matchday');
            const matchIndex = parseInt(input.getAttribute('data-match'));

            // Determine the teams involved in the match
            let homeTeam, awayTeam;
            if (matchday === '32') {
                homeTeam = fixturesMatchday32[matchIndex].home;
                awayTeam = fixturesMatchday32[matchIndex].away;
            } else if (matchday === '33') {
                homeTeam = fixturesMatchday33[matchIndex].home;
                awayTeam = fixturesMatchday33[matchIndex].away;
            }

            // If the match being edited has changed, update the highlight
            if (currentlyEditedMatch !== matchId) {
                currentlyEditedMatch = matchId;
            }

            // Update the table with highlighted teams
            updateTable([homeTeam, awayTeam]);
        });
    });

    // Add a click event listener to the document to remove highlights when clicking elsewhere
    document.addEventListener('click', (event) => {
        const isButtonClick = event.target.classList.contains('increment') || event.target.classList.contains('decrement');
        if (!isButtonClick) {
            currentlyEditedMatch = null;
            updateTable([]); // Remove all highlights
        }
    });
}

// Initialize
initTable();
setupButtonListeners();