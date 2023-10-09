let catFacts = [];

async function fetchCatFacts() {
    try {
        const response = await fetch("https://cat-fact.herokuapp.com/facts");
        if (!response.ok) {
            throw new Error(`Failed to fetch cat facts (HTTP status: ${response.status})`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
            catFacts = data;
        } else {
            throw new Error("No cat facts found in the response.");
        }
    } catch (e) {
        console.error("Error fetching cat facts:", e.message);
    }
}

function displayRandomCatFact() {
    const selectedCatFact = document.getElementById("selectedCatFact");
    if (catFacts.length > 0) {
        const randomIndex = Math.floor(Math.random() * catFacts.length);
        const randomCatFact = catFacts[randomIndex].text;

        selectedCatFact.textContent = randomCatFact;
        selectedCatFact.style.fontFamily = "Comic Sans MS";
    } else {
        selectedCatFact.textContent = "No cat facts available.";
    }
}

document.getElementById("getFactButton").addEventListener("click", displayRandomCatFact);

fetchCatFacts();
