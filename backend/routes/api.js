const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const nodemailer = require("nodemailer");
const multer = require('multer');
const sendgridTransport = require('nodemailer-sendgrid-transport');


////////////////////////////// DATABASE CONNECTION ///////////////////////////////////
const {Pool,Client}=require('pg')
const connectionString='postgressql://postgres:password@localhost:5432/test'
const client=new Client({
  connectionString:connectionString
})
client.connect()
client.on("connect",()=>{
  console.log("db connection");
})

//////////////////////////////  LOGIN   ///////////////////////////////////////
router.post('/login', (req, res) => {
  let userData = req.body;
  var email  = userData.email;
  var password = userData.password;

  console.log(userData);

  client.query(`SELECT * FROM add WHERE email = $1`,[userData.email] ,(err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );
    } else {


      if (results &&results.rows.length >0) {

        if ( results.rows[0].password == password) {
              let token=jwt.sign(results.rows[0],'secret',{expiresIn:'5h'})
             console.log(results.rows[0].password );

          return res.status(200).send({'name':results.rows[0].name, token:token});

        }
         else {
            return res.status(401).send({ 'error':  'Invalid password' });
        }
      } else{
          return res.status(404).send('Sorry username does not exits');
      }
    }
  });
});  //post

///////////////////////////// SEND MAIL ////////////////////////////

router.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  console.log(user.email);

client.query("SELECT id FROM add WHERE email = $1",[user.email],(err, results) => {
    if (results &&results.rows.length >0) {
    var id=results.rows[0].id;

   var resetLink=`http://localhost:4200/resetpassword/`+results.rows[0].id;


   let htmlTemp=`
   <h1>Hi `+user.email+`</h1><br>
   <h3>Please click on the below button</h3>
   <br><br>
   <a target="_blank" href="`+resetLink+`"  style="color:#FFFFFF;
   font-size:17px;width:200px;font-weight:normal;line-height:42px;
   font-family:Arial, Helvetica, sans-serif;text-align:center;
   text-decoration:none;background-color:#2ecc71;padding:10px;"
   rel="nofollow">Reset password</a>

   `
   ;
//create reusable transporter object using default SMTP transport
let transporter=nodemailer.createTransport(
  sendgridTransport({
    auth:{
      api_key:"your_key"

    }
  })
)

let mailOptions={
  from:'ghck0@gmail.com',
  to: user.email,
  subject:"Welcome",
  html:htmlTemp,
}

//send mail with defined transport object
transporter.sendMail(mailOptions, function(err,info){
  if (err ){
      console.log('error');
    }
    else {
        return res.status(200).send();
    }
  })//transporter end

}//if end
}) //select end

})

//////////////////////////     RESET PASSWORD  ////////////////////////////

router.put('/update/:id', (req, res) => {
  let userData = req.body;
    console.log(userData);
    var id=req.params.id;

    var password=userData.password;

client.query("UPDATE add SET password=$1 WHERE id=$2",
[password,req.params.id],
 (err, results, fields) => {

    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );
    } else{

            return res.status(200).send(results);
    }
  })
});
//////////////////////////// SELECT /////////////////////////////

