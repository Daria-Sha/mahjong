import getPrimeNumbers from '../helpers/getPrimeNumbers';
import { ACTIVATE, DEACTIVATE_ALL, OPEN } from './actionCreators';

const upperLimit = 59;
const primeNumbers = getPrimeNumbers(upperLimit);

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

export const reducer = (state = defaultState, action) => {
    let active = [];
    let open = [];
    let activeCards = [];
    switch(action.type) {
      case ACTIVATE:
        active = state.active;
        active[action.payload] = true;
        return {...state, active, activeCards: [...state.activeCards, action.payload]};

      case DEACTIVATE_ALL:
        active = state.active;
        activeCards = state.activeCards;
        activeCards.forEach(index => {
          active[index] = false;
        });
        active[action.payload] = true;
        activeCards = [action.payload];
        return {...state, active, activeCards};

      case OPEN:
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