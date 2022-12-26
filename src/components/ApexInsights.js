import { useQuery } from '@tanstack/react-query';
import PlaceholderAnimation from './Placeholders';
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
                    <span className='ApexInsightItemWrapper'><span className='ApexInsightItem'>{data?distance_traveled: <PlaceholderAnimation width={12} size={'sm'}/>}</span> <span className='ApexInsightItemSpan'>Meters<sup>2</sup> swept</span></span>
                    <span className='ApexInsightItemWrapper'><span className='ApexInsightItem'>{data?hours_operational: <PlaceholderAnimation width={12} size={'sm'}/>}</span><span className='ApexInsightItemSpan'>Hours operational</span></span>
                    <span className='ApexInsightItemWrapper'><span className='ApexInsightItem'>{data?num_datapoints_formatted: <PlaceholderAnimation width={12} size={'sm'}/>}</span><span className='ApexInsightItemSpan'>Datapoints collected</span></span>
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


