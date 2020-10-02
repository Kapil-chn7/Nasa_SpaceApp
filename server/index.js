const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express();

const bodyParser=require('body-parser');
const cors=require('cors');
const fs=require('fs');
const mongodb1=require('../mongodb/mongodb1');
const MongoClient = require('mongodb').MongoClient;
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
const multer=require("multer");
const navigator=require('navigator')
const multerfun=require('../multer/multer1');

const assert=require('assert');
const mongoose=require('mongoose');
var geolocation = require('geolocation')
const storage=multer.memoryStorage();
const upload=multer({storage:storage})
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');

config.dev = process.env.NODE_ENV !== 'production'


async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  const serve=app.listen(port, host)


const io=require('socket.io')(serve);
var count=0;
var nsp=io.of('/About');
nsp.on('connection',(socket)=>{

  count++;

  
  console.log('someone is connected');

  io.of('About').emit('usersno',count);
  
  


//hearing on usermsg event
  socket.on('usermsg',(data)=>{
    console.log(data);
    // io.of('About').emit('msg',data);
    socket.broadcast.emit('msg', data);
  })

//disconnect basic
  socket.on('disconnect',(socket)=>{
    console.log('User is disconnected');
    count--
  })









  

});



  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

app.get('/userimgarray',(req,res)=>{
  console.log("this is from the axios1");
  res.json("this is dummy string")
  // res.body(array1);
  // console.log(res);

  
})
//nodemailer
const confirmation_email=require("../nodemailer/nodemailer1");



app.get("/nodemailer",(req,res)=>{
  console.log("this is from index.js nodemailer");
  confirmation_email();
  res.send("send");
});


//verification


//mongoose


// mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},
//   function(error,link){
//     assert.equal(error,null,"this is error");
//     console.log("Db is connected", link);
//   }
//   )



// const schemamodel=mongoose.Schema({
//   name:String,
//   password:String,
//   email:String
// })


// const Session=mongoose.model('Session_data',schemamodel);
// const obj={
//   name:'kapil',
//   email:'kapil@gmail.com',
//   password:'kapil@123'

// }
// obj.save(function(err){
//   if(err){
//     console.log("this is an error",error)
//   }
//   console.log("Saved successfully");
// })






















app.post("/verification",async(req,res)=>{
  console.log("inside of verification");
 const crediantials=req.body;
  console.log("This is user crediantials",req.body);

//   var result=  new Promise(resolve,reject){

//       resolve(mongodb1.connect_to_database(crediantials,1));
//   }

//  .then(function(resp){
//     console.log("this is the function",resp);
//   })
// result.catch(function(e){
//     console.log("this is error ",e);
//   })
//   setTimeout(()=>{
//     console.log("the value in the result is as following",result)
//   },20000);

// function fun(){
//   return new Promise((resolve,reject)=>{
//     console.log("inside of the fun");
//     resolve("hi");
//   })
// }


  
  




const result=await mongodb1.connect_to_database(crediantials,1)
.then((value)=>{

  console.log("this is value from the .then result",value);


  if(value=="success")
  {
    console.log("this si success")
    const otp=Math.floor((Math.random())*(Math.pow(10,10)));
    const OTPDETAILS={
        OTP:otp,
        credentials:crediantials
    }
 return new Promise(async(resolve,reject)=>{

 
  const send_email=await  confirmation_email(OTPDETAILS);

  const sendval=await send_email;
  console.log("sendval");
  resolve({sendval:sendval,credentials:crediantials,otp:otp});
 })
}
else{
  console.log("this is not possible");

}
})
.then((data)=>{
  console.log("data chaining",data);
  const username=data.credentials.username;
  const userdetails={
    OTP:data.otp,
    username:username
    
  }
return new Promise(async(resolve,reject)=>{
  console.log("this is inside of the .then chaining");
  if(data.sendval=='sent'){
    console.log("this is data",data);

    const storeOtp=await mongodb1.connect_to_database(userdetails,4);
    resolve(data);
  }
})
})

.catch((error)=>{
  console.log("this is error ",error);
})






















  res.send("working");
})





