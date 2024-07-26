import { useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Card } from "../../components/Card";
import { api } from "../../services/api";

export function Carrossel({ children, title }) {
  const [isVoid, setIsVoid] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  
  // const refTimer = useRef(null);

  // setSearchTerm(title);

  // const handleSearch = (search) => {
  //   if (refTimer.current) {
  //     clearTimeout(refTimer.current);
  //   }

  //   refTimer.current = setTimeout(() => {
  //     setSearchTerm(search);
  //   }, 500);
  // };


  useEffect(() => {
    async function fetchProducts() {
      const response = await api.post("/products", { name: a });
      setProducts(response.data.result);
    }
    fetchProducts();
  }, [searchTerm]);

  return (
    <div>
      {!isVoid ? (
        <Container>
          <h2 className="title-container">{title}</h2>
          <div className="carrossel">
            {products.map((product) => (
              <Card key={String(product.id)} data={product} />
            ))}
          </div>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
}

/* <div>
<div className="btn-direction">
<button className="btn" onClick={handleButton} title="left">
<PiCaretLeftBold size={24} />
</button>
</div>

<div className="btn-direction">
<button className="btn" onClick={handleButton} title="right">
<PiCaretRightBold size={24} />
</button>
</div>
</div> */

// const carrossel = useRef(null);
// const handleButton = (e) => {
//   e.preventDefault();
//   const buttonTitle = e.currentTarget.title;
//   if (buttonTitle === "left") {
//     carrossel.current.scrollLeft -= 650;
//   }
//   if (buttonTitle === "right") {
//     carrossel.current.scrollLeft += 650;
//   }
// };

// useEffect(() => {
//   if (children == null) {
//     setIsVoid(true);
//   }
// }, []);
