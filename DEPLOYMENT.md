# 🚀 Portfolio Deployment Guide

## Quick Deployment Options

### **Option 1: Netlify (Recommended - Full Stack)**

**Steps:**
1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/yourusername/portfolio-website.git
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `cd backend && npm install`
     - Publish directory: `frontend`
   - Add environment variables:
     - `EMAIL_USER`: your-email@gmail.com
     - `EMAIL_PASS`: your-app-password
     - `EMAIL_SERVICE`: gmail

3. **Result:** Your site will be live at `https://your-site-name.netlify.app`

---

### **Option 2: Vercel (Full Stack)**

**Steps:**
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Configure environment variables in Vercel dashboard**

---

### **Option 3: GitHub Pages (Frontend Only)**

**Steps:**
1. **Push to GitHub** (same as Option 1)

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: "GitHub Actions"
   - The workflow will automatically deploy

3. **Result:** Your site will be live at `https://yourusername.github.io/portfolio-website`

---

### **Option 4: Heroku (Backend) + Netlify (Frontend)**

**Backend on Heroku:**
1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   cd backend
   heroku create your-portfolio-api
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   heroku config:set EMAIL_SERVICE=gmail
   ```

4. **Deploy:**
   ```bash
   git subtree push --prefix backend heroku main
   ```

**Frontend on Netlify:**
- Deploy frontend folder to Netlify
- Update API URL in `frontend/script.js` to your Heroku URL

---

## 🔧 Pre-Deployment Checklist

### **Frontend Updates:**
- [ ] Update API URL in `frontend/script.js` if using separate backend
- [ ] Test all links and functionality
- [ ] Optimize images (compress if needed)
- [ ] Update contact information

### **Backend Updates:**
- [ ] Set up production environment variables
- [ ] Configure email service (Gmail App Password)
- [ ] Test API endpoints
- [ ] Set up proper CORS origins

### **General:**
- [ ] Update README with live URL
- [ ] Test contact form functionality
- [ ] Check responsive design on mobile
- [ ] Verify all images load correctly

---

## 🌐 Environment Variables for Production

### **Required Variables:**
```env
NODE_ENV=production
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=https://your-domain.com
```

### **Gmail Setup:**
1. Enable 2-Factor Authentication
2. Generate App Password: [Google App Passwords](https://support.google.com/accounts/answer/185833)
3. Use App Password (not regular password)

---

## 📱 Testing Your Deployment

### **Checklist:**
- [ ] Site loads correctly
- [ ] All sections display properly
- [ ] Images load (especially profile photo)
- [ ] Contact form works
- [ ] Responsive design works on mobile
- [ ] All links work
- [ ] Email notifications are received

---

## 🆘 Troubleshooting

### **Common Issues:**

**1. Images not loading:**
- Check file paths are correct
- Ensure images are in the right directory
- Verify file permissions

**2. Contact form not working:**
- Check CORS configuration
- Verify environment variables
- Test API endpoints directly

**3. Email not sending:**
- Verify Gmail App Password
- Check email service configuration
- Review server logs

**4. CORS errors:**
- Update FRONTEND_URL in environment variables
- Check allowed origins in backend

---

## 🎉 Success!

Once deployed, your portfolio will be live and professional! Share your URL and start networking! 🚀

**Recommended:** Start with **Netlify** for the easiest full-stack deployment.
