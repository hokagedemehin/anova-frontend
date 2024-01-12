"use client";
import { Box, Chip, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NoData from "@/public/NoData.png";
import NoSearch from "@/public/NoSearch.png";
import { PushRouter } from "@/shared/helpers/routers";
import { useAppDispatch } from "@/shared/store/store";
import { useBids } from "@/hooks/bidHooks";
import { MdOutlineHistory } from "react-icons/md";
import dayjs from "dayjs";
import { setBackdropOpen } from "@/shared/store/slices/backdropSlice";
import { AiOutlineEdit } from "react-icons/ai";
import {
  setHistoryDrawerId,
  setHistoryDrawerOpen,
} from "@/shared/store/slices/historyDrawerSlice";

const ValueFormatter = (props: GridRenderCellParams<any, string>) => {
  return (
    <Tooltip title={props?.value}>
      <Typography className="font-outfit ">{props?.value}</Typography>
    </Tooltip>
  );
};
const PriceFormatter = (props: GridRenderCellParams<any, string>) => {
  return (
    <Tooltip title={props?.value}>
      <Typography className="font-outfit ">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EUR",
        }).format(parseFloat(props?.value as string))}
      </Typography>
    </Tooltip>
  );
};
const dateFormatter = (props: GridRenderCellParams<any, string>) => {
  return (
    <Tooltip title={dayjs(props?.value).format("MMM DD, YYYY HH:mm:ss a")}>
      <Typography className="font-outfit ">
        {dayjs(props?.value).format("MMM DD, YYYY HH:mm a")}
      </Typography>
    </Tooltip>
  );
};

const StatusChip = (props: GridRenderCellParams<any, string>) => {
  return (
    <Chip
      label={props.value?.toLowerCase()}
      size="small"
      className={`font-outfit px-2 py-[14px]  ${
        props.value === "Pending" && "bg-orange-100 text-orange-700"
      }
      ${props.value === "Approved" && "bg-green-100 text-green-700"}
      ${props.value === "Rejected" && "bg-red-100 text-red-700"}
      `}
    />
  );
};
const EmptyDataDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Image
        src={NoData}
        alt="empty rows"
        className="h-auto w-[10rem]"
        placeholder="blur"
      />
      <Typography
        variant="body1"
        className="font-outfit text-center text-sm font-medium text-black"
      >
        No bids yet
      </Typography>
    </div>
  );
};

const NoSearchResultDataDisplay = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Image
        src={NoSearch}
        alt="empty search result"
        className="h-auto w-[10rem]"
        placeholder="blur"
      />
      <Typography
        variant="body1"
        className="font-outfit text-center text-sm font-medium text-black"
      >
        No search result found
      </Typography>
    </div>
  );
};

const BidsTable = () => {
  const pushRoute = PushRouter();
  const dispatch = useAppDispatch();
  const { bidsData } = useBids();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (bidsData) {
      setTableData(bidsData);
    }

    return () => {
      setTableData([]);
    };
  }, [bidsData]);

  const CustomToolBar = () => {
    return (
      <GridToolbarContainer className="flex items-center justify-end">
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  };

  const columns: GridColDef[] = [
    {
      field: "quantity",
      headerName: "Quantity (MWh)",
      width: 150,
      renderCell: ValueFormatter,
      headerClassName: "font-outfit font-bold text-black",
    },
    {
      field: "price",
      headerName: "Price (€/MWh)",
      width: 150,
      renderCell: PriceFormatter,
      headerClassName: "font-outfit font-bold text-black",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: StatusChip,
      headerClassName: "font-outfit font-bold text-black",
    },
    {
      field: "start_time",
      headerName: "Start Time",
      width: 200,
      renderCell: dateFormatter,
      headerClassName: "font-outfit font-bold text-black",
    },
    {
      field: "close_time",
      headerName: "Close Time",
      width: 200,
      renderCell: dateFormatter,
      headerClassName: "font-outfit font-bold text-black",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClassName: "font-outfit font-bold text-black",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={<MdOutlineHistory />}
          label="History"
          showInMenu
          onClick={() => {
            dispatch(setHistoryDrawerOpen());
            dispatch(setHistoryDrawerId(params.id));
          }}
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<AiOutlineEdit />}
          label="Update"
          onClick={() => {
            dispatch(setBackdropOpen());
            pushRoute(`/bids/${params.id}`);
          }}
          disabled={params.row.status === "Approved"}
          showInMenu
        />,
      ],
    },
  ];

  return (
    <Box className="h-[25rem] bg-white">
      <DataGrid
        rows={tableData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        hideFooterSelectedRowCount
        pageSizeOptions={[5, 10, 20]}
        slots={{
          noRowsOverlay: EmptyDataDisplay,
          noResultsOverlay: NoSearchResultDataDisplay,
          toolbar: CustomToolBar,
        }}
        // onRowClick={(params: any) => {
        //   dispatch(setBackdropOpen());
        //   pushRoute(`/bids/${params.id}`);
        // }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default BidsTable;
