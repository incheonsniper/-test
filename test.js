const { getFlightStatus } = require('./Flight_Operation_Information_HTTPS');
const c = require('ansi-colors');

getFlightStatus()
  .then(data => {
    console.log(JSON.stringify(c.redBright(data), null, 2));
  })
  .catch(err => {
    console.error('Error:', err);
  });
