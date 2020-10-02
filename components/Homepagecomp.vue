<template>
<div class="homecomp" v-if="this.hide" id="home" :class="{ 'navbar--hidden': !showNavbar }"> 
   <div class="header">ADHIKAR</div>


  
<div class="navbar"
     
      
>
   
         <nuxt-link to="/" class="Home" id="navigation"><label>Home</label></nuxt-link>
        <nuxt-link to="/Chat" class="Chat" id="navigation"><label>Chat</label></nuxt-link>
        <nuxt-link to="/Profile" class="Profie" id="navigation"><label>Profile</label></nuxt-link>
          <nuxt-link to="/About" class="About" id="navigation"><label>Complaint</label></nuxt-link>
</div>


<div class="serch">

name:<input type="text" placeholder="Serch something">

</div>

</div>
</template>
<script>

export default {
  components:{
   
  },
  data(){
    return{
      hide:true,
         showNavbar: true,
      lastScrollPosition: 0
    }
  },
  methods:{
//     hideorshow(initial){
      
      
// let values=initial;
     


//     window.onscroll = function() {

//                 var final = window.pageYOffset;
//                 console.log(values+" "+final)

               

               
                
//                 if (values >final) {
//                   this.hide=false;
//                   console.log('hi htim sis from the if part')
//                 } 
//                 else {
                  
//                   console.log('this is from the else part');
//                    console.log(this.hide+' '+"this is from hide");
//                   return this.hide=false;
                 
//                 }
//                values = final;
// }
  


//     }


onScroll () {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollPosition < 0) {
    return
  }
  // Stop executing this function if the difference between
  // current scroll position and last scroll position is less than some offset
  if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 40) {
    return
  }
  this.showNavbar = currentScrollPosition < this.lastScrollPosition
  this.lastScrollPosition = currentScrollPosition
}
    
  },
  mounted(){
   
    window.addEventListener('scroll',this.onScroll);
    
    
  }
  ,
  beforeDestroy(){
    window.removeEventListener('scroll', this.onScroll)

  }
}
</script>
<style >
/* .homecomp{
 

} */

.header{
  text-align: center;
  font-size: 30px;
  height: 120px;
  width: 160px;
  background-color: red;
  border: 1px solid black;
  flex:20%;
}

#navigation{
  text-decoration: none;
 font-size: 25px;
}
.serch{
  border:1px solid black;
  flex: 5%;
}
.homecomp {
 display: flex;
  flex-direction: row;
  justify-content: space-around;
   border:1px solid black;
  height: 100px;
  width:100%;
  background: hsl(200, 50%, 50%);
  position: fixed;
  box-shadow: 0 2px 15px rgba(71, 120, 120, 0.5);
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
  z-index: 2;
}
.navbar{
  display: flex;
  justify-content: space-around;
  border:1px solid black;
  flex: 75%;
}
.homecomp.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}


/* this is for the  responsive mobile layout */

@media screen and (max-width: 414px){

  .header{
   display: none;
  }
  .navbar{
     display: flex;
     flex-direction: column;
  }
  #navigation{
    font-size: 19px;
    border:0.2px solid whitesmoke;


  
}
}
</style>















