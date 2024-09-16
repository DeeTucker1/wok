npm init -y
npm install express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON request bodies

// Temporary in-memory job listings
let jobListings = [
  { id: 1, title: 'Logo Design Needed', description: 'Create a modern logo for tech startup', location: 'Remote', budget: '$500' },
  { id: 2, title: 'House Painting', description: 'Paint 3-bedroom house exterior', location: 'New York, NY', budget: '$1000' },
  { id: 3, title: 'Web Developer for E-commerce Site', description: 'Build responsive online store', location: 'Remote', budget: '$3000' },
];

// Get all job listings
app.get('/api/jobs', (req, res) => {
  res.json(jobListings);
});

// Get a single job listing by ID
app.get('/api/jobs/:id', (req, res) => {
  const job = jobListings.find((job) => job.id === parseInt(req.params.id));
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});

// Add a new job listing
app.post('/api/jobs', (req, res) => {
  const { title, description, location, budget } = req.body;
  const newJob = {
    id: jobListings.length + 1,
    title,
    description,
    location,
    budget,
  };
  jobListings.push(newJob);
  res.status(201).json(newJob);
});

// Update an existing job listing
app.put('/api/jobs/:id', (req, res) => {
  const job = jobListings.find((job) => job.id === parseInt(req.params.id));
  if (!job) return res.status(404).json({ message: 'Job not found' });

  const { title, description, location, budget } = req.body;
  job.title = title || job.title;
  job.description = description || job.description;
  job.location = location || job.location;
  job.budget = budget || job.budget;

  res.json(job);
});

// Delete a job listing
app.delete('/api/jobs/:id', (req, res) => {
  jobListings = jobListings.filter((job) => job.id !== parseInt(req.params.id));
  res.json({ message: 'Job deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
