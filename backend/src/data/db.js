import { MongoClient } from 'mongodb';

export const withDB = async (operations, resp) => {
  try {
  const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
  const db = client.db('my-blog');

  await operations(db);

  client.close();
  } catch (error) {
    resp.status(500).json({ message: 'Error connecting to db' }, error);
    
  }
};
