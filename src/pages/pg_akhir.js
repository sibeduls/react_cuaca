import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

class PgAkhir extends Component {
  showLayout(){
    return(
      <div className="col-md-8 col-xl-6 chat">
        <h3>Trimakasih {this.props.pemakai.nama}</h3>
        <button className="btn btn-primary" 
            onClick={()=>this.kePageHome()} >Coba Lagi...</button>
      </div>
    )
  }

  kePageHome(){
    this.props.history.push('/');    
  }

  render() {
      if(!this.props.pemakai.sdh_daftar){
        return(<Redirect to="/" />)
      } else 
        return this.showLayout();
    }
}

const mapStateToProps = (state) => {
  return {
    pemakai: state.pemakai,
  };
};

export default connect(mapStateToProps, null)(PgAkhir)