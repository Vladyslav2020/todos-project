import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        try{
            setLoading(true);
            if (body){
                body = JSON.stringify(body);
                headers['Content-Type'] = "application/json";
            }
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();
            if (response.status === 401)
                throw new Error("No authorization");
            if (!response.ok){
                throw new Error(data.message || "Something went wrong");
            }
            setLoading(false);
            return data;
        }
        catch(err){
            setLoading(false);
            setError(err);
            throw err;
        }
    }, []);
    const cleanErrors = useCallback(() => setError(null), []);
    return {loading, request, error, cleanErrors};
};