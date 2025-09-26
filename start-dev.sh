#!/bin/bash

echo "Starting Portfolio Website Development Environment..."
echo

echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "Error installing backend dependencies"
    exit 1
fi

echo
echo "Backend dependencies installed successfully!"
echo
echo "To start the development environment:"
echo "1. Configure your email settings in backend/.env"
echo "2. Run: npm run dev (starts backend server)"
echo "3. Open frontend/index.html in your browser"
echo
echo "Or use the following commands:"
echo "- npm run dev     (start backend server)"
echo "- npm run frontend (start frontend server)"
echo
