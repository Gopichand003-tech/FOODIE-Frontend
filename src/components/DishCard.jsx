
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function DishCard({ dish }) {
  const { addItem } = useCart();
  const [imageIndex, setImageIndex] = useState(0);

  const images = dish.images?.length
    ? dish.images
    : [dish.image];

  function changeImage(direction) {
    setImageIndex((current) =>
      (current + direction + images.length) % images.length
    );
  }

  return (
    <Card className="h-100 border-secondary">
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={images[imageIndex]}
          alt={dish.name}
          className="dish-img"
        />

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
        <Card.Title>{dish.name}</Card.Title>

        <Card.Text className="text-secondary small">
          {dish.description}
        </Card.Text>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5 text-primary">
            ₹{dish.price}
          </span>

          <Button size="sm" onClick={() => addItem(dish)}>
            <ShoppingCart size={16} /> Add
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
