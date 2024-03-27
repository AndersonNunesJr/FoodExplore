import { useState } from "react";
import {
  Footer,
  Navbar,
  Section,
  Input,
  TextArea,
  Button,
  NewTag
} from "../../components";
import { Container, Form } from "./styles";
import { PiCaretLeftBold, PiUploadSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export function Edit() {
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
        <Link href="/" className="back">
          <PiCaretLeftBold size={24} />
          <p>Voltar</p>
        </Link>
        <Form>
          <h1>Adcionar prato</h1>
          <div className="details">
            <div className="add_img">
              <p>Imagem do prato</p>
              <Button icon={PiUploadSimpleBold} title={"Selecione imagem"} />
            </div>
            <div className="name">
              <p>Nome</p>
              <Input className="width_100" placeholder="Ex.: Salada Ceasar" />
            </div>
            <div className="category">
              <p>Categoria</p>
              <div>
                <select name="seuSelect" id="seuSelect">
                  <option value="opcao1">Opção 1</option>
                  <option value="opcao2">Opção 2</option>
                  <option value="opcao3">Opção 3</option>
                </select>
              </div>
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
            <div className="price">
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
          <div className="btn-group">
            <Button title="Excluir prato" className="excluir" />
            <Button title="Salvar alterações" className="TOMATO_400" />
          </div>
        </Form>
      </Section>
      <Footer />
    </Container>
  );
}
