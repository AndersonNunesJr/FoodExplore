import { Link } from "react-router-dom";
import { Container, Form, Background } from "./styles.js";
import { Button, Input } from "../../components";

export function SingUp() {
  return (
    <Container>
      <Background />
      <Form>
        <h1>Crie sua conta</h1>
        <p>Seu nome</p>
        <Input type="text" placeholder="Ex: Maria da Silva" />
        <p>Email</p>
        <Input type="text" placeholder="Ex: exemplo@exemplo.com.br" />
        <p>Senha</p>
        <Input type="text" placeholder="No mínimo 6 caracteres " />
        <Button title="Criar conta" />
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </Container>
  );
}
