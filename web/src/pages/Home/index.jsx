import { Navbar, Footer, Header, Carrossel } from "../../components";
import { Card } from "../../components/Card";

import { Container } from "./styles";
import { useEffect, useRef, useState, useMemo } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const refTimer = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();

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
      if (user.role !== "admin") {
        const response = await api.post("/products/", { name: searchTerm });
        setProducts(response.data.result);
      }
      if (user.role === "admin") {
        const response = await api.get(`/market/${user.marketId}`);
        setProducts(response.data.result);
      }
    }
    fetchProducts();
  }, [searchTerm]);

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  const groupedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  }, [products]);

  return (
    <Container>
      <Navbar onSearch={handleSearch} />
      <div className="content">
        <Header />
        {Object.keys(groupedProducts).map((category) => (
          <Carrossel title={category} key={category}>
            {groupedProducts[category].map((product) => (
              <Card
                data={product}
                key={product.id}
                onClick={() => handleDetails(product.id)}
              />
            ))}
          </Carrossel>
        ))}
      </div>
      <Footer />
    </Container>
  );
}
