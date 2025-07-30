// Mock Courses
const courses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React",
    instructor: "John Doe",
    studentsEnrolled: 25,
    duration: "4 weeks",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript",
    instructor: "Jane Smith",
    studentsEnrolled: 18,
    duration: "6 weeks",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript",
    instructor: "Jane Smith",
    studentsEnrolled: 18,
    duration: "6 weeks",
  },
  {
    id: 4,
    title: "Python for Data Science",
    description: "Deep dive into JavaScript",
    instructor: "Jane Smith",
    studentsEnrolled: 18,
    duration: "6 weeks",
  },
  {
    id: 5,
    title: "CSS with Tailwind",
    description: "Master modern CSS with Tailwind",
    instructor: "Mike Johnson",
    studentsEnrolled: 32,
    duration: "3 weeks",
  },
];

const simulateApiCall = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};

export const getCourses = async () => {
  return simulateApiCall(courses);
};

export const getCourseById = async (id) => {
  const course = courses.find((c) => c.id === id);
  return simulateApiCall(course || null);
};
