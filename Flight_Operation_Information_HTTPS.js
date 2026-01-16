const axios = require('axios');
const xml2js = require('xml2js');
const BasicKey = require('./authentication_key.json');

const url = 'http://openapi.airport.co.kr/service/rest/AirportCodeList/getAirportCodeList';
const queryParams = '?' + encodeURIComponent('serviceKey') + '=' + encodeURIComponent(BasicKey.key);

// 함수 정의
function getFlightStatus() {
  return axios.get(url + queryParams, { responseType: 'text' })
    .then(response => {
      const data = response.data;
      // XML인지 JSON인지 판별
      if (data.trim().startsWith('<')) {
        // XML 파싱
        return new Promise((resolve, reject) => {
          xml2js.parseString(data, { explicitArray: false }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      } else {
        // JSON 그대로 반환
        return JSON.parse(data);
      }
    });
}


// 함수 내보내기
module.exports = { getFlightStatus };
