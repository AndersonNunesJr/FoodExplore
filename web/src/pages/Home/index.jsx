import { Navbar, Footer, Header, Carrossel } from "../../components";
import { Card } from "../../components/Card";

import { Container } from "./styles";
import { useEffect, useRef, useState, useMemo } from "react";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const refTimer = useRef(null);
  const navigate = useNavigate();

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
      const response = await api.post("/products/", { name: searchTerm });
      setProducts(response.data.result);
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

// import { Navbar, Footer, Header, Carrossel } from "../../components";
// import { Card } from "../../components/Card";

// import { Container } from "./styles";
// import { useEffect, useRef, useState, useMemo } from "react";
// import { api } from "../../services/api";
// import { useNavigate } from "react-router-dom";

// export function Home() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1); // Controle de paginação
//   const [hasMore, setHasMore] = useState(true); // Para controlar quando parar o carregamento
//   const refTimer = useRef(null);
//   const navigate = useNavigate();

//   const handleSearch = (search) => {
//     if (refTimer.current) {
//       clearTimeout(refTimer.current);
//     }

//     refTimer.current = setTimeout(() => {
//       setSearchTerm(search);
//       setPage(1); // Resetar a página ao realizar nova busca
//       setProducts([]); // Limpar os produtos para evitar duplicação na nova busca
//       setHasMore(true); // Reiniciar o estado de "mais produtos disponíveis"
//     }, 500);
//   };

//   // Fetch com paginação e controle de duplicação
//   useEffect(() => {
//     async function fetchProducts() {
//       if (!hasMore) return; // Se não houver mais produtos, não faz a requisição

//       const response = await api.post("/products/", {
//         name: searchTerm,
//         page // Passando o número da página para o backend
//       });

//       const newProducts = response.data.result;

//       if (newProducts.length === 0) {
//         setHasMore(false); // Não há mais produtos para carregar
//       } else {
//         setProducts((prevProducts) => {
//           const uniqueProducts = newProducts.filter(
//             (newProduct) =>
//               !prevProducts.some(
//                 (prevProduct) => prevProduct.id === newProduct.id
//               )
//           );
//           return [...prevProducts, ...uniqueProducts];
//         });
//       }
//     }
//     fetchProducts();
//   }, [searchTerm, page, hasMore]);

//   const groupedProducts = useMemo(() => {
//     return products.reduce((acc, product) => {
//       const category = product.category;
//       if (!acc[category]) {
//         acc[category] = [];
//       }
//       acc[category].push(product);
//       return acc;
//     }, {});
//   }, [products]);

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop ===
//       document.documentElement.offsetHeight
//     ) {
//       setPage((prevPage) => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   function handleDetails(id) {
//     navigate(`/details/${id}`);
//   }

//   return (
//     <Container>
//       <Navbar onSearch={handleSearch} />
//       <div className="content">
//         <Header />

//         {Object.keys(groupedProducts).map((category) => (
//           <Carrossel title={category} key={category}>
//             {groupedProducts[category].map((product) => (
//               <Card
//                 data={product}
//                 key={product.id}
//                 onClick={() => handleDetails(product.id)}
//               />
//             ))}
//           </Carrossel>
//         ))}
//       </div>
//       <Footer />
//     </Container>
//   );
// }
