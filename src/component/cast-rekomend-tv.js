import React from 'react'
import { Link } from 'react-router-dom'
import CastCard from './cast-card'
import ReviewCard from './review-card'
import TvRecomCard from './tv-recomend-card'
import MediaVideo from "./media-video";
import MediaBackdrop from "./media-backgdrop";
import MediaPoster from "./media-poster";


class CastDanRekomenTV extends React.Component{
    constructor(){
super()
this.state = {
    tvCast:[],
    tv:[],
    loading:true,
    review: [],
    poster:[],
    backdrop:[],
    video:[],
    option:'Populer'
}
    }

    async componentDidMount() {
      try{
        const poster = await fetch(
            `https://api.themoviedb.org/3/tv/${this.props.id}/images?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
          )
          if (!poster.ok) {
            throw Error(poster.statusText);
          }
          const recTv =  await fetch(
            `https://api.themoviedb.org/3/tv/${this.props.id}/recommendations?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
          )
          const CAST_TV = await fetch(
            `https://api.themoviedb.org/3/tv/${this.props.id}/credits?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
          )
          const review = await fetch(
            `https://api.themoviedb.org/3/tv/${this.props.id}/reviews?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
          )
          const Video = await fetch(
            `https://api.themoviedb.org/3/tv/${this.props.id}/videos?api_key=0ccbee0a69447c2b1bd0090bf76b0358&append_to_response=videos`
          )
  
  
           const videos = await Video.json()
           const posters = await poster.json()
          const vid = videos.results
          const revs = await review.json();
          const castTv = await CAST_TV.json()
          const TvRes = await recTv.json()  
          const tv = TvRes.results
          const caztTv =  castTv.cast
          const revResults = revs.results;
          const posterz = posters.posters
          const backdrops = posters.backdrops
          if (TvRes) {
            this.setState((prev) => {
              return {
                loading: (prev.loading = false),
                tv:prev.tv = tv,
                tvCast:prev.tvCast = caztTv,
                review: (prev.review = revResults),
                poster:prev.poster = posterz,
                backdrop:prev.backdrop = backdrops,
                video:prev.video = vid
              };
            });
          }
     }catch(error){
         console.log(error);
     }
  
    }
  
