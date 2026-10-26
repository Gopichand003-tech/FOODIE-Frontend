import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Offcanvas, ListGroup, Button, Form, Alert } from "react-bootstrap";
import { Plus, Minus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";

const emptyForm = { address: "", phone: "", payment: "COD" };

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, open, setOpen, changeQty, clear, total } = useCart();

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const placeOrder = (e) => {
    e.preventDefault();
    setError("");

    try {
      createOrder({ userId: user.id, items, total, ...form });
    } catch (err) {
      setError(err.message);
      return;
    }

    // show the payment animation briefly, then go to tracking
    setPaying(true);
    setTimeout(() => {
      clear();
      setForm(emptyForm);
      setPaying(false);
      setOpen(false);
      navigate("/track");
    }, 1500);
  };

  return (
    <Offcanvas show={open} onHide={() => setOpen(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column">
        {items.length === 0 ? (
          <p className="text-center text-secondary mt-4">🍽️ Your cart is empty</p>
        ) : (
          <>
            {/* ITEMS */}
            <ListGroup className="mb-3 overflow-auto">
              {items.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex align-items-center gap-2">
                  <img src={item.image} alt={item.name} width={50} height={50} className="rounded object-fit-cover" />

                  <div className="flex-grow-1">
                    <div>{item.name}</div>
                    <small className="text-primary">₹{item.price}</small>
                  </div>

                  <Button size="sm" variant="outline-secondary" onClick={() => changeQty(item.id, -1)}>
                    <Minus size={12} />
                  </Button>
                  <span>{item.qty}</span>
                  <Button size="sm" variant="outline-secondary" onClick={() => changeQty(item.id, 1)}>
                    <Plus size={12} />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>

            {/* CHECKOUT */}
            <Form onSubmit={placeOrder} className="mt-auto">
              <Form.Group className="mb-2">
                <Form.Control as="textarea" rows={2} name="address" placeholder="Delivery address" value={form.address} onChange={onChange} required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={onChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Select name="payment" value={form.payment} onChange={onChange}>
                  <option value="COD">Cash on Delivery</option>
                  <option value="UPI">UPI Payment</option>
                  <option value="CARD">Card Payment</option>
                </Form.Select>
              </Form.Group>

              {paying && (
                <video src="/cashflow2.mp4" autoPlay muted className="d-block mx-auto mb-3 rounded-circle" width={90} height={90} />
              )}

              {error && <Alert variant="danger" className="py-2">{error}</Alert>}

              <div className="d-flex justify-content-between fw-bold mb-3">
                <span>Total</span>
                <span className="text-primary">₹{total}</span>
              </div>

              <Button type="submit" className="w-100" disabled={paying}>
                {paying ? "Processing..." : "Place Order"}
              </Button>
            </Form>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
