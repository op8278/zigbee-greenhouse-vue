<template>
  <div>  
    <div class="header-container">
      <div class="header-brand">
        <img class="icon" :src="icon" width="40px" height="40px"></img>
        <span class="title">{{title}}</span>
        <button type="button" class="header-nav-button" @click="toggleNav">
          <span class="nav-icon"></span>
          <span class="nav-icon"></span>
          <span class="nav-icon"></span>
        </button>
      </div>
      <transition name="collapse">
        <div class="header-nav" v-show="isShowNav" >
          <ul class="header-nav-wrapper">
            <li v-for="(item,index) in navData" class="header-nav-item" ref="headerNav">
              <a :href="item.href">{{item.text}}</a>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <!-- 防止fixed布局挡住其他组件 -->
    <div style="height:50px"></div> 
  </div>
</template>

<script type="text/javascript">
  export default {
    props:{
      icon:String,
      title:String,
      navData:Array
    },
    data(){
      return{
        isShowNav:false,
      }
    },
    methods:{
      toggleNav(){
        this.isShowNav = !this.isShowNav;
      },
      _calculateListHeight(){
        let headerNavList=this.$refs.headerNav;
        let _height=0;
        console.log(headerNavList);
        for(let i=0,length=headerNavList.length;i<length;i++){
          let item=headerNavList[i];
          console.log(item);
          _height+=item.clientHeight;
          // this.listHeight.push(_height);
          console.log(_height);
        }
      },
    },
    created(){
      this.$nextTick(()=>{
        // this._calculateListHeight();
      });
    },
    mounted(){
      // this.$refs.headerNav.style.height=150;
      // this._calculateListHeight();
    }
  }
</script>

<style lang="scss" scoped>
  .header-container{
    position: fixed;
    width: 100%;
    background-color: blue;
    z-index:99;
    .header-brand{
      height:50px;
      line-height: 50px;
      .header-nav-button{
        position: relative;
        float: right;
        padding:9px 10px;
        margin:8px 15px 8px 0;
        border-radius:4px;
        border:1px solid #333;
        background-color:#333;
        .nav-icon{
          display:block;
          width:22px;
          height:2px;
          border-radius:1px;
          background-color:#fff;
          &+.nav-icon{
            margin-top:4px;
          }
        }
      }
    }
    .header-nav{
      width:100%;
      background-color:green;
      //height:160px; //TODO JS计算
      height:80px;
      overflow: hidden;
      //初始状态  
      &.collapse-enter, &.collapse-leave-to{
        height:0;
      }
      &.collapse-enter-active, &.collapse-leave-active{
        transition: all .5s;

      }
      .header-nav-wrapper{
        .header-nav-item{
          position: relative;
          a{
            display:block;
            padding:10px 15px;
            line-height: 20px;
          }
        }
      }
    }
  }
</style>
