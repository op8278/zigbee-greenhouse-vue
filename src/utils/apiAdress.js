//const baseUrl="你的上线服务器ip";  
//const baseUrl="http://119.23.74.71:8080/api";
//const wsUrl="ws://119.23.74.71:8080/websocket/zigbee";
const baseUrl="http://192.168.1.103:8081/api";
const wsUrl="ws://192.168.1.103:8081/websocket/zigbee";
module.exports = {

  basePath:baseUrl+"/",

  wsUrl,

  getAllZigbeeData:baseUrl+"/zigbee/all",

  getLastZigbeeData:baseUrl+"/zigbee/last",

  getAllZigbeeDataById:baseUrl+"/zigbee/",

  searchZigbeeData:baseUrl+"/zigbee/search",

  searchZigbeeDataByTemperatureRange:baseUrl+"/zigbee/search/temperature",

  searchZigbeeDataByHumidityRange:baseUrl+"/zigbee/search/humidity",

  searchZigbeeDataByDate:baseUrl+"/zigbee/search/date",

  addZigbeeData:baseUrl+"/zigbee/",

  getAllZigbeeDataTestData:"../static/test.json",

  getLastZigbeeDataTestData:"../static/last1.json",
}