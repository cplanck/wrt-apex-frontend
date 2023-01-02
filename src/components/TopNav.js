import { Twirl as Hamburger } from 'hamburger-react'
import NavDropdown from 'react-bootstrap/NavDropdown';

function TopNav(props){
    return(
            <div className="TopNav">
                <div className='text-truncate'>
                    <h1 className="wrt-header">APEX Dashboard</h1>
                    <h6>White River Technologies</h6>
                </div>
                <div>
                    <div className='AvatarButtonGroup'>
                        <Avatar firstName={props.userDetails.firstName} lastName={props.userDetails.lastName} menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} setUserLoggedIn={props.setUserLoggedIn}/>
                    </div>
                </div>
            </div>           
    )
}

export default TopNav

function Avatar(props){

    let firstInitial = props.firstName[0]
    let lastInitial = props.lastName[0]

    function logoutUser(){
        window.localStorage.removeItem('user')
        window.localStorage.removeItem('firstName')
        window.localStorage.removeItem('lastName')
        props.setUserLoggedIn(false)
    }

    return(
        <div className="avatarWrapper">
            <div className={'d-block d-md-none'} onClick={() => {props.setMenuOpen(!props.menuOpen)}}>
                <Hamburger onClick={()=>{props.setMenuOpen(!props.menuOpen)}}/>
            </div>
            <div className='d-none d-md-flex' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <div className="avatar"><h4 style={{margin: '0px'}}>{firstInitial}{lastInitial}</h4></div>
                <NavDropdown id="nav-dropdown-dark-example" title={props.firstName} menuVariant="dark">
                    <NavDropdown.Item href={String(process.env.REACT_APP_BACKEND_ROOT)+'/admin'}>Admin</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => {logoutUser()}}>Logout</NavDropdown.Item>
                </NavDropdown>
            </div>

            <div className='d-flex d-md-none' style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <NavDropdown id="nav-dropdown-dark-example" title={<div className="avatar"><h4 style={{margin: '0px'}}>{firstInitial}{lastInitial}</h4></div>} menuVariant="dark">
                    <NavDropdown.Item href={String(process.env.REACT_APP_BACKEND_ROOT)+'/admin'}>Admin</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => {logoutUser()}}>Logout</NavDropdown.Item>
                </NavDropdown>
            </div>
        </div>
    )
}