
import React from 'react'
import { Link } from 'react-router-dom'
import LeftSidebar from './left-sidebar';
class  GenreContent extends React.Component{
    constructor(){
        super()
        this.state = {
result:[],
tvRes:[],
isLoad:true,
pages:1,
names:''
        }
    }

  async componentDidMount(){
        const movieGenre = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&with_genres=${this.props.id}`)
        const tvGenre = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=0ccbee0a69447c2b1bd0090bf76b0358&with_genres=${this.props.id}`)

    const searchResult = await movieGenre.json()
    const tvResult = await tvGenre.json()
    const results = searchResult.results
    if (searchResult) {
    this.setState(prev => {
        return{
          isLoad:prev.isLoad = false,
          result:prev.result = results,
          tvRes:prev.tvRes = tvResult.results
        }
      }) 
}
  
  }  

  
  async componentDidUpdate(){
    const pageResult = await  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&with_genres=${this.props.id}&page=${this.state.pages}`)
    const TvPage = await  fetch(`https://api.themoviedb.org/3/discover/tv?api_key=0ccbee0a69447c2b1bd0090bf76b0358&with_genres=${this.props.id}&page=${this.state.pages}`)
    const tvJson = await TvPage.json()
    const pageJson = await pageResult.json()
  if (pageJson) {
  this.setState(prev => {
      return{
        isLoad:prev.isLoad = false,
        result:prev.result = pageJson.results,
        tvRes:prev.tvRes = tvJson.results
      }
    }) 
    
}

} 

clickFetch = async (e) => {
  const namae = e.target.textContent
  const movieGenre = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&with_genres=${this.props.id}`)
  const searchResult = await movieGenre.json()
  const results = searchResult.results

  if (searchResult) {
  this.setState(prev => {
      return{
        isLoad:prev.isLoad = false,
        result:prev.result = results,
        names:prev.names = namae
      }
    }) 
  }
}  


paginationNext = async (e) => {

  this.setState({
      pages:this.state.page = this.state.pages + 1,
      isLoad:this.isLoad = true
  })
} 

paginationPrev = async (e) => {
  this.setState({
      pages:this.state.page = this.state.pages - 1,
      isLoad:this.isLoad = true
  })

} 

  render(){

      return(
<div className="search-container">
{this.state.isLoad ? <div className="loader-wrapper">
    <span className="loader"><span className="loader-inner"></span></span>
  </div> : " "}

<div className='search-content'>
{
          this.state.result.map(srch => {
            const img = `https://image.tmdb.org/t/p/w185/${srch.poster_path}`
            const ID = `/movie-detail/${srch.id}`
               return <div className="card">
               <Link to={ID}>
               <img src={img} alt="" className="thumb" />
               </Link>
               <div className="search-inner">
               <Link to={ID}>
               <h4 className="judul">{srch.title}</h4>
               </Link>
               <span className="date">{srch.release_date}</span>
               <span className="review">{srch.overview}</span>
               </div>
               </div>
           })
}

{
          this.state.tvRes.map(srch => {
            const img = `https://image.tmdb.org/t/p/w185/${srch.poster_path}`
            const ID = `/tv-detail/${srch.id}`
               return <div className="card">
               <Link to={ID}>
               <img src={img} alt="" className="thumb" />
               </Link>
               <div className="search-inner">
               <Link to={ID}>
               <h4 className="judul">{srch.name}</h4>
               </Link>
               <span className="date">{srch.first_air_date}</span>
               <span className="review">{srch.overview}</span>
               </div>
               </div>
           })
}
{this.state.isLoad ? "" : <div className="pagination">
             {this.state.pages > 1 ? <button className='prev' onClick={this.paginationPrev}>Previous</button> : ""}
             <button className='next' onClick={this.paginationNext}>Next</button> 
</div>}
</div>
<LeftSidebar ClickFetch={this.clickFetch} />

</div>
      )
  }
}


export default GenreContent;


