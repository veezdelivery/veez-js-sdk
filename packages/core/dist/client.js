"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeezClient = void 0;
class VeezClient {
    constructor(config) {
        if (!config.apiKey) {
            throw new Error("VeezClient: Se requiere apiKey para instanciar el SDK.");
        }
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl || "https://us-central1-veezdelivery.cloudfunctions.net/api/v1";
    }
    async request(endpoint, options = {}) {
        const headers = {
            "Content-Type": "application/json",
            "X-API-Key": this.apiKey,
            ...(options.headers || {})
        };
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`[VeezAPI Error ${response.status}]: ${errorData.error?.message || response.statusText}`);
        }
        return response.json();
    }
    // --- COTIZACIÓN DE ENVÍOS ---
    async getShippingQuote(params) {
        return this.request('/shipping/quote', {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }
    // --- PEDIDOS ---
    async createOrder(params) {
        const headers = {};
        if (params.idempotency_key) {
            headers['idempotency-key'] = params.idempotency_key;
        }
        return this.request('/orders', {
            method: 'POST',
            headers,
            body: JSON.stringify(params)
        });
    }
    async getOrder(id) {
        return this.request(`/orders/${id}`, {
            method: 'GET'
        });
    }
    async cancelOrder(id, reason) {
        return this.request(`/orders/${id}/cancel`, {
            method: 'POST',
            body: JSON.stringify({ reason })
        });
    }
    // --- SEGUIMIENTO ---
    async getTrackingDetails(reference) {
        return this.request(`/tracking/${reference}`, {
            method: 'GET'
        });
    }
}
exports.VeezClient = VeezClient;
