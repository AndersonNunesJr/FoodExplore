import { Container } from "./styles";

export function Button({ title, loading, icon: Icon, ...rest }) {
  return (
    <Container type="button" disabled={loading} {...rest}>
      {Icon && <Icon size={22} />}
      {loading ? "Carregando..." : title}
    </Container>
  );
}
