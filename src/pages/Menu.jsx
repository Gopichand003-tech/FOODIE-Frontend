import { Container, Row, Col } from "react-bootstrap";
import DishCard from "../components/DishCard";
import { menu } from "../data/menu";

export default function Menu() {
  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-4">
        Our <span className="text-primary">Menu</span>
      </h1>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {menu.map((dish) => (
          <Col key={dish.id}>
            <DishCard dish={dish} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
