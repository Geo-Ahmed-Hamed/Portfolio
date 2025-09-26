// Netlify serverless function for contact form
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Method not allowed'
      })
    };
  }

  try {
    // Parse request body
    const { name, email, subject, message } = JSON.parse(event.body || '{}');

    // Basic validation
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'All fields are required'
        })
      };
    }

    if (name.length < 2 || name.length > 50) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Name must be between 2 and 50 characters'
        })
      };
    }

    if (subject.length < 5 || subject.length > 100) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Subject must be between 5 and 100 characters'
        })
      };
    }

    if (message.length < 10 || message.length > 1000) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Message must be between 10 and 1000 characters'
        })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: 'Please provide a valid email address'
        })
      };
    }

    // Log the submission
    console.log(`Contact form submission from: ${name} (${email})`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    // Send email using Nodemailer
    try {
      const nodemailer = require('nodemailer');
      
      // Create transporter (using environment variables)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Email to portfolio owner
      const ownerEmailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Portfolio Contact: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Received: ${new Date().toLocaleString()}</em></p>
        `,
        replyTo: email
      };

      // Confirmation email to sender
      const confirmationEmailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Ahmed Mohamed Hamed',
        html: `
          <h2>Thank you for your message!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for contacting me through my portfolio website. I have received your message regarding "<strong>${subject}</strong>" and I will get back to you as soon as possible.</p>
          <p>I typically respond within 24-48 hours. If your inquiry is urgent, please don't hesitate to reach out through other channels.</p>
          <p>Best regards,<br>
          <strong>Ahmed Mohamed Hamed</strong><br>
          Software Developer</p>
          <hr>
          <p><em>This is an automated confirmation email. Please do not reply to this message.</em></p>
        `
      };

      // Send both emails
      await Promise.all([
        transporter.sendMail(ownerEmailOptions),
        transporter.sendMail(confirmationEmailOptions)
      ]);

      console.log('✅ Emails sent successfully');

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Thank you for your message! I will get back to you soon.'
        })
      };

    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      
      // Still return success to user, but log the error
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Thank you for your message! I will get back to you soon.'
        })
      };
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: 'Internal server error. Please try again later.'
      })
    };
  }
};
