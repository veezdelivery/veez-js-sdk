import { useState } from 'react';
import { useVeezClient } from '../provider';
import { QuoteRequest, QuoteResponse } from '@veez/core';

export function useShippingQuote() {
  const client = useVeezClient();
  const [data, setData] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const getQuote = async (params: QuoteRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await client.getShippingQuote(params);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { getQuote, data, loading, error };
}
