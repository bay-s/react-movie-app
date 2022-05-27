
import React  from 'react'
import { Link } from 'react-router-dom';


class MovieCard  extends React.Component{

    render(){

const url = `https://image.tmdb.org/t/p/w185/${this.props.img}`
const ID = this.props.data.title ? `/movie-detail/${this.props.id}` : `/tv-detail/${this.props.id}`
const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
const date = this.props.Date
const dates = new Date(this.props.data.first_air_date)

const style = {
    transform:`translateX(-${this.props.index * 100}%)`
}

return(
            <div className="card" style={style} >
<Link to={ID}>
    <img src={url} className="thumb" alt="" />
</Link>
<div className="info">
<Link to={ID}>
<h4 className="judul">{this.props.data.title}</h4> 
<h4 className="judul">{this.props.data.name}</h4>
</Link>
<span className="rate">
{ this.props.data.title ? <span className="rates">{`${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} `}</span> :
<span className="rates">{`${month[dates.getMonth()]} ${dates.getDate()} ${dates.getFullYear()} `}</span>}
</span>
</div>
        </div> 
        
        )
    }
}

export default MovieCard;


{/* <div className="info">
<Link to={ID}>
{this.props.data.title  ? <h4 className="judul">{this.props.data.title}</h4> :
<h4 className="judul">{this.props.data.name}</h4>}
</Link>
<span className="rate">
{ this.props.data.title  ? <span className="rates">{`${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} `}</span> :
<span className="rates">{`${month[dates.getMonth()]} ${dates.getDate()} ${dates.getFullYear()} `}</span>}
</span>
</div> */}