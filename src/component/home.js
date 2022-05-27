import React from 'react'
import Footer from './footer';
import MovieContainer from './moviecontainer';
import MovieDetail from  './moviedetail';
import Banner from  './banner';
import LeftSidebar from './left-sidebar';



class Home extends React.Component{

    render(){
        return(
<div className='App'>
  <LeftSidebar />
  <MovieContainer />
</div>
        )
    }
}

export default Home;