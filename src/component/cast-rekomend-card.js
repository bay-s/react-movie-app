import React from "react";
import CastCard from "./cast-card";
import RecomCard from "./rekomen-card";
import akun from '../akun.png'
import ReviewCard from "./review-card";
import { Link } from "react-router-dom";
import MediaVideo from "./media-video";
import MediaBackdrop from "./media-backgdrop";
import MediaPoster from "./media-poster";


class CastDanRekomen extends React.Component {
  constructor() {
    super()
    this.state = {
      cast: [],
      rekomen: [],
      loading: true,
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
          `https://api.themoviedb.org/3/movie/${this.props.id}/images?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
        )
        if (!poster.ok) {
          throw Error(poster.statusText);
        }
        const rekomen = await fetch(
          `https://api.themoviedb.org/3/movie/${this.props.id}/recommendations?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
        )
        const Cast = await fetch(
          `https://api.themoviedb.org/3/movie/${this.props.id}/credits?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
        )
        const review = await fetch(
          `https://api.themoviedb.org/3/movie/${this.props.id}/reviews?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
        )
        const Video = await fetch(
          `https://api.themoviedb.org/3/movie/${this.props.id}/videos?api_key=0ccbee0a69447c2b1bd0090bf76b0358&append_to_response=videos`
        )


         const videos = await Video.json()
         const posters = await poster.json()
        const vid = videos.results
        const castRes = await Cast.json();
        const rekRes = await rekomen.json();
        const revs = await review.json();
        const cazt = castRes.cast;
        const rec = rekRes.results;
        const revResults = revs.results;
        const posterz = posters.posters
        const backdrops = posters.backdrops
        console.log(posters);
        if (castRes) {
          this.setState((prev) => {
            return {
              loading: (prev.loading = false),
              cast: (prev.cast = cazt),
              rekomen: (prev.rekomen = rec),
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
    const rekomen = await fetch(
      `https://api.themoviedb.org/3/movie/${this.props.id}/recommendations?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
    );
    const Cast = await fetch(
      `https://api.themoviedb.org/3/movie/${this.props.id}/credits?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
    );

    const castRes = await Cast.json();
    const rekRes = await rekomen.json();
    const cazt = castRes.cast;
    const rec = rekRes.results;
    if (castRes) {
      this.setState((prev) => {
        return {
          loading: (prev.loading = false),
          cast: (prev.cast = cazt),
          rekomen: (prev.rekomen = rec),
        };
      });
    }
  }

mediaClick = async (e) => {
e.preventDefault()
const id = e.target.dataset.id

if (id === 'Trailer') {
  const Video = await fetch(
    `https://api.themoviedb.org/3/movie/${this.props.id}/videos?api_key=0ccbee0a69447c2b1bd0090bf76b0358&append_to_response=videos`
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
    `https://api.themoviedb.org/3/movie/${this.props.id}/images?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
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
    `https://api.themoviedb.org/3/movie/${this.props.id}/images?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
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

  render() {
    const cast = this.state.cast.map((cazt) => {
      const imgUrl = `https://image.tmdb.org/t/p/w300/${cazt.profile_path}`;
      return (
        <CastCard
          key={cazt.cast_id}
          id={cazt.id}
          name={cazt.name}
          img={imgUrl}
          chara={cazt.character}
        />
      );
    });

    const Recomend = this.state.rekomen.map((rec) => {
      const imgUrl = `https://image.tmdb.org/t/p/w300/${rec.poster_path}`;
      return (
        <RecomCard
          key={rec.id}
          id={rec.id}
          name={rec.title}
          img={imgUrl}
          date={rec.release_date}
          ClickFetch={this.ClickFetch}
        />
      );
    });

  const ReviewCards = this.state.review.slice(0,1).map((rev) => {
    const img = `https://image.tmdb.org/t/p/w185/${rev.author_details.avatar_path}`;
    return <ReviewCard img={img} data={rev} length={this.state.review.length}/>
  }) 

  const ID = `/review/${this.props.id}`
  const posterID = `/poster-page/${this.props.id}`
  const backID = `/backdrop-page/${this.props.id}`
    return (
<>
        {this.state.loading ? (
          <div className="loader-wrapper">
            <span className="loader">
              <span className="loader-inner"></span>
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="populer-container">
          <h3 className="title">Top Cast</h3>
          <div className="detail-inner">{cast}</div>
        </div>

        <div className="review-container">
          <div className="judul-flex">
            <h3 className="title">Social</h3>
            <a href="#" className="reviews">
              Review {this.state.review.length}
            </a>
          </div>

          <div className="review-content">
            {ReviewCards}
           <Link to={ID} className={this.state.review.length > 1 ?"load" : "hide"}>Load More</Link>
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

{this.state.option === "Populer" ?   <MediaVideo video={this.state.video} playVideo={this.props.playVideo}/> : ""}
{this.state.option === "Trailer" ?   <MediaVideo video={this.state.video} playVideo={this.props.playVideo}/> : ""}
{this.state.option === "Backdrop" ? <MediaBackdrop poster={this.state.backdrop} /> : ""}
{this.state.option === "Poster" ? <MediaPoster poster={this.state.poster} /> : ""}
</div>

</div>
        <div className="populer-container">
          <h3 className="title">Recommendations</h3>
          <div className="detail-inner">
            {this.state.rekomen.length === 0
              ? "We don't have enough data to suggest about this Movie."
              : Recomend}
          </div>
        </div>
        </>
    );
  }
}

export default CastDanRekomen;
