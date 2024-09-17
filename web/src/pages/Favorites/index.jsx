import { Footer, Navbar, Highlight } from "../../components";
import { Container } from "./styles";
import { api } from "../../services/api.js";
import { useAuth } from "../../hooks/auth";
import { useState, useEffect } from "react";

export function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchFavorites() {
      const response = await api.get(`/favorites/${user.id}`);
      setFavorites(response.data);
    }
    fetchFavorites();
  }, [user.id]);

  return (
    <Container>
      <Navbar />
      <div className="content">
        <h1>Histórico de pedidos</h1>
        <div className="table">
          {favorites.map((favorite) => (
            <Highlight
              key={String(favorite.id)}
              data={favorite}
              buttonText="Remover dos Favoritos"
            />
          ))}
        </div>
      </div>
      <Footer />
    </Container>
  );
}
