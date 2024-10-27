import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export const handler = async (event) => {
  try {
    await client.connect();
    const database = client.db('visitor_counter');
    const visitorsCollection = database.collection('visitors');

    const visitorData = await visitorsCollection.findOne({});

    if (!visitorData) {
      await visitorsCollection.insertOne({ count: 0 });
    }

    await visitorsCollection.updateOne({}, { $inc: { count: 1 } });

    const updatedVisitorData = await visitorsCollection.findOne({});
    return {
      statusCode: 200,
      body: JSON.stringify({ visits: updatedVisitorData.count }),
    };
  } catch (error) {
    console.error('Error updating counter:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error updating counter' }),
    };
  } finally {
    await client.close();
  }
};
