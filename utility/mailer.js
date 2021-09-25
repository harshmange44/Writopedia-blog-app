var nodemailer = require('nodemailer');

module.exports.welcome = function(name, mail, host, token) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD            
        }
    });

    var mailOptions = {
        from: 'Writopedia <writopedia.write@gmail.com>',
        to: mail,
        subject: 'Welcome to Writopedia!!',
        html: '<head></head><body bgcolor="black"><div><div style="text-align:center; mid-width:375px; min-height:50px; padding-left:20px; padding-right:20px; max-width:600px; margin:auto; padding-top:10px"><img src="https://drive.google.com/uc?id=18NrNvZLn1K3AGx_KuPETo0eKCoUMyI7s" alt="Writopedia" style="max-width:150px; border:5px; border-color:white; margin:20px;"></div><div align="center" style="background-color:#FFFFFF; padding-left:20px; padding-right:20px; max-width:550px; margin:auto; border-radius:5px; padding-bottom:5px; text-align:left; margin-bottom:40px; width:80%"> '
               + '<h2 style="padding-top:25px; min-width:600; align:center; font-family:Roboto">'
                + ' Hi, '+name+'! </h2>'
               + '<p style="max-width:500px; align:center; font-family:Roboto; padding-bottom:0px; wrap:hard; line-height:25px">'
                + ' Thanks for creating an account with Writopedia! We&#39;re excited to have you get started.' 
               + '</p>'
               + '<p style="max-width:500px; align:center; font-family:Roboto-Bold; padding-bottom:0px; wrap:hard">'
               + 'Please verify your email using the link below (expires in 24 hr):\n'
               + '</p>'
            //    + '<h1 style="font-family:Roboto-Bold; letter-spacing:5px; margin-bottom:0px">'
            //    00000000
            //                </h1>
           
              + '<br /><br /><a href="https:\/\/' + host + '\/verification\/confirmation\/' + mail + '?token=' + token + '\n" style="width:100px; background-color:yellow; font-family:Roboto-Bold; font-color:white; padding-top:15px; padding-bottom:15px; padding-left:15%; padding-right:15%; border-radius:30px; text-decoration:none; color:white; font-size: 18px; font-weight: bolder; display: block;">'
              + 'Verify Email'
              + '</a> <br /><br />'
               + '<p style="max-width:500px; align:center; font-family:Roboto; padding-bottom:0px; wrap:hard">'
               +   'Thank you,'
               + '</p>'
               + '<p style="max-width:500px; align:center; font-family:Roboto; padding-bottom:20px; wrap:hard">'
                +  'Team Writopedia'
               + '</p style="color:black">'
               + '<hr>'
               + '</hr>'
               + '<p style="max-width:100%; align:center; font-family:Roboto; padding-bottom:10px; wrap:hard; padding-top: 0px; font-size:10px">'
               + 'You’re receiving this email because you recently created a new account on Writopedia. If this wasn’t you, please ignore this email.'
               + '</p>'
              + '</div>'
          + '</div>'
        + '</body>'

    };
          
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent...');
        }
    })
};

module.exports.resendVerificationEmail = function(name, mail, host, token) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'Writopedia <writopedia.write@gmail.com>',
        to: mail,
        subject: 'Account Verification Link',
        html: '<head></head><body bgcolor="black"><div><div style="text-align:center; mid-width:375px; min-height:50px; padding-left:20px; padding-right:20px; max-width:600px; margin:auto; padding-top:10px"><img src="https://drive.google.com/uc?id=18NrNvZLn1K3AGx_KuPETo0eKCoUMyI7s" alt="Writopedia" style="max-width:150px; border:5px; border-color:white; margin:20px;"></div><div align="center" style="background-color:#FFFFFF; padding-left:20px; padding-right:20px; max-width:550px; margin:auto; border-radius:5px; padding-bottom:5px; text-align:left; margin-bottom:40px; width:80%"> '
               + '<h2 style="padding-top:25px; min-width:600; align:center; font-family:Roboto">'
                + ' Hi, '+name+'! </h2>'
               + '<p style="max-width:500px; align:center; font-family:Roboto-Bold; padding-bottom:0px; wrap:hard">'
               + 'Please verify your email using the link below (expires in 24 hr):\n'
               + '</p>'
              + '<br /><br /><a href="https:\/\/' + host + '\/verification\/confirmation\/' + mail + '?token=' + token + '\n" style="width:100px; background-color:yellow; font-family:Roboto-Bold; font-color:white; padding-top:15px; padding-bottom:15px; padding-left:15%; padding-right:15%; border-radius:30px; text-decoration:none; color:white; font-size: 18px; font-weight: bolder; display: block;">'
              + 'Verify Email'
              + '</a><br /><br />'
               + '<p style="max-width:500px; align:center; font-family:Roboto; padding-bottom:0px; wrap:hard">'
               +   'Thank you,'
               + '</p>'
               + '<p style="max-width:500px; align:center; font-family:Roboto; padding-bottom:20px; wrap:hard">'
                +  'Team Writopedia'
               + '</p style="color:black">'
               + '<hr>'
               + '</hr>'
              + '</div>'
          + '</div>'
        + '</body>'
    };
          
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent...');
        }
    })
};

module.exports.feedback = function(name, mail, feedback) {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: 'Writopedia <writopedia.write@gmail.com>',
        to: mail,
        subject: 'We Got You!!!',
        html: '<head><link rel="preconnect" href="https://fonts.googleapis.com">'
        + '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        + '<link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet"> </head><body bgcolor="black"><div><div style="text-align:center; mid-width:375px; min-height:50px; padding-left:20px; padding-right:20px; max-width:600px; margin:auto; padding-top:10px"><img src="https://drive.google.com/uc?id=18NrNvZLn1K3AGx_KuPETo0eKCoUMyI7s" alt="Writopedia" style="max-width:150px; border:5px; border-color:white; margin:20px;"></div><div align="center" style="background-color:#FFFFFF; padding-left:20px; padding-right:20px; max-width:550px; margin:auto; border-radius:5px; padding-bottom:5px; text-align:left; margin-bottom:40px; width:80%"> '
        + '<h2 style="padding-top:25px; min-width:600; align:center; font-family:Roboto">'
         + ' Hello, '+name+'! </h2>'
        + '<p style="max-width:500px; align:center; font-family:Roboto; padding-bottom:0px; wrap:hard; line-height:25px">'
         + ' I hope you are doing good and our product is helping you to make yourself better day-by-day. <br/><br/> We&#39;ve just received your message. We really value your input, and I hope you&#39;ll stop by and say hi the next time you are in.' 
        + '</p>'
        + '<hr style="margin-top: 2em; background: blue;">'
        + '<p>Sincerely,</p>'
        + '<p style="font-family: `Dancing Script`, cursive; font-size: 2.5em; margin: 0;">Harsh</p>'
        + '<p><em>Harsh M.</em>'
        + '<br>Founder - Writopedia</p>'
       + '</div>'
   + '</div>'
 + '</body>'
        
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent...');
        }
    })
};