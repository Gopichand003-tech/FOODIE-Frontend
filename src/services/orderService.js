const ORDERS_KEY = "foodie_orders";
const currentKey = (userId) => `foodie_current_order_${userId}`;

// [seconds elapsed, status] — mirrors the old backend setTimeout flow.
const STATUS_TIMELINE = [
  [60, "delivered"],
  [30, "out for delivery"],
  [15, "cooking"],
  [5, "confirmed"],
];

const readOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
};

const writeOrders = (orders) =>
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

function statusFor(order) {
  if (order.status === "cancelled") return "cancelled";
  const elapsed = (Date.now() - new Date(order.createdAt).getTime()) / 1000;
  for (const [after, status] of STATUS_TIMELINE) {
    if (elapsed >= after) return status;
  }
  return "pending";
}

const withStatus = (order) => ({ ...order, status: statusFor(order) });

export function createOrder({ userId, items, total, address, phone, payment }) {
  if (!userId) throw new Error("You must be logged in to place an order.");
  if (!items || items.length === 0) throw new Error("Items required");
  if (!total || !address || !phone) throw new Error("Missing fields");

  const order = {
    _id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`,
    userId,
    items,
    total,
    address,
    phone,
    payment,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  writeOrders([...readOrders(), order]);
  localStorage.setItem(currentKey(userId), order._id);
  return withStatus(order);
}

export function getOrder(id) {
  const order = readOrders().find((o) => o._id === id);
  return order ? withStatus(order) : null;
}

// The order the user is currently tracking (set when they place an order).
export function getCurrentOrder(userId) {
  const id = localStorage.getItem(currentKey(userId));
  return id ? getOrder(id) : null;
}

export function clearCurrentOrder(userId) {
  localStorage.removeItem(currentKey(userId));
}

// Delivered orders for a user, newest first.
export function getHistory(userId) {
  return readOrders()
    .filter((o) => o.userId === userId)
    .map(withStatus)
    .filter((o) => o.status === "delivered")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
