const https = require('https');

const options = {
  hostname: 'restv2.fireant.vn',
  path: '/symbols/FPT/financial-data?type=Q&count=5',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDc3MDg5NTA2LCJuYmYiOjE3NzcwODk1MDYsImNsaWVudF9pZCI6ImZpcmVhbnQud2ViIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIyNTAyZDMyMi0yNWM0LTQ3MjUtOGUyYS1hZTVmZjc2ZDYzMGYiLCJhdXRoX3RpbWUiOjE3NzcwODk0NzksImlkcCI6Imlkc3J2IiwibmFtZSI6ImduMTQ1MTNAZ21haWwuY29tIiwic2VjdXJpdHlfc3RhbXAiOiI0YmRlN2Y1MC01NzY2LTQ5ZjEtODQ5ZS02NWU4ZWRhYmJiN2EiLCJqdGkiOiI1NTdmM2EwMjQ1ZDNlMDU5NDQ5YTg3NDhkMGNhZWVkNiIsImFtciI6WyJwYXNzd29yZCJdfQ.SRaT4E0pgLhinp2LMxg5Nuizpx8owQWHVbZdxOLbYPwJcVyed6eL4FNMRoJ7bsOu3kehdaYEySZ2rUbcbtY-ghRMQ2XFPccVsUSbWJjIdD9gD1nnsD4HQcPOmFy0nxvWaJo_zW0UmyEm1KenJVjrXEJF5YvoeWVW6hEqx11lsk6oCzVdG9MFNZFMENUWbJcjy2V3zqQpJb5y_6_fKZGendH_T9dBHo_4cm5QozuDBGQTX7jeAYinYMDcJNMI8Ou26yevlCveXYkzIU5lxtSfN0DjUdWGdhqy0rn0P9yDRwT8qmyAeFE3ryCFpt0dFvOQbN_qPvM9nEQ_3b4sGeyirg'
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    console.log(Object.keys(json[0]).slice(0, 15));
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();
