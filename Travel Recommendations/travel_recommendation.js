document.getElementById('searchBtn').addEventListener('click', () => {
    const keyword = document.getElementById('search').value.toLowerCase();
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];

            if (keyword.includes('beach')) {
                results = data.beaches;
            } else if (keyword.includes('temple')) {
                results = data.temples;
            } else {
                results = data.countries.filter(country =>
                    country.cities.some(city => city.name.toLowerCase().includes(keyword))
                ).flatMap(country => country.cities);
            }

            displayResults(results);
        });
});

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = '';
    if (results.length === 0) {
        container.innerHTML = '<p>No recommendations found.</p>';
    } else {
        results.forEach(item => {
            container.innerHTML += `
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <img src="${item.imageUrl}" alt="${item.name}" style="width:100%; max-width:400px;">
                </div>`;
        });
    }
}

document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('results').innerHTML = '';
    document.getElementById('search').value = '';
});
