import React from 'react'
import {Link} from 'react-router-dom'


class BannerDetail extends React.Component{
    constructor(){
super()
this.state = {
  isLoad:true,
  movie:[],
  id:this.props.id
}
    }

    async componentDidMount(){
      const popular = await  fetch(
        `https://api.themoviedb.org/3/movie/${this.state.id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
        )
       const respon = await popular.json()  
       const movies = respon.results
       console.log(movies);
       if (respon) {
              this.setState(prev => {
                  return{
                    isLoad:prev.isLoad = false,
                    movie:prev.movie = movies
                  }
                })
      }
  }

    render(){
// const img = []
// const image = this.state.movie.forEach(m => {
// img.push(m.poster_path)
// })

// const styles = {
//   backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${img[0]})`
// }
        return(
        <div className="banner-detail" style={styles}>
<div className="banner-detail-inner">
    <img src="https://image.tmdb.org/t/p/w300/${detil.poster_path}"  alt=""/>
    <div className="banner-detail-info">
        <h1 className="jdl">${detil.title}</h1>
        <span className="slogan">${detil.tagline}</span>
        <span className="genre">Genres: </span>
        <span className="detil">Runtime: ${detil.runtime}m</span>
        <span className="detil">Status: ${detil.status} </span>
        <span classNames="detil">Release Date: ${detil.release_date}</span>
        <div className="overview">
        <h3 className="title">Overview</h3>
           <p className="paraf">${detil.overview}</p>
        </div>
        <span className="waktu"></span>
    </div>
</div>
        </div>
            
        )
    }
}


export default BannerDetail;