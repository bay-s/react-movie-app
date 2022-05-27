import React from "react";

function MediaBackdrop(props){

    return(
      props.poster.length < 1 ? `We don't have any backdrop for ${props.judul}.`: props.poster.slice(0,20).map(pos => {
        const img = `https://image.tmdb.org/t/p/w500/${pos.file_path}`;
       return  <div className="image-wrappers">
        <img className="video-img" src={img} / >
        </div>
    })
    )
}

export default MediaBackdrop;