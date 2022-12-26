import Placeholder from 'react-bootstrap/Placeholder';

function PlaceholderAnimation(props){

    return(
        <Placeholder animation="glow">
            <Placeholder xs={props.width} size={props.size} className='Placeholder'/>
        </Placeholder>
    )
}

export default PlaceholderAnimation