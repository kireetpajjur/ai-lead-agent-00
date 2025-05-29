
const express = require('express');
const dotenv = require('dotenv');
const leadRoutes = require('./routes/leads');
const { google } = require('googleapis');
const twilio = require('twilio');
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const { oauth2Client } = require('./utils/googleCalender');
const router = express.Router();
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);
app.use('/auth', require('./routes/auth'));


router.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code parameter');

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Save tokens to DB or file (TEMP: in-memory or log)
    console.log('Tokens:', tokens);

    res.send('Calendar integration successful! You can close this tab.');
  } catch (err) {
    console.error('OAuth Error:', err);
    res.status(500).send('OAuth failed');
  }
});

module.exports = router;

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

app.post('/api/leads', async (req, res) => {
  const { name, phone, zip, issue } = req.body;
  try {
    const newLead = new Lead({ name, phone, zip, issue });
    await newLead.save();
    res.status(200).json({ message: 'Lead saved' });
  } catch (err) {
    res.status(500).json({ error: 'Error saving lead' });
  }
});

app.post('/api/book', async (req, res) => {
  const { name, phone, zip, issue, datetime } = req.body;
  try {
    const booking = new Booking({ name, phone, zip, issue, datetime });
    await booking.save();

    // Send SMS using Twilio
    await twilioClient.messages.create({
      body: `Hi ${name}, your appointment for "${issue}" has been booked at ${datetime}.`,
      from: process.env.TWILIO_PHONE,
      to: phone
    });

    // Google Calendar sync (placeholder for now)
    // await calendar.events.insert(...)

    res.status(200).json({ message: 'Appointment booked and SMS sent' });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

