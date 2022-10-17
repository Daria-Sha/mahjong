import { useSelector } from 'react-redux';
import './App.css';
import Card from './components/Card';

function App() {
  const cards = useSelector(state => state.cards);

  return (
    <div className="App">
      <h1>Mahjong</h1>
      <div className="cards-container">
        {cards.map(card =>
          <Card key={card.id} id={card.id} value={card.value} />
        )}
      </div>
    </div>
  );
}

export default App;
