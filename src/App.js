import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Card from './components/Card';
import { ACTIVATE, DEACTIVATE_ALL, OPEN } from "./store/actionCreators";

function App() {
  const cards = useSelector(state => state.cards);
  const activeCards = useSelector(state => state.activeCards);
  const active = useSelector(state => state.active);
  const open = useSelector(state => state.open);
  const [openFirst, setOpenFirst] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
      const timeout = setTimeout(() => {
          setOpenFirst(false);
      }, 3000);
      return () => {
        clearTimeout(timeout);
      };
  }, []);

  function changeState(event) {
    const id = event.target.id;
    const value = event.target.innerText;
    if(open[id] || active[id]) {
      return;
    }
    if(activeCards.length === 2) {
      dispatch({type: DEACTIVATE_ALL, payload: id});
    } else if(activeCards.length === 1 && Number(value) === cards[activeCards[0]]['value']) {
      dispatch({type: OPEN, payload: id});
    } else {
      dispatch({type: ACTIVATE, payload: id});
  }
  }

  return (
    <div className="App">
      <h1>Mahjong</h1>
      <div className="cards-container" onClick={changeState}>
        {cards.map(card =>
          <Card key={card.id} id={card.id} value={card.value} active={active[card.id]} open={open[card.id]} openFirst={openFirst} />
        )}
      </div>
    </div>
  );
}

export default App;
