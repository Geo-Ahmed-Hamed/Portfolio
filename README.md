# Portfolio Website - Full Stack Project

A modern, responsive portfolio website with a Node.js backend for email functionality.

## 📁 Project Structure

```
portfolio-website/
├── frontend/                 # Frontend (HTML, CSS, JavaScript)
│   ├── index.html           # Main HTML file
│   ├── styles.css           # CSS styles and animations
│   ├── script.js            # JavaScript functionality
│   └── README.md            # Frontend documentation
├── backend/                  # Backend (Node.js API)
│   ├── server.js            # Express server
│   ├── services/
│   │   └── emailService.js  # Email service with Nodemailer
│   ├── package.json         # Backend dependencies
│   ├── env.example          # Environment variables template
│   └── BACKEND_README.md    # Backend documentation
└── README.md                # This file
```

## 🚀 Quick Start

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Open `index.html` in your web browser
3. The frontend will work independently for viewing the portfolio

### Backend Setup (for email functionality)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   ```bash
   cp env.example .env
   # Edit .env with your email credentials
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## 🌐 How It Works

### Frontend
- **Static Website**: Pure HTML, CSS, and JavaScript
- **Responsive Design**: Works on all devices
- **Interactive Features**: Smooth scrolling, animations, contact form
- **No Build Process**: Can be served from any web server

### Backend
- **Express API**: RESTful endpoints for contact form
- **Email Service**: Sends emails using Nodemailer
- **Security**: Rate limiting, validation, CORS protection
- **Production Ready**: Error handling, logging, security headers

### Integration
- Frontend sends contact form data to backend API
- Backend processes the form and sends emails
- User gets real-time feedback on form submission

## 📧 Email Configuration

The backend supports multiple email providers:

### Gmail (Recommended)
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Outlook
```env
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### Custom SMTP
```env
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-password
```

## 🚀 Deployment Options

### Frontend Only (Static Hosting)
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **AWS S3**: Scalable static hosting

### Full Stack Deployment
- **Heroku**: Easy Node.js deployment
- **DigitalOcean**: VPS with full control
- **AWS EC2**: Scalable cloud hosting
- **Railway**: Modern deployment platform

## 🛠️ Development

### Frontend Development
- No build process required
- Edit HTML, CSS, JS files directly
- Use Live Server extension in VS Code for hot reload

### Backend Development
- Uses nodemon for auto-restart
- Environment variables for configuration
- Comprehensive error handling and logging

## 📝 Features

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with animations
- ✅ Contact form with validation
- ✅ Smooth scrolling navigation
- ✅ Interactive project cards
- ✅ Skills showcase with icons
- ✅ Professional email templates

### Backend Features
- ✅ RESTful API endpoints
- ✅ Email sending with HTML templates
- ✅ Rate limiting and spam protection
- ✅ Input validation and sanitization
- ✅ CORS support for frontend integration
- ✅ Security headers and error handling
- ✅ Comprehensive logging

## 🔧 Customization

### Personal Information
Edit `frontend/index.html` to update:
- Your name and title
- About section content
- Skills and technologies
- Project information
- Contact details

### Styling
Edit `frontend/styles.css` to customize:
- Color scheme
- Typography
- Layout and spacing
- Animations and effects

### Backend Configuration
Edit `backend/.env` to configure:
- Email service settings
- Server port and environment
- CORS origins
- Security settings

## 📚 Documentation

- **Frontend**: See `frontend/README.md`
- **Backend**: See `backend/BACKEND_README.md`
- **API Endpoints**: Documented in backend README

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
1. Check the respective README files
2. Review the troubleshooting sections
3. Verify your configuration
4. Check the logs for error messages

---

**Built with ❤️ by Ahmed Mohamed Hamed**
