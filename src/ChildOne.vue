<template>
  <div>
      <h3>我是子组件一</h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$emit('childEvent', { name: 'zhangsan', age: 10 })
  }
}
</script>

<style scoped>

</style>
