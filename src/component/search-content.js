
import React from 'react'
import { Link } from 'react-router-dom'
import LeftSidebar from './left-sidebar'
import empty from '../empty.png'

class SearchContent extends React.Component{
    constructor(){
        super()
        this.state = {
search:[],
isLoad:true,
pages:1
        }
    }

  async componentDidMount(){

      const srch = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=0ccbee0a69447c2b1bd0090bf76b0358&query=${this.props.id}`
      )
    const searchResult = await srch.json()
    const results = searchResult.results
    if (searchResult) {
    this.setState(prev => {
        return{
          isLoad:prev.isLoad = false,
          search:prev.search = results
        }
      }) 
}
 
  }  

  async componentDidUpdate(){

    const srch = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=0ccbee0a69447c2b1bd0090bf76b0358&query=${this.props.id}`
    )
    const searchPage = await   fetch(`https://api.themoviedb.org/3/search/multi?api_key=0ccbee0a69447c2b1bd0090bf76b0358&query=${this.props.id}&page=${this.state.pages}`) 
  const searchResult = await srch.json()
  const pageResult = await searchPage.json()
  const results = searchResult.results
  if (searchResult) {
  this.setState(prev => {
      return{
        isLoad:prev.isLoad = false,
        search:prev.search = results,
        search:prev.search = pageResult.results
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
{this.state.isLoad ? <div className="lds-facebook"><div></div><div></div><div></div></div> : " "}
  <div className='search-content'>
  <div className='result'>
    <p className='results'>Search '{this.props.id}'</p>
  </div>
{  this.state.search.map(srch => {
          const img = `https://image.tmdb.org/t/p/w185/${srch.poster_path}`
          const person =`https://image.tmdb.org/t/p/w185/${srch.profile_path}`
          const ID = `/${srch.media_type}-detail/${srch.id}`
             return  <div className="card">
           <Link to={ID}>
            {srch.poster_path ? <>
            <img src={img} alt="" className="thumb" />
             <img src={person} alt="" className="thumb" />
             </> : <img src={empty} alt="No image found" className="thumb" />}
             </Link>
    
             <div className="search-inner">
             <Link to={ID}>
             <h4 className="judul">{srch.title}</h4>
             </Link>
             <Link to={ID}>
             <h4 className="judul">{srch.name}</h4>
             </Link>
             <span className="date">{srch.release_date}</span>
             <span className="date">{srch.first_air_date}</span>
             <span className="date">{srch.known_for_department}</span>
             {/* <span className="review">{srch.overview}</span> */}
             </div>
             </div>
           })}
{this.state.isLoad ? "" : <div className="pagination">
             {this.state.pages > 1 ? <button className='prev' onClick={this.paginationPrev}>Previous</button> : ""}
             <button className='next' onClick={this.paginationNext}>Next</button> 
</div>}
  </div>
  <LeftSidebar />
</div>
      )
  }
}


export default SearchContent;



