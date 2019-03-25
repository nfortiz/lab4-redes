const router = require('express').Router();
const path =require('path');
const fs=require('fs');

var pathVideo= path.join(__dirname,'..','public','1739013.mp4');
router.get('/',(req, res)=>{
    res.writeHead(200,{'Content-Type':'video/mp4'});
    var rs=fs.createReadStream(pathVideo);
    rs.pipe(res);
});
module.exports=router;