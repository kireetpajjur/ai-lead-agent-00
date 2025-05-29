// server/utils/googleCalendar.js
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

module.exports = { oauth2Client, calendar };

async function createCalendarEvent({ summary, description, startTime, endTime }) {
  const event = {
    summary,
    description,
    start: { dateTime: startTime, timeZone: 'America/Chicago' },
    end: { dateTime: endTime, timeZone: 'America/Chicago' },
  };

  return calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });
}

module.exports = {
  oauth2Client,
  calendar,
  createCalendarEvent,
};
