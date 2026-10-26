import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Utensils, ShoppingCart, Truck } from "lucide-react";
import DishCard from "../components/DishCard";
import { menu } from "../data/menu";

const steps = [
  { icon: <Utensils size={32} />, title: "Choose Food", text: "Browse and pick from a variety of delicious meals." },
  { icon: <ShoppingCart size={32} />, title: "Add to Cart", text: "Add items to your cart and place your order." },
  { icon: <Truck size={32} />, title: "Fast Delivery", text: "Get your food delivered hot and fresh." },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h1 className="display-4 fw-bold">
              Food That <br />
              <span className="text-primary">Hits Different</span>
            </h1>
            <p className="lead text-secondary">
              Fresh meals crafted for your cravings — anytime, anywhere.
            </p>
            <Button as={Link} to="/menu" size="lg">Order Now</Button>
          </Col>

          <Col md={6}>
            <video src="/puttyhome.mp4" autoPlay loop muted playsInline className="w-100 rounded-4" />
          </Col>
        </Row>
      </Container>

      {/* POPULAR DISHES */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-4">
          Popular <span className="text-primary">Dishes</span>
        </h2>

        <Row xs={1} sm={2} lg={4} className="g-4">
          {menu.slice(0, 4).map((dish) => (
            <Col key={dish.id}>
              <DishCard dish={dish} />
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4">
          <Button as={Link} to="/menu" variant="outline-primary">View Full Menu</Button>
        </div>
      </Container>

      {/* HOW IT WORKS */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-4">
          How It <span className="text-primary">Works</span>
        </h2>

        <Row xs={1} md={3} className="g-4 text-center">
          {steps.map((step) => (
            <Col key={step.title}>
              <Card className="h-100 border-secondary">
                <Card.Body>
                  <div className="text-primary mb-2">{step.icon}</div>
                  <Card.Title>{step.title}</Card.Title>
                  <Card.Text className="text-secondary">{step.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* OFFER */}
      <Container className="py-5">
        <Card bg="primary" text="white" className="text-center border-0">
          <Card.Body className="py-5">
            <h2 className="fw-bold">Limited Time Offer</h2>
            <p className="mb-4">Enjoy 50% OFF on your first order.</p>
            <Button as={Link} to="/menu" variant="dark">Order Now</Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
