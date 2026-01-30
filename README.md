# React Forms & Data Fetching Demo

This project demonstrates the differences between controlled and uncontrolled components in React, as well as data fetching using the `useEffect` hook.

## Features

### Controlled Component (`ControlledForm`)
- Uses React state (`useState`) to manage form values
- Real-time validation and data display
- State updates on every input change
- Includes text input, email, select dropdown, and checkbox

### Uncontrolled Component (`UncontrolledForm`)
- Uses React refs (`useRef`) to access form values
- Values are accessed only on form submission
- Default values are set via `defaultValue`/`defaultChecked`
- Includes text input, email, select dropdown, and textarea

### Data Fetching (`DataFetcher`)
- Uses `useEffect` to fetch data from JSONPlaceholder API
- Handles three states: loading, success, and error
- Displays user data in a card format

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
my-react-app/
├── src/
│   ├── components/
│   │   ├── ControlledForm.jsx   # Controlled component example
│   │   ├── UncontrolledForm.jsx # Uncontrolled component example
│   │   └── DataFetcher.jsx      # Data fetching with useEffect
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Styles
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Key Concepts Demonstrated

### Controlled Components
Controlled components have their state managed by React. The component's value is controlled by state, and changes are handled through `onChange` events.

```jsx
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

### Uncontrolled Components
Uncontrolled components manage their own state. Values are accessed using refs when needed.

```jsx
const inputRef = useRef();
<input ref={inputRef} defaultValue="Initial Value" />
```

### Data Fetching with useEffect
The `useEffect` hook is used to perform side effects, such as data fetching.

```jsx
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };
  fetchData();
}, []);
```

## Technologies Used

- **React** - UI library
- **Vite** - Build tool and development server
- **JSONPlaceholder API** - Free fake API for testing

## Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## License

This project is for educational purposes.
