import React from 'react'
import { Link } from 'react-router-dom';

class TrendingCard extends React.Component{
constructor(){
    super()
    this.state = {
        genre:[],
        data:[]
    }
}

async componentDidMount(){
    const movieDetail = await  fetch(
        `https://api.themoviedb.org/3/tv/${this.props.id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
        )
       const respon = await movieDetail.json()  
       if (respon) {
              this.setState(prev => {
                  return{
                   data:prev.data = respon,
                   genre:prev.data = respon.genres
                  }
                })
      }

}
    render(){
const data = this.state.data
const url = `https://image.tmdb.org/t/p/w185/${data.poster_path}`
const ID = `/tv-detail/${data.id}`

const style = {
    transform:`translateX(-${this.props.index * 100}%)`
}
const genre = this.state.genre.map(gen => {
    const ID = `/genre/${gen.id}`
    return  <li><Link to={ID} className='card-genre'> {gen.name}, </Link></li>
})

        return(
        <div className="sidebar-card"  style={style}>
         <div className='index'>
             <span className='index'>{this.props.length}</span>
         </div>
         <div className='thumbs'>
         <Link to={ID}>
            <img src={url} className="thumbs" alt="" />
            </Link>
         </div>
         <div className="sidebar-info">
           <h4 className="judul">
           <Link to={ID}>{this.props.title}</Link>
           </h4>
           <ul className='genres'>
             Genres: {genre}
           </ul>
           <span className='rate'>{this.props.rating}</span>
        </div>
        </div> 
        
        )
    }
}


export default TrendingCard ;



// <div className="card"  style={style}>
// <Link to={ID}>
// <img src={url} className="thumb" alt="" />
// </Link>
//     <div className="info">
//     <h4 className="judul">{this.props.title}</h4>
// <span className="rate">
// <span className="rates">{`${month[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} `}</span>
// </span>
//     </div>
// </div> 
