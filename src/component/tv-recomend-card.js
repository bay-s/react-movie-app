import React from 'react'
import { Link } from 'react-router-dom';

function TvRecomCard (props){
    const ID = `/tv-detail/${props.id}`
    const style = {
        transform:`translateX(-${props.index * 100}%)`
    }
    
        return(
            <div className="card" style={style} >
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

export default TvRecomCard ;

