"use strict"
const citiesData = [
    { city: "New York", latitude: 40.7128, longitude: -74.0060 },
    { city: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
    { city: "Chicago", latitude: 41.8781, longitude: -87.6298 },
    { city: "Houston", latitude: 29.7604, longitude: -95.3698 },
    { city: "Miami", latitude: 25.7617, longitude: -80.1918 },
    { city: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
    { city: "Seattle", latitude: 47.6062, longitude: -122.3321 },
    { city: "Boston", latitude: 42.3601, longitude: -71.0589 },
    { city: "Dallas", latitude: 32.7767, longitude: -96.7970 },
    { city: "Denver", latitude: 39.7392, longitude: -104.9903 }
];

const cityDropdown = document.getElementById("cityDropdown");
const weatherTableBody = document.getElementById("weatherTableBody");
let stationLookupUrl;

window.onload = () =>{

    
        populateDropdown()
        
        dropdownListener()

}

const populateDropdown = () =>{
    
    citiesData.forEach(city => {
        const option = document.createElement("option");
        option.value = city.city;
        option.textContent = city.city;
        cityDropdown.appendChild(option);
    });
}

const dropdownListener = () =>{
    cityDropdown.addEventListener('change', () => {
        const selectedCity = cityDropdown.value;
        citiesData.forEach((city) =>{
            if(city.city === selectedCity){
                fetch(`https://api.weather.gov/points/${city.latitude},${city.longitude}`)
                    .then(response => response.json())
                    .then(data =>{
                        // console.log(data.properties.forecast)
                        fetch(data.properties.forecast)
                            .then(response => response.json())
                            .then(data =>{
                                populateWeatherTable(data.properties.periods);
                            })
                    })
            }
        })
    });
}


const populateWeatherTable = (periods) => {
    // Clear existing table rows
    weatherTableBody.innerHTML = "";

    periods.forEach(period => {
        const row = weatherTableBody.insertRow();
        const { number, name, temperature, temperatureUnit, windSpeed, windDirection, shortForecast } = period;

        [number, name, temperature, temperatureUnit, windSpeed, windDirection, shortForecast].forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value || "N/A";
        });
    });
}
