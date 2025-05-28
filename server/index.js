
const express = require('express');
const dotenv = require('dotenv');
const leadRoutes = require('./routes/leads');

dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the AI Lead Agent!.");
});

module.exports = app;
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
