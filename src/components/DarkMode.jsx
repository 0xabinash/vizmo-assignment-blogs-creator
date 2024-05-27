import { useState, useEffect, forwardRef } from "react";
import { Switch } from "./ui/switch";

const DarkThemeSwitcher = ({setIsDarkActive}) => {
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
      <div
        className="w-fit rounded-full py-2 flex space-x-2 justify-center text-foreground my-2 ml-auto mr-5 border px-5 max-w-[1484px]"
        // style={{ marginTop: headerHeight + 10 + "px" }}
      >
        <label htmlFor="darkMode">
          {themeChecked ? (
            <i className="fa-solid fa-moon"></i>
          ) : (
            <i className="fa-solid fa-sun"></i>
          )}
        </label>
        <Switch
          id="darkMode"
          checked={themeChecked}
          onCheckedChange={() => setThemeChecked(!themeChecked)}
        />
      </div>
    </>
  );
};

export default DarkThemeSwitcher;