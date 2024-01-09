export const formatPrice = (price: number) =>
  Intl.NumberFormat('bg-BG', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
