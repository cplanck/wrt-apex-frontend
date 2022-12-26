import { Card, CardBody } from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import {Link} from 'react-router-dom'
import PlaceholderAnimation from './Placeholders';

function ApexCardsGroup(props){

    let fetchData = async() => {
        let url = process.env.REACT_APP_BACKEND_ROOT + '/api/apex/frontend/deployments'
        console.log(url)
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const { data, status } = useQuery(['apexCards'], fetchData)

    let Return = ''
    let cards = []
    if(status == 'loading'){
        Return = 'NOT LOADED!'
        for(let i = 0; i < 10; i++){
            cards.push(<ApexCardsLoader/>)
        }

    }
    else{
        Return = 'LOADED!'
        for(let i = 0; i < data.length; i++){
            cards.push(<ApexCards apexID={props.apexID} id={data[i].id} apex={data[i].apex} deployment={data[i].deployment_site} city={data[i].city} status={data[i].status} setApexID={props.setApexID} />)
        }
    }

    return(cards)

}

export default ApexCardsGroup


function ApexCards(props){

    let status = props.status
    let link = `/deployments/?id=${props.id}`

    return(
        <Link to={link} style={{textDecoration: 'none', color: 'inherit' }} onClick={()=>{props.setApexID(props.id)}} className={'grow'}>
                <Card className={props.apexID == props.id ? 'ApexCard active': 'ApexCard'}>
                    <CardBody>
                        <div className='CardWrapper'>
                            <div style={{maxWidth: '100%'}} className='text-truncate text-nowrap'>
                                <h4 style={{marginBottom: '3px'}}>{props.apex}</h4>
                                <span>{props.deployment}</span>
                                <p className='NoMarginParagraph' style={{fontSize: '0.75em'}}>{props.city}</p>
                            </div>
                            <div>
                                <div className='Circle' style={{backgroundColor: props.status == true ? 'var(--green)':'var(--purple)'}}></div>
                            </div>
                        </div>  
                    </CardBody>
                </Card>
        </Link>
    )
}


function ApexCardsLoader(){

    return(
        <Card className='ApexCard'>
            <CardBody>
                <div className='CardWrapper'>
                    <div style={{width: '100%'}} className='text-truncate text-nowrap'>
                        <h4 style={{marginBottom: '3px'}}>{<PlaceholderAnimation width={5} size={'lg'}/>}</h4>
                        <span>{<PlaceholderAnimation width={7} size={'sm'}/>}</span>
                        <p className='NoMarginParagraph' style={{fontSize: '0.75em'}}>{<PlaceholderAnimation width={5} size={'sm'}/>}</p>
                    </div>
                </div>  
            </CardBody>
        </Card>
    )
}