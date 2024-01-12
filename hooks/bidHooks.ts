import { ICreateBidHistoryType, ICreateBidTypes } from "@/interface/bidsTypes";
import { routes } from "@/shared/constants/routes";
import {
  get_requests,
  post_requests,
  put_requests,
} from "@/shared/helpers/axios_helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";

export const useCreateBid = () => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const createBidMutation = useMutation({
    mutationFn: (data: ICreateBidTypes) =>
      post_requests(routes.bids, data, token),
  });

  return createBidMutation;
};

export const useBids = () => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bids", token],
    queryFn: () => get_requests(routes.bids_list, token),
    enabled: !!token,
    // refetchInterval: 2000,
  });

  return {
    bidsData: data?.data,
    isLoading,
    isError,
  };
};

export const useCreateBidHistory = () => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const createBidHistoryMutation = useMutation({
    mutationFn: (data: ICreateBidHistoryType) =>
      post_requests(routes.bid_history, data, token),
  });

  return createBidHistoryMutation;
};

export const useBidHistory = (id: string | string[]) => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bidHistory", token, id],
    queryFn: () => get_requests(`${routes.bid_history_list}${id}/`, token),
    enabled: !!id,
    // refetchInterval: 2000,
  });

  return {
    bidHistoryData: data?.data,
    isLoading,
    isError,
  };
};

export const useSingleBid = (id: string | string[]) => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["singleBid", token, id],
    queryFn: () => get_requests(`${routes.bids}${id}/`, token),
    enabled: !!token,
  });

  return {
    singleBidData: data?.data,
    isLoading,
    isError,
  };
};

export const useUpdateBid = () => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const updateBidMutation = useMutation({
    mutationFn: (data: any) =>
      put_requests(`${routes.bids}${data?.id}/`, data, token),
  });

  return updateBidMutation;
};

export const useAdminBids = () => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminBids", token],
    queryFn: () => get_requests(routes.admin_bids, token),
    enabled: !!token,
    // refetchInterval: 2000,
  });

  return {
    adminBidsData: data?.data,
    isLoading,
    isError,
  };
};

export const useSingleAdminBid = (id: string | string[]) => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["singleAdminBid", token, id],
    queryFn: () => get_requests(`${routes.admin_bids}${id}/`, token),
    enabled: !!id,
  });

  return {
    singleAdminBidData: data?.data,
    isLoading,
    isError,
  };
};

export const useUpdateAdminBid = () => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const updateAdminBidMutation = useMutation({
    mutationFn: (data: any) =>
      put_requests(`${routes.admin_bids}${data?.id}/`, data, token),
  });

  return updateAdminBidMutation;
};

export const useAdminBidHistory = (id: string | string[]) => {
  const cookies = parseCookies();
  const token = cookies["anova_token"];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminBidHistory", token, id],
    queryFn: () => get_requests(`${routes.admin_bid_history}${id}/`, token),
    enabled: !!id,
    // refetchInterval: 2000,
  });

  return {
    adminBidHistoryData: data?.data,
    isLoading,
    isError,
  };
};

// export const useAdminBidHistoryList = () => {
//   const cookies = parseCookies();
//   const token = cookies["anova_token"];
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["adminBidHistoryList", token],
//     queryFn: () => get_requests(routes.admin_bid_history, token),
//     enabled: !!token,
//   });

//   return {
//     adminBidHistoryListData: data?.data,
//     isLoading,
//     isError,
//   };
// };
