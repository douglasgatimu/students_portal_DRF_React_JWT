import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

function ResetPassword() {
  const { session } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (session) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [session, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <p className="mb-2">
        This feature is not yet available. Please contact the administrator.
      </p>
      <p className="text-sm text-gray-600">
        Redirecting you {session ? "to your dashboard" : "home"}...
      </p>
    </div>
  );
}

export default ResetPassword;
