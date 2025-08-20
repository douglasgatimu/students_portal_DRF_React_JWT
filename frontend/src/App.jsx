import { RouterProvider } from "react-router-dom";
import { router } from "../src/routers/router.jsx";
import { AuthContextProvider } from "./context/DRFAuthContext.jsx";

export default function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}
