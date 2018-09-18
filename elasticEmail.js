const eeClient = require('elasticemail-webapiclient').client;
const express = require("express");
const bodyPaser = require('body-parser');


const app = express();

app.use(bodyPaser());




// Create your Elastic Email Account 
// https://elasticemail.com/account/#/create-account


// Or login in your account
// https://elasticemail.com/account/


// after login/signUp you need to get your apiKey from this link 
// https://elasticemail.com/account/#/settings/apiconfiguration



app.post("/sendMail", (req, res) => {

    let reqbody = req.body;

    const options = {
        apiKey: 'YOUR API KEY',
        apiUri: 'https://api.elasticemail.com/',
        apiVersion: 'v2'
    }

    const EE = new eeClient(options);

    // Load account data
    EE.Account.Load().then(function (resp) {
        console.log(resp);
    });


    let emailParams = {
        "subject": "YOU EMAIL SUBJECT",
        "to": "Reciever Email",
        "from": "Your registered Email on Elastic email",
        "body": "You can give any text or html code to send",
        "fromName": "your name/ app name",
        "bodyType": 'text or html depends on your body'
    };
//  you can make it dynamic by using reqBody object by using fetch() method 
// in fetch() method, make method : "POST" 
// and then send reciever email in body object in fetch() method  


    // Send email
    EE.Email.Send(emailParams)
        .catch((err) => {
            throw new Error(err);
        });

    res.send("!!---email Sended---!!")
});


app.listen(process.env.PORT || 5000, () => {
    console.log("listnig")
})
