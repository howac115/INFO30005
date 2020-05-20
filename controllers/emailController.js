const nodemailer = require("nodemailer");

var methods = {
  jobNotification: function (receiver, job, tag_string) {
    const output = `
    <h3>${job.title}</h3>
    <p>${job.description}</p>
    <a href="https://incubeta.herokuapp.com${job.url}">Click here to see more detail</a>
    <h4>${tag_string}</h4>
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
    <h3>User: ${sender.first_name} ${sender.family_name} (${sender.email}) is enquiring for your information:</h3>
    <h4>${message}</h4>
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
