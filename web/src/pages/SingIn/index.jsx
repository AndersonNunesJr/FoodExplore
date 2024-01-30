import { Link } from "react-router-dom";
import { Container, Form, Background } from "./styles.js";
import { Button, Input } from "../../components";

export function SingIn() {
  return (
    <Container>
      <Background />
      <Form>
        <h1>Faça login</h1>
        <p>Email</p>
        <Input type="text" placeholder="Ex: exemplo@exemplo.com.br" />
        <p>Senha</p>
        <Input type="text" placeholder="No mínimo 6 caracteres " />
        <Button title="Entrar" />
        <Link to="/register">Criar uma conta</Link>
      </Form>
    </Container>
  );
}
