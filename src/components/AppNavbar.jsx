import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { ShoppingCart, Flame, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function AppNavbar() {
  const { user, logout } = useAuth();
  const { count, setOpen } = useCart();
  const { ids } = useFavorites();

  return (
    <Navbar expand="md" sticky="top" bg="dark" data-bs-theme="dark" className="border-bottom border-secondary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          <Flame className="text-primary me-1" />
          <span className="text-primary">FOOD</span>IE
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />

       
<Navbar.Collapse id="main-nav" className="position-relative">
  <Nav className="mx-auto gap-md-4">
    <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
    <Nav.Link as={NavLink} to="/menu">Menu</Nav.Link>
    <Nav.Link as={NavLink} to="/favorites">
      Favorites{ids.length > 0 && <Badge bg="secondary" className="ms-1">{ids.length}</Badge>}
    </Nav.Link>
    <Nav.Link as={NavLink} to="/track">Track</Nav.Link>
    <Nav.Link as={NavLink} to="/history">History</Nav.Link>
  </Nav>

  <div className="d-flex align-items-center gap-3 py-2 py-md-0">
    <Button variant="outline-light" size="sm" onClick={() => setOpen(true)}>
      <ShoppingCart size={16} /> Cart{" "}
      {count > 0 && <Badge bg="primary">{count}</Badge>}
    </Button>

    <span className="text-secondary small">
      <User size={16} className="text-primary" /> {user?.name?.split(" ")[0]}
    </span>

    <Button variant="secondary" size="sm" onClick={logout}>
      <LogOut size={14} /> Logout
    </Button>
  </div>
</Navbar.Collapse>

      </Container>
    </Navbar>
  );
}
