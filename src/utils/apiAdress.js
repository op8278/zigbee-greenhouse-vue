
const baseUrl="http://api.op8278.site";
// const baseUrl="http://localhost:8081/api";

module.exports = {

  basePath:baseUrl+"/",

  getAllZigbeeData:baseUrl+"/zigbee/all",

  getLastZigbeeData:baseUrl+"/zigbee/last",

  getAllZigbeeDataById:baseUrl+"/zigbee/",

  searchZigbeeData:baseUrl+"/zigbee/search",

  searchZigbeeDataByTemperatureRange:baseUrl+"/zigbee/search/temperature",

  searchZigbeeDataByHumidityRange:baseUrl+"/zigbee/search/humidity",

  searchZigbeeDataByDate:baseUrl+"/zigbee/search/date",

  addZigbeeData:baseUrl+"/zigbee/",
}