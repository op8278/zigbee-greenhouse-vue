# zigbee-greenhouse-vue
zigbee-greenhouse 前端部分 Vue实现  
展示页面 http://zigbee.op8278.site/  

服务器部分(java Spring+SpringMVC+Mybatis实现) https://github.com/op8278/zigbee-greenhouse

修改Api请求地址  
./src/utils/apiAdress.js 中修改 baseUrl字段  
例如  
const baseUrl="你的上线服务器ip";  
// const baseUrl="http://localhost:8081/api";  


运行方法  
git clone https://github.com/op8278/zigbee-greenhouse-vue.git
cd zigbee-greenhourse-vue  
npm install  
npm run dev  

