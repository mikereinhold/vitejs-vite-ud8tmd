<script setup>

</script>

<template>
  <div id="wrapper">
    <div id="header">
      <h1>Video on Demand Streaming Browser</h1>
    </div>
    <router-view id="window" :key="$route.path" />
    <div id="footer">
      <span>
        For use with the <a href="https://aws.amazon.com/solutions/implementations/video-on-demand-on-aws/">AWS Video on Demand on AWS Solution Implementation</a>
      </span>      
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

#header, #footer {
  background-color: #232f3e;
  padding: 21px;
  color: #ddd;
}

#window {
  flex: 1 0 auto;
  background-color: #eee;
}

#header {
  box-shadow: 0px 2px
}

#footer {}

body {
  margin: 0px;
  background-color: #FAFAFA;
}

a, a:visited {
  color:#333;
  text-decoration:none;
}
a:active,a:hover {
  color:#f8991d;
}

#footer a {
  color:#f8991d;
}
#footer a:hover {
  color: #999;
}
</style>
