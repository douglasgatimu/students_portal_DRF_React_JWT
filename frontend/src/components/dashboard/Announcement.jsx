import { useState } from "react";

const Announcement = ({ title, published_at, department, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 transition-all duration-300">
      <div className="mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">
          {department} •{" "}
          {new Date(published_at).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <p className="text-gray-700 text-sm">
        {expanded ? content : `${content.slice(0, 120)}... `}
        <button
          type="button"
          onClick={toggleExpanded}
          className="text-blue-500 hover:underline text-sm ml-1 p-0 bg-transparent border-none appearance-none cursor-pointer focus:outline-none"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      </p>
    </div>
  );
};

export default Announcement;
