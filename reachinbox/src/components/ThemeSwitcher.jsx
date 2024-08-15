import React from 'react';
import './ThemeSwitcher.css';

function ThemeSwitcher() {
  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <button className="btn" onClick={toggleTheme}>Toggle Theme</button>
  );
}

export default ThemeSwitcher;
