import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { CheckCircle, MapPin, Phone, RotateCcw } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { getHistory } from "../services/orderService";

export default function History() {
  const { user } = useAuth();
  const { addItems, setOpen } = useCart();
  const toast = useToast();
  const [orders, setOrders] = useState(() => getHistory(user.id));

  // refresh so an order that just finished shows up
  useEffect(() => {
    const interval = setInterval(() => setOrders(getHistory(user.id)), 2000);
    return () => clearInterval(interval);
  }, [user.id]);

  const reorder = (order) => {
    addItems(order.items);
    toast.show("Items from your past order added to cart");
    setOpen(true);
  };

  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-4">Order History</h1>

      {orders.length === 0 && <p className="text-secondary">No past orders yet.</p>}

      {orders.map((order) => (
        <Card key={order._id} className="border-secondary mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <span className="fw-semibold">
                {order.items[0].name}
                {order.items.length > 1 && (
                  <span className="text-secondary"> + {order.items.length - 1} more</span>
                )}
              </span>
              <span className="text-primary fw-bold">₹{order.total}</span>
            </div>

            <p className="text-secondary small mb-0 mt-2"><MapPin size={14} /> {order.address}</p>
            <p className="text-secondary small mb-0"><Phone size={14} /> {order.phone}</p>
            <p className="text-secondary small mb-0">{new Date(order.createdAt).toLocaleString()}</p>
            <p className="text-success small fw-semibold mb-0 mt-1"><CheckCircle size={14} /> Delivered</p>
            {order.couponCode && (
              <p className="text-secondary small mb-0">Coupon used: {order.couponCode}</p>
            )}

            <Button variant="outline-primary" size="sm" className="mt-3" onClick={() => reorder(order)}>
              <RotateCcw size={14} /> Reorder
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
