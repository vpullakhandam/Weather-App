import React, { useState, useEffect } from "react";
import {
  CloudIcon,
  SearchIcon,
  DropletIcon,
  WindIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgClass, setBgClass] = useState(
    "bg-gradient-to-br from-blue-400 to-blue-800"
  );

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
      setBgClass(
        getBackgroundClass(data.current.condition.text, data.current.is_day)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundClass = (condition, isDay) => {
    if (
      condition.toLowerCase().includes("clear") ||
      condition.toLowerCase().includes("sunny")
    ) {
      return isDay
        ? "bg-gradient-to-br from-yellow-300 to-orange-500"
        : "bg-gradient-to-br from-indigo-800 to-purple-900";
    } else if (condition.toLowerCase().includes("cloud")) {
      return isDay
        ? "bg-gradient-to-br from-gray-300 to-gray-500"
        : "bg-gradient-to-br from-gray-700 to-gray-900";
    } else if (
      condition.toLowerCase().includes("rain") ||
      condition.toLowerCase().includes("drizzle")
    ) {
      return "bg-gradient-to-br from-blue-400 to-blue-800";
    } else if (condition.toLowerCase().includes("snow")) {
      return "bg-gradient-to-br from-blue-100 to-blue-300";
    } else {
      return "bg-gradient-to-br from-blue-400 to-blue-800";
    }
  };

  useEffect(() => {
    if (weather) {
      setBgClass(
        getBackgroundClass(
          weather.current.condition.text,
          weather.current.is_day
        )
      );
    }
  }, [weather]);

  return (
    <div
      className={`min-h-screen ${bgClass} transition-all duration-1000 ease-in-out p-4 flex items-center justify-center`}
    >
      <div className="max-w-md w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Weather App</h1>
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow px-4 py-2 rounded-l-md bg-white bg-opacity-20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="px-4 py-2 bg-white bg-opacity-20 rounded-r-md hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50 transition-all duration-200"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <SearchIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {error && (
          <div
            className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 mb-6 rounded-md"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        {weather && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              {weather.location.name}, {weather.location.country}
            </h2>
            <p className="text-xl mb-6">{weather.location.localtime}</p>
            <div className="flex items-center justify-center mb-6">
              <img
                src={weather.current.condition.icon}
                alt="Weather icon"
                className="w-24 h-24 mr-4"
              />
              <div className="text-6xl font-bold">
                {weather.current.temp_c}°C
              </div>
            </div>
            <p className="text-2xl mb-6">{weather.current.condition.text}</p>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="flex items-center justify-center">
                <CloudIcon className="h-6 w-6 mr-2" />
                <span>Feels like: {weather.current.feelslike_c}°C</span>
              </div>
              <div className="flex items-center justify-center">
                <DropletIcon className="h-6 w-6 mr-2" />
                <span>Humidity: {weather.current.humidity}%</span>
              </div>
              <div className="flex items-center justify-center">
                <WindIcon className="h-6 w-6 mr-2" />
                <span>Wind: {weather.current.wind_kph} km/h</span>
              </div>
              <div className="flex items-center justify-center">
                {weather.current.is_day ? (
                  <SunIcon className="h-6 w-6 mr-2" />
                ) : (
                  <MoonIcon className="h-6 w-6 mr-2" />
                )}
                <span>{weather.current.is_day ? "Day" : "Night"}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
