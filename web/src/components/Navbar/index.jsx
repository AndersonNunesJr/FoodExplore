import { Container } from "./styles";
import { PiReceiptLight, PiSignOutBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { logo, adminLogo } from "../../assets/_index";
import { Input, Button } from "../index";
import { useAuth } from "../../hooks/auth";
import { useEffect, useState } from "react";
// import { api } from "../../services/api.js";

import { Link, useNavigate } from "react-router-dom";

export function Navbar({ onSearch }) {
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState("");
  const { signOut } = useAuth();
  const { user } = useAuth();

  const navigate = useNavigate();

  function handleSignout() {
    navigate("/");
    signOut({});
  }

  const handleSearch = (value) => {
    setSearch(value);
    onSearch(value);
  };

  function getAmountOfProducts() {
    const products = JSON.parse(
      localStorage.getItem("@Foodexplore:amountsToBePaid")
    );

    const totalAmount = products
      ? products
          .map((item) => item.amount)
          .reduce((total, amount) => total + amount, 0)
      : 0;

    setAmount(totalAmount);
  }

  useEffect(() => {
    getAmountOfProducts();
  }, []);

  return (
    <div>
      {user.role !== "admin" ? (
        <Container>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <Input
            type="text"
            placeholder="Busque por pratos ou ingredientes"
            icon={CiSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
          <Link to="/favorites">Meus favoritos</Link>
          <Link to="/historic">Histórico de pedidos</Link>
          <Link to="/pay">
            <Button title={`Pedidos (${amount})`} icon={PiReceiptLight} />
          </Link>
          <button className="Signout" onClick={handleSignout} type="button">
            <PiSignOutBold size={26} />
          </button>
        </Container>
      ) : (
        <Container>
          <Link to="/">
            <img src={adminLogo} alt="Logo" />
          </Link>
          <Input
            type="text"
            placeholder="Busque por pratos ou ingredientes"
            icon={CiSearch}
            onChange={(e) => handleSearch(e.target.value)}
            value={search}
          />
          <Link to="/favorites">Meus favoritos</Link>
          <Link to="/historic">Histórico de pedidos</Link>
          <Link to="/new">
            <Button title={"Novo Prato"} />
          </Link>
          <button className="Signout" onClick={handleSignout} type="button">
            <PiSignOutBold size={26} />
          </button>
        </Container>
      )}
    </div>
  );
}
