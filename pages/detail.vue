<template>
  <p>{{$route.query.id}}</p>
</template>

<script>
export default {
mounted(){
    console.log(this.$route)
}
}
</script>

<style>

</style>