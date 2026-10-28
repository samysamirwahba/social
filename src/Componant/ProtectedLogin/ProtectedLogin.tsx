import  { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedLogin({ children } : {children : ReactNode}) {
  if (localStorage.getItem("user-token")) {
    return <Navigate to={"</home>"} />;
  } else {
    return <>{ children }</>;
  }
}
