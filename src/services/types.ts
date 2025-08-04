interface CartProps {
  cartItems: [{ item: ProductsProps; count: number }];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

interface OrdersProps {
  current: number[];
  history: number[];
}

export interface UserProps {
  _id?: string;
  fullName: string;
  email: string;
  username: string;
  profileImg?: string;
  cart: CartProps;
  orders: OrdersProps;
  isAdmin: boolean;
  exp?: number;
}

export interface RegisterProps extends UserProps {
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface ProductsProps {
  _id?: string;
  image: string | undefined;
  title: string;
  price: string;
  desc: string;
  category: string;
  trackNumber: number;
  transactions: [];
}

export interface TransactionsProps {
  _id: string;
  id: number;
  buyer: string;
  amount: string;
  products: ProductsProps[];
  status: string;
  createdAt: string;
}

interface ExpensesByCategory {
  salaries: string;
  supplies: string;
  services: string;
}

interface Month {
  id: string;
  month: string;
  revenue: string;
  expenses: string;
  nonOperationalExpenses: string;
  operationalExpenses: string;
}

interface Day {
  id: string;
  date: string;
  revenue: string;
  expenses: string;
}

export interface KpisProps {
  _id: string;
  __v: number;
  totalProfit: string;
  totalRevenue: string;
  totalExpenses: string;
  monthlyData: Month[];
  dailyData: Day[];
  expensesByCategory: ExpensesByCategory;
}
