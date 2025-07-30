import { useState } from "react";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";

const lessons = [
  {
    id: 1,
    title: "React Components",
    course: "Introduction to React",
    duration: "30 min",
  },
  {
    id: 2,
    title: "State and Props",
    course: "Introduction to React",
    duration: "45 min",
  },
  {
    id: 3,
    title: "Hooks",
    course: "Introduction to React",
    duration: "60 min",
  },
  {
    id: 4,
    title: "Closures",
    course: "Advanced JavaScript",
    duration: "40 min",
  },
  {
    id: 5,
    title: "Prototypes",
    course: "Advanced JavaScript",
    duration: "50 min",
  },
];

const LessonsPage = () => {
  const [filter, setFilter] = useState("all");

  const filteredLessons =
    filter === "all"
      ? lessons
      : lessons.filter((lesson) => lesson.course.includes(filter));

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Lessons</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="all">All Courses</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
          </select>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {lesson.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lesson.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lesson.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LessonsPage;
