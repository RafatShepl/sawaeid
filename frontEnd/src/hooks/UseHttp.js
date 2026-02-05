// src/hooks/useHttp.js
import { useState, useCallback } from 'react';
import api from '../api/api.js';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const request = useCallback(async (config) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
      const response = await api(config);
      // Only set message if it exists in the response
      if (response.data?.message) {
        setMessage(response.data.message);
      }
      return response.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Network Error";
      setError(msg);
      // We throw so the calling function (like login) knows it failed
      throw err;
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependencies ensure 'request' is stable

  // Wrap helpers in useMemo or just define them simply
  const get = useCallback((url, params) => request({ method: 'GET', url, params }), [request]);
  const post = useCallback((url, data) => request({ method: 'POST', url, data }), [request]);
  const del = useCallback((url) => request({ method: 'DELETE', url }), [request]);

  return { loading, error, message, setError, setMessage, setLoading, get, post, del };
};