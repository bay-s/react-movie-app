import React from 'react'
import { Link } from 'react-router-dom';
function RecomCard (props){
    const ID = `/movie-detail/${props.id}`
        return(
            <div className="card">
            <Link to={ID} onClick={props.ClickFetch}>
            <img src={props.img}  className="thumb" alt="" />
            </Link>
            <div className="info">
            <h4 className="name">{props.name}</h4>
            <span className="date">{props.date}</span>
            </div>
            </div>
        )   
}

export default  RecomCard;

