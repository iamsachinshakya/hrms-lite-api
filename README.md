
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Documentation

The frontend communicates with a backend API (default: `http://localhost:8000/api`). All requests use JSON.

### Employees

- **`GET /employees`**: List all employees.
  - Query Params: `search` (name/id), `page`, `limit`.
- **`GET /employees/:id`**: Get detailed info for a specific employee.
- **`POST /employees`**: Create a new employee record.
  - Body: `{ id, name, email, department }`.
- **`PATCH /employees/:id`**: Update an existing employee.
  - Body: same as POST (partial fields allowed).
- **`DELETE /employees/:id`**: Remove an employee and their related attendance records.

### Attendance

- **`GET /attendance`**: List attendance logs.
  - Query Params: `employeeId`, `status` (Present/Absent), `from`, `to` (dates), `page`, `limit`.
- **`POST /attendance`**: Log attendance for an employee.
  - Body: `{ employeeId, date, status }`.

### Statistics

- **`GET /stats/summary`**: Get overall HR metrics (total employees, attendance rates, etc.).
- **`GET /stats/present-days`**: Get attendance frequency data for distribution charts.
