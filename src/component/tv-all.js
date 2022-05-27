import React from "react";
import LeftSidebar from "./left-sidebar";
import MovieCard from "./moviecard";

class TvPage extends React.Component{
    constructor(){
        super()
        this.state = {
            movie:[],
            tivi:[],
            loading:true,
            pages:1
        }
    }

    async componentDidMount(){
    const stream =  await fetch(
        "https://api.themoviedb.org/3/trending/tv/week?api_key=0ccbee0a69447c2b1bd0090bf76b0358"
    )

    const streamTv  =  await  fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
      )

        const tvRes = await streamTv.json()
        const movieRes = await stream.json()
        if(movieRes ){
            this.setState(prev => {
                return{
                    movie:prev.movie = movieRes.results,
                    tivi:prev.tivi = tvRes.results,
                    loading:prev.loading = false
                }
              })
        }
    }
    
    async componentDidUpdate(){
        const stream =  await fetch(
            "https://api.themoviedb.org/3/trending/tv/week?api_key=0ccbee0a69447c2b1bd0090bf76b0358&page=${this.state.pages}"
        )
    
        const streamTv = await  fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=0ccbee0a69447c2b1bd0090bf76b0358&page=${this.state.pages}`
          )

            const tvRes = await streamTv.json()
            const movieRes = await stream.json()
            if(movieRes ){
                this.setState(prev => {
                    return{
                        movie:prev.movie = movieRes.results,
                        tivi:prev.tivi = tvRes.results,
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
        const movies = !this.state.movie ? "" : this.state.movie.map(m => {
            const date = new Date(m.release_date);
            return < MovieCard  img={m.poster_path} data={m} id={m.id} index={this.state.index} Date={date}  /> 
        })

        const tivis = !this.state.tivi.length ? "" : this.state.tivi.map(m => {
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

export default TvPage;