import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export const handler = async (event) => {
  console.log("Function started");

  try {
    await client.connect();
    console.log("Connected to database");

    const database = client.db('visitor_counter');
    const visitorsCollection = database.collection('visitors');

    const visitorData = await visitorsCollection.findOne({});
    console.log("Fetched visitor data:", visitorData);

    if (!visitorData) {
      await visitorsCollection.insertOne({ count: 0 });
      console.log("Inserted initial visitor data");
    }

    await visitorsCollection.updateOne({}, { $inc: { count: 1 } });
    console.log("Visitor count incremented");

    const updatedVisitorData = await visitorsCollection.findOne({});
    console.log("Updated visitor data:", updatedVisitorData);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ visits: updatedVisitorData.count }),
    };
  } catch (error) {
    console.error('Error updating counter:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Error updating counter' }),
    };
  } finally {
    await client.close();
  }
};
