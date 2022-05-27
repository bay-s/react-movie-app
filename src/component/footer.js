import React from 'react'
import logo from '../tmdb-logo.svg';
import github from '../github.png'
function Footer(){
    return(
<footer className="footers">
<div className="footer-info">
<a href="https://developers.themoviedb.org/3/getting-started/introduction" target="_blank">
<img src={logo} alt="" />
</a>
<a href="https://github.com/bay-s/bay-s.github.io" target="_blank">
<img src={github} className="git" alt="" />
</a>
</div>
</footer>
    )
}

export default Footer;