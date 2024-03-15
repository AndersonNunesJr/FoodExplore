import { Navbar, Footer, Header, Carrossel } from "../../components";
import { Card } from "../../components/Card";
import img from "../../assets/image3.png";
import { Container } from "./styles";
export function Home() {
  return (
    <Container>
      <Navbar />
      <div className="content">
        <Header />
        <Carrossel title={"Refeição"}>
          <Card
            title={"Torradas de Parma"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          <Card
            title={"Spaguetti Gambe"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          <Card
            title={"Torradas de Parma"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          <Card
            title={"Torradas de Parma"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          <Card
            title={"Torradas de Parma"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          <Card
            title={"Torradas de Parma"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          <Card
            title={"Torradas de Parma"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          <Card
            title={"Torradas de Parma"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          <Card
            title={"1234567890/1234567890/1234567890/ 1234567890/ 1234567890/"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          {/* <Card
            title={"Torradas de Parma"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          <Card
            title={"Torradas de Parma"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          /> */}
        </Carrossel>
        <Carrossel title={"Sobremesas"}></Carrossel>
        <Carrossel title={"Bebidas"}></Carrossel>
        <Carrossel title={"Bebidas"}></Carrossel>
        <Carrossel title={"Bebidas"}></Carrossel>
        <Carrossel title={"Bebidas"}></Carrossel>
        <Carrossel title={"Bebidas"}></Carrossel>
      </div>
      <Footer />
    </Container>
  );
}
