import React from "react";

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = React.useState("Dark");
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(currentTheme === "dark" ? "Dark" : "Light");
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button className="button" onClick={toggleTheme}>
      {theme} mode
    </button>
  );
};

export default ThemeToggle;
