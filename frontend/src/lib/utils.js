export function money(price) {
  return price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}