const axios = require('axios');
const xml2js = require('xml2js');
const BasicKey = require('./authentication_key.json');
const c = require('ansi-colors');

let url = 'http://openapi.airport.co.kr/service/rest/AirportCodeList/getAirportCodeList';
url += '?' + encodeURIComponent('serviceKey') + '=' + encodeURIComponent(BasicKey.key);

function getFlightStatus() {
  return axios.get(url, { responseType: 'text' })
    .then(response => {
      const data = response.data;
      if (data.trim().startsWith('<')) {
        return new Promise((resolve, reject) => {
          xml2js.parseString(data, { explicitArray: false }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      } else {
        return JSON.parse(data);
      }
    });
}

module.exports = { getFlightStatus };
