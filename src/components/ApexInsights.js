import { useQuery } from '@tanstack/react-query';
import PlaceholderAnimation from './Placeholders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faArrowsToCircle, faHurricane, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import Tooltip from '@mui/material/Tooltip';
var numeral = require('numeral');


function ApexInsights(props){

    let fetchData = async() => {
        let url = process.env.REACT_APP_BACKEND_ROOT + '/api/apex/frontend/stats/?deployment=' + props.apexID
        console.log(url)
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    const { data, status } = useQuery(['apexInsights' + props.apexID], fetchData)

    let distance_traveled
    let hours_operational
    let num_datapoints
    let num_datapoints_formatted
    if(status == 'loading'){
    }
    else{
       console.log('STATS DATA LOADED')
       console.log(data)
       distance_traveled = data.meters_traveled.toFixed(0)
       hours_operational = (data.total_time/60/60).toFixed(1)
       num_datapoints = data.num_datapoints*50
       num_datapoints_formatted = numeral(num_datapoints).format('0.0a')
    }

    return(
        <div className='ApexSnapshot'>
            <div className='ApexSnapshotTitle'>
                <h1>Insights</h1>

            </div>
            <div>
                <div className='ApexInsightsWrapper'>
                    <span className='ApexInsightItemWrapper'>
                        <div className='ApexInsightItem'>
                            <FontAwesomeIcon icon={faHurricane} className='pe-3's size={'xs'} />
                            {data?distance_traveled: <PlaceholderAnimation width={12} size={'sm'}/>}
                        </div>
                            <div className='ApexInsightItemSpan'>
                                <span>Meters<sup>2</sup> scanned</span>
                                <Tooltip className='p-3' title={'The total number of square meters scanned assuming a 0m overlap factor.'} placement="right-start" arrow enterDelay={500}><FontAwesomeIcon icon={faCircleInfo} className='pe-3'/></Tooltip>
                            </div>
                    </span>
                    <span className='ApexInsightItemWrapper'>
                        <div className='ApexInsightItem'>
                            <FontAwesomeIcon icon={faClock} className='pe-3' size={'xs'}/>
                            {data?hours_operational: <PlaceholderAnimation width={12} size={'sm'}/>}
                        </div>
                            {/* <span className='ApexInsightItemSpan'>
                                Hours operational
                            </span> */}
                             <div className='ApexInsightItemSpan'>
                                <span>Hours operational</span>
                                <Tooltip className='p-3' title={'The total time spent scanning.'} placement="right-start" arrow enterDelay={500}><FontAwesomeIcon icon={faCircleInfo} className='pe-3' /></Tooltip>
                            </div>
                    </span>
                    <span className='ApexInsightItemWrapper'>
                        <div className='ApexInsightItem'>
                            <FontAwesomeIcon icon={faArrowsToCircle} className='pe-3' size={'xs'}/>
                            {data?num_datapoints_formatted: <PlaceholderAnimation width={12} size={'sm'} />}
                        </div>
                        <div className='ApexInsightItemSpan'>
                                <span>Datapoints collected</span>
                                <Tooltip className='p-3' title={'The sum of all the entries in the APEX datafiles.'} placement="right-start" arrow enterDelay={500}><FontAwesomeIcon icon={faCircleInfo} className='pe-3' /></Tooltip>
                            </div>
                    </span>
                </div>

            </div>
        </div>
    )
}

export default ApexInsights


// function ApexInsightEntry(props){
//     return(
//         <h4>{data?hours_operational: <PlaceholderAnimation width={2} size={'sm'}/>} Hours Operational</h4>
//     )
// }


