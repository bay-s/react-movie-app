import React from 'react'
import LeftSidebar from './left-sidebar'
import MovieCard from './moviecard'


class AnimePopuler extends React.Component{
    constructor(){
        super()
        this.state = {
            aniMovi:[],
            aniTv:[],
            loading:true,
            pages:1
        }
    }

    async componentDidMount(){
        const animeTv = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=0ccbee0a69447c2b1bd0090bf76b0358&language=en-US&sort_by=popularity.desc&page=1&with_keywords=210024|222243`)

        const animeMovie = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&language=en-US&sort_by=popularity.desc&page=1&with_keywords=210024|222243`)

        const aniMovRes = await animeMovie.json()
        const aniTvRes = await animeTv.json()
        if(aniMovRes){
            this.setState(prev => {
                return{
                    aniMovi:prev.aniMovi =  aniMovRes.results,
                    aniTv:prev.aniTv = aniTvRes.results,
                    loading:prev.loading = false
                }
              })
        }
    }
    
    async componentDidUpdate(){
        const animeTv = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=0ccbee0a69447c2b1bd0090bf76b0358&language=en-US&sort_by=popularity.desc&page=${this.state.pages}&with_keywords=210024|222243`)

        const animeMovie = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0ccbee0a69447c2b1bd0090bf76b0358&language=en-US&sort_by=popularity.desc&page=${this.state.pages}&with_keywords=210024|222243`)

        const aniMovRes = await animeMovie.json()
        const aniTvRes = await animeTv.json()
        if(aniMovRes){
            this.setState(prev => {
                return{
                    aniMovi:prev.aniMovi =  aniMovRes.results,
                    aniTv:prev.aniTv = aniTvRes.results,
                    loading:prev.loading = false
                }
              })
        }
        }

    paginationNext = async (e) => {

        this.setState({
            pages:this.state.page = this.state.pages + 1,
            loading:this.loading = true
        })
      } 
      
      paginationPrev = async (e) => {
        this.setState({
            pages:this.state.page = this.state.pages - 1,
            loading:this.loading = true
        })
      
      } 

      render(){
        const movies = this.state.aniMovi.length < 1 ? "" : this.state.aniMovi.map(m => {
            const date = new Date(m.release_date);
            return < MovieCard  img={m.poster_path} data={m} id={m.id} index={this.state.index} Date={date}  /> 
        })

        const tivis = this.state.aniTv.length < 1 ? "" : this.state.aniTv.map(m => {
            const dates = new Date(m.first_air_date);
            return < MovieCard  img={m.poster_path} data={m} id={m.id} index={this.state.index} Date={dates}  /> 
        })
      
        return(
            <div className='search-container'>
<div className='search-content'>
{this.state.loading ? <div className="loader-wrapper">
    <span className="loader"><span className="loader-inner"></span></span>
  </div> : " "}
{movies}
{tivis}
{this.state.loading ? "" : <div className="pagination">
             {this.state.pages > 1 ? <button className='prev' onClick={this.paginationPrev}>Previous</button> : ""}
             <button className='next' onClick={this.paginationNext}>Next</button> 
</div>}
          </div>
            <LeftSidebar />
          </div>
          )
      }
}


export default AnimePopuler;