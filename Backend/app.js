const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const headlines = [
  "Discover Why [NAME] is [LOCATION]'s Favorite Local Spot!",
  "How [NAME] is Revolutionizing Service in [LOCATION]",
  "[NAME]: The Best Choice in [LOCATION] This Year!",
  "Why Everyone in [LOCATION] is Talking About [NAME]",
  "Top Reasons to Visit [NAME] in [LOCATION] Today"
];

function getRandomHeadline(name, location) {
  const random = headlines[Math.floor(Math.random() * headlines.length)];
  return random.replace("[NAME]", name).replace("[LOCATION]", location);
}

app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
      res.status(400).json({ 
        error: "Name and location are required" 
    });
  }

  const data = {
    rating: (Math.random() * 1.5 + 3.5).toFixed(1), // e.g. 3.5 to 5.0
    reviews: Math.floor(Math.random() * 500 + 20),
    headline: getRandomHeadline(name, location)
  };

  res.json(data);
});

app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  if (!name || !location) {
     res.status(400).json({ 
        error: "Name and location are required"
     });
  }

  res.json({ 
    headline: getRandomHeadline(name, location) 
});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
