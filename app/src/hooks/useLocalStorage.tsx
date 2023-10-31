
import { useState, useEffect, useContext } from "react";

const useLocalStorage = (key : any, defaultValue : any) => {

  const localStorageKey = "investk_";

  function onlyUnique(value : any, index : any, array : any) {
    return array.indexOf(value) === index;
  }

  let [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(localStorageKey + key) || String(defaultValue)
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {

    if (Array.isArray(value))
      value = value.filter(onlyUnique);
    // console.log("ls:", value);

    localStorage.setItem("investk_" + key, JSON.stringify(value));
  }, [value, key, defaultValue]);

  return [value, setValue];
};

export default useLocalStorage;