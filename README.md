# Benefits Platform

A full-stack application for managing benefits, deals, and claims.

## Project Structure

```
benefits-platform/
├── client/              # Next.js (Frontend)
│   ├── app/             # App Router (Pages: landing, deals, dashboard)
│   ├── components/      # UI, Animations, 3D Canvas
│   ├── lib/             # API helpers, Types
│   └── public/          # 3D assets, Images
├── server/              # Express.js (Backend)
│   ├── controllers/     # Route logic
│   ├── models/          # Mongoose schemas (User, Deal, Claim)
│   ├── middleware/      # JWT & Verification logic
│   ├── routes/          # API endpoints
│   └── server.ts        # Entry point
└── README.md            # Mandatory project documentation
```

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- MongoDB (for backend)

### Installation


1. Install dependencies for client and server
2. Set up environment variables
3. Run the application

## Technologies Used
- Frontend: Next.js
- Backend: Express.js, Mongoose
- Authentication: JWT
