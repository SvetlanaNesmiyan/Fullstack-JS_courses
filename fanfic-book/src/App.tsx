import Header from './components/Header';
import WorkCard from './components/WorkCard';
import Rewards from './components/Rewards';
import AuthorNotes from './components/AuthorNotes';
import ShareNav from './components/ShareNav';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <div className="app__content">
          <WorkCard />
          <Rewards />
          <AuthorNotes />
          <ShareNav />
        </div>
      </main>
    </div>
  );
}

export default App;
