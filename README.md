# User Management Application

A full-stack **User Management System** built with **Express.js**, **SQLite**, and **Tailwind CSS**.
The application allows viewing, adding, editing, and deleting employees with a responsive interface and proper validations.

---

## Live Demo

* Frontend (if deployed separately): [https://user-management-usu4.vercel.app/](https://user-management-usu4.vercel.app/)
* Backend (if deployed): Render/Heroku URL

---

## Folder Structure

```
user-management/
├─ um_backend/
│  ├─ index.js             # Main backend entry point
│  │  └─ usersDB.db
│  └─ package.json
├─ src/                    # Frontend source code
│  ├─ services/            # DB and API services
│  │  └─ api.js
|  |-pages/
|  |  └─EmployeeList.jsx
│  ├─ components/
│  │  ├─ EmployeeDetails.jsx
│  │  ├─ Loader.jsx
│  │  └─ AddEmployee.jsx
|  ├─ App.jsx
│  └─ index.jsx
├─ package.json             # Root project config
├─ vite.config.js           # Frontend bundler config
└─ README.md
```

---

## Features

* **View Employees** – List all employees in a table with pagination.
* **Add Employee** – Add new employee via a popup form.
* **Edit Employee** – Update employee details inline or via form.
* **Delete Employee** – Remove an employee with a confirmation popup.
* **Error Handling** – Proper API error messages shown to user.
* **Loader** – Displays loading indicator while fetching data.
* **Responsive UI** – Works on desktop and mobile screens.

---

## Dependencies

### Backend (`um_backend/package.json`)

* `express` – Web framework for Node.js
* `sqlite` – SQLite database driver
* `sqlite3` – SQLite bindings
* `cors` – Enable CORS for API requests

### Frontend (`package.json`)

* `react` – React library
* `react-dom` – React DOM renderer
* `tailwindcss` – Utility-first CSS framework
* `vite` – Development and build tool
* `@testing-library/react` – React component testing
* `vitest` – Test runner for React components

---

## Getting Started

### Backend Setup

1. Navigate to backend folder:

```bash
cd um_backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
npm start
```

* Server runs on default port `3000`.
* Ensure `todoApplication.db` exists or update your DB path.

---

### Frontend Setup

1. Navigate to frontend folder (root folder if using Vite):

```bash
cd ../
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

* App runs on [http://localhost:5173](http://localhost:5173) (default Vite port).

4. Update API URLs in `src/services/api.js` to point to backend.

---

## Testing

* Uses **Vitest** + **React Testing Library**.
* Run tests with:

```bash
npm run test
```

* Handles async data fetching, loader states, and proper text matching.

---

## Deployment

* **Frontend**: Vercel / Netlify
* **Backend**: Render / Railway / Heroku
* Ensure proper **CORS configuration** and **environment variables** for DB connection.

---

## Contributing

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE).
