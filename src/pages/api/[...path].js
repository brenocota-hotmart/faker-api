import Endpoint from '../../models/Endpoint';

export default async function handler(req, res) {
  const { method, query } = req;
  const path = query.path.join('/');

  try {
    const endpoint = await Endpoint.findOne({ where: { path, method  } });

    if (!endpoint) {
      return res.status(404).json({ error: 'Endpoint not found' });
    }

    if (method !== endpoint.method) {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    res.status(endpoint.statusCode).json(JSON.parse(endpoint.response));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}
