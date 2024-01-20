export const generateOrderId = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const length = 4;

  const randomString = Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");

  const orderID = `#v${randomString}-${randomString}`;
  return orderID;
};
