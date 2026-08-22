import React, { createContext, useContext, ReactNode } from 'react';
import { VeezClient } from '@veez/core';

interface VeezProviderProps {
  apiKey: string;
  baseUrl?: string;
  children: ReactNode;
}

const VeezContext = createContext<VeezClient | null>(null);

export const VeezProvider: React.FC<VeezProviderProps> = ({ apiKey, baseUrl, children }) => {
  const client = new VeezClient({ apiKey, baseUrl });

  return (
    <VeezContext.Provider value={client}>
      {children}
    </VeezContext.Provider>
  );
};

export const useVeezClient = (): VeezClient => {
  const context = useContext(VeezContext);
  if (!context) {
    throw new Error('useVeezClient debe usarse dentro de un VeezProvider');
  }
  return context;
};
