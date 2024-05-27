import { useState, useEffect } from "react";

const DarkThemeSwitcher = ({ setIsDarkActive }) => {
  const [themeChecked, setThemeChecked] = useState(false);

  useEffect(() => {
    if (themeChecked) {
      document.querySelector("html").setAttribute("data-theme", "dark");
      setIsDarkActive(true);
    } else {
      document.querySelector("html").removeAttribute("data-theme");
      setIsDarkActive(false);
    }
  }, [themeChecked]);

  return (
    <>
      <div className="flex gap-2">
        <label htmlFor="darkMode">
          {themeChecked ? (
            <i className="fa-solid fa-moon"></i>
          ) : (
            <i className="fa-solid fa-sun"></i>
          )}
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={() => setThemeChecked(!themeChecked)}
            checked={themeChecked}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </>
  );
};

export default DarkThemeSwitcher;
