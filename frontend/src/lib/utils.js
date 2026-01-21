export function money(price) {
  return price.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}

export function ratingAverage(reviews) {
  if (reviews.length === 0) return 0;

  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  const average = total / reviews.length;

  return Math.round(average * 2) / 2;
}