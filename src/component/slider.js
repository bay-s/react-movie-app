import React from 'react'
import { Link } from 'react-router-dom'
import star from '../star.png'

class SliderImage extends React.Component{
constructor(){
    super()
    this.state = {      
data:[],
genre:[]
    }
}

async componentDidMount(){
    const movieDetail = await  fetch(
        `https://api.themoviedb.org/3/movie/${this.props.data}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
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
    const Detil = this.state.data
    const img = `https://image.tmdb.org/t/p/w300/${Detil.poster_path}`
    const style = {
           transform:`translateX(-${this.props.index * 100}%)`,
           backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${Detil.backdrop_path})`
       }
       const genre = this.state.genre.map(gen => {
        const ID = `/genre/${gen.id}`
        return  <Link to={ID}> {gen.name} ,</Link>
    });   
    const ID = `movie-detail/${Detil.id}`
    return(
        <>

 <div style={style} className='slides' >
    <div className="slide-detail-inner">

    <div className='slide-judul'>
<div className='slide-judul-inner'>
<div className='stars-container'>
<div className='stars'>
<img src={star}  alt=""/>
<span className="slide-rate">{Detil.vote_average}</span>
</div>
<div className='judul-inner'>
<h3 className="jdl"><Link to={ID}>{ Detil.title}</Link></h3>
<span className="date">{ Detil.release_date}</span>
</div>
</div>
<span className="genre">{genre}</span>
<div className="slide-detail-info">
 <div className="overview">
 <h3 className="tag-title">Summary</h3>
 <span className="tagline">{Detil.overview}</span>
 </div>
 <span className="detil">Status: {Detil.status}</span>
 <span className="waktu"></span>
</div>
</div>
<Link to={ID} className='rights'>
            <img src={img}  alt=""/>
</Link>
</div>
    </div>
</div>
        </>
            )
}
}

export default SliderImage;





{/* <div className="slide-detail-inner">
<Link to={ID} className='rights'>
        <img src={img}  alt=""/>
</Link>
<div className="slide-detail-info">
<div className='slide-judul'>
<div className='stars'>
<img src={star}  alt=""/>
<span className="slide-rate">{Detil.vote_average}</span>
</div>
<div className='judul-inner'>
<h3 className="jdl"><Link to={ID}>{ Detil.title}</Link></h3>
<span className="date">{ Detil.release_date}</span>
</div>
</div>
<span className="genre">{genre}</span>
<div className="overview">
<h3 className="tag-title">Summary</h3>
<span className="tagline">{Detil.overview}</span>
</div>
<span className="detil">Status: {Detil.status}</span>
<span className="waktu"></span>
</div>
</div> */}