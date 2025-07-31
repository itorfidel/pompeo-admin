export const formatInteger = (string: string) => {
  return parseInt(string.split("$")[1].split(".")[0]);
};

export const formatCurrency = (currency: string) => {
  const amount = parseInt(currency);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
