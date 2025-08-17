import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  KpisProps,
  LoginProps,
  ProductsProps,
  TransactionsProps,
  UserProps,
} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:8080/api/",
    baseUrl: "https://pompeo-server.onrender.com/api/",
    credentials: "include",
  }),
  refetchOnReconnect: true,
  reducerPath: "main",
  tagTypes: ["kpis"],
  endpoints: (build) => ({
    login: build.mutation<UserProps, LoginProps>({
      query: (body) => ({
        url: "/auth/admin/login",
        method: "post",
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "post",
      }),
    }),
    getKpis: build.query<Array<KpisProps>, void>({
      query: () => "kpi",
      providesTags: ["kpis"],
    }),
    createUser: build.mutation<void, UserProps>({
      query: (body) => ({
        url: "/auth/register",
        method: "post",
        body,
      }),
    }),
    getAllUsers: build.mutation<Array<UserProps>, void>({
      query: () => "user",
    }),
    getOneUser: build.mutation<UserProps, string>({
      query: (id) => `user/${id}`,
    }),
    updateUser: build.mutation<void, UserProps>({
      query: (body) => ({
        url: `user/${body._id}`,
        method: "put",
        body,
      }),
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: "delete",
      }),
    }),
    createProduct: build.mutation<void, ProductsProps>({
      query: (body) => ({
        url: "/product",
        method: "post",
        body,
      }),
    }),
    getAllProducts: build.mutation<Array<ProductsProps>, string | void>({
      query: (query: string) => ({
        url: `product?category=${query}`,
      }),
    }),
    getOneProduct: build.mutation<ProductsProps, string>({
      query: (id) => `product/${id}`,
    }),
    updateProduct: build.mutation<void, ProductsProps>({
      query: (body) => ({
        url: `product/${body._id}`,
        method: "put",
        body,
      }),
    }),
    deleteProduct: build.mutation<void, string>({
      query: (id) => ({
        url: `product/${id}`,
        method: "delete",
      }),
    }),
    getAllTransactions: build.mutation<Array<TransactionsProps>, string | void>(
      {
        query: (recent) => `transaction${recent ? "?recent=" + recent : ""}`,
      }
    ),
    getOneTransaction: build.mutation<TransactionsProps, string>({
      query: (id) => `transaction/${id}`,
    }),
    updateTransaction: build.mutation<void, TransactionsProps>({
      query: (body) => ({
        url: `transaction/${body._id}`,
        method: "put",
        body,
      }),
    }),
    deleteTransaction: build.mutation<void, string>({
      query: (id) => ({
        url: `transaction/${id}`,
        method: "delete",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetKpisQuery,
  useGetAllProductsMutation,
  useCreateUserMutation,
  useGetAllUsersMutation,
  useGetOneUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCreateProductMutation,
  useGetOneProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllTransactionsMutation,
  useGetOneTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = api;
