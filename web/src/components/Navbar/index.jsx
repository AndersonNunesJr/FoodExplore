import { Container } from "./styles";
import { PiReceiptLight, PiSignOutBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import backgroundImg from "../../assets/Logo.png";
import { Input, Button } from "../index";

import { Link } from "react-router-dom";

export function Navbar() {
  const numeroDePedidos = 5;
  return (
    <Container>
      <Link to="/">
        <img src={backgroundImg} alt="Logo" />
      </Link>
      <Input
        type="text"
        placeholder="Busque por pratos ou ingredientes"
        icon={CiSearch}
      />
      <Link href="">Meus favoritos</Link>
      <Link href="">Pedidos</Link>
      <Link to="/pay">
        <Button title={`Pedidos (${numeroDePedidos})`} icon={PiReceiptLight} />
      </Link>
      <button className="Signout">
        <PiSignOutBold size={26} />
      </button>
    </Container>
  );
}
