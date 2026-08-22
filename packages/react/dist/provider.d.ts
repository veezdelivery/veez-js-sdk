import React, { ReactNode } from 'react';
import { VeezClient } from '@veez/core';
interface VeezProviderProps {
    apiKey: string;
    baseUrl?: string;
    children: ReactNode;
}
export declare const VeezProvider: React.FC<VeezProviderProps>;
export declare const useVeezClient: () => VeezClient;
export {};
