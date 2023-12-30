import { useEffect, useState } from "react";
import "./App.css";
import styles from "./App.module.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const getCountries = async () => {
    try {
      const res = await fetch(
        "https://crio-location-selector.onrender.com/countries"
      );
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error(err);
    }
  };
  const getStates = async () => {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
      );
      const data = await res.json();
      setStates(data);
      setSelectedState("");
      setSelectedCity("");
    } catch (err) {
      console.error(err);
    }
  };
  const getCities = async () => {
    try {
      const res = await fetch(
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
      );
      const data = await res.json();
      setCities(data);
      setSelectedCity("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    getCities();
  }, [selectedState]);

  return (
    <>
      <h1>Select Location</h1>
      <div className={styles.wrapper}>
        <select
          className={styles.dropdown}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          disabled={selectedCountry === ""}
          className={styles.dropdown}
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          disabled={selectedState === ""}
          className={styles.dropdown}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <>
        <p className={styles.resultText}>You selected <span className={styles.city}>{selectedCity},</span><span className={styles.fadedText}> {selectedState}, {selectedCountry}</span></p>
        </>
      )}
    </>
  );
}

export default App;
