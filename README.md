# Task Manager Application

A task manager application built with React, Redux Toolkit, and Vite.

## Features

- Add new tasks with title and description
- Mark tasks as completed/incomplete
- Remove tasks
- Persistent storage using localStorage (simulating API calls)
- Responsive design

## Technologies Used

- React 18
- TypeScript
- Vite
- Redux Toolkit
- React Router DOM
- CSS (for styling)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd my-react-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── app/
│   ├── store.ts          # Redux store configuration
│   └── hooks.ts          # Custom hooks for Redux (useAppDispatch, useAppSelector)
├── components/           # Reusable UI components
│   └── Header.tsx        # Application header
├── features/             # Feature modules (using Redux Toolkit slices)
│   └── tasks/            # Tasks feature
│       ├── api/          # API simulation (localStorage)
│       │   └── tasksApi.ts
│       ├── components/   # Feature-specific UI components
│       │   └── TaskItem.tsx
│       ├── model/        # Redux slice and types
│       │   ├── tasksSlice.ts
│       │   └── tasksThunks.ts
│       └── index.ts      # Barrel file for exports
├── pages/                # Page components
│   ├── TasksPage.tsx     # Main tasks page
│   └── AboutPage.tsx     # About page
├── services/             # Services (currently empty, for future API integration)
├── shared/               # Shared resources (config, assets, styles)
├── layouts/              # Page layouts (currently empty)
├── routes/               # Routing configuration (currently in App.tsx)
├── utils/                # Utility functions (currently empty)
├── App.tsx               # Main application component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## State Management

This application uses Redux Toolkit for state management. The tasks feature includes:

- **tasksSlice.ts**: Defines the state shape and reducers for tasks
- **tasksThunks.ts**: Contains asynchronous thunks for fetching, adding, removing, and toggling tasks
- **tasksApi.ts**: Simulates API calls using localStorage

## Deployment

To deploy this application to Vercel or Netlify:

### Vercel
1. Push the code to a GitHub repository
2. Import the project in Vercel
3. Vercel will automatically detect the Vite project and deploy it

### Netlify
1. Push the code to a GitHub repository
2. Connect the repository to Netlify
3. Set the build command to `npm run build` and publish directory to `dist`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)

## License

This project is licensed under the MIT License.

## Demo 

View **https://my-react-app-ten-sigma.vercel.app**
