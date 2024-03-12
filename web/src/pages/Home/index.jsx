import { Navbar, Footer, Section, Header, Carrossel } from "../../components";
import { Card } from "../../components/Card";
import img from "../../assets/image3.png";
import { Container } from "./styles";
export function Home() {
  return (
    <Container>
      <Navbar />
      <Section>
        <Header />
        <Carrossel title={"Refeição"}>
          <Card
            title={"Spaguetti Gambe"}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
          <Card
            title={""}
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
            title={""}
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
            title={""}
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
            title={""}
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
            title={""}
            description={"Massa fresca com camarões e pesto. "}
            value={"79,97"}
            img={img}
            imgText={""}
          />
        </Carrossel>
      </Section>
      <Footer />
    </Container>
  );
}
