<template>
<div>
  

<homepagecomp/>

<nuxt/>


  <footercomp class="footercomp"/>

</div>
  
</template>

<script>
import homepagecomp from'../components/Homepagecomp.vue'
import footercomp from "~/components/footer"
export default {
  components:{
    homepagecomp,
     footercomp
  }
}
</script>
<style >



</style>
<style >
*{
  margin:0px;
  padding:0px;
}
.footercomp{
  position: relative;
  bottom: -600px;
}

</style>