declare const process: { env: Record<string, string | undefined> };

import { VeezClient } from '@veez/core';

export * from '@veez/core';

export class VeezNodeClient extends VeezClient {
  constructor(apiKey?: string) {
    const key = apiKey || process.env.VEEZ_API_KEY || process.env.VEEZ_SECRET_KEY;
    if (!key) {
      throw new Error("VeezNodeClient: No se proporcionó API Key ni se encontró 'VEEZ_API_KEY' en las variables de entorno de Node.js.");
    }
    super({ apiKey: key });
  }
}
