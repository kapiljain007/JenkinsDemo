var nodemailer = require("nodemailer");
var transport = nodemailer.createTransport({
	service: 'Gmail',
    auth: {
        user: "vujkdkolks@gmail.com",
        pass: "Test@123"
    }
});
var mailOptions = {
    from: 'vujkdkolks@gmail.com', // sender address
    to: 'thisisqa2108@gmail.com', // list of receivers
    subject: 'Automation Result', // Subject line
	//text: info.body,
    text: 'Contains the test result for the smoke test in html file', // plaintext body
    attachments: [
        {
            'path': 'file:///C:/Testing/Automation_Generic_Framework/Automation_Generic_Framework/Pie-Chart%20Report/chrome-test-report.html',
        }]
};
transport.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
		response.send(err);
    } else {
        console.log("Message sent: " + info.response);
		response.send(info);
    }
});
