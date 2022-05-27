import React from 'react'
import { Link } from 'react-router-dom';
import Banner from './banner';
import ModalVideo from './modal-video';
import MovieCard from './moviecard';
import VideoCard from './video-card';


class MovieContainer extends React.Component{
constructor(){
    super()
    this.state = {
        movie:[],
        tivi:[],
        aniTv:[],
        aniMovi:[],
        option:'Streaming',
        index:0,
        indexVid:0,
        loading:true,
        modal:false,
        videoSrc:'',
        pages:1
    }
}

async componentDidMount(){
  const animeTv = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=0ccbee0a69447c2b1bd0090bf76b0358&language=en-US&sort_by=popularity.desc&page=${this.state.pages}&with_keywords=210024|222243`)

  const animeMovie = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&language=en-US&sort_by=popularity.desc&page=${this.state.pages}&with_keywords=210024|222243`)
  
  const aniMovRes = await animeMovie.json()
  const aniTvRes = await animeTv.json()
const stream = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&watch_region=US&with_watch_monetization_types=flatrate`)
const streamTv = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=0ccbee0a69447c2b1bd0090bf76b0358&watch_region=US&with_watch_monetization_types=flatrate`)
    const tvRes = await streamTv.json()
    const movieRes = await stream.json()
    if(movieRes ){
        this.setState(prev => {
            return{
                movie:prev.movie = movieRes.results,
                tivi:prev.tivi = tvRes.results,
                loading:prev.loading = false,
                aniMovi:prev.aniMovi =  aniMovRes.results,
                aniTv:prev.aniTv = aniTvRes.results
            }
          })
    }
}

async componentDidUpdate(){
  const animeTv = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=0ccbee0a69447c2b1bd0090bf76b0358&language=en-US&sort_by=popularity.desc&page=${this.state.pages}&with_keywords=210024|222243`)

  const animeMovie = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&language=en-US&sort_by=popularity.desc&page=${this.state.pages}&with_keywords=210024|222243`)

  const aniMovRes = await animeMovie.json()
  const aniTvRes = await animeTv.json()
  if(aniMovRes){
      this.setState(prev => {
          return{
              aniMovi:prev.aniMovi =  aniMovRes.results,
              aniTv:prev.aniTv = aniTvRes.results,
              loading:prev.loading = false
          }
        })
  }
  }

nextSlide = (e) => {
  e.preventDefault()
this.setState({index:this.state.index = this.state.index + 1})
}

prevSlide = (e) => {
e.preventDefault()
this.setState({index:this.state.index = this.state.index - 1})
} 

nextSlideVid = (e) => {
  e.preventDefault()
this.setState({indexVid :this.state.indexVid  = this.state.indexVid  + 1})
console.log(this.state.indexVid  );
}

prevSlideVid  = (e) => {
e.preventDefault()
this.setState({indexVid:this.state.indexVid  = this.state.indexVid - 1})
} 


