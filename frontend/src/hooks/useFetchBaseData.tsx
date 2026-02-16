import React from 'react'
import { useState, useEffect } from 'react';

const useFetchBaseData = (endpointUrl) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!endpointUrl) {
            setError('No endpointUrl provided');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(endpointUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpointUrl]);


  return {
    data,
    loading,
    error
  }
}   


export default useFetchBaseData
