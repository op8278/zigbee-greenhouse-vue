<template>
  <div style="line-echart">
    <div class="main" ref="main" id="main"></div>
  </div>
</template>

<script type="text/javascript">
  import echarts from 'echarts';
  import { lineEchartOption } from '@/utils/echartConfig.js';
  import ApiAdress from '@/utils/apiAdress.js';
  export default {
    props:{
      temperature:{
        type:Object
      }
    },
    data(){
      return{
        echart:null,
        //  ['2017-06-13 19:54:11', 19]
        lastEchartDataId:Number,
        assembleLastEcharData:Object,
        assembleEcharDataT:Object,
        assembleEcharDataH:Object,
      }
    },
    methods:{
      initEchart(config){
        console.log('initEcharts  --- lineEchart');
        let option = config || lineEchartOption;
        this.echart = echarts.init(this.$refs.main);
        let tdata = this.assembleEcharDataT;
        let hdata = this.assembleEcharDataH;
        this.echart.setOption(option);
      },
      refreshEchartsData(config){
        if (!this.echart) {
          console.log('请初始化Echarts');
          return ;
        }
        let option = config || {
          series:[{
            data:this.assembleEcharDataT
          },{
            data:this.assembleEcharDataH
          }]
        };
        this.echart.hideLoading();
        this.echart.setOption(option);
      },
      assembleOption(temperatureData,humidityData){
        if (!temperatureData || !humidityData) {
          console.log('请确保参数完整性');
          return ;
        }
        let config = this.$lodash.defaultsDeep({},lineEchartOption,{series:[{data:temperatureData},{data:humidityData}]});
        return config;
      },
      showLoading(){
        if (!this.echart) {
          console.log('请初始化Echarts');
          return ;
        }
        this.echart.showLoading();
      }
    },
    created(){
      console.log('created --- lineEchart');
      this.$nextTick(()=>{
          this.initEchart();
          // this.getEchartData();
      });
      //AJAX请求数据
    },
    // mounted(){
    //   console.log('mounted');
    //   this.initEcharts();
    // }
  }
</script>

<style lang="scss" scoped>
    .main{
      width:100%;
      height:500px;
    }
</style>
