"use strict";

async function getWeather(measurement, windMeasure) {
  try {
    const city = document.querySelector(".search-input").value;
    const key = "9826289e241cb82fcf776863599b157f";
    const key2 = "W78G9X4OFKUX";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${measurement}`;
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.ok === false) {
      throw new Error(`${data.message}`);
    }
    const lat = data.coord.lat;
    const lng = data.coord.lon;
    const url2 = `http://api.timezonedb.com/v2.1/get-time-zone?key=${key2}&format=json&by=position&lat=${lat}&lng=${lng}`;
    const response2 = await fetch(url2);
    console.log(response2);
    const timeZoneData = await response2.json();
    console.log(timeZoneData);

    function displayWeatherInfo() {
      const infoCon = document.querySelector(".info-con");
      infoCon.setAttribute("id", "info-con");
      clearContainer(infoCon);

      const weatherHeader = document.createElement("div");
      const cityName = document.createElement("h1");
      const dateTime = document.createElement("div");
      const currentDate = document.createElement("time");
      const currentTime = document.createElement("time");
      const weatherCard = document.createElement("div");
      const weatherInfoCon = document.createElement("div");
      const summaryCon = document.createElement("div");
      const formattedDateTime = timeZoneData.formatted;
      const formattedDateTimeArr = formattedDateTime.split(" ");
      const dateStr = formattedDateTimeArr[0];
      const splitDate = dateStr.split("-").join(", ");
      const timeStr = formattedDateTimeArr[1];
      const splitTime = timeStr.split(":").join(", ");
      const dateTimeStr = splitDate + ", " + splitTime;
      const dateTimeStrArr = dateTimeStr.split(",").map(Number);
      dateTimeStrArr[1] = dateTimeStrArr[1] - 1;
      console.log(dateTimeStrArr);
      const testDate = new Date(...dateTimeStrArr);
      console.log(testDate.getDay());

      const temp = document.createElement("div");
      const weatherIcon = document.createElement("i");
      const conditionsDesc = document.createElement("div");
      const detailsCon = document.createElement("div");
      const cloudCoverageCon = document.createElement("div");
      const cloudCoverage = document.createElement("div");
      const cloudCoverageHeading = document.createElement("h2");
      const feelsLikeCon = document.createElement("div");
      const feelsLike = document.createElement("div");
      const feelsLikeHeading = document.createElement("h2");
      const humidityCon = document.createElement("div");
      const humidity = document.createElement("div");
      const humidityHeading = document.createElement("h2");
      const pressureCon = document.createElement("div");
      const pressure = document.createElement("div");
      const pressureHeading = document.createElement("h2");
      const minTempCon = document.createElement("div");
      const minTemp = document.createElement("div");
      const minTempHeading = document.createElement("h2");
      const maxTempCon = document.createElement("div");
      const maxTemp = document.createElement("div");
      const maxTempHeading = document.createElement("h2");
      const sunriseCon = document.createElement("div");
      const sunriseHeading = document.createElement("h2");
      const timezone = data.timezone;
      const sunrise = document.createElement("time");
      const sunriseTime = new Date((timezone + data.sys.sunrise) * 1000);
      const sunsetCon = document.createElement("div");
      const sunsetHeading = document.createElement("h2");
      const sunset = document.createElement("time");
      const sunsetTime = new Date((timezone + data.sys.sunset) * 1000);
      const windCon = document.createElement("div");
      const windHeading = document.createElement("h2");
      const wind = document.createElement("div");
      const today = new Date();
      const localDay = new Date(data.dt * 1000);
      console.log(localDay);

      cityName.textContent = data.name;
      // setting current time and date
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
      currentDate.textContent = `${daylist[testDate.getDay()]}, ${
        monthList[testDate.getMonth()]
      } ${testDate.getDate()}, ${testDate.getFullYear()}`;
      currentTime.textContent = `${testDate.getHours()}:${
        (testDate.getMinutes() < 10 ? "0" : "") + testDate.getMinutes()
      }`;
      temp.textContent = data.main.temp;

      // setting weather icon
      console.log(data.weather[0]);
      if (data.weather[0].main === "Clear") {
        weatherIcon.classList.add("fa-solid", "fa-sun");
      } else if (data.weather[0].main === "Clouds") {
        weatherIcon.classList.add("fa-solid", "fa-cloud");
      } else if (data.weather[0].main === "Drizzle") {
        weatherIcon.classList.add("fa-solid", "fa-cloud-rain");
      } else if (data.weather[0].main === "Rain") {
        weatherIcon.classList.add("fa-solid", "fa-cloud-showers-heavy");
      } else if (data.weather[0].main === "Snow") {
        weatherIcon.classList.add("fa-solid", "fa-snowflake");
      } else if (data.weather[0].main === "Thunderstorm") {
        weatherIcon.classList.add("fa-solid", "fa-cloud-bolt");
      } else {
        weatherIcon.classList.add("fa-solid", "fa-wind");
      }
      dateTime.textContent = `${currentDate.textContent} | ${currentTime.textContent}`;

      temp.textContent = `${Math.trunc(data.main.temp)}°`;
      conditionsDesc.textContent = data.weather[0].description;
      cloudCoverageHeading.textContent = "Cloudiness";
      cloudCoverage.textContent = `${data.clouds.all}%`;
      feelsLikeHeading.textContent = "Feels Like";
      feelsLike.textContent = `${Math.trunc(data.main.feels_like)}°`;
      windHeading.textContent = "Wind";
      wind.textContent = `${Math.trunc(data.wind.speed)}${windMeasure}`;
      humidityHeading.textContent = "Humidity";
      humidity.textContent = `${data.main.humidity}%`;
      pressureHeading.textContent = "Pressure";
      pressure.textContent = data.main.pressure;
      minTempHeading.textContent = "Min Temp";
      minTemp.textContent = `${Math.trunc(data.main.temp_min)}°`;
      maxTempHeading.textContent = "Max Temp";
      maxTemp.textContent = `${Math.trunc(data.main.temp_max)}°`;
      sunriseHeading.textContent = "Sunrise";
      sunrise.textContent = `${sunriseTime.getUTCHours()}:${
        (sunriseTime.getUTCMinutes() < 10 ? "0" : "") +
        sunriseTime.getUTCMinutes()
      }`;
      sunsetHeading.textContent = "Sunset";
      console.log(sunsetTime.getUTCMinutes() < 10);
      sunset.textContent = `${sunsetTime.getUTCHours()}:${
        (sunsetTime.getUTCMinutes() < 10 ? "0" : "") +
        sunsetTime.getUTCMinutes()
      }`;

      // adding classes
      weatherHeader.classList.add("weather-header");
      cityName.classList.add("city-name");
      dateTime.classList.add("date-time");
      weatherCard.classList.add("weather-card");
      weatherInfoCon.classList.add("weather-info-con");
      summaryCon.classList.add("summary-con");
      weatherIcon.classList.add("weather-icon");
      temp.classList.add("temp");
      conditionsDesc.classList.add("conditions");
      detailsCon.classList.add("details-con");
      const detailCons = [
        feelsLikeCon,
        humidityCon,
        pressureCon,
        minTempCon,
        maxTempCon,
        sunriseCon,
        sunsetCon,
        windCon,
        cloudCoverageCon,
      ];
      const detailHeadings = [
        feelsLikeHeading,
        humidityHeading,
        pressureHeading,
        minTempHeading,
        maxTempHeading,
        sunriseHeading,
        sunsetHeading,
        windHeading,
        cloudCoverageHeading,
      ];
      const details = [
        feelsLike,
        humidity,
        pressure,
        minTemp,
        maxTemp,
        sunrise,
        sunset,
        wind,
        cloudCoverage,
      ];
      detailCons.forEach((con) => {
        con.classList.add("detail-con");
      });
      detailHeadings.forEach((heading) => {
        heading.classList.add("details-heading");
      });
      details.forEach((detail) => {
        detail.classList.add("detail");
      });

      // appending elements
      infoCon.append(weatherCard);
      weatherHeader.append(cityName, dateTime);
      weatherCard.append(weatherHeader, weatherInfoCon);
      weatherInfoCon.append(summaryCon, detailsCon);
      summaryCon.append(weatherIcon, temp, conditionsDesc);
      detailsCon.append(
        feelsLikeCon,
        windCon,
        humidityCon,
        pressureCon,
        minTempCon,
        maxTempCon,
        sunriseCon,
        sunsetCon,
        cloudCoverageCon
      );
      feelsLikeCon.append(feelsLikeHeading, feelsLike);
      windCon.append(windHeading, wind);
      humidityCon.append(humidityHeading, humidity);
      pressureCon.append(pressureHeading, pressure);
      minTempCon.append(minTempHeading, minTemp);
      maxTempCon.append(maxTempHeading, maxTemp);
      sunriseCon.append(sunriseHeading, sunrise);
      sunsetCon.append(sunsetHeading, sunset);
      cloudCoverageCon.append(cloudCoverageHeading, cloudCoverage);
    }
    displayWeatherInfo();
  } catch (err) {
    displayError(err);
    console.log(err);
    // const errorMessage = document.querySelector("#error-message");
    // const infoCon = document.querySelector("#info-con");
    // errorMessage.textContent = err;
    // infoCon.append(errorMessage);
  }
}

document.querySelector(".search-btn").addEventListener("click", () => {
  getWeather("imperial", "mph");
});

document.querySelector(".cels-btn").addEventListener("click", () => {
  getWeather("metric", "m/s");
});

document.querySelector(".fahr-btn").addEventListener("click", () => {
  getWeather("imperial", "mph");
});

function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function displayError(err) {
  const infoCon = document.querySelector(".info-con");
  const errorMessage = document.createElement("div");
  clearContainer(infoCon);
  errorMessage.classList.add("error-message");
  errorMessage.textContent = err;
  infoCon.append(errorMessage);
}
