export const SubTotal = (items) => {
  let sum = 0;
  items.forEach((item) => {
    sum += item.price * item.quantity;
  });
  return sum;
};
