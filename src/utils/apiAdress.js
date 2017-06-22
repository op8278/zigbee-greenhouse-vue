//注意,此IP经常变动 192.168.1.103为 PC端 局域网的地址
//TODO此地址可以 用127.0.0.1来代替吗?
// const baseUrl="http://115.159.209.60/ocean";         //公网IP
// const baseApiUrl="http://115.159.209.60/ocean/api";  //公网IP
// const addApiUrl=baseApiUrl+"/ad" //后台添加数据的相关接口
const baseUrl="http://127.0.0.1:8081";
module.exports = {

  basePath:baseUrl+"/",

  getAllZigbeeData:baseUrl+"/api/zigbee/all",

  getLastZigbeeData:baseUrl+"/api/zigbee/last",

  getAllZigbeeDataById:baseUrl+"/api/zigbee/",

  searchZigbeeData:baseUrl+"/api/zigbee/search",

  searchZigbeeDataByTemperatureRange:baseUrl+"/api/zigbee/search/temperature",

  searchZigbeeDataByHumidityRange:baseUrl+"/api/zigbee/search/humidity",

  searchZigbeeDataByDate:baseUrl+"/api/zigbee/search/date",

  addZigbeeData:baseUrl+"/api/zigbee/",
}