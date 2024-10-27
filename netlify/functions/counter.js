import fs from 'fs';
import path from 'path';

const FILE_PATH = path.join(process.cwd(), 'data/counter.json');

export const handler = async (event, context) => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      throw new Error('Counter file does not exist');
    }

    const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
    data.visits += 1;

    console.log('Updating visits count:', data.visits);
    
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ visits: data.visits }),
    };
  } catch (error) {
    console.error('Error updating counter:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to update counter' }),
    };
  }
};
