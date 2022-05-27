import React from 'react'

function ModalVideo(props) {
const url = `https://www.youtube.com/embed/${props.VideoKey}`

    return(
        <div className="box-video">
        <div className="containers">
        <iframe className="responsive-iframe" src={url}></iframe>
        </div>
        </div>
    )
}

export default ModalVideo;