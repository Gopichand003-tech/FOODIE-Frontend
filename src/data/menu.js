export const categories = [
  "Fast Food",
  "Rice & Noodles",
  "Curries & Breads",
  "South Indian",
  "Starters",
  "Drinks & Desserts",
];

// id, name, description, price, image, category, veg, rating
const dish = (id, name, description, price, image, category, veg, rating) => ({
  id,
  name,
  description,
  price,
  image,
  category,
  veg,
  rating,
});

export const menu = [
  dish(1, "Margherita Pizza", "Classic cheese pizza with fresh basil", 199, "/food/pizza.jpg", "Fast Food", true, 4.6),
  dish(2, "Veg Burger", "Crispy patty with fresh veggies", 149, "/food/veg burger.jpg", "Fast Food", true, 4.2),
  dish(3, "Pasta Alfredo", "Creamy white sauce pasta", 249, "/food/pasta.jpg", "Fast Food", true, 4.4),
  dish(4, "French Fries", "Golden crispy fries", 99, "/food/fries.jpg", "Fast Food", true, 4.1),
  dish(5, "Chicken Biryani", "Spicy and flavorful rice dish", 299, "/food/biriyani.jpg", "Rice & Noodles", false, 4.8),
  dish(6, "Cold Coffee", "Chilled coffee with ice cream", 129, "/food/coffee.jpg", "Drinks & Desserts", true, 4.3),
  dish(7, "Paneer Butter Masala", "Rich creamy paneer curry", 269, "/food/panner.jpg", "Curries & Breads", true, 4.7),
  dish(8, "Butter Naan", "Soft Indian bread with butter", 49, "/food/naan.jpg", "Curries & Breads", true, 4.5),
  dish(9, "Chicken Fried Rice", "Stir-fried rice with chicken", 219, "/food/fried rice.jpg", "Rice & Noodles", false, 4.3),
  dish(10, "Veg Noodles", "Hakka noodles with vegetables", 179, "/food/noodles.jpg", "Rice & Noodles", true, 4.0),
  dish(11, "Masala Dosa", "Crispy dosa with potato filling", 119, "/food/masala dosa.jpg", "South Indian", true, 4.7),
  dish(12, "Idli Sambar", "Soft idlis with hot sambar", 89, "/food/idli.jpg", "South Indian", true, 4.5),
  dish(13, "Chicken 65", "Spicy deep-fried chicken", 259, "/food/65.jpg", "Starters", false, 4.6),
  dish(14, "Mutton Biryani", "Rich and aromatic mutton rice", 349, "/food/mutton.jpg", "Rice & Noodles", false, 4.9),
  dish(15, "Veg Pulao", "Mildly spiced vegetable rice", 179, "/food/pulao.jpg", "Rice & Noodles", true, 4.1),
  dish(16, "Chocolate Milkshake", "Creamy chocolate delight", 149, "/food/milkshake.jpg", "Drinks & Desserts", true, 4.4),
  dish(17, "Oreo Shake", "Thick shake with Oreo cookies", 169, "/food/oreo.jpg", "Drinks & Desserts", true, 4.5),
  dish(18, "Grilled Sandwich", "Toasted sandwich with fillings", 139, "/food/grilled.jpg", "Fast Food", true, 4.0),
  dish(19, "Chicken Wrap", "Soft wrap with spicy chicken", 199, "/food/wrap.jpg", "Fast Food", false, 4.3),
  dish(20, "Ice Cream Sundae", "Vanilla ice cream with toppings", 159, "/food/icecream.jpg", "Drinks & Desserts", true, 4.6),
];
