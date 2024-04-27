// pages/endpoints-list.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import '../app/globals.css'

export default function EndpointsList() {
  const [endpoints, setEndpoints] = useState([]);

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const response = await axios.get('/api/endpoints');
        setEndpoints(response.data);
      } catch (error) {
        console.error('Error fetching endpoints:', error);
      }
    };

    fetchEndpoints();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/endpoints/${id}`);
      setEndpoints(endpoints.filter((endpoint) => endpoint.id !== id));
    } catch (error) {
      console.error('Error deleting endpoint:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Endpoints</h1>
      {endpoints.map((endpoint) => (
        <div key={endpoint.id} className="border rounded p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg font-bold">{endpoint.method} {endpoint.path}</h2>
            </div>
            <div className="flex space-x-2">
              <Link href={`/endpoints/${endpoint.id}`}>
                <span className="text-blue-500 hover:text-blue-700">Edit</span>
              </Link>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(endpoint.id)}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="mb-2">
            <h3 className="text-lg font-bold">Request</h3>
            <pre className="bg-gray-100 p-2 rounded">{endpoint.request}</pre>
          </div>
          <div>
            <h3 className="text-lg font-bold">Response</h3>
            <pre className="bg-gray-100 p-2 rounded">{endpoint.response}</pre>
          </div>
        </div>
      ))}
    </div>
  );
}
