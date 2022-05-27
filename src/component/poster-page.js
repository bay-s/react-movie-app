import React from "react";
import { useParams } from "react-router-dom";
import PosterCards from "./poster-card";

function PosterPage (){
    const {id }= useParams()
    return(
  <div className="content-poster">
  <PosterCards id={id} />
    </div>
    )
}

export default PosterPage;