import { useEffect, useState } from "react";

function Spinner({ loading }) {
  const [shouldRender, setShouldRender] = useState(loading);

  useEffect(() => {
    if (loading) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return shouldRender ? (
    <img
      src="public/spinner.svg"
      className={`w-10 h-10 transition-all duration-300 ease-in-out ${
        loading ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    />
  ) : null;
}

export default Spinner;
