import { Container } from "./styles";
import { PiReceiptLight, PiSignOutBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { logo, adminLogo } from "../../assets/_index";
import { Input, Button } from "../index";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api.js";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar({ onSearch }) {
  const { signOut } = useAuth();
  const { user } = useAuth();

  const navigate = useNavigate();

  function handleSignout() {
    navigate("/");
    signOut({});
  }

  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    onSearch(value);
  };

  const numeroDePedidos = 5;
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
            <Button
              title={`Pedidos (${numeroDePedidos})`}
              icon={PiReceiptLight}
            />
          </Link>
          {/* <Link to="/"> */}
          <button className="Signout" onClick={handleSignout}>
            <PiSignOutBold size={26} />
          </button>
          {/* </Link> */}
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
            <Button title={`Novo Prato`} />
          </Link>
          <Link to="/">
            <button className="Signout" onClick={handleSignout}>
              <PiSignOutBold size={26} />
            </button>
          </Link>
        </Container>
      )}
    </div>
  );
}
