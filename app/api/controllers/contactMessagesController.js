const model = require('../models/contactusModel');

//Mail-Gun Credentials

var api_key = '0a7830de77d7b8e450837aa41ee79217-a09d6718-43300a90';
var domain = 'sandbox714808b8fbd24b17ad25481a2eca5f5c.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

//Mail-Gun Credentials


module.exports = {
    addMessage: function(req, res, next){
        model.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,
            message: req.body.message
        }, function(err, data){
            if(err){
                next(err);
            } else{
                res.json({
                    status: true,
                    message: "Your Message Sent Successfully!",
                    data: null
                });
            }
        });
    },
    getAllMessages: function(req, res, next){
        model.find({}, function(err, result){
            if(err){
                next(err);
            } else {
                res.json({
                    status: true,
                    message: "Messages Found!",
                    data: {data: result}
                })
            }
        })
    },

    SendEmail: (req,res)=>{
        console.log(req.body);
        var _SendEmailData=`
        <div style="background-color: #cf8d2e; border-radius: 5px;font-weight: bolder;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color:white">
        <ul>
            <li>SenderName: ${req.body.firstname}</li>
            <li>SenderEmail: ${req.body.email}</li>
            <li>SenderPhone: ${req.body.phone}</li>
            <li>Address: ${req.body.address}</li>
        </ul>
        <u>
        <li><h2>SenderMessage</h2></li>
        <li><p>${req.body.message}</p></li>
        </ul>
        </div>
        `;
        var Data = {
            from: req.body.email,
            to: 'southfittedwardrobesandkitchen@gmail.com',
            subject: req.body.subject,
            html:_SendEmailData
        };
           
          mailgun.messages().send(Data, async(error,body)=>{
              try {
                res.json({
                    Message:"We Have Recieved Your Email We WIll Get Back To You Ass Soon As Possible",
                    Data:body
                  });
              } catch (err) {
                res.json({
                    Message:`We Have Not Recieved Your Email Because of ${err.message}`,
                    Data:error
                  });
              }
          });

    }
}