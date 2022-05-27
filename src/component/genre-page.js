import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import GenreContent from './genre-content';
import LeftSidebar from './left-sidebar';

function GenrePage(){
  const{ id}= useParams();
  const query = new URLSearchParams(useLocation().search)
console.log(query);
    return(
<GenreContent id={id} />
    )
}

export default GenrePage;