router.get('/select',verifyToken, (req, res) => {
  let userData = req.body;
    console.log(userData);
    var id=userData.id;
    var title = userData.name;
    var description=userData.description;
    var img=userData.img;
console.log(img)
  client.query("SELECT * FROM news ",(err, results) => {

    if (err) {
      console.log("err");
      return res.status(500).send( {'error' :'Invalid'} );
    } else {
      console.log(results);
      return res.send(results.rows);


    }
  });//client
});
var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;

  jwt.verify(token,'secret', function(err, tokendata){
    if(err){
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      decodedToken = tokendata;
      console.log("verified");
      next();
    }
  })
}
/////////////////////////////Home select/////////////////
router.get('/selectnews', (req, res) => {
  let userData = req.body;
    console.log(userData);
    var id=userData.id;
    var title = userData.title;
    var img=userData.img;
console.log(img)
  client.query("SELECT * FROM news ",(err, results) => {

    if (err) {
      console.log("err");
      return res.status(500).send( {'error' :'Invalid'} );
    } else {
      console.log(results);
      return res.send(results.rows);


    }
  });//client
});
/////////////////////////////////// File Upload //////////////////

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
      // const name = file.originalname.toLowerCase().split(' ').join('_');
      name="image";
      const ext = MIME_TYPE_MAP[file.mimetype];
        callBack(null, name+ '-'+ Date.now()+ '.'+ ext)
    }
  })
  const upload = multer({ storage: storage })
  router.post('/add', upload.single('file'),(req, res)=>{
// let url=("F:/newsproject/backend/uploa")
        const url = req.protocol + '://'+ req.get("host");
        // const path=`${__dirname}/uploads`

                let userData = req.body;
                var title = userData.title;
                var description=userData.description;
        console.log(userData.title)
                var img= url + "/uploads/"+ req.file.filename;
       console.log(img)
       client.query("select * from news where title=$1 ",
       [userData.title],(err, results) => {
          if (err) {
          return res.status(500).send( {'error' :'Invalid'} );
       }
       else{
         client.query("Insert into news (title,description,img) Values ($1,$2,$3)",
         [title,description,img],(err, results) => {

           if (err) {
             console.log("err");
             return res.status(500).send( {'error' :'Invalid'} );
           } else {
             console.log("done");
             return res.status(200).send();


           }
         })

       }
         })

})//add
// })


//////////////////////////EDIT/////////////////////////////////
router.get('/selectone/:id', (req, res) => {
  let userData = req.body;

    var id=req.params.id;
    console.log(id);
    var title = userData.title;
    var description=userData.description;


    client.query(`SELECT * FROM news WHERE id = $1`,[req.params.id] ,(err, results) => {

    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );
    } else{


      return res.send(results.rows);
    }
  })
});

//////////////
const upload1 = multer({ storage: storage })
router.put('/updateuser/:id', upload1.single('file'),(req, res)=>{

      const url = req.protocol + '://'+ req.get("host");
              let userData = req.body;
              var id=req.params.id;
              var title = userData.title;
              var description=userData.description;
      console.log(userData.title)
              var img= url + "/uploads/"+ req.file.filename;
     console.log(img)
     client.query("select * from news where title=$1 ",
     [userData.title],(err, results) => {
        if (err) {
        return res.status(500).send( {'error' :'Invalid'} );
     }
     else{

       client.query("UPDATE news SET title=$1, description=$2, img=$3 WHERE id=$4",
       [title,description,img,req.params.id],(err, results) => {

         if (err) {
           console.log("err");
           return res.status(500).send( {'error' :'Invalid'} );
         } else {
           console.log("done");
           return res.status(200).send();


         }
       })
     }
   })

})
////////////////SEARCH DATA/////////////
router.get('/searchData', (req, res) => {
  let userData = req.body;
  search = req.query.search
    console.log(userData);
    var searchUser= "SELECT * FROM news WHERE title LIKE '%' || $1 || '%' OR description LIKE '%' || $1 || '%' "


         client.query(searchUser,[search],(err, results) => {

        if (err) {
          console.log(err);
          return res.status(500).send( {'error' :'query does not exist'} );
        } else{

                return res.status(200).send(results.rows);
        }
      })

  })


/////////////////////////////PAGINATION ///////////////////////////
router.get('/paging/:offset/:limit', (req, res) => {
  let offset = req.params.offset;
   let limit = req.params.limit;
  console.log("off",offset);
    console.log("limit",limit);
    var paging=`SELECT * FROM news OFFSET $1 LIMIT $2 `;
     client.query(paging,[offset,limit],(err, results) => {

  // console.log(rows);
    if (err) {
      console.log(err);
      return res.status(500).send( {'error' :'Sorry username does not exits'} );
    } else{
console.log("result", results.rows);
      return res.send(results.rows);
    }
  })
});



module.exports = router;
