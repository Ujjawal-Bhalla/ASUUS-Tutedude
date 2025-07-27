# Ventrest - Street Food Marketplace

A modern marketplace platform connecting street food vendors with suppliers, built with React and Node.js.

## 🚀 Features

- **Vendor Portal**: Street food vendors can browse and order supplies
- **Supplier Dashboard**: Suppliers can manage products and orders
- **Bilingual Support**: English and Hindi language support
- **Responsive Design**: Works on mobile and desktop
- **Real-time Updates**: Live order tracking and notifications

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** authentication
- **bcryptjs** for password hashing

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB database

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm start
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your backend API URL
npm run dev
```

## 🌐 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-domain.railway.app
```

## 🚀 Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Connect to Vercel
3. Set root directory to `frontend/`
4. Add environment variables

### Backend (Railway)
1. Push to GitHub
2. Connect to Railway
3. Add environment variables
4. Deploy

## 👥 User Roles

- **Vendor**: Street food vendors who buy supplies
- **Supplier**: Product suppliers who sell to vendors

## 📱 Demo Credentials

- **Vendor**: `vendor@demo.com` / `password123`
- **Supplier**: `supplier@demo.com` / `password123`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

ISC License