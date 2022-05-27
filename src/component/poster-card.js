import React from "react";
import { Link } from "react-router-dom";

class PosterCards extends React.Component{
    constructor(){
        super()
        this.state = {
            poster:[],
            posterTv:[],
            data:[],
            dataTv:[],
        }
    }

    async componentDidMount() {
        try{
          
const movieDetail = await  fetch(
     `https://api.themoviedb.org/3/movie/${this.props.id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
  )
  const tvDetail = await  fetch(
    `https://api.themoviedb.org/3/tv/${this.props.id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
 )
 const poster = await fetch(
  `https://api.themoviedb.org/3/movie/${this.props.id}/images?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
)
const tvPoster = await fetch(
  `https://api.themoviedb.org/3/tv/${this.props.id}/images?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
)

           const posters = await poster.json()
           const posTv = await tvPoster.json()
          const posterz = posters.posters
          const PostersTv = posTv.posters
          const respon = await movieDetail.json()  
          const responTv = await tvDetail.json()  
          console.log(responTv);
          console.log(respon);
            if (posters) {
              this.setState({
                data:this.state.data = respon,
                dataTv:this.state.dataTv = responTv,
                poster:this.state.poster = posterz,
                posterTv:this.state.posterTv = PostersTv
              })     

            }
       }catch(error){
           console.log(error);
       }
    
      }

      render(){
const ID = this.state.dataTv.type ? `/tv-detail/${this.props.id}` : `/movie-detail/${this.props.id}`
const date = this.state.dataTv.type ?  new Date(this.state.dataTv.first_air_date) : new Date(this.state.data.release_date)

          return(
<>

<div className="poster-header">
<div className="poster-inner">
{this.state.dataTv.type ? <Link to={ID}><img src={`https://image.tmdb.org/t/p/w300/${this.state.dataTv.poster_path}`} />
</Link> : <Link to={ID}><img src={`https://image.tmdb.org/t/p/w300/${this.state.data.poster_path}`} />
</Link> }
<div className="poster-title">
{this.state.dataTv.type ? <> <h3><Link to={ID}>{this.state.dataTv.name} ({date.getFullYear()})</Link></h3>
<Link to={ID}> Back</Link></> : <> <h3><Link to={ID}>{this.state.data.title} ({date.getFullYear()})</Link></h3>
  <Link to={ID}> Back</Link></>}
 </div> 
</div>
</div> 
{this.state.dataTv.type  ? this.state.posterTv.map(pos => {
        const img = `https://image.tmdb.org/t/p/original/${pos.file_path}`;
       return  <div className="poster">
        <img className="video-img" src={img} / >
       <div className="poster-info">
           <h3 className="poster-judul">Info</h3>
         <ul>
             <li>
                 <span>Size</span>
                 <span>{pos.height}x{pos.width}</span>
             </li>
         </ul>  
       </div>
        </div>
      }) : this.state.poster.map(pos => {
        const img = `https://image.tmdb.org/t/p/original/${pos.file_path}`;
       return  <div className="poster">
        <img className="video-img" src={img} / >
       <div className="poster-info">
           <h3 className="poster-judul">Info</h3>
         <ul>
             <li>
                 <span>Size</span>
                 <span>{pos.height}x{pos.width}</span>
             </li>
         </ul>  
       </div>
        </div>
      }) 
      
}

</>
          )
      }
}

export default PosterCards;
