import ControlledForm from './components/ControlledForm';
import UncontrolledForm from './components/UncontrolledForm';
import DataFetcher from './components/DataFetcher';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Forms & Data Fetching Demo</h1>
        <p>
          This project demonstrates controlled and uncontrolled components,
          as well as data fetching with useEffect
        </p>
      </header>

      <main className="app-main">
        <section className="forms-section">
          <h2>Form Components</h2>
          <div className="forms-container">
            <ControlledForm />
            <UncontrolledForm />
          </div>
        </section>

        <section className="data-section">
          <DataFetcher />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Built with React + Vite | Demonstrating controlled vs uncontrolled
          components and useEffect data fetching
        </p>
      </footer>
    </div>
  );
}

export default App;
