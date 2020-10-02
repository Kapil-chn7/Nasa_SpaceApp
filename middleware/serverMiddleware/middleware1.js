
export default function(req,res,next){
const userdata=[];
const name_pass={
    name:req.body.name,
    password:req.body.password
}
 console.log(name_pass);

 
// const MongoClient = require('mongodb').MongoClient;
// const { ClientEncryption } = require('mongodb-client-encryption');
// const uri = "mongodb+srv://Kapil:Kapil@123@nuxt1.cl5ei.mongodb.net/Userdata?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true,
//     autoEncryption: {
//         kmsProviders: {
//           aws: {
//             accessKeyId: AWS_ACCESS_KEY,
//             secretAccessKey: AWS_SECRET_KEY
//           }
//         }
//       } });
// client.connect(err => {
//   const collection = client.db("Userdata").collection("Signininfo");
//   // perform actions on the collection object
//   client.close();
// });








}