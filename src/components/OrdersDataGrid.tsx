import React, { useState, useEffect, useMemo } from "react";
import {
  useDeleteTransactionMutation,
  useGetAllTransactionsMutation,
} from "../services/api";
import { GridColDef } from "@mui/x-data-grid";
import { TransactionsProps } from "../services/types";
import TableDataGrid from "./TableDataGrid";
import Badge from "./styled/Badge";
import Legend from "../routes/global/Legend";
import StyledButton from "./styled/Button";
import { Delete } from "@mui/icons-material";
import handleDeleteData from "../helpers/deleteData";
import { formatCurrency } from "../helpers/formats";

interface ColumnWidthProps {
  buyer: number;
  dateOrdered: number;
  status: number;
  total: number;
}

interface Props {
  columnWidth: ColumnWidthProps;
  recent?: boolean;
  showToolbar?: boolean;
  hideFooter: boolean;
  showActionsColumn: boolean;
}

const OrdersDataGrid = ({
  columnWidth,
  recent,
  showToolbar,
  hideFooter,
  showActionsColumn,
}: Props) => {
  const [getTransactions] = useGetAllTransactionsMutation();
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const [deleteTransaction] = useDeleteTransactionMutation();

  useEffect(() => {
    const getData = async () => {
      const transactions = await getTransactions(recent).unwrap();
      setTransactions(transactions);
    };

    getData();
  }, [getTransactions, recent]);

  const colors = {
    pending: {
      bgColor: "#ffb01633",
      color: "#fdb52a",
    },
    paid: {
      bgColor: "#05c16833",
      color: "#14ca74",
    },
    rejected: {
      bgColor: "#ff5a6533",
      color: "#ff5a65",
    },
  };

  const statusColors = (status: string) => {
    switch (status) {
      case "Paid":
        return colors.paid;
      case "Pending":
        return colors.pending;
      case "Rejected":
        return colors.rejected;
      default:
        return colors.pending;
    }
  };

  const rows = useMemo(() => {
    return transactions.map((transaction) => {
      const date = new Date(transaction.createdAt);
      const amount = formatCurrency(transaction.amount);

      return {
        ...transaction,
        buyer: transaction.buyer.split("%").join(" "),
        createdAt: new Intl.DateTimeFormat("en-NG", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(date),
        amount,
      };
    });
  }, [transactions]);

  const columns: GridColDef<TransactionsProps>[] = [
    {
      field: "buyer",
      headerName: "Buyer",
      width: columnWidth.buyer,
    },
    {
      field: "createdAt",
      headerName: "Date Ordered",
      width: columnWidth.dateOrdered,
    },
    {
      field: "status",
      headerName: "Status",
      width: columnWidth.status,
      renderCell: (params) => {
        return (
          <Badge
            $bgColor={statusColors(params.row.status)?.bgColor}
            $color={statusColors(params.row.status)?.color}
          >
            <Legend
              color={statusColors(params.row.status)?.color}
              style={{
                gap: "0.2em",
                fontSize: "1.2rem",
                paddingRight: ".25em",
              }}
              dotStyle={{
                transform: "scale(45%)",
              }}
              title={params.row.status}
            />
          </Badge>
        );
      },
    },
    {
      field: "amount",
      headerName: "Total",
      width: columnWidth.total,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 80,
      renderCell: (params) => {
        return (
          <StyledButton
            name="delete"
            style={{ padding: "0.5em 0.8em" }}
            onClick={() =>
              handleDeleteData(
                params.row._id,
                deleteTransaction,
                setTransactions
              )
            }
          >
            <Delete titleAccess="Delete" sx={{ fontSize: "1.8rem" }} />
          </StyledButton>
        );
      },
    },
  ];

  return (
    <TableDataGrid
      showToolbar={showToolbar}
      rows={rows}
      columns={columns}
      showActionsColumn={showActionsColumn}
      hideFooter={hideFooter}
    />
  );
};

export default OrdersDataGrid;
