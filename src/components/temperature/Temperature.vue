<template>
  <div class="temperature">
    <div class="main" ref="main" id="main"></div>
  </div>
</template>

<script type="text/javascript">
  import echarts from 'echarts';
  import 'echarts-liquidfill';
  import { temperatureOption } from '@/utils/echartConfig.js';
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
      }
    },
    methods:{
      initEchart(config){
        console.log('initEcharts --- Temperature');
        let option = config || temperatureOption;
        this.echart = echarts.init(this.$refs.main);
        this.echart.setOption(option);
      },
      refreshData(data){
        if (!this.echart) {
          console.log('请初始化Echarts---Temperature');
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
      console.log('created  --- Temperature');
      this.$nextTick(()=>{
          this.initEchart();
          // this.getEchartData();
      });
      //AJAX请求数据
    },

  }
</script>

<style lang="scss" scoped>
  .temperature{
    height:200px;
    .main{
      width:100%;
      height:100%;
      margin-top:-15px;
    }
  }
</style>
