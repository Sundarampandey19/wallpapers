const express = require('express');
const app = express();
const cors = require("cors")
const port = 3002;
app.use(cors())


app.get('/api/wallhaven', async (req, res) => {
  try {
    const response = await fetch('https://wallhaven.cc/api/v1/search');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
