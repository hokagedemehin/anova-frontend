"use client";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import NoData from "@/public/NoData.png";
import NoSearch from "@/public/NoSearch.png";
import { PushRouter } from "@/shared/helpers/routers";
import { useAppDispatch } from "@/shared/store/store";
import {
  useAdminBids,
  useCreateBidHistory,
  useUpdateAdminBid,
} from "@/hooks/bidHooks";
import { MdOutlineHistory, MdOutlineVisibility } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TiCancelOutline } from "react-icons/ti";
import {
  setBackdropClose,
  setBackdropOpen,
} from "@/shared/store/slices/backdropSlice";
import {
  setHistoryDrawerIdAdmin,
  setHistoryDrawerOpenAdmin,
} from "@/shared/store/slices/historyDrawerSlice";
import { routes } from "@/shared/constants/routes";
import { enqueueSnackbar } from "notistack";
import { AxiosError, AxiosResponse } from "axios";
import { IUpdatedBidType } from "@/interface/bidsTypes";
import { useCloseBackdrop } from "@/hooks/backdrop";
import AdminBidHistory from "@/app/(authenticated)/admin/bids/UI/AdminBidHistory";
import { useQueryClient } from "@tanstack/react-query";

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

interface ITableData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  userId: number;
  quantity: string;
  price: string;
  status: string;
  start_time: string;
  close_time: string;
}

