<template>
  <div>
    <header>这是头部</header>
    <div class="container">
      <div class="tab">
        <li>全部</li>
        <li>温度</li>
        <li>湿度</li>
      </div>
      <div class="canvas">显示图表地方</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
