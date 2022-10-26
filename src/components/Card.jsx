function Card({id, value, active, open, openFirst}) {
    return (
        <div className="card-cell">
            <div id={id} className={`card ${active ? 'active' : ''} ${open ? 'open' : ''} ${openFirst ? 'open-first' : ''}`}>{value}</div>
        </div>
    );
}

export default Card;