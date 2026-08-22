import { QuoteRequest, QuoteResponse } from '@veez/core';
export declare function useShippingQuote(): {
    getQuote: (params: QuoteRequest) => Promise<QuoteResponse>;
    data: QuoteResponse | null;
    loading: boolean;
    error: Error | null;
};
