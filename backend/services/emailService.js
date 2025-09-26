const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  /**
   * Initialize the email transporter based on environment configuration
   */
  initializeTransporter() {
    try {
      // Check if email credentials are provided
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️  Email credentials not configured. Email functionality will be disabled.');
        console.log('   Please set EMAIL_USER and EMAIL_PASS in your .env file');
        return;
      }

      // Gmail configuration (most common)
      if (process.env.EMAIL_SERVICE === 'gmail') {
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS // Use App Password for Gmail
          }
        });
      }
      // Outlook/Hotmail configuration
      else if (process.env.EMAIL_SERVICE === 'outlook') {
        this.transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
      }
      // Custom SMTP configuration
      else if (process.env.SMTP_HOST) {
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT || 587,
          secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          tls: {
            rejectUnauthorized: false // For self-signed certificates
          }
        });
      }
      // Default to Gmail if no specific configuration
      else {
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
      }

      console.log('✅ Email transporter initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize email transporter:', error.message);
    }
  }

  /**
   * Send contact form email
   * @param {Object} contactData - Contact form data
   * @returns {Promise<Object>} - Result object with success status
   */
  async sendContactEmail(contactData) {
    try {
      if (!this.transporter) {
        console.log('⚠️  Email service not available - transporter not initialized');
        return {
          success: false,
          error: 'Email service not configured. Please set up email credentials.'
        };
      }

      const { name, email, subject, message } = contactData;

      // Email to portfolio owner (you)
      const ownerEmailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Your email
        subject: `Portfolio Contact: ${subject}`,
        html: this.generateOwnerEmailTemplate(name, email, subject, message),
        replyTo: email // Allow direct reply to the sender
      };

      // Confirmation email to the sender
      const confirmationEmailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Ahmed Mohamed Hamed',
        html: this.generateConfirmationEmailTemplate(name, subject)
      };

      // Send both emails
      const [ownerResult, confirmationResult] = await Promise.all([
        this.transporter.sendMail(ownerEmailOptions),
        this.transporter.sendMail(confirmationEmailOptions)
      ]);

      console.log('✅ Contact emails sent successfully');
      console.log('📧 Owner email message ID:', ownerResult.messageId);
      console.log('📧 Confirmation email message ID:', confirmationResult.messageId);

      return {
        success: true,
        messageId: ownerResult.messageId,
        confirmationMessageId: confirmationResult.messageId
      };

    } catch (error) {
      console.error('❌ Failed to send contact email:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Generate HTML template for email sent to portfolio owner
   */
  generateOwnerEmailTemplate(name, email, subject, message) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #2563eb; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; border-left: 4px solid #2563eb; }
          .message-content { white-space: pre-wrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 New Contact Form Submission</h2>
            <p>Someone has contacted you through your portfolio website!</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">👤 Name:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">📝 Subject:</div>
              <div class="value">${subject}</div>
            </div>
            <div class="field">
              <div class="label">💬 Message:</div>
              <div class="value message-content">${message}</div>
            </div>
            <div class="field">
              <div class="label">⏰ Received:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Generate HTML template for confirmation email sent to sender
   */
  generateConfirmationEmailTemplate(name, subject) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>✅ Message Received!</h2>
            <p>Thank you for reaching out</p>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for contacting me through my portfolio website. I have received your message regarding "<strong>${subject}</strong>" and I will get back to you as soon as possible.</p>
            <p>I typically respond within 24-48 hours. If your inquiry is urgent, please don't hesitate to reach out through other channels.</p>
            <p>Best regards,<br>
            <strong>Ahmed Mohamed Hamed</strong><br>
            Software Developer</p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
            <p>© 2024 Ahmed Mohamed Hamed. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Test email configuration
   */
  async testConnection() {
    try {
      if (!this.transporter) {
        throw new Error('Email transporter not initialized');
      }

      await this.transporter.verify();
      console.log('✅ Email service connection verified successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Email service connection failed:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
module.exports = new EmailService();
