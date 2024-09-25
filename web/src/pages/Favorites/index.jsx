import { Footer, Navbar, Highlight } from "../../components";
import { Container } from "./styles";
import { api } from "../../services/api.js";
import { useAuth } from "../../hooks/auth";
import { useState, useEffect } from "react";

export function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  async function fetchFavorites() {
    try {
      const response = await api.get(`/favorites/${user.id}`);
      setFavorites(response.data.result.products);
    } catch (error) {
      console.error("Erro ao buscar produtos favoritos:", error);
    }
  }

  const handleButtonFavoritesDelete = async (productId) => {
    await api.delete(`/favorites/${user.id}/delete`, {
      data: { productsId: productId }
    });
    fetchFavorites();
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

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
