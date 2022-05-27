import React from 'react'
import { Link } from 'react-router-dom';

function CastCard (props){

    const ID = `/person-detail/${props.id}`
        return(
            <div className="card">
            <Link to={ID}>
            <img src={props.img}  className="thumb" alt="" />
            </Link>
            <div className="info">
            <h4 className="name">{props.name}</h4>
            <span className="chara">{props.chara}</span>
            </div>
            </div>
        )   
}

export default CastCard;

