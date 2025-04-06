# GilanJan Frontend

This is the frontend of the **GilanJan** short-term rental platform, built with **Next.js** and **React**. It provides a responsive and user-friendly interface for browsing and booking accommodations across Gilan.

---

## 🌟 Features

- Built with **Next.js** for server-side rendering and improved SEO
- Responsive design using **Tailwind CSS**
- Integrated authentication and API communication with Django backend
- Real-time updates and smooth UX
- Interactive property search and filtering
- Clean component structure for scalability and maintainability

---

## ⚙️ Tech Stack

- **Framework**: Next.js 14+
- **UI**: React, Tailwind CSS
- **State Management**: Zustand / React Context (based on usage)
- **API Communication**: Axios / native fetch
- **Auth**: JWT-based auth via Django REST
- **Routing**: App Router

---

## 📦 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/gilanjan-client.git
cd gilanjan-client
```

2. Install dependencies:
```bash
npm install
```

3. Create an `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to see the site in action 🚀

---

## 📁 Project Structure (simplified)
```
gilanjan-client/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── components/
├── constants/
├── lib/
├── public/
├── styles/
├── .env.local
├── tailwind.config.ts
└── next.config.js
```

---

## 📬 Contact
Built by **Maryam** | [maryyam.dev](https://maryyam.dev)

---

> See the [backend repo](https://github.com/your-username/gilanjan-backend) for the Django-powered API and authentication service.
