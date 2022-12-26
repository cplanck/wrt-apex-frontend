import { useQuery } from '@tanstack/react-query';
import apexImage from '../assets/images/APEX.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


function ApexSnapshot(props){

    let fetchData = async() => {
        let url = process.env.REACT_APP_BACKEND_ROOT + '/api/apex/frontend/deployments/?deployment=' + props.apexID
        console.log(url)
        const response = await fetch(url);
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


    let content = ''
    if(status == 'loading'){
        content = 
        <div className='ApexSnapshot'>
            <div className='ApexSnapshotLoader'>
                <FontAwesomeIcon icon={faSpinner} spin size="xl"/>
            </div>
        </div>
    }
    else{
        content = 
        <div className='ApexSnapshot'>
            <div className='ApexSnapshotTitle'>
                <h1 className='ApexHeaderText'>{data?data.apex : ''}</h1>
                {/* <div className='Circle' style={ApexStatus}></div> */}
            </div>
            <div className='ApexImageWrapper'>
                <img src={apexImage} className='ApexImage'/>
            </div>
            <h3>{data?data.deployment_site : ''}</h3>
            <span>{data?data.state : ''}, {data?data.country : ''}</span>
            <p className='NoMarginParagraph' style={ApexStatusTextStyle}>{ApexStatusText}</p>
            <p className='NoMarginParagraph'>Operational from: <span className='ActiveFromText'>06/22/2022</span> - <span className='ActiveFromText'>08/15/2022</span></p>
        </div>
    }

    return(content)
}

export default ApexSnapshot