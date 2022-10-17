import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { createStore } from 'redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

const upperLimit = 59;
const primeNumbers = getPrimeNumbers(upperLimit);

function getPrimeNumbers(upperLimit) {
  const primeNumbers = [];
  for(let i = 2; i < upperLimit; i++) {
    if(i === 2 || i === 3) {
      primeNumbers.push(i);
    }
    const testFactor = Math.sqrt(i);
    for(let j = 2; j <= testFactor; j++) {
      if(i % j === 0) {
        break;
      }
      if(j === Math.floor(testFactor)) {
        primeNumbers.push(i);
      }
    }
  }
  return primeNumbers;
}

const numberOfCards = primeNumbers.length * 2;
const cards = [];

primeNumbers.forEach(number => {
  for(let i = 0; i < 2; i++) {
    let position;
    do {
      position = Math.floor(Math.random() * numberOfCards);
    } while(cards[position]);
    cards[position] = {id: position, value: number};
  }
});

const open = [];
for(let i = 0; i < cards.length; i++) {
  open[i] = false;
}

const active = [];
for(let i = 0; i < cards.length; i++) {
  active[i] = false;
}

const defaultState = {
  cards: cards,
  open: open,
  active: active,
  activeCards: []
};

const reducer = (state = defaultState, action) => {
    let active = [];
    let open = [];
    let activeCards = [];
    switch(action.type) {
      case 'ACTIVATE':
        active = state.active;
        active[action.payload] = true;
        return {...state, active, activeCards: [...state.activeCards, action.payload]};

      case 'DEACTIVATE_ALL':
        active = state.active;
        activeCards = state.activeCards;
        activeCards.forEach(index => {
          active[index] = false;
        });
        active[action.payload] = true;
        activeCards = [action.payload];
        return {...state, active, activeCards};

      case 'OPEN':
        active = state.active;
        open = state.open;
        activeCards = state.activeCards;
        active[activeCards[0]] = false;
        open[activeCards[0]] = true;
        open[action.payload] = true;
        return {...state, open, active, activeCards: []};
  
      default:
        return state;
    }
};
  
const store = createStore(reducer);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);