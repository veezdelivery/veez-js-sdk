export interface LatLng {
  lat: number;
  lng: number;
}

export interface Address {
  address: string;
  coords?: LatLng;
  number?: string;
  instructions?: string;
}

export interface QuoteRequest {
  origin: Address;
  destination: Address;
  package_type?: string;
  total_weight_kg?: number;
  prep_time_mins?: number;
}

export interface QuoteResponse {
  success: boolean;
  is_test: boolean;
  price: number;
  currency: string;
  estimated_time_mins: number;
  vehicle_type: string;
}

export interface CreateOrderRequest {
  pickup: Address;
  dropoff: Address;
  customer_name: string;
  customer_phone: string;
  customer_rut?: string;
  reference_id?: string;
  items?: Array<{ name: string; quantity: number; price?: number }>;
  idempotency_key?: string;
}

export interface OrderResponse {
  success: boolean;
  booking_id: string;
  tracking_url: string;
  status: string;
  is_duplicate?: boolean;
}

export interface TrackingDetails {
  success: boolean;
  reference: string;
  status: string;
  driver?: {
    name: string;
    phone: string;
    location?: LatLng;
  };
}

export interface VeezClientConfig {
  apiKey: string;
  baseUrl?: string;
  isTestMode?: boolean;
}
