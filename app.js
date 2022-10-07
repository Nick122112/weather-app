"use strict";

async function getWeather() {
  const city = document.querySelector(".search-input").value;
  const key = "9826289e241cb82fcf776863599b157f";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
  const response = await fetch(url);
  console.log(response);
  const data = await response.json();
  console.log(data);

  function displayWeatherInfo() {
    const weatherHeader = document.createElement("div");
    const cityName = document.createElement("h2");
    const dateTime = document.createElement("div");
    const currentDate = document.createElement("time");
    const currentTime = document.createElement("time");
    const weatherCard = document.createElement("div");
    const temp = document.createElement("div");
    const weatherIcon = document.createElement("i");
    const conditionsCont = document.createElement("div");
    const conditionsMain = document.createElement("div");
    const conditionsDesc = document.createElement("div");
    const detailsCont = document.createElement("div");
    const feelsLikeCont = document.createElement("div");
    const feelsLike = document.createElement("div");
    const feelsLikeHeading = document.createElement("h3");
    const humidityCont = document.createElement("div");
    const humidity = document.createElement("div");
    const humidityHeading = document.createElement("h3");
    const pressureCont = document.createElement("div");
    const pressure = document.createElement("div");
    const pressureHeading = document.createElement("div");
    const minTempCont = document.createElement("div");
    const minTemp = document.createElement("div");
    const minTempHeading = document.createElement("div");
    const sunrise = document.createElement("div");
    const sunriseDate = new Date(data.sys.sunrise * 1000);

    cityName.textContent = data.name;
    // setting current time and date
    const today = new Date();
    const daylist = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    currentDate.textContent = `${daylist[today.getDay()]}, ${
      monthList[today.getMonth()]
    } ${today.getDate()}, ${today.getFullYear()}`;
    currentTime.textContent = `${today.getHours()}:${today.getMinutes()}`;
    temp.textContent = data.main.temp;
    sunrise.textContent = new Date(data.sys.sunrise * 1000);

    // setting weather icon
    console.log(data.weather[0]);
    if (data.weather[0].main === "Clouds") {
      weatherIcon.classList.add("fa-solid", "fa-cloud");
    }

    dateTime.textContent = `${currentDate.textContent} | ${currentTime.textContent}`;

    // adding classes
    weatherHeader.classList.add("weather-header");
    cityName.classList.add("city-name");
    dateTime.classList.add("date-time");

    // appending elements
    document.querySelector(".info-con").appendChild(weatherHeader, weatherCard);
    weatherHeader.append(cityName, dateTime);
  }
  displayWeatherInfo();
}

document.querySelector(".search-btn").addEventListener("click", getWeather);
