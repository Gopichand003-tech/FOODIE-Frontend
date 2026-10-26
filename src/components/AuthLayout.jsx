import { Container, Card } from "react-bootstrap";
import { Flame } from "lucide-react";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <Container className="min-vh-100 d-flex flex-column justify-content-center align-items-center py-4">
      <h1 className="fw-bold mb-4">
        <Flame className="text-primary" /> <span className="text-primary">FOOD</span>IE
      </h1>

      <Card className="w-100 border-secondary" style={{ maxWidth: 420 }}>
        <Card.Body className="p-4">
          <h2 className="h4">{title}</h2>
          <p className="text-secondary small mb-4">{subtitle}</p>
          {children}
        </Card.Body>
      </Card>

      <p className="text-secondary small mt-4">{footer}</p>
    </Container>
  );
}
