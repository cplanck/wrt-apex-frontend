
import { Card, CardBody } from 'reactstrap';
import {Link} from 'react-router-dom'
import React, { useState } from 'react';
import GPStrack from './GPStrack';
import ApexSnapshot from './ApexSnapshot';
import ApexDataTable from './ApexDataTable';
import ApexCardsGroup from './ApexCardsGroup';
import ApexInsights from './ApexInsights';


import '../css/ApexApp.css';

function ApexDeployments(props){

    const [apexID, setApexID] = useState('1');

    return(
        <div className='ApexDeployment'>
            <div className='ApexCards'>
                <ApexCardsGroup apexID={apexID} setApexID={setApexID} userDetails={props.userDetails}/>
            </div>
            <div className='ApexDeploymentContent container-fluid'>
                <div className='row ApexTopRow'>
                    <div className='col-12 col-xl-5 col-xxl-4 ApexToprowTile'>
                        <ApexSnapshot apexID={apexID} userDetails={props.userDetails}/>
                    </div>
                    <div className='col-12 col-xl-7 col-xxl-8 ApexToprowTile'>
                        <GPStrack deploymentId={apexID} userDetails={props.userDetails}/>
                    </div>
                </div>
                <div className='row ApexBottomRow'>
                    <div className='col-12 col-xl-12 col-xxl-5 ApexToprowTile'>
                        <ApexInsights apexID={apexID} userDetails={props.userDetails}/>
                    </div>
                    <div className='col-12 col-xl-12 col-xxl-7 ApexToprowTile'>
                        <div className={'ApexDatatableWrapper'}>
                        <ApexDataTable apexID={apexID} userDetails={props.userDetails}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApexDeployments

function ApexCards(props){

    let status = props.status
    let link = `/deployments/?id=${props.id}`

    return(
        <Link to={link} style={{textDecoration: 'none', color: 'inherit' }} onClick={()=>{props.setApexID(props.id)}} className={'grow'}>
                <Card className={props.apexID == props.id ? 'ApexCard active': 'ApexCard'}>
                    <CardBody>
                        <div className='CardWrapper'>
                            <div>
                                <h4>{props.apex}</h4>
                                {props.deployment}
                            </div>
                            <div>
                                <div className='Circle' style={{backgroundColor: props.status == 'active' ? 'var(--green)':'var(--purple)'}}></div>
                            </div>
                        </div>  
                    </CardBody>
                </Card>
        </Link>
    )
}