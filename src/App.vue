<template>
  <div class="app-container">

    <!-- <v-header :title='msg' :icon="icon" :navData="navData"></v-header> -->
    <div class="current-info">
      <div class="echart-item">
        <humidity ref="humidity"></humidity>
      </div>
      <!-- <span class="time">{{ moment().format('MMMM Do YYYY, h:mm:ss a') }}</span> -->
      <div class="echart-item">
        <temperature ref="temperature"></temperature>
      </div>
    </div>
    <line-echart class="lineEchart" ref="lineEchart" ></line-echart>
    
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue';
import ZigbeeImg from '../static/img/zigbee.png';
import moment from 'moment';
import LineEchart from '@/components/lineEchart/LineEchart.vue';
import Humidity from '@/components/humidity/Humidity.vue';
import Temperature from '@/components/temperature/Temperature.vue';
import ApiAdress from '@/utils/apiAdress.js';
export default {
  data(){
    return{
      msg:'Zigbee课程设计',
      icon:ZigbeeImg,
      navData:[{
        text:'首页',
        href:'#'
      },{
        text:'后台',
        href:'#2'
      }],
        lastEchartDataId:Number,
        assembleLastEcharData:Object,
        assembleEcharDataT:Object,
        assembleEcharDataH:Object,
    }
  },
  methods:{
    onRefreshEchartsData(refreshData){
      // console.log('onRefreshEchartsData');
      // console.log(refreshData);
      let temperature = refreshData.temperature;
      let humidity = refreshData.humidity;
      let createTime = refreshData.createTime;
      // {id:1,temp:12,humidy:30}
      //data: [0.6, 0.5, 0.4, 0.3],
      let humidityData = [humidity/100,humidity/150,humidity/200,humidity/250];
      //(x-(-5)*0.02)
      //-5 ~ 40
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
        this.$http.get(ApiAdress.getAllZigbeeData).then((res)=>{
          let resData = res.data; 
           console.log(resData);
          if (resData.status!==0) {
            console.log('请求失败');
            return ;
          }
          //装配
          //TODO 判断是否List为空
          this.assembleDataList(resData.data.list);
          this.$nextTick(()=>{
            this.refreshAllEchartsData();
            //轮训访问最新数据
            setInterval(()=>{
              this.getLastEchartData();
            },10000);
          });
        });
      },
      getLastEchartData(url){
        // console.log(ApiAdress.getLastZigbeeData);
        this.$http.get(ApiAdress.getLastZigbeeData).then((res)=>{
          let resData = res.data;
          console.log(resData);
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
      moment(){
        moment.lang('zh-cn');
        return moment();
      }
  },
  mounted(){
      console.log('mounted --- App.vue');
      this.$nextTick(()=>{
        this.getEchartData();
      });
  },
  components:{
    'v-header':Header,
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
    width: 90%;
    height: 15%;
    margin: 0 auto;
    box-sizing: content-box;
    .time{
      position: absolute;
      display:inline-block;
      left:40%;
      top:50%;
      color:white;
    }
  }
  .echart-item{
    flex:1;
    position: relative;
    height:200px;
  }

</style>
