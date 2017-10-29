const   express = require("express"),
        app = express(),
        multer = require("multer"),
        mime = require('mime'),
        bodyParser=require("body-parser");

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
      callback(null, './uploads/');
      },
      filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype)); 
      }
    });
    var upload = multer({ storage : storage }).array('userPic');
app.get('/',function(req,res){
	    res.sendFile(__dirname + '/form.html');
})


app.post("/upload", function(req, res){
    upload(req,res,function(err) {
        console.log(req.files);
    });
});

app.listen('3000',()=>{
    console.log(`running on port `+3000);
});