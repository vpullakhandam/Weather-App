# Weather App

A sleek and responsive weather application built with React and Tailwind CSS. This app allows users to check the current weather conditions for any city worldwide.

## Features

- Real-time weather data from WeatherAPI
- Dynamic background that changes based on weather conditions and time of day
- Responsive design that works on desktop and mobile devices
- Displays temperature, humidity, wind speed, and "feels like" temperature
- Indicates whether it's day or night at the searched location
- Loading spinner for improved user experience
- Error handling for invalid city names or API issues

## Technologies Used

- React
- Tailwind CSS
- WeatherAPI
- Lucide React (for icons)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js and npm
- You have a WeatherAPI key. You can get one by signing up at [WeatherAPI](https://www.weatherapi.com/)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/vpullakhandam/Weather-App.git
   ```

2. Navigate to the project directory:

   ```
   cd client
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your WeatherAPI key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

## Usage

To run the app in development mode:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build the app for production:

```
npm run build
```

This builds the app for production to the `build` folder.

## Acknowledgements

- [WeatherAPI](https://www.weatherapi.com/) for providing the weather data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
