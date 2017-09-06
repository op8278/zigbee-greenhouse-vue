<template>
  <div class="humidity">
    <div class="main" ref="main" id="main"></div>
  </div>
</template>

<script type="text/javascript">
  import echarts from 'echarts/lib/echarts';
  // import echarts from 'echarts';
  import 'echarts-liquidfill';
  import 'echarts/lib/component/tooltip';
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
        let option = config || humidityOption;
        this.echart = echarts.init(this.$refs.main);
        this.echart.setOption(option);
        window.onresize = this.echart.resize;
      },
      refreshData(data){
        if (!this.echart) {
          return ;
        }
        let option = {
          series:[{
            data:data
          }]
        };
        this.echart.setOption(option);
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
  .humidity{
    width: 100%;
    height:100%;
    .main{
      width:100%;
      height:100%;
      margin-top:-15px;
    }
  }
</style>
