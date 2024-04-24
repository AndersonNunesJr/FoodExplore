import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Details } from "../pages/Details";
import { New } from "../pages/NewDish";
import { Edit } from "../pages/EditDish";
import { Payment } from "../pages/Payment";
import { Favorites } from "../pages/Favorites";
import { Historic } from "../pages/Historic";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details" element={<Details />} />
      <Route path="/new" element={<New />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/pay" element={<Payment />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/historic" element={<Historic />} />
    </Routes>
  );
}
