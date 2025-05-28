import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 xs:px-6">
      <div className="text-center w-full max-w-sm xs:max-w-md mx-auto">
        <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-bold mb-3 xs:mb-4 sm:mb-6 bg-gradient-to-r from-health-primary to-health-accent bg-clip-text text-transparent">404</h1>
        <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-600 mb-4 xs:mb-6 sm:mb-8">Oops! Page not found</p>
        <p className="text-xs xs:text-sm sm:text-base text-gray-500 mb-6 xs:mb-8 sm:mb-10">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-4 bg-gradient-to-r from-health-primary to-health-accent text-white rounded-lg xs:rounded-xl sm:rounded-2xl font-medium hover:opacity-90 transition-opacity text-sm xs:text-base sm:text-lg"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
