![BookShop](https://res.cloudinary.com/dcyupktj6/image/upload/v1738244030/1_przzvw.png)
### Overview

BookNest is a web application for book enthusiasts, allowing users to browse, purchase, and review books. The frontend is built using React, TypeScript, Redux Toolkit, and Tailwind CSS for a modern and responsive user experience.

### Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   ├── dashboard/
│   │   ├── form/
│   │   ├── main/
│   │   ├── product/
│   │   ├── shared/
│   │   ├── skeleton/
│   │   └── ui/
│   ├── layouts/
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── user/
│   │   └── (other pages)
│   ├── redux/
│   │   ├── api/
│   │   └── features/
│   ├── routes/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .vercel/
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── package.json
```

### Core Features

#### 1. Authentication & Authorization

- User registration and login using JWT authentication.
- Role-based access control (admin & user).
- Password reset functionality.

#### 2. User Management

- Profile management with personal information updates.
- Admin controls to block/unblock users.

#### 3. Product Management

- CRUD operations for books (admin only).
- Categorized book browsing.
- Search and filter functionality.

#### 4. Order Management

- Order creation with multiple products.
- Integrated payment processing.
- Order tracking system.

#### 5. Review System

- Users can add, edit, and delete reviews.
- Rating system for books.

#### 6. UI Components

- Reusable UI components (buttons, modals, etc.).
- Fully responsive and mobile-friendly design.

#### 7. State Management

- Redux Toolkit for managing app state efficiently.

#### 8. Error Handling

- Global error handling with meaningful messages.

#### 9. Deployment

- Vercel configuration for seamless deployment.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Shakilofficial/booknest-frontend.git
   cd frontend
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Configuration**:
   - Create a `.env` file and set required variables.
4. **Run the Application**:
   ```bash
   npm start
   ```

### Usage

- Open `http://localhost:5173` in the browser.
- Register/Login to access features.
- Browse books, add to cart, and place orders.

### Configuration

- `.env` file must include API endpoints, authentication secrets, and other necessary configurations.

### Deployment

- Hosted on Vercel.
- Ensure the `.vercel` folder is correctly configured with project settings.

### Contributing

- Follow code style guidelines.
- Ensure new features are tested before submitting PRs.

## Contact

For questions or collaborations, contact me via:

- **Email**: mrshakilhossain@outlook.com
- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/your-profile)
- **Facebook**: [Facebook Profile](https://www.facebook.com/iamshakilhossain)
- **Portfolio**: [Portfolio Website](https://shakilhossain-sigma.vercel.app)

---

## License

This project is **MIT licensed**.

---

BookNest - Simplifying Online Book Shopping 📚🚀
