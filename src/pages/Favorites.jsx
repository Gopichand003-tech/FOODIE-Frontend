import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Heart } from "lucide-react";
import DishCard from "../components/DishCard";
import { menu } from "../data/menu";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { ids } = useFavorites();
  const dishes = menu.filter((d) => ids.includes(d.id));

  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-4">
        Your <span className="text-primary">Favorites</span>
      </h1>

      {dishes.length === 0 ? (
        <div className="text-center text-secondary py-5">
          <Heart size={40} className="mb-3" />
          <p className="fs-5">No favorites yet — tap the heart on any dish to save it here.</p>
          <Button as={Link} to="/menu">Browse Menu</Button>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {dishes.map((dish) => (
            <Col key={dish.id}>
              <DishCard dish={dish} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
