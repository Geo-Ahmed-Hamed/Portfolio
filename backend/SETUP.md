# Backend Setup Guide

## ✅ Backend is Running Successfully!

Your Node.js backend server is now working correctly. Here's how to complete the setup:

## 📧 Email Configuration

To enable email functionality, you need to create a `.env` file in the backend folder:

### Step 1: Create .env file
```bash
# In the backend folder, create a file named .env
```

### Step 2: Add your email configuration

**For Gmail (Recommended):**
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**For Outlook:**
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### Step 3: Gmail App Password Setup

If using Gmail, you need to create an App Password:

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable 2-Factor Authentication
3. Go to Security → App passwords
4. Generate a new app password
5. Use this password (not your regular Gmail password) in the .env file

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Contact Form Test
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

## 🔧 Troubleshooting

### Email Not Working
- Check your .env file exists and has correct credentials
- For Gmail, make sure you're using an App Password
- Check the console logs for error messages

### CORS Issues
- Update FRONTEND_URL in .env to match your frontend URL
- Make sure the frontend is running on the correct port

### Port Already in Use
- Change the PORT in your .env file
- Or kill the process using the port

## 📁 File Structure
```
backend/
├── server.js              # Main server file
├── services/
│   └── emailService.js    # Email service
├── package.json           # Dependencies
├── .env                   # Environment variables (create this)
└── SETUP.md              # This file
```

## 🎯 Next Steps

1. ✅ Backend server is running
2. ⏳ Configure email in .env file
3. ⏳ Test contact form functionality
4. ⏳ Deploy to production (optional)

Your backend is ready to handle contact form submissions! 🚀
