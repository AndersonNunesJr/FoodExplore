import { Routes, Route } from "react-router-dom";

import { SingIn } from "../pages/SingIn";
import { SingUp } from "../pages/SingUp";
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SingUp />} />
    </Routes>
  );
}
