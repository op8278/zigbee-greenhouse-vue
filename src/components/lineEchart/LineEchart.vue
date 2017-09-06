<template>
  <div class="line-echart">
    <div class="main" ref="main" id="main"></div>
  </div>
</template>

<script type="text/javascript">
  import echarts from 'echarts/lib/echarts';
  import 'echarts/lib/chart/line';
  import 'echarts/lib/component/dataZoom';
  import 'echarts/lib/component/tooltip';
  import 'echarts/lib/component/legend';
  import { lineEchartOption } from '@/utils/echartConfig.js';
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
        let option = config || lineEchartOption;
        this.echart = echarts.init(this.$refs.main);
        let tdata = this.assembleEcharDataT;
        let hdata = this.assembleEcharDataH;
        this.echart.setOption(option);
        window.onresize = this.echart.resize;
      },
      refreshEchartsData(config){
        if (!this.echart) {
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
      showLoading(){
        if (!this.echart) {
          return ;
        }
        this.echart.showLoading();
      }
    },
    created(){
      this.$nextTick(()=>{
        this.initEchart();
      });
    }
  }
</script>

<style lang="scss" scoped>
  .line-echart{
    width:100%;
    height:500px;
    .main{
      width:100%;
      height:500px;
    }
  }
</style>
