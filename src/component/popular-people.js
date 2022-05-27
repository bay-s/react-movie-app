import React from 'react'
import { Link } from 'react-router-dom'

class PopularPeople extends React.Component{
    constructor(){
        super()
        this.state ={
            loading:true,
            people:[],
            pages:1
        }
    }

    async componentDidMount(){
        const peopleRes = await fetch(
            `https://api.themoviedb.org/3/person/popular?api_key=0ccbee0a69447c2b1bd0090bf76b0358`
          )

        const result = await peopleRes.json()
        const results = result.results
        if(results){
            this.setState(prev => {
                return{
                  loading:prev.loading = false,
                  people:prev.people = results
                }
              })
        }
    }

    async componentDidUpdate(){
        const peopleRes =  await fetch(
            `https://api.themoviedb.org/3/person/popular?api_key=0ccbee0a69447c2b1bd0090bf76b0358&page=${this.state.pages}`
          )

        const result = await peopleRes.json()
        const results = result.results
        if(results){
            this.setState(prev => {
                return{
                  loading:prev.loading = false,
                  people:prev.people = results
                }
              })
        }
    }

  paginationNext = async (e) => {

    this.setState({
        pages:this.state.page = this.state.pages + 1,
        loading:this.state.loading = true
    })
  } 

  paginationPrev = async (e) => {
    this.setState({
        pages:this.state.page = this.state.pages - 1,
        loading:this.state.loading = true
    })

  } 

    render(){
        return(
            <div className="container-people">

            <div className="main">
              <h2 className="titles">Popular People</h2>
            <div className="content-people">
             {this.state.loading ? <div className="loader-wrapper">
    <span className="loader"><span className="loader-inner"></span></span>
  </div>: " "}
           {this.state.people.map(ppl => {
               const ID = `/person-detail/${ppl.id}`
               const img = `https://image.tmdb.org/t/p/w300/${ppl.profile_path}`
               return <div className="people-card">
               <Link to={ID}>
               <img src={img} alt="" class="thumb" />
               </Link>
               <div className="info">
               <h4 class="judul"><Link to={ID}>{ppl.name}</Link></h4>
               <p class="desk"></p>
               </div>
               </div>
           })}
            </div>
            <div className="pagination">
             {this.state.pages > 1 ? <button className='prev' onClick={this.paginationPrev}>Previous</button> : ""}
             <button className='next' onClick={this.paginationNext}>Next</button> 
            </div>
            </div>
                </div>
        )
    }
}

export default PopularPeople;