import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Offcanvas, ListGroup, Button, Form, Alert, InputGroup } from "react-bootstrap";
import { Plus, Minus, Tag, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { coupons } from "../utils/pricing";

const emptyForm = { address: "", phone: "", payment: "COD" };

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    items, open, setOpen, changeQty, clear, bill,
    couponCode, couponStatus, activeCoupon, applyCoupon, removeCoupon,
  } = useCart();

  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const tryCoupon = (code) => {
    if (!code.trim()) return;
    const result = applyCoupon(code);
    setCouponMessage(result.ok ? "" : result.message);
    if (result.ok) setCodeInput("");
  };

  const placeOrder = (e) => {
    e.preventDefault();
    setError("");

    try {
      createOrder({
        userId: user.id,
        items,
        total: bill.total,
        bill,
        couponCode: activeCoupon?.code,
        ...form,
      });
    } catch (err) {
      setError(err.message);
      return;
    }

    // show the payment animation briefly, then go to tracking
    setPaying(true);
    setTimeout(() => {
      clear();
      setForm(emptyForm);
      setCodeInput("");
      setCouponMessage("");
      setPaying(false);
      setOpen(false);
      navigate("/track");
    }, 1500);
  };

  const row = (label, value, className = "") => (
    <div className={`d-flex justify-content-between small ${className}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );

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
            <ListGroup className="mb-3 overflow-auto flex-shrink-0" style={{ maxHeight: "30vh" }}>
              {items.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex align-items-center gap-2">
                  <img src={item.image} alt={item.name} width={50} height={50} className="rounded object-fit-cover" />

                  <div className="flex-grow-1">
                    <div>{item.name}</div>
                    <small className="text-primary">₹{item.price * item.qty}</small>
                  </div>

                  <Button size="sm" variant="outline-secondary" onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity">
                    <Minus size={12} />
                  </Button>
                  <span>{item.qty}</span>
                  <Button size="sm" variant="outline-secondary" onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity">
                    <Plus size={12} />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>

            {/* COUPON */}
            <div className="mb-3">
              {activeCoupon ? (
                <div className="coupon-applied d-flex justify-content-between align-items-center">
                  <span className="small">
                    <Tag size={14} className="me-1" />
                    <strong>{activeCoupon.code}</strong> applied
                  </span>
                  <Button variant="link" size="sm" className="p-0 text-secondary" onClick={removeCoupon} aria-label="Remove coupon">
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <>
                  <InputGroup size="sm">
                    <Form.Control
                      placeholder="Coupon code"
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          tryCoupon(codeInput);
                        }
                      }}
                    />
                    <Button variant="outline-primary" onClick={() => tryCoupon(codeInput)}>Apply</Button>
                  </InputGroup>

                  <div className="d-flex flex-wrap gap-1 mt-2">
                    {Object.values(coupons).map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        className="coupon-chip"
                        title={c.label}
                        onClick={() => tryCoupon(c.code)}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {couponMessage && !activeCoupon && (
                <div className="text-danger small mt-1">{couponMessage}</div>
              )}
              {couponCode && couponStatus && !couponStatus.ok && (
                <div className="text-warning small mt-1">
                  {couponCode} removed from this order: {couponStatus.message}
                </div>
              )}
            </div>

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

              {/* BILL */}
              <div className="bill mb-3">
                {row("Subtotal", `₹${bill.subtotal}`, "text-secondary")}
                {bill.discount > 0 && row(`Discount (${activeCoupon.code})`, `− ₹${bill.discount}`, "text-success")}
                {row("GST (5%)", `₹${bill.tax}`, "text-secondary")}
                {row("Delivery", bill.delivery === 0 ? "FREE" : `₹${bill.delivery}`, bill.delivery === 0 ? "text-success" : "text-secondary")}
                <hr className="my-2" />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{bill.total}</span>
                </div>
              </div>

              <Button type="submit" className="w-100" disabled={paying}>
                {paying ? "Processing..." : `Place Order · ₹${bill.total}`}
              </Button>
            </Form>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
