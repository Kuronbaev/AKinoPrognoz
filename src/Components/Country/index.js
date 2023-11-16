import React, { useState, useEffect } from "react";
import axios from "axios";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { HashLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #87ceeb; /* Light Sky Blue */
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const StyledSelect = styled.select`
  padding: 8px;
  margin: 10px;
  color: white;
  margin-top: 20px;
  margin-bottom: 50px;
  font-size: 16px;
  background-color: #006bff;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s ease;
  cursor: pointer;
  &:hover {
    border-color: #87ceeb;
  }

  &:focus {
    border-color: #87ceeb;
  }
`;

const StyledOption = styled.option`
  font-size: 20px;
  cursor: pointer;
`;

const Country = () => {
  const [countries, setCountries] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCountryData();
  }, []);

  const getCountryData = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  };

  const sortCountries = (property) => {
    return [...countries].sort((a, b) => b[property] - a[property]);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  return loading === false ? (
    <div className="container">
      <StyledSelect onChange={(e) => setSelectedOption(e.target.value)}>
        <StyledOption value="all">All</StyledOption>
        <StyledOption value="area">Area</StyledOption>
        <StyledOption value="population">Population</StyledOption>
      </StyledSelect>
      <h1 className="text-2xl flex items-center justify-center mb-3">
        Country
      </h1>

      <div className="flex items-center justify-center flex-wrap gap-2 object-cover">
        {selectedOption === "all"
          ? countries.map((country, idx) => (
              <div
                key={idx}
                onClick={() => handleCountryClick(country)}
                className="border-solid border-[1px] h-[300px] flex items-center justify-center text-center flex-col"
              >
                <img
                  className="w-[300px] h-[200px] mb-[20px]"
                  src={country.flags?.png}
                  alt=""
                />
                <h1 className="w-[300px]">{country.name?.common}</h1>
              </div>
            ))
          : sortCountries(selectedOption).map((country, idx) => (
              <div
                key={idx}
                onClick={() => handleCountryClick(country)}
                className="border-solid border-[1px] h-[300px] flex items-center justify-center text-center flex-col"
              >
                <img
                  className="w-[300px] h-[200px] mb-[20px]"
                  src={country.flags?.png}
                  alt=""
                />
                <h1 className="w-[300px]">{country.name?.common}</h1>
              </div>
            ))}
      </div>

      {selectedCountry && (
        <ModalWrapper className="bar flex items-center justify-center">
          <div
            onClick={() => setSelectedCountry(null)}
            className="bg-[#000] opacity-75 w-full h-full top-0 left-0 fixed z-30"
          ></div>
          <div className="box flex items-center flex-col transition-all transition-[.4s]">
            <h1 className="text-2xl mb-4 mt-3">
              {selectedCountry.name?.common}
            </h1>
            <img src={selectedCountry.flags?.png} alt="" />
            <div className="stor flex justify-center flex-col mr-[120px] gap-2 mt-10">
              <h2>
                <strong>Area:</strong> {selectedCountry.area}
              </h2>
              <h2>
                <strong>Region:</strong> {selectedCountry.region}
              </h2>
              <h2>
                <strong>Population:</strong> {selectedCountry.population}
              </h2>
              <h2>
                <strong>Language:</strong> {selectedCountry.languages.eng}
              </h2>
              <h2>
                <strong>Continents:</strong>{" "}
                {selectedCountry.continents.map((continent) => continent)}
              </h2>
              <h2>
                <strong>Capital city:</strong> {selectedCountry.capital}
              </h2>{" "}
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  ) : (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "300px" }}
    >
      <HashLoader
        className=" mt-[250px]"
        color="#0000FF"
        css={override}
        size={150}
        loading={loading}
      />
    </div>
  );
};

export default Country;
