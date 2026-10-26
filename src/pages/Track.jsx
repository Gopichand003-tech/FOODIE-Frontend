import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Button, ProgressBar, Badge } from "react-bootstrap";
import { MapPin, Phone, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getCurrentOrder, getOrder, clearCurrentOrder } from "../services/orderService";

const statusFlow = ["pending", "confirmed", "cooking", "out for delivery", "delivered"];

const statusVideos = {
  pending: "/videos/pending.mp4",
  confirmed: "/videos/confirmed.mp4",
  cooking: "/videos/cooking.mp4",
  "out for delivery": "/videos/Delivery.mp4",
  delivered: "/videos/delivered.mp4",
};

export default function Track() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [order] = useState(() => getCurrentOrder(user.id));
  const [status, setStatus] = useState(order?.status || "pending");

  // check the order status every second
  useEffect(() => {
    if (!order) return;

    let redirectTimer;
    const interval = setInterval(() => {
      const latest = getOrder(order._id);
      if (!latest) return;

      setStatus(latest.status);

      if (latest.status === "delivered") {
        clearInterval(interval);
        clearCurrentOrder(user.id);
        redirectTimer = setTimeout(() => navigate("/history"), 2000);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [order, user.id, navigate]);

  if (!order) {
    return (
      <Container className="py-5 text-center">
        <h2>No active order</h2>
        <Button as={Link} to="/menu" className="mt-3">Browse Menu</Button>
      </Container>
    );
  }

  const step = statusFlow.indexOf(status);
  const percent = (step / (statusFlow.length - 1)) * 100;

  return (
    <Container className="py-4" style={{ maxWidth: 520 }}>
      <Card className="border-secondary">
        <Card.Body className="text-center">
          <h4>Order #{order._id.slice(-5)}</h4>
          <p className="fs-5 text-primary mb-1">₹{order.total}</p>
          <Badge bg="primary" className="text-capitalize">{status}</Badge>

          <p className="text-secondary small mt-3 mb-0"><MapPin size={14} /> {order.address}</p>
          <p className="text-secondary small"><Phone size={14} /> {order.phone}</p>

          <video src={statusVideos[status]} autoPlay muted loop className="rounded my-3" width={160} height={160} />

          <ProgressBar now={percent} className="mb-2" style={{ height: 8 }} />
          <div className="d-flex justify-content-between text-secondary" style={{ fontSize: 11 }}>
            {statusFlow.map((s) => (
              <span key={s} className="text-capitalize">{s}</span>
            ))}
          </div>

          {status === "delivered" && (
            <p className="text-success fw-semibold mt-3 mb-0">
              <CheckCircle size={16} /> Delivered successfully
            </p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
