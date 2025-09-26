# Portfolio Backend - Email Service

A Node.js backend API for handling contact form submissions and sending emails using Nodemailer.

## 🚀 Features

- **Contact Form API**: Secure endpoint for processing contact form submissions
- **Email Service**: Automated email sending with HTML templates
- **Rate Limiting**: Protection against spam and abuse
- **Input Validation**: Comprehensive form validation
- **CORS Support**: Cross-origin resource sharing for frontend integration
- **Security**: Helmet.js for security headers
- **Error Handling**: Robust error handling and logging

## 📁 Project Structure

```
portfolio-backend/
├── server.js              # Main Express server
├── services/
│   └── emailService.js    # Email service with Nodemailer
├── package.json           # Dependencies and scripts
├── env.example           # Environment variables template
└── BACKEND_README.md     # This file
```

## 🛠️ Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your email configuration
   nano .env
   ```

3. **Email Configuration**

   Choose one of the following email service options:

   ### Option 1: Gmail (Recommended)
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

   **Gmail Setup:**
   - Enable 2-Factor Authentication
   - Generate an App Password: [Google App Passwords](https://support.google.com/accounts/answer/185833)
   - Use the App Password (not your regular password)

   ### Option 2: Outlook/Hotmail
   ```env
   EMAIL_SERVICE=outlook
   EMAIL_USER=your-email@outlook.com
   EMAIL_PASS=your-password
   ```

   ### Option 3: Custom SMTP
   ```env
   SMTP_HOST=smtp.your-provider.com
   SMTP_PORT=587
   SMTP_SECURE=false
   EMAIL_USER=your-email@yourdomain.com
   EMAIL_PASS=your-password
   ```

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in your .env file).

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and timestamp.

### Contact Form
```
POST /api/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'm interested in working with you..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Thank you for your message! I will get back to you soon."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [...]
}
```

## 🔒 Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: Comprehensive form validation
- **CORS Protection**: Configurable cross-origin policies
- **Security Headers**: Helmet.js for security headers
- **Error Handling**: No sensitive information in error responses

## 📧 Email Templates

The service sends two emails:

1. **Notification Email** (to you): Contains the contact form data
2. **Confirmation Email** (to sender): Automated thank you message

Both emails use HTML templates with professional styling.

## 🔧 Configuration Options

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | CORS origin | http://localhost:3000 |
| `EMAIL_SERVICE` | Email service | gmail |
| `EMAIL_USER` | Your email | Required |
| `EMAIL_PASS` | Email password | Required |

### Rate Limiting
- **Window**: 15 minutes
- **Max Requests**: 5 per IP
- **Scope**: Contact form endpoint only

## 🐛 Troubleshooting

### Common Issues

1. **Email Authentication Failed**
   - Check your email credentials
   - For Gmail, ensure you're using an App Password
   - Verify 2FA is enabled for Gmail

2. **CORS Errors**
   - Update `FRONTEND_URL` in your .env file
   - Ensure the frontend URL matches exactly

3. **Port Already in Use**
   - Change the `PORT` in your .env file
   - Or kill the process using the port

### Testing Email Service

You can test the email configuration by adding this to your server.js:

```javascript
// Test email connection on startup
emailService.testConnection();
```

## 📦 Dependencies

- **express**: Web framework
- **nodemailer**: Email sending
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **express-rate-limit**: Rate limiting
- **express-validator**: Input validation
- **dotenv**: Environment variables

## 🚀 Deployment

### Heroku
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git

### Vercel
1. Install Vercel CLI
2. Run `vercel` in project directory
3. Set environment variables in Vercel dashboard

### DigitalOcean/AWS
1. Set up a server
2. Install Node.js and PM2
3. Clone repository and install dependencies
4. Set environment variables
5. Start with PM2: `pm2 start server.js`

## 📝 Logs

The server logs important events:
- Server startup
- Email service initialization
- Contact form submissions
- Email sending results
- Errors and warnings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this in your projects!

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review the logs for error messages
3. Verify your email configuration
4. Test the API endpoints manually

---

**Happy coding! 🎉**
