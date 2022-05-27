import React from 'react'
import Logo from './img/PngItem_6391407.png'

function MediaVideo(props){

    return(
props.video.map(m => {
  const img = `http://i3.ytimg.com/vi/${m.key}/hqdefault.jpg`
return <div className="container-videos" >
    <div className="image-wrapper">
    <img className="video-img" src={img} / >
    <a href="javascript:;" className="play" onClick={props.playVideo} ><img class="play-img"src={Logo} alt="" data-mykey={m.key} /></a>
    </div>
</div> 
})
       )

}

export default MediaVideo;


