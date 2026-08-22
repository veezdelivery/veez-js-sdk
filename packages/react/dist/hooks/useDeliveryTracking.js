"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDeliveryTracking = useDeliveryTracking;
const react_1 = require("react");
const provider_1 = require("../provider");
function useDeliveryTracking(reference, pollIntervalMs = 10000) {
    const client = (0, provider_1.useVeezClient)();
    const [data, setData] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!reference)
            return;
        let isMounted = true;
        let timer = null;
        const fetchTracking = async () => {
            try {
                if (!data)
                    setLoading(true);
                const res = await client.getTrackingDetails(reference);
                if (isMounted) {
                    setData(res);
                    setError(null);
                }
            }
            catch (err) {
                if (isMounted) {
                    setError(err);
                }
            }
            finally {
                if (isMounted)
                    setLoading(false);
            }
        };
        fetchTracking();
        if (pollIntervalMs > 0) {
            timer = setInterval(fetchTracking, pollIntervalMs);
        }
        return () => {
            isMounted = false;
            if (timer)
                clearInterval(timer);
        };
    }, [reference, pollIntervalMs, client]);
    return { data, loading, error };
}
