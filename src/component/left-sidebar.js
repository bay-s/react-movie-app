import React from 'react'
import { Link } from 'react-router-dom'
import TrendingCard from './trending-card'


class LeftSidebar extends React.Component{
    constructor(){
       super()
       this.state ={
        option:'day',
        search:'',
        srchValue:[],
        genre:[],
        tvGenres:[],
        trending:[]
       } 
    }

    async componentDidMount(){
      const genreRes = await  fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=0ccbee0a69447c2b1bd0090bf76b0358")
      const genreTv = await  fetch("https://api.themoviedb.org/3/genre/tv/list?api_key=0ccbee0a69447c2b1bd0090bf76b0358")
      const trending = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=0ccbee0a69447c2b1bd0090bf76b0358"
    )
     const trendRes = await trending.json()
     const tvGenre = await genreTv.json()
      const genrez = await genreRes.json()
     if(genrez){
      const trends = []
      for (let i = 0; i < 10; i++) {
trends.push(trendRes.results[i])
      }
      this.setState(prev => {
        return{
          genre:prev.genre = genrez.genres,
          tvGenres:prev.tvGenres = tvGenre.genres,
          trending:prev.trending = trends
        }
      })
     }
    }


    trendingClick = async (e) => {
      e.preventDefault()
      const id = e.target.dataset.id
      const trending = await fetch(
      `  https://api.themoviedb.org/3/trending/tv/${id}?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
    )
     const trendRes = await trending.json()
  if (trendRes) {
    const trends = []
    for (let i = 0; i < 10; i++) {
trends.push(trendRes.results[i])
    }
    this.setState({trending:trends,option:id})
    this.setState({ trending:trends,option:id})
  }
    }


    render(){

let length = 1
      const trending = this.state.trending.map(tren => {
        const dates = [new Date(tren.first_air_date)]
        return <TrendingCard  key={tren.id}  index={this.state.indexTr} title={tren.name} img={tren.poster_path} id={tren.id} length={length++} rating={tren.vote_average} />
      })
      const ID = `/movie-search/${this.state.search}`
        return(
<section className='left-sidebar'>
    <div className='left-list'>
    <h3 className='sub-title'>Trending</h3>   
<div className='trending-option'>
<ul>
  <li><a href='#' className={this.state.option === 'day' ? 'active' : ""} data-id="day" onClick={this.trendingClick}>Today</a></li>
  <li><a href='#' className={this.state.option === 'week' ? 'active' : ""} data-id="week" onClick={this.trendingClick}>This Week</a></li>
</ul>
</div>       
<div className='sidebar-content'>
{trending }
</div>
</div>
<div className='left-list'>
<h3 className='sub-title'>Genre</h3>         
<ul className='genre-list'>
{
  this.state.genre.map(gen => {
    const genId = `/genre/${gen.id}`
    return  <li><Link to={genId} className='genre-button' onClick={this.props.ClickFetch}> {gen.name} </Link></li>
})
}
{
  this.state.tvGenres.map(gen => {
    const genId = `/genre/${gen.id}`
    return  <li><Link to={genId} className='genre-button' onClick={this.props.ClickFetch}> {gen.name} </Link></li>
})
}
</ul>
</div>

</section>
        )
    }
}

export default LeftSidebar;