var express = require('express');
var router = express.Router();
let path    = require('path');
const publicPath = path.join(__dirname, '..', 'public','1739013.mp4');
var ruta='./1739013.mp4';
/* GET home page. */
router.get('/', function(req, res, next) {
  
  if (req.url != "/1739013.mp4") {
    res.render('index', { title: 'Express', videoSrc:`${ruta}` });
  }else {
    var file = path.join(__dirname,'..','public','1739013.mp4');
    fs.stat(file, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          return res.sendStatus(404);
        }
      res.end(err);
      }
      var range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
  }
});

module.exports = router;
