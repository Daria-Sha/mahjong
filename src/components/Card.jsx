import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Card({id, value}) {
    const cards = useSelector(state => state.cards);
    const activeCards = useSelector(state => state.activeCards);
    const active = useSelector(state => state.active);
    const open = useSelector(state => state.open);
    const [openFirst, setOpenFirst] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setOpenFirst(false);
        }, 3000);
    }, []);
    
    function changeState() {
        if(!open[id] && !active[id]) {
            if(activeCards.length === 2) {
                dispatch({type: 'DEACTIVATE_ALL', payload: id});
            } else if(activeCards.length === 1 && value === cards[activeCards[0]]['value']) {
                dispatch({type: 'OPEN', payload: id});
            } else {
                dispatch({type: 'ACTIVATE', payload: id});
            }
        }
    }

    return (
        <div className="card-cell">
            <div onClick={changeState} className={`card ${active[id] ? 'active' : ''} ${open[id] ? 'open' : ''} ${openFirst ? 'open-first' : ''}`}>{value}</div>
        </div>
    );
}

export default Card;