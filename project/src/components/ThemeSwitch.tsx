import { useTheme } from "../hooks/useTheme";

export default function ThemeSwitch() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className={`w-24 h-12 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 ${
        isDark ? "bg-gray-700" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-500 ${
          isDark ? "translate-x-12 bg-black" : "translate-x-0 bg-white"
        }`}
      >
        {isDark ? (
          <img
            src="/crescent-moon.png"
            alt="moon"
            className="w-6 h-6"
          />
        ) : (
          <img
            src="/sun.png"
            alt="sun"
            className="w-6 h-6"
          />
        )}
      </div>
    </div>
  );
}
