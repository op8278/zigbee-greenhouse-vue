<template>
  <div class="temperature">
    <div class="main" ref="main" id="main"></div>
  </div>
</template>

<script type="text/javascript">
  import echarts from 'echarts/lib/echarts';
  // import echarts from 'echarts';
  import 'echarts-liquidfill';
  import 'echarts/lib/component/tooltip';
  import { temperatureOption } from '@/utils/echartConfig.js';
  export default {
    props:{
      temperature:{
        type:Object
      }
    },
    data(){
      return{
        echart:null
        //  ['2017-06-13 19:54:11', 19]
      }
    },
    methods:{
      initEchart(config){
        let option = config || temperatureOption;
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
  .temperature{
    width: 100%;
    height:100%;
    .main{
      width:100%;
      height:100%;
      margin-top:-15px;
    }
  }
</style>