  async componentDidUpdate() {
    const recTv =  await fetch(
      `https://api.themoviedb.org/3/tv/${this.props.id}/recommendations?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
    )
    const CAST_TV = await fetch(
      `https://api.themoviedb.org/3/tv/${this.props.id}/credits?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
    )
     const castTv = await CAST_TV.json()
     const TvRes = await recTv.json()  
     const tv = TvRes.results
     const caztTv =  castTv.cast
     if (castTv) {

            this.setState(prev => {
                return{
                  loading:prev.loading = false,
                  tv:prev.tv = tv,
                  tvCast:prev.tvCast = caztTv
                }
              })
    }
  }

mediaClick = async (e) => {
e.preventDefault()
const id = e.target.dataset.id

if (id === 'Trailer') {
  const Video = await fetch(
    `https://api.themoviedb.org/3/tv/${this.props.id}/videos?api_key=0ccbee0a69447c2b1bd0090bf76b0358&append_to_response=videos`
  )
  const videos = await Video.json()
  const vid = videos.results
  if (videos) {
    this.setState({
      video:this.state.video = vid,
      option:this.state.option = id
    })
  }
}
if (id === 'Backdrop') {
  const poster = await fetch(
    `https://api.themoviedb.org/3/tv/${this.props.id}/images?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  )
  const posters = await poster.json()
  const backdrops = posters.backdrops
  if (posters) {
    this.setState({
      backdrop:this.state.backdrop = backdrops,
      option:this.state.option = id
    })
  }
}
if (id === 'Poster') {

  const poster = await fetch(
    `https://api.themoviedb.org/3/tv/${this.props.id}/images?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  )
  const posters = await poster.json()
  const posterz = posters.posters
  if (posters) {
    this.setState({
      poster:this.state.poster = posterz,
      option:this.state.option = id
    })
  }
}
}

    render(){
        const cast = this.state.tvCast.length === 0 ? "We don't have enough data Cast about this TV shows." : this.state.tvCast.map(cazt => {
          const imgUrl = `https://image.tmdb.org/t/p/w300/${cazt.profile_path}`  
        return   <CastCard key={cazt.cast_id} id={cazt.id} name={cazt.name} img={imgUrl} chara={cazt.character}/>
        })

          const Recomend = this.state.tv.length === 0 ? "We don't have enough data to suggest suggest about this TV shows." : this.state.tv.map(rec => {
            const imgUrl = `https://image.tmdb.org/t/p/w300/${rec.poster_path}`  
          return   <TvRecomCard key={rec.id} id={rec.id} name={rec.name} img={imgUrl} date={rec.first_air_date} />
          })

          const ReviewCards = this.state.review.slice(0,1).map((rev) => {
            const img = `https://image.tmdb.org/t/p/w185/${rev.author_details.avatar_path}`;
            return <ReviewCard img={img} data={rev} length={this.state.review.length}/>
          }) 
        
          const ID = `/review/${this.props.id}`
          const posterID = `/poster-page/${this.props.id}`
          const backID = `/backdrop-page/${this.props.id}`
        return(
       <> 
{this.state.loading ? <div className="loader-wrapper">
    <span className="loader"><span className="loader-inner"></span></span>
  </div> : ""}
<div  className="populer-container">
<h3 className="title">Cast</h3>
<div  className="detail-inner">
{cast}
</div>
</div>
 
<div className='review-container'>
<div className='judul-flex'>
<h3 className="title">Social</h3>
 <a href='#' className="reviews">Review  {this.state.review.length}</a>
</div> 
<div className="review-content">
   {this.state.review.length < 1 ? `We don't have any reviews for ${this.props.judul}.` : ReviewCards}
           <Link to={ID} className={this.state.review.length > 1 ?"load" : "hide"} >Load More</Link>
</div>
</div>

<div className="review-container">
          <div className="judul-flex">
            <h3 className="title">Media</h3>
            <div className="tittle-inners">
          <ul>
         <li>
         <a href="#" className={this.state.option === 'Populer' ? 'media' : ""} data-id='Populer'  onClick={this.mediaClick} >
                Most Popular
              </a>
         </li>
       <li>
       <a href="#" className={this.state.option === 'Trailer' ? 'media' : ""} data-id='Trailer'  onClick={this.mediaClick} >
                Trailer {this.state.video.length}
              </a>
       </li>
       <li>
       <a href="#" className={this.state.option === 'Backdrop' ? 'media' : ""} data-id='Backdrop'  onClick={this.mediaClick} >
                Backdrop {this.state.backdrop.length}
              </a>
       </li>
    <li>
    <a href="#" className={this.state.option === 'Poster' ? 'media' : ""} data-id='Poster'  onClick={this.mediaClick} >
                Poster  {this.state.poster.length}
              </a>
    </li>
          </ul>
{this.state.option === "Backdrop" ?  <div className="view-all">
      <Link to={backID} className="view">View All</Link>
      </div> : ""}
{this.state.option === "Poster" ?  <div className="view-all">
   <Link to={posterID} className="view">View All</Link> 
</div> : ""}   
            </div>
  </div>

<div className='detail-inner'>

{this.state.option === "Populer" ?   <MediaVideo video={this.state.video} playVideo={this.props.playVideo} judul={this.props.judul} /> : ""}
{this.state.option === "Trailer" ?   <MediaVideo video={this.state.video} playVideo={this.props.playVideo}  judul={this.props.judul} /> : ""}
{this.state.option === "Backdrop" ? <MediaBackdrop poster={this.state.backdrop}  judul={this.props.judul} /> : ""}
{this.state.option === "Poster" ? <MediaPoster poster={this.state.poster}  judul={this.props.judul} /> : ""}
</div>

</div>

<div  className="populer-container">
<h3 className="title">Recommendations</h3>
<div  className="detail-inner">
{Recomend}
</div>
</div>
 
</>  
        )
    }
}

export default CastDanRekomenTV;