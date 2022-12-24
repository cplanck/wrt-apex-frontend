import '../css/ApexApp.css';
import wrt_logo from '../assets/images/wrt-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import { faCoffee, faHurricane, faUserAstronaut, faWrench } from '@fortawesome/free-solid-svg-icons'


function SideNav(props){
    return(
        <div className={props.menuOpen ? 'SideNav SideNavActive':'SideNav'}>
            <div className='wrt-logo-wrapper'>
                <img src={wrt_logo} className='wrt-logo'/>
            </div>
            <div className='icon-group'>
                <SideNavIcon icon={faHurricane} link={'deployments'} setActivePage = {props.setActivePage} />
                <SideNavIcon icon={faUserAstronaut}  link={'users'} setActivePage = {props.setActivePage} />
                <SideNavIcon icon={faWrench}  link={'settings'} setActivePage = {props.setActivePage} />
            </div>
        </div>
    )
}

export default SideNav


function SideNavIcon(props){

    let currentPage = window.location.pathname.split('/')[1]

    return(
        <Link to={props.link} className={currentPage == props.link ? 'icon active': 'icon'} onClick={()=>{props.setActivePage(props.link)}}>
            <FontAwesomeIcon icon={props.icon}/>
        </Link>
    )
}