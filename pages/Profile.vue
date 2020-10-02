<template>
<div>
<h1>Your Profile</h1>
<button @click="fun5()"><h1>Location</h1></button>
<div class="updateProfile">
    <form action="/url" method="POST" enctype="multipart/form-data">
<input type="text" placeholder="Enter your name"  name="userName" v-model="username">
<br><br><br>
<input type="password" placeholder="Enter your password"  name="userPassword" v-model="userpassword">
<br><br><br>
<input type="text" placeholder="Enter your email id" name="userEmail" v-model="useremail">
<br><br><br>

<label for="checkbox1">I confirm that all information given by me is true and is mine</label>
<input type="checkbox" _id="checkbox1"  @click="callOTP(++submit_option)">
<br><br><br>
<input type="file" name="userImage">
<br>
<!-- <button type="button" @click="axiosconn" >Submit</button> -->
<br><br><br>
<div class="recpta" v-if="(submit_option)%2==1">
    OTP: <input type="text" placeholder="Entrer your 10 digit long OTP" maxlength="10" v-model="OTP" >
</div>
<br><br><br>
<div class="submit" v-if="(submit_option)%2==1" >
    <button type="button" @click="checkOTP(OTP)" >Check_OTP</button>
    <br><br>
    <button type="submit">Submit</button>
    

</div>

    </form>


</div>




</div>
    
</template>
<script>
import axios from"axios";
// import multer from"multer";
// import confirmation_email from"../nodemailer/nodemailer1"

export default {
    
    data(){
        return{
            username:"",
            userpassword:"",
            useremail:"",
            dummy:"",
            authenticationno:1,
            submit_option:2,
            OTP:""

        }
    },
  

methods:{

    postdata(){
        var userData={
            name:this.username,
            password:this.userpassword
        }
        
        this.$axios.post('http://localhost:3000/us')
        .then(function(res){
            console.log('this is from the then part'+res)
        })
        .catch(function(e){
            console.log("this is an error "+e)
        })
        
    },
    axiosconn(){
           var userData={
            name:this.username,
            password:this.userpassword
        }
        
        console.log('this is from the axios conn');
        axios.post('/us',userData)
        .then(function(){
            console.log('this is from the then part');
        })
        .catch(function(e){
            console.log(e +" "+ 'this is an error')
        })
        .finally(()=>{
            console.log('this is from finally')
        })
    },




callOTP( submitOptions){
    
if(submitOptions%2==1){
  
const userdetails={username:this.username,userpassword:this.userpassword,useremail:this.useremail};
    this.checkallCrediantials(userdetails);
}



}
,
checkallCrediantials(userdetails){
    if(userdetails.username=="" || userdetails.userpassword=="" || userdetails.useremail==""){
        alert("Please provide an input");
        

    }
    else{
        axios.post("/verification",userdetails)
        .then(function(resp){
            console.log("this is from the axios checkdetails",resp);
        })
        .catch(function(e){
            console.log(e,"this is an error");
        })
    }





},
checkOTP(otpval){
console.log("Inside of the OTP",otpval);
const OTP={username:this.username,
OTP:otpval,
userdata:{
    username:this.username,
    useremail:this.useremail,
userpassword:this.userpassword
}
};
console.log("this is OTP",OTP);
axios.post("/OTP_verification",OTP)
.then((data)=>{
    console.log(data,"!! the OTP was correct",data);
})
.catch((e)=>{
    console.log("this is error from the axios checkOTP",e);
})
},
fun5(){
// axios.post('/session',1)
// .then(()=>{
//     console.log("this is from the session");
// })
// .catch((e)=>{
// console.log("this is session error",e);
// })


// axios.post('/yourlocation',1);

axios.post('/yourlocation',1);

}


},
// asyncData({res}) {
//     // alert("this is from the asyncdata");
//     console.log("hello");
//     console.log({res});
//     console.log("hi");
    
// },

}
</script>
<style scoped>
h1{
    position: relative;
    top:180px;
  
    
}
.updateProfile{
    position: relative;
    top:200px;
}


</style>