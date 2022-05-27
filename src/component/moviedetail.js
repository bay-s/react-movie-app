import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import MovieDetailCard from './movie-detail-card'
import CastDanRekomen from './cast-rekomend-card'
import Footer from './footer'
import { useNavigate } from 'react-router-dom';

function MovieDetail () {

    const{ id }= useParams();
    // console.log(useLocation());
    const navigate = useNavigate();
console.log(id);

    useEffect(() => {

      if (id.length == 0) {
        navigate('/')
        console.log("tes");
      }else{
        console.log("do nothing");
      }
    },[id,navigate])
            return(
          <>
                <MovieDetailCard  key={id} id={id} />
          </>
            )
}

export default MovieDetail;



