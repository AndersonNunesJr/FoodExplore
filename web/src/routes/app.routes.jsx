import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Details } from "../pages/Details";
import { New } from "../pages/NewDish";
import { Edit } from "../pages/EditDish";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Details />} />
      <Route path="/new" element={<New />} />
      <Route path="/edit" element={<Edit />} />
    </Routes>
  );
}