clickOption = async (e) => {
  e.preventDefault()
  const id = e.target.dataset.id
  if (id === 'Streaming') {
    const stream = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&watch_region=US&with_watch_monetization_types=flatrate`)

    const streamTv = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=0ccbee0a69447c2b1bd0090bf76b0358&watch_region=US&with_watch_monetization_types=flatrate`)
        const tvRes = await streamTv.json()
        const movieRes = await stream.json()
  if(movieRes){
    this.setState(prev => {
return{
  option:prev.option = id,
  movie:prev.movie = movieRes.results,
  tivi:prev.tivi = tvRes.results
    }
})
  
  }
  }else{
    const opt = await fetch(
      `https://api.themoviedb.org/3/discover/${id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358&region=ID&with_release_type=3|2`
  )
  
  const result = await opt.json()
  if(result){
    this.setState({
      option:this.state.option = id,
      movie:this.state.movie = result.results,
      tivi:this.state.tivi = ''
    })
  
  }
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

paginationNext = async (e) => {

  this.setState({
      pages:this.state.page = this.state.pages + 1,
      loading:this.loading = true
  })
} 

paginationPrev = async (e) => {
  this.setState({
      pages:this.state.page = this.state.pages - 1,
      loading:this.loading = true
  })

} 

render(){

    const movies = this.state.movie.length < 1 ? "" : this.state.movie.map(m => {
        const date = new Date(m.release_date);
        return < MovieCard  img={m.poster_path} data={m} id={m.id} index={this.state.index} Date={date}  /> 
    })

    const tivis = this.state.tivi.length < 1 ? "" : this.state.tivi.map(m => {

      return < MovieCard  img={m.poster_path} data={m} id={m.id} index={this.state.index}  /> 
  })

    const Videos = this.state.movie.map(m => {
     return <VideoCard id={m.id} index={this.state.indexVid} judul={m.title} playVideo={this.playVideo}/>
    })

    const animMovi = this.state.aniMovi.length < 1 ? "" : this.state.aniMovi.slice(0,10).map(m => {
      const date = new Date(m.release_date);
      return < MovieCard  img={m.poster_path} data={m} id={m.id} index={this.state.index} Date={date}  /> 
  })

  const animTv = this.state.aniTv.length < 1 ? "" : this.state.aniTv.slice(0,10).map(m => {
      const dates = new Date(m.first_air_date);
      return < MovieCard  img={m.poster_path} data={m} id={m.id} index={this.state.index} Date={dates}  /> 
  })

    
    return(
        <div className='content'>
            <div className='populer-container'>
  <div className='populer-inner'>
  <Banner />
  </div>
            </div>

            <div className='populer-container'>
          <div className='judul-flex'>
          <h3 class="title">Popular</h3>
          <div className='tittle-inner'>
          <a href='#' className={this.state.option === 'Streaming' ? 'actives' : ""} data-id='Streaming'  onClick={this.clickOption}>Streaming</a>
            <a href='#' className={this.state.option === 'movie' ? 'actives' : ""}data-id='movie'  onClick={this.clickOption}>In Theaters</a>
            <a href='#' className={this.state.option === 'tv' ? 'actives' : ""}data-id='tv' onClick={this.clickOption} >On Tv</a>
          </div>
          </div>    
<div className='populer-inner'>
{movies}
{tivis}
  </div>
  <div className="tombol-top">
<a href="#"  className="kiri"  onClick={this.prevSlide} style={ this.state.index >= 1 ? { display:'block'} : {display : 'none'} }  ></a>
<a href="#" className="kanan" onClick={this.nextSlide}  style={ this.state.index > 16 ? { display:'none'} : {display : 'block'} }  ></a>
</div>
            </div>

<div className='populer-container'>
            <h3 class="title">Trailer</h3>
  <div className='populer-inner'>
{Videos}
  </div>
  <div className="tombol-top">
<a href="#"  className="kiri"  onClick={this.prevSlideVid} style={ this.state.indexVid >= 1 ? { display:'block'} : {display : 'none'} }  ></a>
<a href="#" className="kanan" onClick={this.nextSlideVid}  style={ this.state.indexVid > 19 ? { display:'none'} : {display : 'block'} }  ></a>
</div>
            </div>
<div className={this.state.modal ? 'modals' : "modal-container"} onClick={this.removeModal }>
{this.state.modal ? <ModalVideo VideoKey={this.state.videoSrc}  />  : ""}
</div>

<div className='populer-container'>
{this.state.loading ? <div className="lds-facebook"><div></div><div></div><div></div></div> : " "}
  <div className='judul-container'>
  <h3 class="title">Anime</h3>
  <Link to="/anime-populer/" className="views">View All</Link>
  </div>
  <div className='search-content'>
{animMovi}
{animTv}
{this.state.loading ? "" : <div className="pagination">
             {this.state.pages > 1 ? <button className='prev' onClick={this.paginationPrev}>Previous</button> : ""}
             <button className='next' onClick={this.paginationNext}>Next</button> 
</div>}
  </div>
  </div>
  
        </div>
      )
}
}

export default MovieContainer;