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
      void,
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
  setState: React.Dispatch<React.SetStateAction<T[]>>
) {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataMutation().unwrap();
      setState(data);
    };

    fetchData();
  }, [getDataMutation, setState]);
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
