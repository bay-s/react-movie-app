
import React from 'react'
import { useParams } from 'react-router-dom';
import LeftSidebar from './left-sidebar';
import SearchContent from './search-content';

function SearchPage (){
  const{ id}= useParams();
    return(
      <SearchContent id={id} />
    )
}

export default SearchPage;