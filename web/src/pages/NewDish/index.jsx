import { useRef, useState } from "react";
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
import {
  PiCaretLeftBold,
  PiUploadSimpleBold,
  PiCaretDownBold
} from "react-icons/pi";
import { api } from "../../services/api.js";
import { useAuth } from "../../hooks/auth";

export function New() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productImg, setProductImg] = useState("");
  const [description, setDescription] = useState("");
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);
  const { user } = useAuth();

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleNewDish() {
    if (!name || !tags || !price || !category || !description) {
      return alert("Preencha todos os campos!");
    }
    api
      .post(`/products/${user.marketId}`, {
        name,
        price,
        category,
        description,
        tags
      })
      .then(() => {
        alert("Cadastrado com sucesso!");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível cadastrar.");
        }
      });
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
            <div className="add_img">
              <p>Imagem do prato</p>
              <Button icon={PiUploadSimpleBold} title={"Selecione imagem"} />
            </div>
            <div className="name">
              <p>Nome</p>
              <Input
                className="width_100"
                placeholder="Ex.: Salada Ceasar"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="category">
              <p>Categoria</p>
              <div>
                <select
                  name="seuSelect"
                  id="seuSelect"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="opcao1">Opção 1</option>
                  <option value="opcao2">Opção 2</option>
                  <option value="opcao3">Opção 3</option>
                </select>
              </div>
            </div>
            <div className="tags">
              <p>Ingredientes</p>
              <div className="section_tag">
                {/* <NewTag
                  onChange={(e) => setNewTag(e.target.value)}
                  value={"Pão Naan"}
                  onClick={handleAddTag}
                /> */}
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
                onChange={(e) => setPrice(e.target.value)}
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
            <Button
              title="Salvar alterações"
              className="TOMATO_400"
              onClick={handleNewDish}
            />
          </div>
        </Form>
      </Section>
      <Footer />
    </Container>
  );
}
