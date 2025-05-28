
const express = require('express');
const dotenv = require('dotenv');
const leadRoutes = require('./routes/leads');

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/leads', leadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
