import { Navbar, Footer, Header, Carrossel } from "../../components";
import { Card } from "../../components/Card";

import { Container } from "./styles";
import { useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const refTimer = useRef(null);

  const handleSearch = (search) => {
    if (refTimer.current) {
      clearTimeout(refTimer.current);
    }

    refTimer.current = setTimeout(() => {
      setSearchTerm(search);
    }, 500);
  };

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.post("/products", { name: searchTerm });
      setProducts(response.data.result);
    }
    fetchProducts();
  }, [searchTerm]);

  return (
    <Container>
      <Navbar onSearch={handleSearch} />
      <div className="content">
        <Header />
        <Carrossel title={"Refeição"}></Carrossel>
        <Carrossel title={"Sobremesas"}></Carrossel>
        <Carrossel title={"Bebidas"}></Carrossel>
      </div>
      <Footer />
    </Container>
  );
}
