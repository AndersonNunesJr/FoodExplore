import { useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { Swiper, SwiperSlide } from "swiper/react";

export function Carrossel({ children, title }) {
  const carrossel = useRef(null);
  const [isVoid, setIsVoid] = useState(false);

  useEffect(() => {
    if (children == null) {
      setIsVoid(true);
    }
  }, []);
  return (
    <div>
      {!isVoid ? (
        <Container>
          <Swiper>
            <SwiperSlide>
              
            </SwiperSlide>
          </Swiper>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
}

// <h2 className="title-container">{title}</h2>
// <div>
//   <div className="btn-direction">
//     <button className="btn" onClick={handleButton} title="left">
//       <PiCaretLeftBold size={24} />
//     </button>
//   </div>
//   <div className="carrossel" ref={carrossel}>
//     {children}
//   </div>
//   <div className="btn-direction">
//     <button className="btn" onClick={handleButton} title="right">
//       <PiCaretRightBold size={24} />
//     </button>
//   </div>
// </div>
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
