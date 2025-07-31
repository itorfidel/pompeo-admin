import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
import useWindowWidth from "../hooks/getWindowWidth";

interface Props {
  showToolbar?: boolean;
  rows: GridValidRowModel[];
  columns: GridColDef[];
  showActionsColumn?: boolean;
  hideFooter?: boolean;
}

const TableDataGrid = ({
  showToolbar,
  rows,
  columns,
  showActionsColumn,
  hideFooter,
}: Props) => {
  const { width } = useWindowWidth();

  const tableDataGridStyles: SxProps<Theme> = {
    "& .MuiDataGrid-root": {
      color: "#d1d3da",
      border: "none",
    },
    "& .MuiDataGrid-main": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },
    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
      height: "6px",
    },
    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
      backgroundColor: "#080f25",
    },
    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
      backgroundColor: "#9099bb",
    },
    "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#aeb9e1",
    },
    "& .MuiDataGrid-toolbarContainer button": {
      fontSize: width <= 540 ? "1.15rem" : "1.3rem",
      color: "#ffffff",
      margin: "0 0.25em 1.2em !important",
    },
    "& .MuiDataGrid-toolbarContainer, .MuiDataGrid-columnHeaders, .MuiDataGrid-cell":
      {
        borderBottom: "0.6px solid #343b4f !important",
        fontSize: width <= 540 ? "1.15rem" : "1.2rem",
        color: "#ffffff",
      },
    "& .MuiDataGrid-columnHeaders": {
      padding: "1.5em 0",
    },
    "& .MuiSvgIcon-fontSizeMedium": {
      color: "#ffffff",
    },
    "& .MuiDataGrid-footerContainer": {
      borderTop: "0.6px solid #343b4f !important",
      color: "#ffffff !important",
    },
    "& .MuiToolbar-root, .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
      {
        color: "#ffffff !important",
        fontSize: width <= 540 ? "1.15rem !important" : "1.3rem !important",
      },
  };

  return (
    <Box sx={tableDataGridStyles}>
      <DataGrid
        columnHeaderHeight={35}
        rowHeight={50}
        rows={rows || []}
        columns={
          !showActionsColumn
            ? columns.filter((item) => item.field !== "action")
            : columns
        }
        hideFooter={hideFooter ? true : false}
        checkboxSelection
        disableRowSelectionOnClick
        slots={showToolbar && width >= 540 ? { toolbar: GridToolbar } : {}}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </Box>
  );
};

export default TableDataGrid;
