import React, { Component } from 'react';

class ActivityDialog extends Component{
    constructor(props) {
        super(props);
        this.state = {
            expand: 'expand',
        expansionSymbol: 'fa-chevron-right',
        autoHeight: '',
        showShade: 'light'
        };
    }
    clickFind(expandedState){
        // if(expandedState === "expand"){
        //     this.setState({
        //         expand:'collapse',
        //         autoHeight:'autoHeight',
        //         expansionSymbol:'fa-chevron-down',
        //         showShade: 'dark'
        //     });
        // }
        // else{
        //     this.setState({
        //         expand:'expand',
        //         autoHeight:'',
        //         expansionSymbol:'fa-chevron-right',
        //         showShade: 'light'
        //     });
        // }        
    }
    callThemer(count){
        if(count%2 === 0){
            this.themeSet = "even";
        }
        else{
            this.themeSet = "odd";
        }
    }
    render(){
        return(
            <div className={"dialog " + this.props.theme + " " + this.state.autoHeight + " " + this.state.showShade} onClick={()=>this.clickFind(this.state.expand)}>
                <div className="row m-0">                   
                    <div className="col-md-12" >                        
                        <div className="dialogContent">                            
                            {/* <strong>
                                <i className={"fas " +  this.state.expansionSymbol}></i>                                
                            </strong> */}
                                <div className="colorIndicator" style={{background:this.props.colorValue}}></div>
                                <div className="contentText">{this.props.contentVal}</div>
                        </div>
                    </div>                    
                    {/* <div className="col-md-12">
                        <label htmlFor="" className="dialogID">
                            <strong>
                                <i class="fas fa-hashtag mr-2"></i>
                            </strong> 
                            {this.props.contentID}
                        </label>
                        <label htmlFor="" className="dialogTimestamp">
                            <strong>
                                <i class="fas fa-clock"></i>
                            </strong>
                            {this.props.dateVal} &nbsp;&nbsp;{this.props.timeVal}
                        </label>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default ActivityDialog;