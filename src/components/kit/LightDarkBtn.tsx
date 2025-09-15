import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/Slices/themeSlice";

const LightDarkBtn: React.FC = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(
    (state: { theme: { darkMode: boolean } }) => state.theme.darkMode
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="relative w-9 h-9 rounded-full bg-Grey-10/90 border border-Grey-30 hover:border-Grey-40 transition-all duration-500 ease-out group cursor-pointer overflow-hidden shadow-[0_0_15px_rgba(112,59,247,0.2)] hover:shadow-[0_0_25px_rgba(112,59,247,0.4)] backdrop-blur-sm"
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      {/* Neon Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-Purple-60/5 via-transparent to-Purple-75/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Animated Border Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-Purple-60/40 via-Purple-75/20 to-Purple-60/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

      {/* Floating Neon Orbs */}
      <div
        className="absolute top-1 left-1/4 w-1 h-1 bg-Purple-60 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-bounce transition-all duration-500"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="absolute bottom-1 right-1/4 w-1.5 h-1.5 bg-Purple-75 rounded-full opacity-0 group-hover:opacity-40 group-hover:animate-bounce transition-all duration-500"
        style={{ animationDelay: "0.3s" }}
      ></div>

      {/* Icon Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {darkMode ? (
          // Moon Icon (for dark mode)
          <div className="p-1 rounded-full transition-all duration-300 group-active:scale-110 group-active:-rotate-12">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-Purple-75 drop-shadow-[0_0_16px_rgba(112,59,247,0.8)] transition-all duration-300 ease-out group-active:drop-shadow-[0_0_25px_rgba(112,59,247,1)] group-active:text-Purple-60"
            >
              <path
                d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-active:animate-pulse"
              />
            </svg>
          </div>
        ) : (
          // Sun Icon (for light mode)
          <div className="p-1 rounded-full transition-all duration-300 group-active:scale-110 group-active:rotate-12">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-Purple-75 drop-shadow-[0_0_16px_rgba(112,59,247,0.8)] transition-all duration-300 ease-out group-active:drop-shadow-[0_0_25px_rgba(112,59,247,1)] group-active:text-Purple-60"
            >
              <circle
                cx="12"
                cy="12"
                r="5"
                stroke="currentColor"
                strokeWidth="2"
                className="group-active:animate-pulse"
              />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-active:animate-pulse"
                style={{ animationDelay: '0.1s' }}
              />
            </svg>
          </div>
        )}
      </div>

      {/* Active State Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-Purple-60/10 via-transparent to-transparent animate-pulse"></div>

      {/* Click effect with ripple */}
      <div className="absolute inset-0 rounded-full bg-Purple-75/30 scale-0 group-active:scale-100 transition-transform duration-150" />
    </button>
  );
};

export default LightDarkBtn;
