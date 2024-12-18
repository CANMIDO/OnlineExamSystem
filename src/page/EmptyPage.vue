<template>
<div></div>
  
</template>

<script>
export default {
  name:'EmptyPage',
  beforeRouteEnter (to, from, next) {
    next(vm=>{
        vm.$router.replace(from.path)
    })
  }
}
</script>

<style scoped>

</style>