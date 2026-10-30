import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { Search, X } from "lucide-react";
import DishCard from "../components/DishCard";
import { menu, categories } from "../data/menu";

const sorters = {
  popular: (a, b) => b.rating - a.rating,
  "price-low": (a, b) => a.price - b.price,
  "price-high": (a, b) => b.price - a.price,
};

export default function Menu() {
  // filters live in the URL so the home page can link straight to a category
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("category") || "All";
  const diet = params.get("diet") || "all";
  const sort = params.get("sort") || "popular";

  const setParam = (key, value, fallback) => {
    const next = new URLSearchParams(params);
    if (!value || value === fallback) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const dishes = useMemo(() => {
    const term = q.trim().toLowerCase();
    return menu
      .filter((d) => category === "All" || d.category === category)
      .filter((d) => diet === "all" || (diet === "veg" ? d.veg : !d.veg))
      .filter((d) => !term || `${d.name} ${d.description}`.toLowerCase().includes(term))
      .sort(sorters[sort] || sorters.popular);
  }, [q, category, diet, sort]);

  const hasFilters = q || category !== "All" || diet !== "all";

  return (
    <Container className="py-4">
      <h1 className="fw-bold mb-4">
        Our <span className="text-primary">Menu</span>
      </h1>

      {/* SEARCH + FILTERS */}
      <Row className="g-2 mb-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text><Search size={16} /></InputGroup.Text>
            <Form.Control
              type="search"
              placeholder="Search dishes…"
              value={q}
              onChange={(e) => setParam("q", e.target.value, "")}
            />
          </InputGroup>
        </Col>

        <Col xs={7} md={3}>
          <Form.Select value={diet} onChange={(e) => setParam("diet", e.target.value, "all")} aria-label="Diet filter">
            <option value="all">Veg &amp; Non-veg</option>
            <option value="veg">Veg only</option>
            <option value="nonveg">Non-veg only</option>
          </Form.Select>
        </Col>

        <Col xs={5} md={3}>
          <Form.Select value={sort} onChange={(e) => setParam("sort", e.target.value, "popular")} aria-label="Sort">
            <option value="popular">Top rated</option>
            <option value="price-low">Price: low → high</option>
            <option value="price-high">Price: high → low</option>
          </Form.Select>
        </Col>
      </Row>

      {/* CATEGORY PILLS */}
      <div className="category-scroll mb-4">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            className={`category-pill ${category === c ? "active" : ""}`}
            onClick={() => setParam("category", c, "All")}
          >
            {c}
          </button>
        ))}
      </div>

      {dishes.length === 0 ? (
        <div className="text-center text-secondary py-5">
          <p className="fs-5 mb-2">🍽️ No dishes match your search</p>
          <Button variant="outline-primary" size="sm" onClick={() => setParams({}, { replace: true })}>
            <X size={14} /> Clear filters
          </Button>
        </div>
      ) : (
        <>
          <p className="text-secondary small mb-3">
            {dishes.length} {dishes.length === 1 ? "dish" : "dishes"}
            {hasFilters && " found"}
          </p>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {dishes.map((dish) => (
              <Col key={dish.id}>
                <DishCard dish={dish} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}
