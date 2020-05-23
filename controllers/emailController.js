const nodemailer = require("nodemailer");

var methods = {
  jobNotification: function (receiver, job, tag_string) {
    const output = `
    <header style="background-color: #40735B; width: 900px; height: 100px; text-align: center; 
       padding-top: 15px;">
       <img src="/images/logo/icb_logo_f_w.svg" style="width: 300px; height: auto;">  
    </header>
    
    <div style="padding-left: 50px; padding-bottom: 50px; padding-top: 20px;">
    <h4 style="color: #40735B;">New Jobs that have been updated in the tags you follow are shown below!</h4>
    <h3 style="color: #4B8699;">${job.title}</h3>
    <p>${job.description}</p>
    <a href="https://incubeta.herokuapp.com${job.url}">Click here to see more details</a>
    <h4>${tag_string}</h4>
    </div>
    <div style="padding-left: 50px;">
    <p style="color: #40735B;">To unsubscribe from these updates, please change the settings in your InCuBeta user profile.</p>
    </div>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "incubeta.notify@gmail.com",
        pass: "incubeta123",
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: "incubeta.notify@gmail.com", // sender address
      to: receiver.email, // list of receivers
      subject: "InCuBeta: New job posted in one of your followed tags!", // Subject line
      html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  },
  userNotification: function (receiver, sender, message) {
    const output = `
    <header style="background-color: #40735B; width: 900px; height: 100px; text-align: center; 
       padding-top: 15px;">
       <img src="public/images/logo/icb_logo_f_w.svg" style="width: 300px; height: auto;">  
    </header>
    
    <div style="padding-left: 50px; padding-bottom: 50px; padding-top: 20px;">
    <h3 style="color: #40735B;">User: ${sender.first_name} ${sender.family_name} is enquiring for your information:</h3>
    <p>${message}</p>
    <h4 style="padding-top: 30px; color: #4B8699;">Take this opportunity to connect with User: ${sender.first_name}!</h4>
    <h4>Reply to them via their email below!</h4>
    <p style="margin-top: -10px;">User: ${sender.email}</p>
    </div>
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "incubeta.notify@gmail.com", 
        pass: "incubeta123", 
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: "incubeta.notify@gmail.com", // sender address
      to: receiver.email, // list of receivers
      subject: "InCuBeta: A user has enquired for your information!", // Subject line
      html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
  },
};

exports.data = methods;
