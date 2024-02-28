import { Container } from "./styles";
import { PiReceiptLight, PiSignOutBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import backgroundImg from "../../assets/Logo.png";
import { Input, Button } from "../index";
export function Navbar() {
  const numeroDePedidos = 5;
  return (
    <Container>
      <img src={backgroundImg} alt="Logo" />
      <Input
        type="text"
        placeholder="Busque por pratos ou ingredientes"
        icon={CiSearch}
      />
      <Button title={`Pedidos (${numeroDePedidos})`} icon={PiReceiptLight} />
      <button className="Signout">
        <PiSignOutBold size={22} />
      </button>
    </Container>
  );
}
