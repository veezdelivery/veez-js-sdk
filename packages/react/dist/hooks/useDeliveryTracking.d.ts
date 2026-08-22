import { TrackingDetails } from '@veez/core';
export declare function useDeliveryTracking(reference: string | null, pollIntervalMs?: number): {
    data: TrackingDetails | null;
    loading: boolean;
    error: Error | null;
};
