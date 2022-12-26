import Placeholder from 'react-bootstrap/Placeholder';

function PlaceholderAnimation(props){

    return(
        <Placeholder animation="glow"  style={{minWidth: '50%'}}>
            <Placeholder xs={props.width} size={props.size} className='Placeholder'/>
        </Placeholder>
    )
}

export default PlaceholderAnimation