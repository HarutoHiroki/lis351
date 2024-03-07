exports.handler = async (event, context) => {
  const { name, email, phone, message } = JSON.parse(event.body);

  // Send an email notification
  const formData = require('form-data');
  const Mailgun = require('mailgun.js');
  const mailgun = new Mailgun(formData);
  const api_key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  const mg = mailgun.client({username: 'api', key: api_key});
  await mg.messages.create(domain, {
    from: `Phong Do <mailgun@${domain}>`,
    to: ["pdo2@wisc.edu"],
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage:\n\n${message}`
  });

  // Return a success response
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Form submission successful' })
  };
};