import { Container } from "./styles";
import { PiReceiptLight, PiSignOutBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { logo, adminLogo } from "../../assets/_index";
import { Input, Button } from "../index";

import { Link } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  const numeroDePedidos = 5;
  return (
    <Container>
      <Link to="/">
        {isAdmin === false ? (
          <img src={logo} alt="Logo" />
        ) : (
          <img src={adminLogo} alt="Logo" />
        )}
      </Link>
      <Input
        type="text"
        placeholder="Busque por pratos ou ingredientes"
        icon={CiSearch}
      />
      <Link to="/favorites">Meus favoritos</Link>
      <Link to="/historic">Histórico de pedidos</Link>
      <Link to="/pay">
        <Button title={`Pedidos (${numeroDePedidos})`} icon={PiReceiptLight} />
      </Link>
      <button className="Signout">
        <PiSignOutBold size={26} />
      </button>
    </Container>
  );
}
