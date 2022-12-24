
import { Card, CardBody } from 'reactstrap';
import {Link} from 'react-router-dom'
import React, { useState } from 'react';
import GPStrack from './GPStrack';
import '../css/ApexApp.css';
import apexImage from '../assets/images/APEX.png'

function ApexDeployments(){

    const [apexID, setApexID] = useState(1);

    return(
        <div className='ApexDeployment'>
            <div className='ApexCards'>
               <ApexCards apex={'APEX 11'} status={'active'} deployment={'Bellows'} id={'1'} setApexID={setApexID}/>
               <ApexCards apex={'APEX 4'} status={'inactive'} deployment={'Croft'} id={'2'} setApexID={setApexID}/>
               <ApexCards apex={'APEX 6'} status={'active'} deployment={'Heijmans'} id={'3'} setApexID={setApexID}/>
               <ApexCards apex={'APEX 11'} status={'active'} deployment={'Croft'} />
               <ApexCards apex={'APEX 4'} status={'inactive'} deployment={'Croft'}/>
               <ApexCards apex={'APEX 6'} status={'inactive'} deployment={'Croft'}/>
               <ApexCards apex={'APEX 11'} status={'inactive'} deployment={'Croft'}/>
               <ApexCards apex={'APEX 4'} status={'inactive'} deployment={'Heijmans'}/>
               <ApexCards apex={'APEX 6'} status={'active'} deployment={'Heijmans'}/>
               <ApexCards apex={'APEX 11'} status={'active'} deployment={'Bellows'}/>
               <ApexCards apex={'APEX 4'} status={'inactive'} deployment={'Bellows'}/>
               <ApexCards apex={'APEX 6'} status={'active'} deployment={'Bellows'}/>
               <ApexCards apex={'APEX 11'} status={'active'} deployment={'Bellows'}/>
               <ApexCards apex={'APEX 4'} status={'inactive'} deployment={'Bellows'}/>
            </div>
            <div className='ApexDeploymentContent container-fluid'>
                <div className='row ApexTopRow'>
                    <div className='col-12 col-xl-5 ApexToprowTile'>
                        <ApexSnapshot />
                    </div>
                    <div className='col-12 col-xl-7 ApexToprowTile'>
                        <GPStrack deploymentId={apexID}/>
                    </div>
                </div>
                <div className='row ApexBottomRow'>
                    <div className='col-12 col-xl-5 ApexToprowTile'>
                        <ApexSnapshot />
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
        <Link to={link} style={{textDecoration: 'none', color: 'inherit'}} onClick={()=>{props.setApexID(props.id)}}>
            <Card className='ApexCard'>
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

function ApexSnapshot(props){

    return(
        <div className='ApexSnapshot'>
            <div className='ApexSnapshotTitle'>
                <div className='Circle' style={{backgroundColor: props.status == 'active' ? 'var(--green)':'var(--purple)', marginRight: '15px'}}></div>
                <h1>APEX 3</h1>
            </div>
            <div className='ApexImageWrapper'>
                <img src={apexImage} className='ApexImage'/>
            </div>
            <h4>Bellows Airforce Base</h4>
            <h5>Active from: <span className='ActiveFromText'>06/22/2022</span> - <span className='ActiveFromText'>08/15/2022</span></h5>
        </div>
    )

}