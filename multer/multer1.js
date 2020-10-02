const array1=[];

const result_array=[];

const fs=require('fs');



const multerfun=function(array1,req){
    var i,j,k;
    const array=[];

    for(i=0;i<array1.length;i++){

        const userip=req.ip;
        const time=Date.now();
        
        const filename='./'+userip+time+'.png';
        console.log(userip);
        
        fs.writeFile('./multer/images/'+userip+time+'.png', array1[i], {encoding: 'base64'}, function(err) {
            console.log(filename);
            array.push(filename);
            
            
            console.log('File created');
            console.log(array);
           
        });
        








    }


    return array;

}




module.exports=multerfun;