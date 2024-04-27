import Endpoint from '../../models/Endpoint';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { path, method, request, response, statusCode } = req.body;

  try {
    const newEndpoint = await Endpoint.create({
      path,
      method,
      request,
      response,
      statusCode,
    });

    res.status(201).json(newEndpoint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}
