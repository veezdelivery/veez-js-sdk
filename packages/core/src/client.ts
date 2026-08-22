import {
  VeezClientConfig,
  QuoteRequest,
  QuoteResponse,
  CreateOrderRequest,
  OrderResponse,
  TrackingDetails
} from './types';

export class VeezClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: VeezClientConfig) {
    if (!config.apiKey) {
      throw new Error("VeezClient: Se requiere apiKey para instanciar el SDK.");
    }
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || "https://us-central1-veezdelivery.cloudfunctions.net/api/v1";
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "X-API-Key": this.apiKey,
      ...(options.headers as Record<string, string> || {})
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`[VeezAPI Error ${response.status}]: ${errorData.error?.message || response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  // --- COTIZACIÓN DE ENVÍOS ---
  public async getShippingQuote(params: QuoteRequest): Promise<QuoteResponse> {
    return this.request<QuoteResponse>('/shipping/quote', {
      method: 'POST',
      body: JSON.stringify(params)
    });
  }

  // --- PEDIDOS ---
  public async createOrder(params: CreateOrderRequest): Promise<OrderResponse> {
    const headers: Record<string, string> = {};
    if (params.idempotency_key) {
      headers['idempotency-key'] = params.idempotency_key;
    }

    return this.request<OrderResponse>('/orders', {
      method: 'POST',
      headers,
      body: JSON.stringify(params)
    });
  }

  public async getOrder(id: string): Promise<OrderResponse> {
    return this.request<OrderResponse>(`/orders/${id}`, {
      method: 'GET'
    });
  }

  public async cancelOrder(id: string, reason?: string): Promise<{ success: boolean; booking_id: string; status: string }> {
    return this.request<{ success: boolean; booking_id: string; status: string }>(`/orders/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    });
  }

  // --- SEGUIMIENTO ---
  public async getTrackingDetails(reference: string): Promise<TrackingDetails> {
    return this.request<TrackingDetails>(`/tracking/${reference}`, {
      method: 'GET'
    });
  }
}
