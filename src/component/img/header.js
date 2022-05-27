import React from 'react'
import {Link} from 'react-router-dom'
import '../header.css';
import logo from '../logos.png'

class Header extends React.Component{
constructor(){
  super()
  this.state = {
    search:'',
    srchValue:[]
  }
}

handlerChange = (e) => {
  const {name,value} = e.target
  this.setState({
    search:value
  })
}

searchFetch = (e) => {
  e.preventDefault()
  const data = this.props.data
  this.setState(prev => {
    return{
    data:prev.search = this.state.search
    }
  })
window.location.reload()
}


    render(){
      const ID = `/movie-search/${this.state.search}`
        return(
      <>
    <header className='header-top'>
      <nav className="navbar">
<img src={logo} className='logos' />
<form className="form" onSubmit={this.searchFetch}>
<input  type="text" name="search" placeholder="Search.." onChange={this.handlerChange}/>
{this.state.search.length > 0 ? <Link to={ID} > <button type="submit" className="buton">Search</button></Link> : <button type="submit" className="buton" >Search</button> }
</form> 
<div className='toggle'>
  <ul>
    <li><a href='#'>GENRE</a></li>
    <li><a href='#'>TOGGLE</a></li>
  </ul>
</div>
      </nav>
    </header>

      </>
        )
    }
}

export default Header;