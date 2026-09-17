const ORDERS_STORAGE_KEY = "amazon-clone-orders";

export function getOrders() {
  try {
    const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  const orders = getOrders();
  const updatedOrders = [order, ...orders];
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
  return order;
}

export function getOrder(orderId) {
  return getOrders().find((order) => order.id === orderId) || null;
}
