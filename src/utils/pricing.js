export const DELIVERY_FEE = 40;
export const FREE_DELIVERY_ABOVE = 399;
export const TAX_RATE = 0.05; // 5% GST

export const coupons = {
  FIRST50: {
    code: "FIRST50",
    label: "50% off your first order (up to ₹150)",
    percent: 50,
    cap: 150,
    firstOrderOnly: true,
  },
  SAVE100: {
    code: "SAVE100",
    label: "₹100 off on orders above ₹500",
    flat: 100,
    min: 500,
  },
  FREEDEL: {
    code: "FREEDEL",
    label: "Free delivery on any order",
    freeDelivery: true,
  },
};

// Is this coupon usable right now? Returns { ok, message, coupon }.
export function checkCoupon(code, subtotal, isFirstOrder) {
  const coupon = coupons[String(code).trim().toUpperCase()];
  if (!coupon) return { ok: false, message: "Invalid coupon code" };
  if (coupon.firstOrderOnly && !isFirstOrder) {
    return { ok: false, message: `${coupon.code} is valid on your first order only` };
  }
  if (coupon.min && subtotal < coupon.min) {
    return {
      ok: false,
      message: `Add ₹${coupon.min - subtotal} more to use ${coupon.code}`,
    };
  }
  return { ok: true, coupon };
}

export function computeBill(subtotal, coupon) {
  let discount = 0;
  if (coupon?.percent) {
    discount = Math.min(Math.round((subtotal * coupon.percent) / 100), coupon.cap ?? Infinity);
  } else if (coupon?.flat) {
    discount = Math.min(coupon.flat, subtotal);
  }

  const delivery =
    subtotal === 0 || subtotal >= FREE_DELIVERY_ABOVE || coupon?.freeDelivery
      ? 0
      : DELIVERY_FEE;

  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + tax + delivery;

  return { subtotal, discount, tax, delivery, total };
}