app.post("/yourlocation",async (req,res)=>{

 console.log("hi");
 
 if('geolocation' in navigator) {
  console.log("geolocation is available");
  // navigator.geolocation.getCurrentPosition((position) => {
  //   console.log(position.coords.latitude, position.coords.longitude);
  // });
console.log(navigator);
} else {
  console.log("not available")
}

})
app.post('/OTP_verification',async(req,res)=>{

console.log("Inside of index.js of the /OTP section");
const OTP=req.body;
console.log("res",req.body);
const OTPverify=await mongodb1.connect_to_database(OTP,2)
.then((data)=>{

  if(data=='success'){
    
  console.log("this is data of otp",data);
  return new Promise(async(resolve,reject)=>{
    console.log("on the way to insert data");
    const credentials=req.body.userdata;
    const insertdata=await mongodb1.connect_to_database(credentials,3);
    resolve("registered");
  })
} 

})
.then((data)=>{
  console.log("the user is registered",data);
})
.catch((e)=>{
  console.log("this is otp error",e);
})


})






app.use(session({
  secret: 'kapil',
  resave: false,
  saveUninitialized: true,
  cookie:{expires:3600*1000*24*7}
}))




app.post('/session',(req,res)=>{


  

  // app.use(session({
  //   secret: 'keyboard cat',
  //   resave: true,
  //   saveUninitialized: true,
  //   maxAge:1000*10,
  //   cookie:{expires:10*1000
  //   },
  //   store:new MongoStore({url:"mongodb+srv://Kapil:Kapil@123@nuxt1.cl5ei.mongodb.net/Userdata?retryWrites=true&w=majority",
  // dbName:'Session_data'})
  
    
  // }))



 

  
console.log("this is session",req.session);


})

app.post('/user',(req,res)=>{
  console.log("this is form the happy portion");
const userinfo=req.body;
  

const uri = "mongodb+srv://Kapil:Kapil@123@nuxt1.cl5ei.mongodb.net/Userdata?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("Userdata").collection("Signininfo");
  // perform actions on the collection object
  collection.insertOne(userinfo);
  // collection.findOne({_id:"1"},function(err,result){
  //   if(err) throw err;
  //   console.log(result);
    client.close();
  // });
  

});
console.log(userinfo,"this is ip adderss");

  
})

app.post("/url",upload.single("userImage"),(req,res)=>{
  if(req.file ==undefined || req.body.userName=="" || req.body.userPassword==""){

    console.log("this is from the file"+req.file);

      res.send("invalid user name or password ");


  }
  else{

    console.log("begining of the else loop");
    console.log(req.body.userName);
// console.log(req.body.userName,req.file);
// const base64img=req.file.buffer.toString('base64');
// console.log(req.ip);

// fs.writeFile("./multer/multer2",base64img,{encoding:'base64'},function(e){
//   if(e){
//     console.log(`error occured ${e}`);
//   }
//   else{
    
//     console.log('file is created');
//   }
// })



// mongodb connection

var userinfo={
  _id:10,
  name:req.body.userName,
  password:req.body.userPassword,
  userimg:req.file
}
console.log("hi this is after from the userinfo obj");

const uri = "mongodb+srv://Kapil:Kapil@123@nuxt1.cl5ei.mongodb.net/Userdata?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(async err => {
  const collection = client.db("Userdata").collection("Signininfo");
  // perform actions on the collection object
  // collection.insertOne(userinfo);
  // collection.findOne({_id:"1"},function(err,result){
  //   if(err) throw err;
  //   console.log(result);
  console.log("this is before the collection block");
  const val=await  collection.find({},{projection:{_id:0,name:0,password:0}}).toArray(function(err, docs) {
    // assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    // callback(docs);
  });

  console.log(val);
  const buff=val.userimg.buffer.buffer;
 
  // console.log(buff.buffer.buffer);

  


  //multer working






const base64img=buff.toString('base64');
console.log(req.ip);
const arrays=[base64img];

console.log("this is from the multer above position");


const array=multerfun(arrays,req);

console.log("this is from the multer below position");


console.log("this is from the array block "+ array);
console.log(",,,....",array);


    client.close();
  // });
});
  



 


// const userip=req.ip;
// const time=Date.now();

// fs.writeFile('./multer/'+userip+time+'.png', base64img, {encoding: 'base64'}, function(err) {
//     console.log('File created');
// });


res.send('hi');

 
}

})

start()

