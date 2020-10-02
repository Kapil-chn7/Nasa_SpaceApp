<template>
<div>
<div>
  <indexcomp  class="index_comp1"/>
</div>
  <div class="image-box">

      <div class="image" v-for="image in images " :key="image">

       <img src="../multer/images/download.jpg" >
        


      </div>



  </div>
  

</div>
</template>

<script>

import indexcomp from"../components/indexcomp";
import axios from'axios';
export default {
  name:"images",
  components:{
    indexcomp
    
  },
  data() {
    return {
      imgbuffer:[],
      img:[],
      arrays:[],
      images:["../multer/images/download.jpg","../multer/images/download.jpg","../multer/images/download.jpg",
      "../multer/images/download.jpg","../multer/images/download.jpg","../multer/images/download.jpg"]
      
    }
  },
// 


created(){
  
  // axios.get('/userimgarray')
  // .then(function(res){
  //   console.log("hi");

  // })
  // .catch(function(e){
  //   console.log(e+'this is error');
  // })


// const MongoClient = require('mongodb').MongoClient;
// const multer=require("multer");



//   const uri = "mongodb+srv://Kapil:Kapil@123@nuxt1.cl5ei.mongodb.net/Userdata?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(async err => {
//   const collection = client.db("Userdata").collection("Signininfo");
//   // perform actions on the collection object
//   // collection.insertOne(userinfo);
//   // collection.findOne({_id:"1"},function(err,result){
//   //   if(err) throw err;
//   //   console.log(result);
//   const val=await collection.findOne({_id:{$eq:10}},{projection:{password:0}});
//   const buff=val.userimg.buffer.buffer; 
//   // this.imgbuffer.push(buff);
//   const base64img=buff.toString('base64');

//   const userimage=base64img.encoding('base64');
//   this.imgbuffer.push(userimage);

  


//     client.close();
//   // });
// });







}
,
async asyncData(context) {
  try{
    let data=await axios.get('http://localhost:3000/userimgarray')
    // // console.log(context);
    // console.log(res+"jjjj");
    // console.log("hi there");
    .then(function(res){
      console.log("this is from then ");
      console.log(res.data);
    })
    .catch(function(e){
      console.log("this is from the error "+e)
    })
  }

//  .then(function(res){
//    console.log("This is from the index.vue");
//  })
//  .catch(function(e){
//    console.log("this is an error "+e);
//  })
 
catch(err){
  console.log("this is from error");
}
  
  
},
  

  
  
  
  
  }
</script>
<style >

.image-box{

border:0px solid black;
width:100%;
height: auto;
display: inline-grid;
  grid-template-columns:1fr 1fr 1fr 1fr;
  grid-gap:10px;
  grid-row: 10px;

}

.image{
  border:0px solid black;
  background-color:white;
  height: 30vh;
  /* width: 25%; */

  
}

</style>