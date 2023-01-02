import { useQuery } from '@tanstack/react-query';
import apexImage from '../assets/images/APEX.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import PlaceholderAnimation from './Placeholders';



function ApexSnapshot(props){

    let fetchData = async() => {
        let url = process.env.REACT_APP_BACKEND_ROOT + '/api/apex/frontend/deployments/?deployment=' + props.apexID
        const options = {method: 'GET', headers: {Authorization: 'Token ' + props.userDetails.token}}
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }

    const { data, status } = useQuery(['apexSnapshot' + props.apexID], fetchData)
    let ApexStatus = ''
    let ApexStatusTextStyle
    let ApexStatusText

    if(status == 'loading'){
    }
    else{
        ApexStatus = data.status == true ? {backgroundColor: 'var(--green)', marginRight: '15px'} : {backgroundColor: 'var(--purple)', marginRight: '15px'}
        ApexStatusTextStyle = data.status == true ? {color: 'var(--green)'} : {color: 'var(--purple)'}
        ApexStatusText = data.status == true ? ApexStatusText = 'Active' : 'Inactive'
    }


    let content = 
        <div className='ApexSnapshot'>
            <h1 className='ApexHeaderText'>{data?data.apex : <PlaceholderAnimation width={5} size={'sm'}/>}</h1>
            <div className='ApexImageWrapper'>
                <img src={apexImage} className='ApexImage'/>
            </div>
            <div>
                <h3>{data?data.deployment_site : <PlaceholderAnimation width={3} size={''}/>}</h3>
                <span>{data?data.state : <PlaceholderAnimation width={5} size={'sm'}/>}, {data?data.country : <PlaceholderAnimation width={5} size={'sm'}/>}</span>
                <p className='NoMarginParagraph' style={ApexStatusTextStyle}>{ApexStatusText?ApexStatusText: <PlaceholderAnimation width={3} size={''}/>}</p>
                <p className='NoMarginParagraph'>Operational from: <span className='ActiveFromText'>{data?data.start_date : <PlaceholderAnimation width={3} size={''}/>}</span> to <span className='ActiveFromText'>{data?data.end_date : <PlaceholderAnimation width={3} size={''}/>}</span></p>
            </div>
        </div>
    // }

    return(content)
}

export default ApexSnapshot