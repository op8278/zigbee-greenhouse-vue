<template>
  <div class="humidity">
    <div class="main" ref="main" id="main"></div>
  </div>
</template>

<script type="text/javascript">
  import echarts from 'echarts';
 import 'echarts-liquidfill';
  import { humidityOption } from '@/utils/echartConfig.js';
  export default {
    props:{
      humidityData:String
    },
    data(){
      return{
        echart:null,
        assembleEcharDataH:[],
      }
    },
    methods:{
      initEchart(config){
        console.log('initEcharts --- Humidity');
        let option = config || humidityOption;
        this.echart = echarts.init(this.$refs.main);
        // console.log(option);
        this.echart.setOption(option);
      },
      refreshData(data){
        if (!this.echart) {
          console.log('请初始化Echarts---Humidity');
          return ;
        }
        // console.log(data);
        let option = {
          series:[{
            data:data
          }]
        };
        this.echart.setOption(option);
      }
    },
    created(){
      console.log('created  --- Humidity')
      this.$nextTick(()=>{
          this.initEchart();
      });
    }
  }
</script>

<style lang="scss" scoped>
  .humidity{
    height:200px;
    .main{
      width:100%;
      height:100%;
      margin-top:-15px;
    }
  }
</style>
