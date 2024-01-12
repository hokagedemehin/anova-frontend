export interface ICreateBidTypes {
  quantity: number;
  start_time: string;
  close_time: string;
  price: number;
}

export interface IBid {
  id: number;
  quantity: number;
  start_time: string;
  close_time: string;
  price: number;
  created_at: string;
  updated_at: string;
}

export interface ICreatedBidType {
  id: number;
  quantity: string;
  start_time: string;
  close_time: string;
  price: string;
  created_at: string;
  updated_at: string;
  user: number;
}

export interface IUpdatedBidType {
  id: number;
  quantity: string;
  start_time: string;
  close_time: string;
  price: string;
  created_at: string;
  updated_at: string;
  user: number;
}

// BIDS HISTORY
export interface ICreateBidHistoryType {
  bid: number;
  user: number;
  quantity: string;
  price: string;
  start_time: string;
  close_time: string;
}

export interface ISingleHistory {
  id: number;
  bid: number;
  user: number;
  quantity: string;
  name?: string;
  reason?: string;
  status: string;
  price: string;
  start_time: string;
  close_time: string;
  created_at: string;
  updated_at: string;
}
