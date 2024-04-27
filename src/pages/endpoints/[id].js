// pages/edit-endpoint/[id].js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import '../../app/globals.css'

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export default function EditEndpoint() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    path: '',
    method: '',
    request: '',
    response: '',
    statusCode: '',
  });

  useEffect(() => {
    const fetchEndpoint = async () => {
      try {
        const response = await axios.get(`/api/endpoints/${id}`);
        const endpointData = response.data;
        setFormData({
          path: endpointData.path,
          method: endpointData.method,
          request: endpointData.request,
          response: endpointData.response,
          statusCode: endpointData.statusCode.toString(), // Convert to string for input value
        });
      } catch (error) {
        console.error('Error fetching endpoint:', error);
      }
    };

    if (id) {
      fetchEndpoint();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/endpoints/${id}`, formData);
      // Redirect to endpoint list page after successful update
      router.push('/endpoints-list');
    } catch (error) {
      console.error('Error updating endpoint:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Endpoint</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="path"
          value={formData.path}
          placeholder="Endpoint Path"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <select name="method" value={formData.method} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500">
          {methods.map(method => <option value={method}>{method}</option>)}
        </select>
        <textarea
          name="request"
          value={formData.request}
          placeholder="Request JSON"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>
        <textarea
          name="response"
          value={formData.response}
          placeholder="Response JSON"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>
        <input
          type="number"
          name="statusCode"
          value={formData.statusCode}
          placeholder="Status Code"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 focus:outline-none"
        >
          Update Endpoint
        </button>
      </form>
    </div>
  );
}
