import { useEffect } from "react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

export function useFetchDataMany<T>(
  getDataMutation: MutationTrigger<
    MutationDefinition<
      void | string,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      "kpis" | "user" | "product" | "transaction",
      Array<T>,
      "main"
    >
  >,
  setState: React.Dispatch<React.SetStateAction<T[]>>,
  query?: string
) {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataMutation(query).unwrap();
      setState(data);
    };

    fetchData();
  }, [getDataMutation, setState, query]);
}

export function useFetchDataOne<T>(
  getDataMutation: MutationTrigger<
    MutationDefinition<
      string,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        object,
        FetchBaseQueryMeta
      >,
      "kpis" | "user" | "product" | "transaction",
      T,
      "main"
    >
  >,
  setState: React.Dispatch<React.SetStateAction<T>>,
  args: string
) {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataMutation(args).unwrap();
      setState(data);
    };

    fetchData();
  }, [getDataMutation, args, setState]);
}
