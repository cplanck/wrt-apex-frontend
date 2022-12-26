import '../css/ApexApp.css';
import wrt_logo from '../assets/images/wrt-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import { faHurricane, faUserAstronaut, faWrench } from '@fortawesome/free-solid-svg-icons'
// import { Tooltip } from 'react-tooltip';
// import 'react-tooltip/dist/react-tooltip.css'
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';



function SideNav(props){
    return(
        <div className={props.menuOpen ? 'SideNav SideNavActive':'SideNav'}>
             <Link to={'/'}>
            <div className='wrt-logo-wrapper' href={process.env.REACT_APP_FRONTEND_ROOT}>
                <img src={wrt_logo} className='wrt-logo'/>
            </div>
            </Link>
            <div className='icon-group'>
                <SideNavIcon icon={faHurricane} link={'deployments'} setActivePage = {props.setActivePage} title={'Deployments'}/>
                <SideNavIcon icon={faUserAstronaut}  link={'users'} setActivePage = {props.setActivePage} title={'Users'} />
                <SideNavIcon icon={faWrench}  link={'settings'} setActivePage = {props.setActivePage} title={'Settings'}/>
            </div>
        </div>
    )
}

export default SideNav


function SideNavIcon(props){

    let currentPage = window.location.pathname.split('/')[1]

    return(
        <Tooltip title={props.title} placement="right-start" arrow enterDelay={500}>
            <Link to={props.link} className={currentPage == props.link ? 'icon active': 'icon'} onClick={()=>{props.setActivePage(props.link)}}>
                <FontAwesomeIcon icon={props.icon}/>    
            </Link>
        </Tooltip>
    )
}