const MongoClient=require('mongodb').MongoClient;

const check_function=async function(userdetails,collection) {
  console.log("this is user info",userdetails);
  const username=userdetails.username;
  const useremail=userdetails.useremail;
  const userpassword=userdetails.userpassword;



  const userconfirmation=await collection.findOne(  {$and:[{username:{$eq:username}},{useremail:{$eq:useremail}}]});



  
  




    if(await userconfirmation==null){
    console.log("this is success !");
    return "success";

  }
  else{

    console.log("user is already registered");
    return "failure";
  }
  
}

const checkotp=async function(OTP,collection){
  const username=OTP.username;
  const OTPs=OTP.OTP;
  console.log("this is username and userdetails",username,OTPs)

console.log("this is inside of the checkOTP");
return new Promise(async(resolve,reject)=>{
  const checkOTP=await collection.findOne({$and:[{OTP:{$eq:OTPs}},{username:{$eq:username}}]});
  if(await checkOTP==null){
    console.log("this is wrong OTP",checkOTP);
    resolve("failure");
    }
    else{
      console.log("this OTP is found");
      return "success";
    }
})
}

const storetempdata=async function(userdetails,collection){
  const userdetail=await collection.insertOne(userdetails);
  if(await userdetail==null){
    console.log("Some error happned");
    return "failure";
    }
    else{
      console.log("Inserted");
      return "success";
    }


}

const tempdata=async function(userdetails,collection){
  const userdetail=await collection.insertOne(userdetails);
  if(await userdetail==null){
    console.log("Some error happned");
    return "failure";
    }
    else{
      console.log("Inserted");
      return "success";
    }


}
class databaseconnection{

    static connect_to_database(userdetails,value)
    {
      
     return new Promise((resolve,reject)=>{
    
 
 const uri = "mongodb+srv://Kapil:Kapil@123@nuxt1.cl5ei.mongodb.net/Userdata?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true});
client.connect(async err => {
 
 
 

switch(value){

 case 1: const collection = client.db("Userdata").collection("Signininfo");
   console.log("inside of the switch");   
  const val=await check_function(userdetails,collection);
 console.log("this is from the switch",val);
 resolve(val)
 



break;

  case 2:  const collection2=client.db("Userdata").collection("Tempuserdata");
  const checkOTP=await checkotp(userdetails,collection2)
  .then((data)=>{
    console.log("data and userdetails",data,userdetails);
    resolve(data);
  })
  .catch((e)=>{
    console.log("error",e);
  })
  break;

case 3: const collection3=client.db("Userdata").collection("Signininfo");
const storetemp_data=await storetempdata(userdetails,collection3)
.then((data)=>{
  console.log("data",data);
  resolve(data);
})
.catch((e)=>{
  console.log("error",e);
})
break;

case 4: const collection4=client.db("Userdata").collection("Tempuserdata");
const storeotp_data=await tempdata(userdetails,collection4)
.then((data)=>{
  console.log("data",data);
  resolve(data);
})
.catch((e)=>{
  console.log("error",e);
})

}






  


    client.close();

});
})

    }
    

  
    
//     static async coolname (credentails,val) {
    

// const vals=await databaseconnection.connect_to_database(credentails,val)
// .then((data)=>{
  
  
// return new Promise((resolve,reject)=>{
//   resolve(data);
// })

// })
// .catch((e)=>{
//   console.log("this is the catch",e)
// })

// return vals;

 
//     }
//     static async checkotp(){
      
//     }
    





}

module.exports =databaseconnection;
