import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from "react-redux";

import * as AksiUser from '../globalstore/actions/ubah_pemakai.js';
import * as AksiApp from '../globalstore/actions/ubah_app.js';

class PgLogin extends Component {
  constructor(props){
    super(props)
    this.state={
      namapemakai:"", email:"", validasi:false,
      PindahPage:"",
    }
  }

  AfterLogin(data){
    console.log('Sukses Hit ',data);
    this.setState({PindahPage:"/tanya_cuaca"}) ;  
  }

  ValidasiForm(){
    if (this.state.namapemakai==="") return false;
    if (this.state.email==="") return false;
    return true;
  }
  
  KlikDaftarXP(){
    if (!this.ValidasiForm()){
      this.setState({validasi: true}) 
      this.refs.Username.focus()
      return;
    }
    let objData = {
      nama: this.state.namapemakai,
      email: this.state.email,
    };
    this.props.ubahSemuaTtgUser(objData,(x)=>this.AfterLogin(x));
  }

  IsiInput(Obj,field){
    let Nilai=Obj.target.value;
    //console.log(Nilai)
    this.setState({[field]: Nilai});
  }
  
  ValidasiIsiInput(mode){
    if(!this.state.validasi) return;
    let Str1="";
    switch(mode){
      case 1:
        if (this.state.namapemakai==="") Str1="Nama"
        break;
      default:
        if (this.state.email==="") Str1="Email"
    }
    if (Str1!=="") return(<font color="#FF0000" size="-1">{Str1} Pengguna harus diisi !!!</font>)
  }
  
  componentDidMount(){
    this.props.ResetUser();
    this.props.ResetApp();
  }

  handleKeyPress(event,mode){
    if(event.charCode === 13){
      switch(mode){
        case 2:
          this.refs.email.focus()
          break;
        default:
          this.refs.BSaveUser.focus()
      } 
    }
  }

  render() {
      if(this.state.PindahPage!==""){
        return(
          <Redirect to={this.state.PindahPage} />
        )
      }else  
        return (
          <div className="col-md-4 col-xl-3 chat">
            <div className="card-header">
              Nama Lengkap anda:
              <div className="input-group">
                <input ref="Username" className="form-control search" value={this.state.namapemakai}
                  autoFocus
                  onChange={(x)=>this.IsiInput(x,"namapemakai")}
                  onKeyPress ={(x)=>this.handleKeyPress(x,2)}
                  type="text"  placeholder="Masukkan yg benar ya..."/>
              </div>
              {this.ValidasiIsiInput(1)}
            </div>
            <div className="card-header">
              E-mail:
              <div className="input-group">
                <input ref="email" className="form-control search" value={this.state.email}
                  onKeyPress={(x)=>this.handleKeyPress(x,3)}
                  onChange={(x)=>this.IsiInput(x,"email")} type="text" placeholder="Contoh: jhony_sayang@gmail.com" />
              </div>
              {this.ValidasiIsiInput(2)}
            </div>
            {this.TampilButton()}
          </div>
          )
    }
  
  TampilButton() {
    if(this.props.App.isLoading) {
      return(<button type="button" className="btn btn-primary">
      <i className="fa fa-refresh fa-spin"></i> Tunggu ya...</button>)
    }else{
      let Str1=(this.props.App.Msg==="") ? "Masuk" : this.props.App.Msg+" / Retry";
      return(<button type="button" ref="BSaveUser" className="btn btn-primary"
        onClick={(x)=>this.KlikDaftarXP()}>{Str1}...</button>
      )
    }
  }
}

function SaatLogin(objData,OnSukses){
  return (dispatch)=>{

   dispatch(AksiApp.ubahLoading(true,""))
      
    //axios.post("http://www.robotrapor.com/api/testlogin.php",objData)
    axios.post("https://reqres.in/api/users",objData)
    .then(resp =>{
      console.log(resp)
      objData.sdh_daftar=true;//resp.data.bisamain;
      //----------
      dispatch(AksiUser.ubahSemuaTtgUser(objData))
      dispatch(AksiApp.ubahLoading(false,""))
      OnSukses(objData)
    })
    .catch(err =>{
      dispatch(AksiApp.ubahLoading(false, err.message))
    })
  }
}

const mapStateToProps = (state) => {
  return  {
    App: state.tentang_app,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ubahSemuaTtgUser: (objData,OnSukses) => dispatch(SaatLogin(objData,OnSukses)),
    ResetApp: () => dispatch(AksiApp.ResetLoadingApp()),
    ResetUser: () => dispatch(AksiUser.ResetUSERApp()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PgLogin)