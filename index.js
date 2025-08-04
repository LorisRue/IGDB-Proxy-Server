require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const UID = process.env.USER_ID || (() => { throw new Error('USER_ID is not set in .env'); })();
const TOKEN = process.env.TOKEN || (() => { throw new Error('TOKEN is not set in .env'); })();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('IGDB API Proxy is running');
});

app.post('/fetchIGDBData', async (req, res) => {
    const { ApiNode, Query } = req.body;
    const data = await fetchData(ApiNode, Query);

    if (data instanceof Error) {
        console.error('Error fetching data:', data);
        return res.status(500).send({ error: 'Failed to fetch data from IGDB' });
    }

    res.status(200).send(data)
});

app.get('*', (req, res) => {
    res.status(404).send({ error: 'Endpoint not found' });
});

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)


// API calls
async function fetchData(apinode, query) {
    try {
      const response = await fetch(
        `https://api.igdb.com/v4/${apinode}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Client-ID': UID,
            'Authorization': `Bearer ${TOKEN}`,
          },
          body: query
        }
      );
  
      const data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  }