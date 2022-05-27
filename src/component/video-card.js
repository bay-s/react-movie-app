import React from 'react'
import Logo from './img/PngItem_6391407.png'

class VideoCard extends React.Component{
    constructor(){
        super()
        this.state = {
     video:[],
     loading:true
        }
    }

    async componentDidMount(){
     const Video = await fetch(
            `https://api.themoviedb.org/3/movie/${this.props.id}/videos?api_key=0ccbee0a69447c2b1bd0090bf76b0358&append_to_response=videos`
          )
     const videos = await Video.json()
const vid = videos.results[0]

if(vid){
    this.setState(prev => {
        return{
            loading:prev.loading = false,
          video:prev.video = vid
        }
      })
}
}

render(){
const video = this.state.video
    const img = `http://i3.ytimg.com/vi/${video.key}/hqdefault.jpg`
    const style = {
      transform:`translateX(-${this.props.index * 100}%)`
  }

    return(
     <div className="container-videos" style={style}>
    <div className="image-wrapper">
    <img className="video-img" src={img} / >
    <a href="#" className="play" onClick={this.props.playVideo} ><img class="play-img"src={Logo} alt="" data-mykey={video.key} /></a>
    </div>
    <div className="info">
      <span class="trailer">{video.name}</span>
      <span class="trailer-judul">{this.props.judul}</span>
    </div>
      </div>
       )
}

}

export default VideoCard;


