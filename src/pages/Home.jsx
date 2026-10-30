import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Form, InputGroup } from "react-bootstrap";
import {
  Utensils, ShoppingCart, Truck, Search, Sandwich, CookingPot, Soup,
  Drumstick, IceCream, Salad, Copy, Check,
} from "lucide-react";
import DishCard from "../components/DishCard";
import { menu } from "../data/menu";

const steps = [
  { icon: <Utensils size={32} />, title: "Choose Food", text: "Browse and pick from a variety of delicious meals." },
  { icon: <ShoppingCart size={32} />, title: "Add to Cart", text: "Add items to your cart and place your order." },
  { icon: <Truck size={32} />, title: "Fast Delivery", text: "Get your food delivered hot and fresh." },
];

const categoryTiles = [
  { name: "Fast Food", icon: <Sandwich size={26} /> },
  { name: "Rice & Noodles", icon: <CookingPot size={26} /> },
  { name: "Curries & Breads", icon: <Soup size={26} /> },
  { name: "South Indian", icon: <Salad size={26} /> },
  { name: "Starters", icon: <Drumstick size={26} /> },
  { name: "Drinks & Desserts", icon: <IceCream size={26} /> },
];

const topRated = [...menu].sort((a, b) => b.rating - a.rating).slice(0, 4);

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const onSearch = (e) => {
    e.preventDefault();
    navigate(search.trim() ? `/menu?q=${encodeURIComponent(search.trim())}` : "/menu");
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText("FIRST50");
    } catch {
      /* clipboard not available — the code is still visible on screen */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

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

            <Form onSubmit={onSearch} className="mb-3" style={{ maxWidth: 440 }}>
              <InputGroup size="lg">
                <InputGroup.Text><Search size={18} /></InputGroup.Text>
                <Form.Control
                  type="search"
                  placeholder="Search biryani, dosa, pizza…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit">Search</Button>
              </InputGroup>
            </Form>

            <Button as={Link} to="/menu" variant="outline-primary">Browse Full Menu</Button>
          </Col>

          <Col md={6}>
            <video src="/puttyhome.mp4" autoPlay loop muted playsInline className="w-100 rounded-4" />
          </Col>
        </Row>
      </Container>

      {/* CATEGORIES */}
      <Container className="py-4">
        <h2 className="text-center fw-bold mb-4">
          Explore <span className="text-primary">Categories</span>
        </h2>
        <Row xs={2} md={3} lg={6} className="g-3">
          {categoryTiles.map((c) => (
            <Col key={c.name}>
              <Link to={`/menu?category=${encodeURIComponent(c.name)}`} className="category-tile">
                <span className="text-primary">{c.icon}</span>
                <span>{c.name}</span>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* TOP RATED */}
      <Container className="py-5">
        <h2 className="text-center fw-bold mb-4">
          Top Rated <span className="text-primary">Dishes</span>
        </h2>

        <Row xs={1} sm={2} lg={4} className="g-4">
          {topRated.map((dish) => (
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
            <p className="mb-3">Enjoy 50% OFF (up to ₹150) on your first order.</p>
            <button type="button" className="promo-code mb-4" onClick={copyCode}>
              FIRST50 {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <div>
              <Button as={Link} to="/menu" variant="dark">Order Now</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
