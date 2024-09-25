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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../../services/api.js";
import { useAuth } from "../../hooks/auth";

export function Edit() {
  const location = useLocation();
  const { data } = location.state || {};
  const [name, setName] = useState(data.title);
  const [price, setPrice] = useState(data.price);
  const [category, setCategory] = useState(data.category);
  const [productImg, setProductImg] = useState(data.productImg);
  const [description, setDescription] = useState(data.description);
  const [newTag, setNewTag] = useState();
  const [tag, setTags] = useState([data.tag]);
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(data.tag);

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleChangeImage(event) {
    const file = event.target.files[0];

    setProductImg(file);
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  function handleNewDish() {
    if (!name || !price || !category || !description) {
      return alert("Preencha todos os campos!");
    }
    if (newTag) {
      return alert("Confirme a tag , para adcionar-la.");
    }
    const fileUploadForm = new FormData();
    fileUploadForm.append("productImg", productImg);

    api
      .post(`/products/${user.marketId}`, {
        name,
        price,
        category,
        description,
        tag
      })
      .then(async () => {
        await api.post(
          `/products/${user.marketId}/${name}/img`,
          fileUploadForm
        );
      })
      .then(() => {
        alert("Cadastrado com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Não foi possível cadastrar.");
          navigate("/");
        }
      });
  }
  return (
    <Container>
      <Navbar />
      <Section>
        <Link to="/" className="back">
          <PiCaretLeftBold size={24} />
          <p>Voltar</p>
        </Link>
        <Form>
          <h1>Editar prato</h1>
          <div className="details">
            <div className="add_img">
              <p>Imagem do prato</p>
              <input
                id="file-upload"
                className="custom-file-input"
                type="file"
                onChange={handleChangeImage}
              />
              <label htmlFor="file-upload" className="custom-file-label">
                <PiUploadSimpleBold />
                Selecione uma imagem
              </label>
            </div>
            <div className="name">
              <p>Nome</p>
              <Input
                className="width_100"
                placeholder="Ex.: Salada Ceasar"
                value={name}
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
                  value={category}
                >
                  <option value=""></option>
                  <option value="Refeição">Refeição</option>
                  <option value="Sobremesas">Sobremesas</option>
                  <option value="Bebidas">Bebidas</option>
                </select>
              </div>
            </div>
            <div className="tags">
              <p>Ingredientes</p>
              <div className="section_tag">
                {tag.map((tag, index) => (
                  <NewTag
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="description">
              <p>Descrição</p>
              <TextArea
                placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
                value={description}
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
