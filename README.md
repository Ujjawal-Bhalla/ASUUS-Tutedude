# 🛒 ASUUS Tutedude - B2B Raw Materials Marketplace

A modern B2B marketplace platform connecting **Vendors** (street food vendors) with **Suppliers** (raw materials suppliers). Built with React and Node.js.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd ASUUS-Tutedude

# Backend setup
cd backend
npm install
cp env-example.txt .env
# Edit .env with your MongoDB URI and JWT secret
npm start

# Frontend setup (in new terminal)
cd frontend
npm install
# Create .env file with VITE_API_URL=http://localhost:8000
npm run dev
```

### Default Ports
- **Backend**: `http://localhost:8000`
- **Frontend**: `http://localhost:8080`

## 📚 Documentation

**👉 For complete documentation, see [GUIDE.md](./GUIDE.md)**

The guide includes:
- Complete setup instructions
- API documentation
- Database schema
- Architecture overview
- Deployment guide
- Troubleshooting

## 🎯 Features

- **Dual Role System**: Separate dashboards for Vendors and Suppliers
- **Product Management**: Full CRUD operations for suppliers
- **Order Management**: Complete order lifecycle
- **Advanced Search**: Filter by category, price, supplier
- **Analytics Dashboard**: Insights for both roles
- **Bilingual Support**: English and Hindi
- **Responsive Design**: Mobile-first UI

## 🛠️ Tech Stack

**Backend**: Node.js, Express.js, MongoDB, JWT  
**Frontend**: React 19, Vite, Tailwind CSS, React Router

## 👥 User Roles

- **Vendor**: Browse and order raw materials
- **Supplier**: Manage products and fulfill orders

## 📝 Test Credentials

See `LOGIN_CREDENTIALS.txt` for test account credentials.

## 📄 License

ISC License

---

**For detailed information, please refer to [GUIDE.md](./GUIDE.md)**
