import { Link } from "react-router-dom";
import { Container, Form, Background } from "./styles.js";
import { Button, Input } from "../../components";
import { useState } from "react";

export function SingUp() {
  const [userRole, setUserRole] = useState("customer");

  function handleSelectRoleUer(event) {}
  return (
    <Container>
      <Background />
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
          <input type="radio" onClick={handleSelectRoleUer()} />
          <label htmlFor="customer">Usuário:</label>
          <input type="radio" onClick={setUserRole} />
        </div>
        <Button title="Criar conta" />
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </Container>
  );
}
