import { useState } from "react";

function SignUpForm({ onSubmit }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    onSubmit({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-horizontal w-full mx-auto">
      <div className="flex flex-col mt-4">
        <label
          htmlFor="first-name"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
          required
          className="flex-grow h-8 px-2 border rounded border-grey-400"
        />
      </div>
      <div className="flex flex-col mt-4">
        <label
          htmlFor="last-name"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
          required
          className="flex-grow h-8 px-2 border rounded border-grey-400"
        />
      </div>
      <div className="flex flex-col mt-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
          className="flex-grow h-8 px-2 border rounded border-grey-400"
        />
      </div>
      <div className="flex flex-col mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
          minLength="6"
          className="flex-grow h-8 px-2 border rounded border-grey-400"
        />
      </div>
      <div className="flex flex-col mt-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          required
          minLength="6"
          className="flex-grow h-8 px-2 border rounded border-grey-400"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded mt-4 transition-all duration-300 ease-in-out"
      >
        Register
      </button>
    </form>
  );
}

export default SignUpForm;
