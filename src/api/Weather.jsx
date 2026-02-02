import React, { useState, useEffect } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaCloudRain } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

function Weather() {
  const [weathers, setWeathers] = useState("");
  const [search, setSearch] = useState("");
  const [hours, setHours] = useState([]);
  const [auto, setAuto] = useState([]);

  useEffect(() => {
    fetchWeatherFromApi("Mumbai");
    fetchWeatherForecastFromApi("Mumbai");
  }, []);

  const fetchWeatherFromApi = async (value = search) => {
    try {
      const WeatherApi = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a1ee63e3687a45a6b0c85610250812&q=${value}&aqi=no`
      );
      const WeatherResponse = await WeatherApi.json();
      setWeathers(WeatherResponse);
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const fetchWeatherForecastFromApi = async (value = search) => {
    try {
      const ForecastApi = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=a1ee63e3687a45a6b0c85610250812&q=${value}&days=14&aqi=no&alerts=no`
      );
      const WeatherForecastResponse = await ForecastApi.json();
      setWeathers(WeatherForecastResponse);
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const fetchSearchAutoCompleteFromApi = async () => {
    try {
      const SearchApi = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=a1ee63e3687a45a6b0c85610250812&q=${search}`
      );
      const SearchAutoResponse = await SearchApi.json();
      setAuto(SearchAutoResponse);
    } catch (error) {
      alert("Error: " + error);
    }
  };

  const searchWeather = () => {
    fetchWeatherFromApi(search);
    fetchWeatherForecastFromApi(search);
  };

  const hoursWeather = (day) => {
    setHours(day.hour);
  };
  ///// CODE //////
  return (
    <div className="min-h-screen w-full bg-[#464f5c] flex justify-center items-start p-8 ">
      {/* MAIN CARD */}
      <div className="bg-[#0b121f] w-full max-w-7xl rounded-3xl shadow-2xl p-10 text-white relative">
        <div className="flex">
          <div className="w-2/3">
            {/* SEARCH BAR */}
            <div className="flex justify-center mb-8">
              <input
                type="text"
                placeholder="Search for cities..."
                className="bg-[#1e293b] w-full max-w-xl px-4 py-3 rounded-xl text-lg text-gray-200 outline-none border border-slate-600"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  fetchSearchAutoCompleteFromApi();
                }}
              />

              <button
                className="ml-3 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-xl"
                onClick={searchWeather}
              >
                <FaSearchLocation />
              </button>
            </div>

            {/* AUTOCOMPLETE */}
            {auto.length > 0 && search !== "" && (
              <div className="absolute left-1/3 -translate-x-1/2 top-28 bg-[#1e293b] border border-slate-700 w-[60%] rounded-xl shadow-xl p-3 z-50">
                {auto.map((item, index) => (
                  <p
                    key={index}
                    className="p-3 hover:bg-blue-900 cursor-pointer rounded-lg"
                    onClick={() => {
                      setSearch(item.name);
                      setAuto([]);
                      fetchWeatherFromApi(item.name);
                      fetchWeatherForecastFromApi(item.name);
                    }}
                  >
                    {item.name}, {item.region}, {item.country}
                  </p>
                ))}
              </div>
            )}

            {/* CURRENT WEATHER */}
            {weathers && weathers.current && (
              <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">{weathers.location.name}</h1>

                <p className="text-gray-400 mb-4">
                  Chance of rain: {weathers.current.precip_mm}%
                </p>

                <div className="flex justify-between items-center px-10 py-6">
                  <p className="text-7xl font-bold">
                    {weathers.current.temp_c}°
                  </p>

                  <img
                    src={weathers.current.condition.icon}
                    className="w-28 h-28 animate-bounce"
                    alt=""
                  />
                </div>

                <p className="text-xl font-semibold">
                  {weathers.current.condition.text}
                </p>
              </div>
            )}

            {/* DASHBOARD BODY */}
            <div className="flex gap-6 mt-10">
              {/* LEFT – 14 DAY HORIZONTAL FORECAST + AIR CONDITIONS */}
              <div className="w-[95%] flex flex-col gap-6">
                {/* 14 DAYS FORECAST */}
                {weathers && weathers.forecast && (
                  <div className="bg-[#202c3d] p-6 rounded-2xl">
                    <h2 className="text-lg font-semibold mb-4">
                      {weathers.forecast.forecastday.length} Day Forecast
                    </h2>

                    <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                      {weathers.forecast.forecastday.map((day, index) => (
                        <div
                          key={index}
                          tabIndex={0}
                          onClick={() => hoursWeather(day)}
                          className=" min-w-[120px] p-4 m-1 text-center rounded-xl border-r-2 border-gray-600 
                                        text-gray-400 cursor-pointer
                                        transition-all duration-300 transform
                                       
                                        hover:bg-[#0f172a] hover:scale-105
                                    
                                        focus:bg-[#0f172a] 
                                        focus:text-white 
                                        focus:border-2 
                                        focus:border-blue-500 
                                        focus:shadow-lg 
                                        focus:scale-105
                                        focus:outline-none
                                    
                                        active:scale-95"
                        >
                          <p className="text-sm mb-1 font-medium">{day.date}</p>

                          <img
                            src={day.day.condition.icon}
                            className="w-10 mx-auto my-2"
                            alt=""
                          />

                          <p className="text-lg font-medium">
                            {day.day.maxtemp_c}°
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AIR CONDITIONS */}
                {weathers && weathers.current && (
                  <div className="bg-[#202c3d] p-6 rounded-2xl">
                    <h2 className="text-lg font-semibold mb-4">
                      Air Conditions
                    </h2>

                    <div className="grid grid-cols-2 gap-6 text-gray-200">
                      <div>
                        <p className="text-sm flex ml-8 text-gray-400">
                          Real Feel
                        </p>
                        <p className="text-2xl flex gap-2 font-bold">
                          <FaTemperatureHalf className="text-gray-400" />
                          {weathers.current.feelslike_c}°
                        </p>
                      </div>

                      <div>
                        <p className="text-sm  ml-10 text-gray-400">Wind</p>
                        <p className="text-2xl gap-4 flex font-bold">
                          <FaWind className="text-gray-400" />{" "}
                          {weathers.current.wind_kph} km/h
                        </p>
                      </div>

                      <div>
                        <p className="text-sm ml-6 text-gray-400">
                          Chance of Rain
                        </p>
                        <p className="text-2xl gap-4 flex font-bold">
                          <FaCloudRain className="text-gray-400" />
                          {weathers.current.precip_mm}%
                        </p>
                      </div>

                      <div>
                        <p className="text-sm ml-8 text-gray-400">Humidity</p>
                        <p className="text-2xl gap-4 flex font-bold">
                          <WiHumidity className="text-gray-400 " />
                          {weathers.current.humidity}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="">
            {/* RIGHT – TODAY VERTICAL FORECAST */}
            {hours.length > 0 && (
              <div className="w-96 bg-[#202c3d]  p-6 rounded-2xl mt-16">
                <h2 className="text-lg font-semibold mb-4">Today's Forecast</h2>

                <div className=" gap-4 max-h-screen overflow-scroll hide-scrollbar">
                  {hours.map((hr, index) => (
                    <div
                      key={index}
                      className={`flex justify-between  items-center p-4 m-2 rounded-xl shadow-md
                        ${
                          hr.is_day == 1
                            ? "bg-orange-100 hover:bg-orange-200 text-black transition-all duration-2"
                            : "bg-[#0f172a] hover:bg-blue-900 text-white transition-all duration-2"
                            
                        }
  `}
                    >
                      <p className="text-sm font-medium w-[60px]">
                        {hr.time.split(" ")[1]}
                      </p>

                      <img src={hr.condition.icon} className="w-10" alt="" />

                      <p className="text-lg font-bold">{hr.temp_c}°</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;    