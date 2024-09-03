import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Background } from "./styles.js";
import { Button, Input } from "../../components";
import { useAuth } from "../../hooks/auth";

export function SingIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  function handleSignIn() {
    if (!email || !password) {
      alert("Preencha todos os campos");
    } else signIn({ email, password });
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <Container>
      <Background />
      <Form>
        <h1>Faça login</h1>
        <label htmlFor="Email">Email:</label>
        <Input
          type="text"
          placeholder="Ex: exemplo@exemplo.com.br"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <label htmlFor="Password">Senha:</label>
        <Input
          type="password"
          placeholder="No mínimo 6 caracteres "
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button title="Entrar" onClick={handleSignIn} />
        <Link to="/register">Criar uma conta</Link>
      </Form>
    </Container>
  );
}
