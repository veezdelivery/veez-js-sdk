import { useState, useEffect } from 'react';
import { useVeezClient } from '../provider';
import { TrackingDetails } from '@veez/core';

export function useDeliveryTracking(reference: string | null, pollIntervalMs = 10000) {
  const client = useVeezClient();
  const [data, setData] = useState<TrackingDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!reference) return;

    let isMounted = true;
    let timer: ReturnType<typeof setInterval> | null = null;

    const fetchTracking = async () => {
      try {
        if (!data) setLoading(true);
        const res = await client.getTrackingDetails(reference);
        if (isMounted) {
          setData(res);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTracking();

    if (pollIntervalMs > 0) {
      timer = setInterval(fetchTracking, pollIntervalMs);
    }

    return () => {
      isMounted = false;
      if (timer) clearInterval(timer);
    };
  }, [reference, pollIntervalMs, client]);

  return { data, loading, error };
}
