const { getFlightStatus } = require('./Flight_Operation_Information_HTTPS');

getFlightStatus()
  .then(data => {
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(err => {
    console.error('Error:', err);
  });
