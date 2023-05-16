export default function (items: any[]) {
  const total: number = items.reduce(
    (amt, curItem) => amt + curItem.price * curItem.quantity,
    0
  );
  return total.toFixed(2);
}
