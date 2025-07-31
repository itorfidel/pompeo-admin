import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from "@reduxjs/toolkit/dist/query";
import { MutationTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";

function handleDeleteData<T>(
  id: string | undefined,
  deleteData: MutationTrigger<
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
      void,
      "main"
    >
  >,
  setState: React.Dispatch<React.SetStateAction<T[]>>
) {
  if (id) {
    deleteData(id);
    setState((state) => state.filter((item) => item._id !== id));
  }
}

export default handleDeleteData;
