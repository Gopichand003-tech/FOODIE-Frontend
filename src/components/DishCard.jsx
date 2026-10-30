import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ShoppingCart, ChevronLeft, ChevronRight, Heart, Star, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function DishCard({ dish }) {
  const { items, addItem, changeQty } = useCart();
  const { isFavorite, toggle } = useFavorites();
  const [imageIndex, setImageIndex] = useState(0);

  const images = dish.images?.length ? dish.images : [dish.image];
  const qty = items.find((item) => item.id === dish.id)?.qty ?? 0;
  const liked = isFavorite(dish.id);

  function changeImage(direction) {
    setImageIndex((current) => (current + direction + images.length) % images.length);
  }

  return (
    <Card className="h-100 border-secondary dish-card">
      <div className="position-relative">
        <Card.Img variant="top" src={images[imageIndex]} alt={dish.name} className="dish-img" />

        {/* rating */}
        <span className="rating-badge">
          <Star size={12} fill="currentColor" /> {dish.rating.toFixed(1)}
        </span>

        {/* favorite */}
        <button
          type="button"
          className={`fav-btn ${liked ? "active" : ""}`}
          onClick={() => toggle(dish.id)}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={liked}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>

        {images.length > 1 && (
          <>
            <Button
              variant="dark"
              size="sm"
              className="position-absolute top-50 start-0 translate-middle-y"
              onClick={() => changeImage(-1)}
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button
              variant="dark"
              size="sm"
              className="position-absolute top-50 end-0 translate-middle-y"
              onClick={() => changeImage(1)}
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </Button>
          </>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-start gap-2 mb-1">
          <span
            className={`veg-mark ${dish.veg ? "veg" : "nonveg"}`}
            title={dish.veg ? "Vegetarian" : "Non-vegetarian"}
          />
          <Card.Title className="mb-0 fs-6">{dish.name}</Card.Title>
        </div>

        <Card.Text className="text-secondary small">{dish.description}</Card.Text>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5 text-primary">₹{dish.price}</span>

          {qty === 0 ? (
            <Button size="sm" onClick={() => addItem(dish)}>
              <ShoppingCart size={16} /> Add
            </Button>
          ) : (
            <div className="qty-stepper">
              <button type="button" onClick={() => changeQty(dish.id, -1)} aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => changeQty(dish.id, 1)} aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
