import { ProductsProps, UserProps } from "./services/types";

export const initialProduct: ProductsProps = {
  image: "",
  title: "",
  price: "",
  desc: "",
  category: "",
  trackNumber: 0,
  transactions: [],
};

export const initialUser: UserProps = {
  _id: "",
  fullName: "",
  email: "",
  username: "",
  cart: {
    cartItems: [{ item: initialProduct, count: 0 }],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },
  orders: {
    current: [],
    history: [],
  },
  isAdmin: false,
};

export const initialOrderColumnWidth = {
  buyer: 0,
  dateOrdered: 0,
  status: 0,
  total: 0,
};

export const networkError = {
  type: "networkError",
  message: "Failed to connect.",
};
