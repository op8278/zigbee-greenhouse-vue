
const baseUrl="http://api.op8278.site";
// http://119.23.74.71:8080/zigbee-greenhouse/api/zigbee/3
module.exports = {

  basePath:baseUrl+"/",

 // getAllZigbeeData:baseUrl+"/zigbee/all",
  getAllZigbeeData:baseUrl+"/zigbee/all",

  getLastZigbeeData:baseUrl+"/zigbee/last",

  getAllZigbeeDataById:baseUrl+"/zigbee/",

  searchZigbeeData:baseUrl+"/zigbee/search",

  searchZigbeeDataByTemperatureRange:baseUrl+"/zigbee/search/temperature",

  searchZigbeeDataByHumidityRange:baseUrl+"/zigbee/search/humidity",

  searchZigbeeDataByDate:baseUrl+"/zigbee/search/date",

  addZigbeeData:baseUrl+"/zigbee/",
}