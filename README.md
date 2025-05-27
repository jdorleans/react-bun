# Personal Profile Manager

A modern personal profile management application built with React, TypeScript, and Bun. This full-stack application allows you to create, read, update, and
delete profile information with image upload capabilities.

## 🚀 Tech Stack

- **Frontend**: React 19 with TypeScript
- **Backend**: Bun (JavaScript runtime)
- **Database**: SQLite (via TypeORM)
- **Storage**: Local file system (with S3-compatible storage support)
- **Styling**: Modern CSS with responsive design
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── api/               # API route handlers
├── database/          # Database configuration
├── model/             # Database entities
├── repository/        # Data access layer
├── route/             # API route definitions
├── service/           # Business logic
└── web/               # Frontend React components
    ├── component/     # Reusable UI components
```

## 🛠️ Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or later)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-bun
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   Copy the example environment file and update the values:
   ```bash
   cp .env.example .env
   ```

4. **Run the development server**
   ```bash
   bun dev
   ```

   The development server will start on `http://localhost:3000`

## 🛠 Available Scripts

- `bun dev` - Start the development server
- `bun build` - Build the application for production
- `bun start` - Start the production server
- `bun test` - Run tests
- `bun lint` - Run ESLint

## 🌐 API Endpoints

- `GET /api/profiles` - Get all profiles (optional search query parameter)
- `GET /api/profiles/:id` - Get a specific profile by ID
- `POST /api/profiles` - Create a new profile
- `PUT /api/profiles/:id` - Update an existing profile
- `DELETE /api/profiles/:id` - Delete a profile
- `GET /api/profiles/last` - Get the most recently created profile

## 🖼 Image Uploads

The application supports image uploads for profile pictures. When creating or updating a profile, you can include an image file in the form data with the field name `file`.

## 🧪 Testing

Run the test suite with:

```bash
bun test
```

## 🧹 Linting

Check code style with:

```bash
bun lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Bun](https://bun.sh/)
- UI powered by [React](https://reactjs.org/) and TypeScript
- Database management with [TypeORM](https://typeorm.io/)

To run for production:

```bash
bun start
```

This project was created using `bun init` in bun v1.2.13. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
