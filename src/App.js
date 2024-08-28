import React, { useState } from "react";
import {
  Cloud,
  Loader2,
  Search,
  Droplets,
  Wind,
  Thermometer,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual API key

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Weather App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Button onClick={fetchWeather} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              {loading ? "Loading..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {weather && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{weather.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">
                  {weather.weather[0].main}
                </div>
                <div className="text-sm text-gray-500">
                  {weather.weather[0].description}
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Thermometer className="mr-2 h-5 w-5" />
                <span>Feels like: {Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="flex items-center">
                <Droplets className="mr-2 h-5 w-5" />
                <span>Humidity: {weather.main.humidity}%</span>
              </div>
              <div className="flex items-center">
                <Wind className="mr-2 h-5 w-5" />
                <span>Wind: {weather.wind.speed} m/s</span>
              </div>
              <div className="flex items-center">
                <Cloud className="mr-2 h-5 w-5" />
                <span>Clouds: {weather.clouds.all}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherApp;
