import React from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';
import{Card, Button} from 'semantic-ui-react'

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        
    }

    render() {
        
        return(

        <Card.Group>
    <Card fluid > 
    
      <Card.Content >
        <Card.Header>{this.props.jobTitle}</Card.Header>
        <a className="ui black right ribbon label "><i className="user icon" /></a>
        <Card.Meta>{this.props.jobLocationCity},{this.props.jobLocationCountry}</Card.Meta>
        <div style={{height:'250px'}}>
        <Card.Description>
          {this.props.jobSummary}
        </Card.Description>
        </div>
      </Card.Content>
      <Card.Content >
      
        <div className='ui four buttons'>
        <div style={{justifyContent:'left',marginRight:'50px'}}>
          <Button  color='red'>
            Expired
          </Button>
          </div>
          <div style={{marginLeft:'80px',justifyContent:'right'}}>
          <Button basic color='blue'><i className="ban icon"/>
            Close
          </Button>
          <Button basic color='blue' ><i className="edit icon"/>
            Edit
          </Button>
          
          <Button basic color='blue'><i className="copy outline icon"/>
           Copy
           </Button>
          </div>
        </div>
        
      </Card.Content>
      
    </Card>
    
  </Card.Group>
        )}
        
}