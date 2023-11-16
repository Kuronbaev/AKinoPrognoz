import React, { useState } from "react";
import Form from "../Form";
import axios from "axios";
import { DotLoader } from "react-spinners";

const Input = () => {
  const [value, setValue] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const getWeather = async (city) => {
    const res = await axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        value === "" ? "Bishkek" : city
      }&units=metric&appid=6b4c292e3e049dbf64d6c2441cc77864&lang=ru`
    );
    const { data } = res;
    setWeather(data);
  };

  useState(() => {
    getWeather(value);
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  });
  function getValue() {
    getWeather(value);
  }

  console.log(weather);
  return loading ? (
    <div className=" container w-[1440px]">
      <div className=" w-[400px] m-auto bg-[#0828c6] py-10  rounded-[20px] px-2 flex items-center justify-center flex-col gap-2 mt-10">
        <div className=" ml-10 flex items-center justify-center gap-2">
          <input
            className=" p-1 ml-10 border-[1px] border-solid rounded-lg outline-none"
            type="text"
            onChange={(e) => setValue(e.target.value)}
          />
          {value == "" ? (
            <button
              className=" scale-0 bg-purple-600 text-white hover:bg-purple-800 hover:scale-110 p-2 rounded-lg "
              onClick={() => getValue()}
            >
              Click
            </button>
          ) : (
            <button
              className=" scale-100 bg-[#5d6ff7] text-white hover:bg-purple-800 hover:scale-110 p-2 rounded-lg "
              onClick={() => getValue()}
            >
              Click
            </button>
          )}
        </div>
        <Form data={weather} />
      </div>
    </div>
  ) : (
    <DotLoader
      color="#0000FF"
      className=" flex items-center justify-center text-center m-auto mt-[250px]"
    />
  );
};

export default Input;
