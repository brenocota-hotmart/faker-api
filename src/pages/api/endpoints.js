// pages/api/endpoints.js
import Endpoint from '../../models/Endpoint';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const endpoints = await Endpoint.findAll();
    res.status(200).json(endpoints);
  } catch (error) {
    console.error('Error fetching endpoints:', error);
    res.status(500).json({ error: 'Server Error' });
  }
}
