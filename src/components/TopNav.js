import { Twirl as Hamburger } from 'hamburger-react'

function TopNav(props){
    return(
            <div className="TopNav">
                <div className='text-truncate'>
                    <h1 className="wrt-header">APEX DASHBOARD</h1>
                    <h6>White River Technologies</h6>
                </div>
                <div>
                    <Avatar firstName={'Cameron'} lastName={'Planck'} menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen}/>
                </div>
            </div>           
    )
}

export default TopNav

function Avatar(props){

    let firstInitial = props.firstName[0]
    let lastInitial = props.lastName[0]

    return(
        <div className="avatarWrapper">
            <div className={'d-block d-md-none'} onClick={() => {props.setMenuOpen(!props.menuOpen)}}>
                <Hamburger onClick={()=>{props.setMenuOpen(!props.menuOpen)}}/>
            </div>
            <div className="avatar">
                <h4 style={{margin: '0px'}}>{firstInitial}{lastInitial}</h4>
            </div>
            <span className="d-none d-md-block">{props.firstName}</span>
        </div>
    )
}