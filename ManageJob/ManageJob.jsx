import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Grid, Icon,Table,Card,Input, Button, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';
import ReactPaginate from 'react-paginate';

import'./Pagination.css'



export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            active:null,
            jobsPerPage:2,
            sorterName:"Oldest first",
            
            errorMessage:"",
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 0,
            activeIndex: "",
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.sortBydate=this.sortBydate.bind(this);
        this.changePage=this.changePage.bind(this);
        this.textChanger=this.textChanger.bind(this);
        
        
        //your functions go here
    };



    sortBydate(){
      if (this.state.sortBy.date==="asc"){
          this.setState({sortBy:{date:"desc"}});
          this.loadData();
  
      }
      else if (this.state.sortBy.date==="desc") {
        this.setState({sortBy:{date:"asc"}});
        this.loadData();
        
      }
      this.textChanger();
    }

    textChanger(){
      if (this.state.sorterName==="Oldest first"){
      this.setState({sorterName:"Newest first"});

    }
    else {
      this.setState({sorterName:"Oldest first"})
    }
  }
    

    changePage({selected}){
      this.setState({activeIndex:selected})
    }
    
    


    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }
     handlePaginationChange  (e, { activePage }) { setactivePage({ activePage })}

    componentDidMount() {
        this.init();
        this.loadData();
        this.sortBydate();

        
    };

    loadData(callback) {
      
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: link,
            data:{
              activePage:this.activePage,
              sortbyDate:this.state.sortBy.date,
              showActive:true,
              showClosed:true,
              showDraft:true,
              showExpired:true,
              showUnexpired:true
            },
            headers: {
                'Authorization': 'Bearer '+ cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (data) {
             
                if (data.myJobs) {
                this.setState({loadJobs:data.myJobs})
              }
              else{
                this.setState({errorMessage:"No Jobs Found"})
              }
            }.bind(this)
        })
        this.init()
    }

   


    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });0
    }

    render() {
    const pagesVisited = this.state.activeIndex * this.state.jobsPerPage
    const displayJobsPage= this.state.loadJobs.slice(pagesVisited, pagesVisited +this.state.jobsPerPage)
    
    


      const changePage =({selected})=>{
        this.setState({activeIndex:selected})
        
      }
      const pagesCount =Math.ceil(this.state.loadJobs.length /this.state.jobsPerPage );
        
        const{loadJobs,totalPage}=this.state
       
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
               <div className ="ui container">
                 <h1 style={{marginRight:'10px'}}>List of Jobs:</h1>
                 
                <FilterIconlabel />

                Sort by date: {this.state.sorterName} <i style={{cursor:'pointer'}} className="angle down icon" onClick={this.sortBydate}> </i>
  
                <div style={{marginTop:"10px", marginBottom:"20px"}} className="ui two grid">
                
      {
      displayJobsPage.map((l)=>{
        if (displayJobsPage.length>0){
          
      return(
       
        <div style={{marginBottom:"20px"}} key={l.id}>
        <JobSummaryCard 
          jobTitle={l.title}
            jobLocationCity={l.location.city}
            jobLocationCountry={l.location.country}
            jobSummary={l.summary} />
  
        </div>
        )}
        else {
          return(
          
          <p>  No Jobs Found </p>
          )
        }
        
        
        })}
        
        </div>
    
  
    <ReactPaginate
      previousLabel={"<<"}
      nextLabel={">>"}
      pageCount={pagesCount}
      onPageChange={changePage}
      containerClassName={"paginationBtn"}
      previousLinkClassName={"previousBtn"}
      nextLinkClassName={"nextBtn"}
      disabledClassName={"paginationDisabled"}
      activeClassName={"paginationActive"}
    />
               </div>
            </BodyWrapper>
        )
    }
}


const FilterIconlabel= (abc)=>{
  $('.ui.multiple.dropdown').dropdown();

const [active, setactive] = useState(true)
const tagOptions = [
  {
    key: 'Active',
    text: 'Active',
    value: 'Active',
    label: { color: 'green', empty: true, circular: true },
  },
  {
    key: 'Expired',
    text: 'Expired',
    value: 'Expired',
    label: { color: 'blue', empty: true, circular: true },
  },
  {
    key: 'UnExpired',
    text: 'UnExpired',
    value: 'UnExpired',
    label: { color: 'black', empty: true, circular: true },
  },
  {
    key: 'Closed',
    text: 'Closed',
    value: 'Closed',
    label: { color: 'purple', empty: true, circular: true },
  },
  {
    key: 'Draft',
    text: 'Draft',
    value: 'Draft',
    label: { color: 'orange', empty: true, circular: true },
  }]


  return(
    <Dropdown icon='filter' text='Filter: Choose filter'  floating
  >
    <Dropdown.Menu>
      <Input icon='search' iconPosition='left' className='search' />
      <Dropdown.Divider />
      <Dropdown.Header icon='tags' content='Tag Label' />
      <Dropdown.Menu scrolling>
        {tagOptions.map((option) => (
          <Dropdown.Item key={option.value} {...option} />
        ))}
      </Dropdown.Menu>
    </Dropdown.Menu>
  </Dropdown>

  )
  

}

