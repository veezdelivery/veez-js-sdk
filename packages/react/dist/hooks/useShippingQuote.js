"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useShippingQuote = useShippingQuote;
const react_1 = require("react");
const provider_1 = require("../provider");
function useShippingQuote() {
    const client = (0, provider_1.useVeezClient)();
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const getQuote = async (params) => {
        try {
            setLoading(true);
            setError(null);
            const result = await client.getShippingQuote(params);
            setData(result);
            return result;
        }
        catch (err) {
            setError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    return { getQuote, data, loading, error };
}
