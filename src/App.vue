<template>
  <div id="app">
    <TheNavar/>
    <TheHeader/>
    <TheContent/>
  </div>
</template>

<script>
import TheNavar from './components/TheComponent/TheNavar'
import TheHeader from './components/TheComponent/TheHeader'
import TheContent from './components/TheComponent/TheContent'

export default {
  name: 'App',
  components: {
    TheNavar,
    TheHeader,
    TheContent 
  }
}
</script>

<style>
@import './style/index.css';
#app {
  margin: 0;
  font-family: GoogleSans-Regular;
  font-size: 13px;
}
</style>
