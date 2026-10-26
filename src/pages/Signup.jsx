import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      await signup({ name: form.name, email: form.email, password: form.password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Sign up to start ordering."
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full name</Form.Label>
          <Form.Control name="name" placeholder="Your name" value={form.name} onChange={onChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="you@example.com" value={form.email} onChange={onChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control type={showPw ? "text" : "password"} name="password" placeholder="At least 6 characters" value={form.password} onChange={onChange} required />
            <Button variant="outline-secondary" onClick={() => setShowPw(!showPw)}>
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control type={showPw ? "text" : "password"} name="confirm" placeholder="Re-enter password" value={form.confirm} onChange={onChange} required />
        </Form.Group>

        {error && <Alert variant="danger" className="py-2">{error}</Alert>}

        <Button type="submit" className="w-100" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </Form>
    </AuthLayout>
  );
}
