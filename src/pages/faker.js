
import { useState } from 'react';
import axios from 'axios';

import '../app/globals.css'

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

export default function Faker() {
  const [formData, setFormData] = useState({
    path: '',
    method: 'GET',
    request: '',
    response: '',
    statusCode: 200,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/registerEndpoint', formData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (

    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register Fake Endpoints</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="path"
          placeholder="Endpoint Path"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <textarea
          name="request"
          placeholder="Request JSON"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>
        <textarea
          name="response"
          placeholder="Response JSON"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
        ></textarea>
        <select name="method" onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500">
          {methods.map(method => <option value={method}>{method}</option>)}
        </select>
        <input
          type="number"
          name="statusCode"
          placeholder="Status Code"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2 focus:outline-none"
        >
          Register Endpoint
        </button>
      </form>
    </div>
  );
}