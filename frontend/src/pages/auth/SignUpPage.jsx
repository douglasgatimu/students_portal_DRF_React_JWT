import { useState } from "react";
import { UserAuth } from "../../context/DRFAuthContext";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../../components/auth/SignUpForm";
import { Link } from "react-router-dom";
import Spinner from "../../components/common/Spinner";

function SignUpPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const { registerUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (userData) => {
    setLoading(true);
    const result = await registerUser(
      userData.username,
      userData.password,
      userData.firstName,
      userData.lastName,
    );

    if (result.success) {
      // toast.success("Successfully registered!");
      setLoading(false);
      navigate("/dashboard");
    } else {
      // toast.error(result.error);
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="split-container animated-container">
      <div className="left-pane fade-in-left p-4">
        <div className="flex flex-col w-full md:w-1/2 p-4 bg-gray-100 rounded-lg">
          <div className="flex flex-col flex-1 justify-center mb-8">
            <div className="w-full mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center text-rose-900">
                Register
              </h2>
              {error && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}
              <SignUpForm onSubmit={handleSignUp} />
              <Spinner loading={loading} />
              <div className="mt-4 text-center">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hidden md:block md:w-1/2 rounded-r-lg fade-in-right"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      ></div>
    </div>
  );
}

export default SignUpPage;
