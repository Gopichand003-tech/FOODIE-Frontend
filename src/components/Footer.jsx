import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark border-top border-secondary mt-5 pt-5">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h3 className="fw-bold">
              <span className="text-primary">FOOD</span>IE
            </h3>
            <p className="text-secondary small">
              Fresh, hot meals delivered to your doorstep.
            </p>
          </Col>

          <Col xs={6} md={4}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/track">Track Order</Link></li>
              <li><Link to="/history">Order History</Link></li>
            </ul>
          </Col>

          <Col xs={6} md={4}>
            <h6>Contact</h6>
            <p className="small text-secondary mb-1"><MapPin size={14} className="text-primary" /> Guntur, India</p>
            <p className="small text-secondary mb-1"><Phone size={14} className="text-primary" /> +91 9154 XXXX XX</p>
            <p className="small text-secondary mb-1"><Mail size={14} className="text-primary" /> support@foodie.com</p>
          </Col>
        </Row>
      </Container>

      <p className="text-center text-secondary small border-top border-secondary mt-4 py-3 mb-0">
        © {new Date().getFullYear()} <span className="text-primary">Foodie</span>. All rights reserved.
      </p>
    </footer>
  );
}
