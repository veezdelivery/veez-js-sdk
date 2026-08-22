import { VeezClientConfig, QuoteRequest, QuoteResponse, CreateOrderRequest, OrderResponse, TrackingDetails } from './types';
export declare class VeezClient {
    private apiKey;
    private baseUrl;
    constructor(config: VeezClientConfig);
    private request;
    getShippingQuote(params: QuoteRequest): Promise<QuoteResponse>;
    createOrder(params: CreateOrderRequest): Promise<OrderResponse>;
    getOrder(id: string): Promise<OrderResponse>;
    cancelOrder(id: string, reason?: string): Promise<{
        success: boolean;
        booking_id: string;
        status: string;
    }>;
    getTrackingDetails(reference: string): Promise<TrackingDetails>;
}
