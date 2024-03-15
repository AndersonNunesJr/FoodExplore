import { useState } from "react";
import {
  Footer,
  Navbar,
  Section,
  Input,
  TextArea,
  Button
} from "../../components";
import { Container } from "./styles";
import { PiCaretLeftBold } from "react-icons/pi";

export function New() {
  const [description, setDescription] = useState("");
  return (
    <Container>
      <Navbar />
      <Section>
        <a href="/" className="back">
          <PiCaretLeftBold size={24} />
          <p>Voltar</p>
        </a>
        <h1>Adcionar prato</h1>
        <div className="details">
          <div>
            <p>Imagem do prato</p>
            <Input className="width_100" />
          </div>
          <div>
            <p>Nome</p>
            <Input className="width_100" placeholder="Ex.: Salada Ceasar" />
          </div>
          <div>
            <p>Categoria</p>
            <Input className="width_100" />
          </div>
          <div>
            <p>Ingredientes</p>
            <Input className="width_100" />
          </div>
          <div>
            <p>Preço</p>
            <Input className="width_100" type="number" placeholder="R$ 00,00" />
          </div>
        </div>

        <div>
          <p>Descrição</p>
          <TextArea
            placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button title="Salvar alterações" className="TOMATO_400" />
      </Section>
      <Footer />
    </Container>
  );
}
