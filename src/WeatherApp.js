import React, { useState, useEffect } from "react"
import { CloudIcon, SearchIcon, DropletIcon, WindIcon, SunIcon, MoonIcon, CloudRainIcon, CloudSnowIcon } from "lucide-react"

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
  />
)

const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
  >
    {children}
  </button>
)

const Switch = ({ checked, onChange }) => (
  <div
    className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${
      checked ? 'bg-blue-600' : 'bg-gray-300'
    }`}
    onClick={() => onChange(!checked)}
  >
    <div
      className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
        checked ? 'translate-x-7' : ''
      }`}
    />
  </div>
)

const WeatherApp = () => {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [showFrontPage, setShowFrontPage] = useState(true)

  const fetchWeather = async () => {
    setLoading(true)
    setError("")
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      )
      if (!response.ok) {
        throw new Error("City not found")
      }
      const data = await response.json()
      setWeather(data)
      setShowFrontPage(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getBackgroundClass = (condition, isDay) => {
    if (condition.toLowerCase().includes("clear") || condition.toLowerCase().includes("sunny")) {
      return isDay
        ? "from-yellow-300 to-orange-500"
        : "from-indigo-800 to-purple-900"
    } else if (condition.toLowerCase().includes("cloud")) {
      return isDay
        ? "from-gray-300 to-gray-500"
        : "from-gray-700 to-gray-900"
    } else if (condition.toLowerCase().includes("rain") || condition.toLowerCase().includes("drizzle")) {
      return "from-blue-400 to-blue-800"
    } else if (condition.toLowerCase().includes("snow")) {
      return "from-blue-100 to-blue-300"
    } else {
      return "from-blue-400 to-blue-800"
    }
  }

  const bgClass = weather
    ? getBackgroundClass(weather.current.condition.text, weather.current.is_day)
    : "from-blue-400 to-blue-800"

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(prefersDarkMode)
  }, [])

  return (
    <div className={`min-h-screen transition-all duration-1000 ease-in-out p-4 flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : `bg-gradient-to-br ${bgClass}`}`}>
      <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white bg-opacity-20'} backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 animate-fade-in`}>
        <h1 className="text-3xl font-bold text-center mb-6">Weather App</h1>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Switch checked={darkMode} onChange={setDarkMode} />
            <span>Dark Mode</span>
          </div>
        </div>
        <div className="flex space-x-2 mb-6">
          <Input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`flex-grow ${darkMode ? 'bg-gray-700 text-white' : 'bg-white bg-opacity-50'}`}
          />
          <Button onClick={fetchWeather} disabled={loading}>
            {loading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <SearchIcon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 mb-6 rounded-md" role="alert">
            <p>{error}</p>
          </div>
        )}

        {showFrontPage ? (
          <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Welcome to Weather App</h2>
            <p className="mb-4">Enter a city name to get the current weather information.</p>
            <div className="flex justify-center space-x-4 animate-float">
              <CloudIcon className="h-16 w-16" />
              <CloudRainIcon className="h-16 w-16" />
              <CloudSnowIcon className="h-16 w-16" />
            </div>
          </div>
        ) : weather && (
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-2">
              {weather.location.name}, {weather.location.country}
            </h2>
            <p className="text-xl mb-6">{weather.location.localtime}</p>
            <div className="flex items-center justify-center mb-6">
              <img src={weather.current.condition.icon} alt="Weather icon" className="w-24 h-24 mr-4" />
              <div className="text-6xl font-bold">{weather.current.temp_c}°C</div>
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
  )
}

export default WeatherApp