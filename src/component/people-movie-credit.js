import React from 'react'
import { Link } from 'react-router-dom';

class PeopleCredits extends React.Component{
    constructor(){
        super()
        this.state = {
            movie:[],
            tivi:[],
            loading:true
        }
    }

    async componentDidMount(){
const credits = await fetch(
    `https://api.themoviedb.org/3/person/${this.props.id}/movie_credits?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  );
  const creditsTV = await fetch(
    `https://api.themoviedb.org/3/person/${this.props.id}/tv_credits?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  );
const result = await credits.json()
const cast = result.cast
const TV = await creditsTV.json()
const TVcast = TV.cast
if( result ){

this.setState(prev => {
    return{
      loading:prev.loading = false,
     movie:prev.movie = cast,
     tivi:prev.tivi = TVcast
    }
  })

  }

    }

    render(){

        return(
<>
{
this.state.movie.slice(0, 8).map(mov => {
        const img = `https://image.tmdb.org/t/p/w185/${mov.poster_path}`
        const ID = `/movie-detail/${mov.id}`
        return <div className="card">
        <Link to={ID}>  
        <img src={img}  alt="" className="thumb" />
        </Link> 
        <div className="info">
        <h4 className="judul"><Link to={ID}>{mov.title}</Link></h4>
        <p className='date'>{mov.release_date}</p>
        </div>
        </div>
       })
}

{
this.state.tivi.slice(0, 7).map(mov => {
        const img = `https://image.tmdb.org/t/p/w185/${mov.poster_path}`
        const ID = `/tv-detail/${mov.id}`
 
        return <div className="card">
        <Link to={ID}>  
        <img src={img}  alt="" className="thumb" />
        </Link> 
        <div className="info">
        <h4 className="judul"><Link to={ID}>{mov.name}</Link></h4>
        <p className='date'>{mov.first_air_date}</p>
        </div>
        </div>
       })
}
</>
        )
    }
}

export default PeopleCredits;