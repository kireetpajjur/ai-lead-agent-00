// server/routes/auth.js
const express = require('express');
const { google } = require('googleapis');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.SERVER_URL}/auth/google/callback`
);

// Route to start OAuth flow
router.get('/google', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/calendar.events'];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
});

// Callback route
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Save tokens to DB or session (placeholder)
  console.log('OAuth tokens:', tokens);

  res.send('Google Calendar connected successfully!');
});

module.exports = router;
