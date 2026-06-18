export interface ProductItem {
  id: string;
  quantity: number;
  item_price: number;
}

export interface UserInfo {
  user_id?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface CommonEventData extends UserInfo {
  currency?: string;
  value?: number;
  num_items?: number;
  coupon?: string;
}
