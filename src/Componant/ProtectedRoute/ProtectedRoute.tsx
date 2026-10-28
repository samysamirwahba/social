import  { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children } :{children : ReactNode}) {
  if (!localStorage.getItem("user-token")) {
    return <Navigate to={"/Login"} />;
  } else {
    return <>{children}</>;
  }
}
