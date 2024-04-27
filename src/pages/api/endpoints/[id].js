import Endpoint from '../../../models/Endpoint';

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      try {
        const endpoint = await Endpoint.findByPk(id);
        if (!endpoint) {
          return res.status(404).json({ error: 'Endpoint not found' });
        }
        res.status(200).json(endpoint);
      } catch (error) {
        console.error('Error fetching endpoint:', error);
        res.status(500).json({ error: 'Server Error' });
      }
      break;
    case 'PUT':
      try {
        const { path, method, request, response, statusCode } = req.body;
        const updatedEndpoint = await Endpoint.update(
          { path, method, request, response, statusCode },
          { where: { id } }
        );
        res.status(200).json(updatedEndpoint);
      } catch (error) {
        console.error('Error updating endpoint:', error);
        res.status(500).json({ error: 'Server Error' });
      }
      break;
    case 'DELETE':
      try {
        const deletedCount = await Endpoint.destroy({ where: { id } });
        if (deletedCount === 0) {
          return res.status(404).json({ error: 'Endpoint not found' });
        }
        res.status(200).json({ message: 'Endpoint deleted successfully' });
      } catch (error) {
        console.error('Error deleting endpoint:', error);
        res.status(500).json({ error: 'Server Error' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}