const AdminBidsPage = () => {
  useCloseBackdrop();

  const pushRoute = PushRouter();
  const dispatch = useAppDispatch();
  const { adminBidsData } = useAdminBids();
  const updateAdminBidMutation = useUpdateAdminBid();
  const createBidHistoryMutation = useCreateBidHistory();
  const queryClient = useQueryClient();
  const [tableData, setTableData] = useState<ITableData[]>([]);
  useEffect(() => {
    const temp_arr: ITableData[] = [];
    if (adminBidsData) {
      adminBidsData.map((item: any) => {
        temp_arr.push({
          id: item?.id,
          first_name: item?.user?.first_name,
          last_name: item?.user?.last_name,
          email: item?.user?.email,
          userId: item?.user?.id,
          quantity: item?.quantity,
          price: item?.price,
          status: item?.status,
          start_time: item?.start_time,
          close_time: item?.close_time,
        });
      });
      setTableData(temp_arr);
    }

    return () => {
      setTableData([]);
    };
  }, [adminBidsData]);

  const CustomToolBar = () => {
    return (
      <GridToolbarContainer className="flex items-center justify-end">
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
  };

  // ####### ACCEPT BID #######
  const handleAcceptBid = (id: string, user: number) => {
    try {
      dispatch(setBackdropOpen());
      const form_data = {
        id,
        status: "Approved",
        user,
      };
      updateAdminBidMutation.mutate(form_data, {
        onSuccess: (data: AxiosResponse<IUpdatedBidType>) => {
          queryClient.invalidateQueries({
            queryKey: ["adminBids", "singleAdminBid"],
          });
          const bid_history_data = {
            bid: data?.data?.id,
            name: "Bid approved",
            status: "Approved",
            quantity: data?.data?.quantity,
            start_time: data?.data?.start_time,
            close_time: data?.data?.close_time,
            price: data?.data?.price,
            user: data?.data?.user,
          };
          createBidHistoryMutation.mutate(bid_history_data, {
            onSuccess: () => {
              dispatch(setBackdropClose());
              enqueueSnackbar("Bid approved successfully", {
                variant: "success",
              });
              queryClient.invalidateQueries({
                queryKey: ["singleAdminBid", "adminBidHistory"],
              });
            },
            onError: (error) => {
              dispatch(setBackdropClose());
              if (error instanceof AxiosError) {
                if (error?.response?.data?.message) {
                  enqueueSnackbar(error?.response?.data?.message, {
                    variant: "error",
                  });
                  return;
                }
                enqueueSnackbar(error?.response?.data?.detail, {
                  variant: "error",
                });
              }
            },
          });
        },
        onError: (error) => {
          dispatch(setBackdropClose());
          if (error instanceof AxiosError) {
            if (error?.response?.data?.message) {
              enqueueSnackbar(error?.response?.data?.message, {
                variant: "error",
              });
              return;
            }
            enqueueSnackbar(error?.response?.data?.detail, {
              variant: "error",
            });
          }
        },
      });
    } catch (error) {
      dispatch(setBackdropClose());
      enqueueSnackbar("Something went wrong, please try again later.", {
        variant: "error",
      });
    }
  };

  // ############ REASON FOR REJECTION ############
  const [openReasonDialog, setOpenReasonDialog] = useState(false);
  const [selectedBid, setSelectedBid] = useState<any>({});
  const reasonRef = useRef<any>(null);

  const handleOpenReasonDialog = () => {
    setOpenReasonDialog(true);
  };
  const handleCloseReasonDialog = () => {
    setOpenReasonDialog(false);
    setSelectedBid({});
  };

  const handleSelectedBid = (bid: any) => {
    setSelectedBid(bid);
  };

  // ########### REJECT BID ###########
  const handleRejectBid = (id: string, user: number) => {
    try {
      dispatch(setBackdropOpen());
      const form_data = {
        id,
        status: "Rejected",
        reason: reasonRef.current?.value,
        user,
      };
      updateAdminBidMutation.mutate(form_data, {
        onSuccess: (data: AxiosResponse<IUpdatedBidType>) => {
          queryClient.invalidateQueries({
            queryKey: ["adminBids", "singleAdminBid"],
          });
          const bid_history_data = {
            bid: data?.data?.id,
            name: "Bid rejected",
            status: "Rejected",
            reason: reasonRef.current?.value,
            quantity: data?.data?.quantity,
            start_time: data?.data?.start_time,
            close_time: data?.data?.close_time,
            price: data?.data?.price,
            user: data?.data?.user,
          };
          createBidHistoryMutation.mutate(bid_history_data, {
            onSuccess: () => {
              dispatch(setBackdropClose());
              enqueueSnackbar("Bid rejected successfully", {
                variant: "success",
              });
              queryClient.invalidateQueries({
                queryKey: ["singleAdminBid", "adminBidHistory"],
              });
            },
            onError: (error) => {
              dispatch(setBackdropClose());
              if (error instanceof AxiosError) {
                if (error?.response?.data?.message) {
                  enqueueSnackbar(error?.response?.data?.message, {
                    variant: "error",
                  });
                  return;
                }
                enqueueSnackbar(error?.response?.data?.detail, {
                  variant: "error",
                });
              }
            },
          });
        },
        onError: (error) => {
          dispatch(setBackdropClose());
          if (error instanceof AxiosError) {
            if (error?.response?.data?.message) {
              enqueueSnackbar(error?.response?.data?.message, {
                variant: "error",
              });
              return;
            }
            enqueueSnackbar(error?.response?.data?.detail, {
              variant: "error",
            });
          }
        },
      });
    } catch (error) {
      dispatch(setBackdropClose());
      enqueueSnackbar("Something went wrong, please try again later.", {
        variant: "error",
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      renderCell: ValueFormatter,
      headerClassName: "font-outfit font-bold text-black",
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 150,
      renderCell: ValueFormatter,
      headerClassName: "font-outfit font-bold text-black",
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      renderCell: ValueFormatter,
      headerClassName: "font-outfit font-bold text-black",
    },
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
            dispatch(setHistoryDrawerOpenAdmin());
            dispatch(setHistoryDrawerIdAdmin(params.id));
          }}
          className="font-outfit text-black"
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<IoMdCheckmarkCircleOutline className="text-emerald-500" />}
          label="Accept"
          onClick={() => {
            handleAcceptBid(params.id as string, params.row.userId as number);
          }}
          disabled={params.row.status === "Approved"}
          showInMenu
          className="font-outfit text-emerald-500"
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<TiCancelOutline className="text-red-500" />}
          label="Reject"
          onClick={() => {
            // handleRejectBid(params.id as string, params.row.userId as number);
            handleOpenReasonDialog();
            handleSelectedBid(params.row);
          }}
          disabled={params.row.status === "Approved"}
          showInMenu
          className="font-outfit text-red-500"
        />,
        <GridActionsCellItem
          key={params.id}
          icon={<MdOutlineVisibility className="text-blue-500" />}
          label="View"
          onClick={() => {
            dispatch(setBackdropOpen());
            pushRoute(`${routes.admin_bids_page}/${params.id}`);
          }}
          showInMenu
          className="font-outfit text-blue-500"
        />,
      ],
    },
  ];

  return (
    <div className="">
      <Typography
        variant="h5"
        className="font-outfit pb-5 font-semibold text-black"
      >
        All Bids
      </Typography>
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
          // onRowClick={(params) => {
          //   dispatch(setBackdropOpen());
          //   pushRoute(`${routes.admin_bids_page}/${params.id}`);
          // }}
          disableRowSelectionOnClick
        />
      </Box>
      <AdminBidHistory />
      <Dialog
        open={openReasonDialog}
        onClose={handleCloseReasonDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="font-outfit font-bold text-black">
          Reason for rejection
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="font-outfit pb-4 text-gray-700">
            Please enter the reason for rejecting the bid.
          </DialogContentText>
          <TextField
            autoFocus
            variant="outlined"
            required
            id="reason"
            name="reason"
            label="Reason"
            multiline
            rows={4}
            className="w-full"
            inputRef={reasonRef}
            onChange={(e) => {
              reasonRef.current.value = e.target.value;
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseReasonDialog}
            className="font-outfit normal-case text-red-500"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleCloseReasonDialog();
              handleRejectBid(
                selectedBid?.id as string,
                selectedBid?.userId as number,
              );
            }}
            className="font-outfit normal-case text-emerald-500"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminBidsPage;
