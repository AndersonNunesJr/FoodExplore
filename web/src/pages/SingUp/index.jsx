import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, Background } from "./styles.js";
import { Button, Input } from "../../components";
import { api } from "../../services/api.js";

export function SingUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("customer");

  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  function handleSingUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os campos!");
    }

    api
      .post("/user", { name, email, password })
      .then(() => {
        alert("Usuário cadastrado com sucesso!");
        navigate("/");
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
      <Background />
      {selectedRole === "customer" ? (
        <Form>
          <h1>Crie sua conta</h1>

          <label htmlFor="Name">Seu nome:</label>
          <Input type="text" placeholder="Ex: Maria da Silva" />

          <label htmlFor="Email">Email:</label>
          <Input type="text" placeholder="Ex: exemplo@exemplo.com.br" />

          <label htmlFor="Password">Senha:</label>
          <Input type="text" placeholder="No mínimo 6 caracteres " />
          <div className="userRole">
            <label htmlFor="admin">Administrador:</label>
            <input
              type="radio"
              checked={selectedRole === "admin"}
              onChange={() => handleSelectRole("admin")}
            />
            <label htmlFor="customer">Usuário:</label>
            <input
              type="radio"
              checked={selectedRole === "customer"}
              onChange={() => handleSelectRole("customer")}
            />
          </div>
          <Button title="Criar conta" />
          <Link to="/">Já tenho uma conta</Link>
        </Form>
      ) : (
        <Form>
          <h1>Crie a conta da loja</h1>

          <label htmlFor="Name">Seu nome:</label>
          <Input type="text" placeholder="Ex: Maria da Silva" />

          <label htmlFor="Name">Nome da loja</label>
          <Input type="text" placeholder="Ex: Mc dona" />

          <label htmlFor="Email">Email:</label>
          <Input type="text" placeholder="Ex: exemplo@exemplo.com.br" />

          <label htmlFor="Password">Senha:</label>
          <Input type="text" placeholder="No mínimo 6 caracteres " />
          <div className="userRole">
            <label htmlFor="admin">Administrador:</label>
            <input
              type="radio"
              checked={selectedRole === "admin"}
              onChange={() => handleSelectRole("admin")}
            />
            <label htmlFor="customer">Usuário:</label>
            <input
              type="radio"
              checked={selectedRole === "customer"}
              onChange={() => handleSelectRole("customer")}
            />
          </div>
          <Button title="Criar conta" />
          <Link to="/">Já tenho uma conta</Link>
        </Form>
      )}
    </Container>
  );
}
