
import React from "react";
import { useParams } from "react-router-dom";
import BackdropCards from "./backdrop-card";

function BackdropPage (){
    const {id }= useParams()
    return(
    <div className="content-poster">
  <BackdropCards id={id} />
    </div>
    )
}

export default BackdropPage;