<template>
    <div class="outer">
        <div class="outputparent">


            <div class="userside" v-for="msg in msgs" :key="msg.data" >
                        
                        {{msg.data}}

            </div>





            <div class="output" v-for="msg in msgs" :key="msg.data" >
                
                {{msg.data}}
                
                </div>


        </div>

        
        <div class="message">

            <textarea name="message" id="" cols="30" rows="4" v-model="text"></textarea>
            

        </div>
       
            
            <button class="button" @click="fun()">Send</button>

       

    </div>
</template>
<script>
import io from 'socket.io-client';
import axios from"axios"
export default {
    data(){
        return{
            value:[],
            text:'',
            socket:null,
            val:null,
            user:1,
            msgs:[],
            userside:0,
            usermsg:[]
            
        }
    },

  created(){


      
        this.socket=io('/About');
        this.socket.on('connect',(socket)=>console.log('someone is connected with website'));
        const array=this.msgs;
        var usersideval=this.userside;
        console.log(this.userside,"val",usersideval)




//no. of users 

        this.socket.on('usersno',function(data){
 
           console.log(data+'this is val');
           
          
         
        
            
            
        })




        this.socket.on('msg',(data)=>{
        this.value=data.data;
        console.log('the data is recieved')
         array.push(data);
          console.log(data);
          
          
           })
           
        


        
        

    //   socket.on('connect',function(){
    //       console.log('this is from the socket.on')
    //   })
    //   console.log('helooo');
//         created(){
//       console.log('hi this is from the created ');
//       var socket=io();

//   },

  },


  destroyed() {
      console.log('User is disconnected');
      this.socket.on('disconnect',(socket)=>{
          console.log('Got disconnected');
      })
  },

    methods:{
        fun(){
            this.user=1;
            this.msgs.push(this.text);
            console.log("hi this is from the userside")
        this.socket.emit('usermsg',{data:this.text});
        

        }
    }
    
}
</script>
<style scoped>


.outer{

position: relative;
top:150px;
width:60%;
height: 75vh;
border:1px solid black;

}
.message{
    position:relative;
    bottom:-400px;
    height:100px;

    border:4px solid blue;

}

.button{
    position: absolute;
    bottom:0px;
    background-color: blue;
    width:100%;
    height: 50px;
    font-size: 25px;
    color: white;

}
.outputparent{
    width:100%;
    height:400px;
    border:1px solid green;
    position: absolute;
    top:0px;
    overflow: auto;
}
.output{
    width:45%;
    height:50px;
    border:1px solid red;
    position: relative;
    top:0px;
   margin-right:55%;
}
.message textarea{
    width:100%;
    height: 100px;

}
.userside{
    width:45%;
    height:50px;
    border:1px solid green;
    position: relative;
    top:0px;
   margin-left:55%;
}
</style>