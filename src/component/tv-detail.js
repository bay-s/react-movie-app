import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import TvDetailCard from './tv-detail-card'
import Footer from './footer'
function TvDetail () {

    const{ id }= useParams();
            return(
          <>
                <TvDetailCard  key={id} id={id} />
    
          </>
            )
}

export default TvDetail;



