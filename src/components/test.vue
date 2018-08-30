<template>
  <div id='app'>
    11111111111111111111
  </div>
</template>

<script>
// import axios from '../axios.js';
import axios from 'axios'
export default {
  mounted () {
    this.testFind()
  },
  methods: {
    testFind () {
      axios({
        url: 'http://localhost:3333/api/types',
        method: 'get'
      })
        .then(response => {
          alert(JSON.stringify(response))
        })
        .catch(error => {
          alert(error)
          console.log(JSON.stringify(error))
        })
      axios({
        url: 'http://localhost:3000/user/find',
        method: 'get'
      })
        .then(response => {
          alert(JSON.stringify(response))
        })
        .catch(error => {
          alert(error)
          console.log(JSON.stringify(error))
        })
    }
  }
}
</script>

<style>
</style>
