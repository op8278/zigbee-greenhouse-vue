<template>
  <div class="app-container">
    <div class="current-info">
      <div class="echart-item">
        <humidity ref="humidity"></humidity>
      </div>
      <div class="time">
        <span >{{ nowTime }}</span>
        <span class="cursor">|</span>
      </div>
      <div class="echart-item">
        <temperature ref="temperature"></temperature>
      </div>
    </div>
    <line-echart class="lineEchart" ref="lineEchart" ></line-echart>
  </div>
</template>

<script>
import moment from 'moment';
import LineEchart from '@/components/lineEchart/LineEchart.vue';
import Humidity from '@/components/humidity/Humidity.vue';
import Temperature from '@/components/temperature/Temperature.vue';
import ApiAdress from '@/utils/apiAdress.js';
export default {
  data(){
    return{
      lastEchartDataId:Number,
      assembleLastEcharData:Object,
      assembleEcharDataT:Object,
      assembleEcharDataH:Object,
      nowTime:moment().format('YYYY-MM-DD HH:mm:ss'),
      isSupportWebSocket:true,
      webSocket:null
    }
  },
  methods:{
    onRefreshEchartsData(refreshData){
      let temperature = refreshData.temperature;
      let humidity = refreshData.humidity;
      let createTime = refreshData.createTime;
      // {id:1,temp:12,humidy:30}
      //data: [0.6, 0.5, 0.4, 0.3],
      let humidityData = [humidity/100,humidity/150,humidity/200,humidity/250];
      //(x-(-5)*0.02)
      let temperatureData = [{value:((parseInt(temperature)+5)*0.02),rawValue:temperature}]

      this.$refs.humidity.refreshData(humidityData);
      this.$refs.temperature.refreshData(temperatureData);
    },
    refreshAllEchartsData(){
      this.$refs.lineEchart.refreshEchartsData({
        series:[{
          data:this.assembleEcharDataT
        },{
          data:this.assembleEcharDataH
        }]
      });
      this.onRefreshEchartsData(this.assembleLastEcharData);
    },
    getEchartData(url){
        this.$refs.lineEchart.showLoading();
        //获取最新10条Zigbee数据
        // Test : 访问静态模拟数据 若要访问外网 url为 ApiAdress.getAllZigbeeData
        // this.$http.get(ApiAdress.getAllZigbeeDataTestData).then((res)=>{
        this.$http.get(ApiAdress.getAllZigbeeData).then((res)=>{
          let resData = res.data; 
           console.log(resData);
          if (resData.status!==0) {
            console.log('请求失败');
            return ;
          }
          // 装配
          // TODO 判断是否List为空
          this.assembleDataList(resData.data.list);
          this.$nextTick(()=>{
            this.refreshAllEchartsData();
            // 如果不支持websock,轮训访问最新数据(10s)
            if (!this.isSupportWebSocket) {
              console.log('轮训开始!!!');
              setInterval(()=>{
                this.getLastEchartDataByAjax();
              },10000);
            }
          });
        });
      },
    getLastEchartDataByAjax(url){
      // Test : 访问静态模拟数据 若要访问外网 url为 ApiAdress.getLastZigbeeData
      this.$http.get(ApiAdress.getLastZigbeeData).then((res)=>{
        this.handleLastEchartData(res.data);
      });
    },
    assembleDataList(dataList){
      let assembleEcharDataT = [];
      let assembleEcharDataH = [];
      for(let i=0,length=dataList.length;i<length;i++){
        let item = dataList[i];
        let itemDataT = [item.createTime,item.temperature];
        let itemDataH = [item.createTime,item.humidity];
        assembleEcharDataT.push(itemDataT);
        assembleEcharDataH.push(itemDataH);
      }
      this.assembleEcharDataT = assembleEcharDataT;
      this.assembleEcharDataH = assembleEcharDataH;
      this.lastEchartDataId = dataList[0].id;
      this.assembleLastEcharData = dataList[0];
    },
    assembleLastData(data){
      let assembleLastEcharDataT = [data.createTime,data.temperature];
      let assembleLastEcharDataH = [data.createTime,data.humidity];
      this.assembleLastEcharData = data
      this.lastEchartDataId = data.id;
      this.assembleEcharDataT.unshift(assembleLastEcharDataT);
      this.assembleEcharDataH.unshift(assembleLastEcharDataH);
    },
    handleLastEchartData(resData){
      if (resData.status!==0) {
        console.log('获取最新数据失败');
        return ;
      }
      if (this.lastEchartDataId == resData.data.id) {
        console.log('重复数据,不刷新')
        return ;
      }
      this.assembleLastData(resData.data);
      this.$nextTick(()=>{
        this.refreshAllEchartsData();
      });
    },
    initNowTime(){
      let that = this;
      setInterval(function(){
        that.nowTime=moment().format('YYYY-MM-DD HH:mm:ss');
      },1000);
    },
    initWebSocket(){
      let webSocket;
      // 判断当前浏览器是否支持WebSocket
      if ('WebSocket' in window) {
          this.webSocket = new WebSocket(ApiAdress.wsUrl);
      }
      else {
          console.log('当前浏览器 Not support websocket');
          this.isSupportWebSocket = false;
          return ;
      }
      // 连接发生错误的回调方法
      this.webSocket.onerror = () => {
          console.log("webSocket连接发生错误");
      }
      // 连接成功建立的回调方法
      this.webSocket.onopen = () => {
          console.log("webSocket连接成功");
      }
      // 接收到消息的回调方法
      this.webSocket.onmessage = (event) => {
          // 刷新数据
          this.handleLastEchartData(JSON.parse(event.data));
      }
      // 连接关闭的回调方法
      this.webSocket.onclose = () => {
          console.log("webSocket连接关闭");
      }
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常
      window.onbeforeunload = () => {
          this.closeWebSocket();
      }
    },
    closeWebSocket() {
      if (!this.webSocket) {
        return ;
      }
      this.webSocket.close();
    },
    getLastEchartDataByWebSocket(){
      if (!isSupportWebSocket) {
        return ;
      }
    }
  },
  mounted(){
      this.$nextTick(()=>{
        this.initWebSocket();
        this.getEchartData();
        this.initNowTime();
      });
  },
  components:{
    'line-echart':LineEchart,
    'temperature':Temperature,
    'humidity':Humidity,
  }
}
</script>

<style lang="scss" scoped>
  .app-container{
    position: relative;
    width:100%;
    height:1024px;
    margin:0px;
    padding:0px;
    padding-top:5%;
    background:url('./assets/bg.jpg');
    background-size:100% 100%;
  }
  .current-info{
    display:flex;
    position:relative;
    box-sizing: content-box;
    width: 90%;
    height: 15%;
    margin: 0 auto;
    .time{
      display:flex;
      flex:1;
      justify-content:center;
      align-items:center;
      color:white;
      font-size:24px;
      .cursor{
        animation:1s blink step-end infinite;
      }
    }
  }
  .echart-item{
    flex:1;
    position: relative;
    height:200px;
  }
  @keyframes "blink" { 
    from, to { 
      color: transparent;
    }
    50% { 
      color: white; 
    } 
  }

</style>
