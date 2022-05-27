import { Link } from 'react-router-dom';
import React from 'react'
import '../detail.css';
import star from '../star.png'
import ModalVideo from './modal-video';
import Logo from './img/PngItem_6391407.png'
import CastDanRekomen from './cast-rekomend-card';

class MovieDetailCard extends React.Component{
    constructor(){
        super()
        this.state = {      
data:[],
genre:[],
video:[],
videoSrc:'',
modal:false
        }
    }


async componentDidMount(){
        const movieDetail = await  fetch(
          `https://api.themoviedb.org/3/movie/${this.props.id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
          )
          const Video = await fetch(
            `https://api.themoviedb.org/3/movie/${this.props.id}/videos?api_key=0ccbee0a69447c2b1bd0090bf76b0358&append_to_response=videos`
          )

      const videos = await Video.json()
      const vid = videos.results[0]
       const respon = await movieDetail.json()  
       console.log(videos);
         if (respon) {
                this.setState(prev => {
                    return{
                     data:prev.data = respon,
                     genre:prev.data = respon.genres,
                     video:prev.video = vid
                    }
                  })
        }

    }

 playVideo = (e) => {
  e.preventDefault()
  const id = e.target.dataset.mykey
  this.setState({
    videoSrc:this.state.videoSrc = id,
    modal:!this.state.modal
  })
  console.log(this.state.modal);
}

removeModal = (e) =>{
  e.preventDefault()
  this.setState({ modal:!this.state.modal})
}
      render(){
const movi = this.state.data
console.log(movi);
  const styles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movi.backdrop_path})`
  }

const imgUrl = `https://image.tmdb.org/t/p/w300/${movi.poster_path}`  
const maps = this.state.genre.map(gen => {
  const ID = `/genre/${gen.id}`
  return  <Link to={ID}> {gen.name} ,</Link>
});
console.log(this.state.video);
        return(
<>

<div className="banner-detail" style={styles}>
            <div className="banner-detail-inner">
                <img src={imgUrl}  alt=""/>
                <div className="banner-detail-info">
                    <h1 className="jdl">{movi.title}</h1>
                    <span className="tagline">{movi.tagline}</span>
                    <span className="genre">Genres: {maps}</span>
                    <div className="judul-flex">
                    <div className='stars'>
                     <img src={star}  alt=""/>
                      <span className="rating-container">{movi.vote_average}</span>
                     </div>
                   <div className="trailer">
                   <a href="#" className="play" onClick={this.playVideo} ><img class="play-img"src={Logo} alt="" data-mykey={!this.state.video ? "kosong" : this.state.video.key} />Play Trailer</a>
                   </div>
                    </div>
                    <span className="detil">Runtime: {movi.runtime}m</span>
                    <span className="detil">Status: {movi.status}</span>
                    <span className="detil">Release Date: {movi.release_date}</span>
                    <div className="overview">
                    <h3 className="detail-title">Overview</h3>
                       <p className="paraf">{movi.overview}</p>
                    </div>
                    <span className="waktu"></span>
                </div>
            </div>
                    </div>

<div className="content-detail">
<div className={this.state.modal ? 'modals' : "modal-container"} onClick={this.removeModal }>
{this.state.modal ? <ModalVideo VideoKey={this.state.videoSrc}  />  : ""}
</div>

<CastDanRekomen id={this.props.id} Video={this.state.video} judul={movi.title}  playVideo={this.playVideo }/>
</div>
</>
        )
    }
}

export default MovieDetailCard;


