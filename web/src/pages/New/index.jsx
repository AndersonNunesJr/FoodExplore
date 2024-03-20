import { useState } from "react";
import {
  Footer,
  Navbar,
  Section,
  Input,
  TextArea,
  Button,
  Tag,
  NewTag
} from "../../components";
import { Container, Form } from "./styles";
import {
  PiCaretLeftBold,
  PiUploadSimpleBold,
  PiCaretDownBold
} from "react-icons/pi";

export function New() {
  const [description, setDescription] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);
  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }
  return (
    <Container>
      <Navbar />
      <Section>
        <a href="/" className="back">
          <PiCaretLeftBold size={24} />
          <p>Voltar</p>
        </a>
        <Form>
          <h1>Adcionar prato</h1>
          <div className="details">
            <div>
              <p>Imagem do prato</p>
              <Button icon={PiUploadSimpleBold} title={"Selecione imagem"} />
            </div>
            <div className="name">
              <p>Nome</p>
              <Input className="width_100" placeholder="Ex.: Salada Ceasar" />
            </div>
            <div className="category">
              <p>Categoria</p>
              <Input className="width_100" icon={PiCaretDownBold} />
            </div>
            <div className="tags">
              <p>Ingredientes</p>
              <div className="section_tag">
                <NewTag
                  onChange={(e) => setNewTag(e.target.value)}
                  value={"Pão Naan"}
                  onClick={handleAddTag}
                />
                <NewTag
                  isNew
                  placeholder="Adicionar"
                  onChange={(e) => setNewTag(e.target.value)}
                  value={newTag}
                  onClick={handleAddTag}
                />
              </div>
            </div>
            <div>
              <p>Preço</p>
              <Input
                className="width_100"
                type="number"
                placeholder="R$ 00,00"
              />
            </div>
            <div className="description">
              <p>Descrição</p>
              <TextArea
                placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <Button title="Salvar alterações" className="TOMATO_400" />
        </Form>
      </Section>
      <Footer />
    </Container>
  );
}
