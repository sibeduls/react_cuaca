import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Moment from "moment";

import * as AksiApp from '../globalstore/actions/ubah_app.js';

class PgCuaca extends Component {
  constructor(props){
    super(props);
    this.state={ Pesan:"",
      IsiChat: [], }
  }

  componentDidMount(){
    this.props.ResetApp();
    this.doAddIsiChat('BOT',['Halo, '+this.props.pemakai.nama+'.',
    <br key={this.MakeKeyUnik("a")} />,
      'Kamu mau tanya ramalan cuaca di kota mana?']);
  }

  MakeKeyUnik(prefik){
    return(prefik+(new Date()).getTime());
  }

  doAddIsiChat(KodeDari,Pesan) {
    Moment.locale('id')
    let chatlama=this.state.IsiChat;
    chatlama.push({
      KodeDari: KodeDari, Pesan:Pesan,
      Wkt: Moment(new Date()).format('D MMM YYYY LTS'),
    })
    this.setState({IsiChat: chatlama})
  }

  getInsialName(){
    let str=this.props.pemakai.nama.split(' ');
    let Hasil='';
    for(let i=0;i<str.length;i++){
      if(i>1) break;
      Hasil+=str[i][0];
    }
    return Hasil;
  }

  CetakUcapanBOT(sKey,Pesan,Wkt){
    return(
      <div key={sKey} className="d-flex justify-content-start mb-4" >
        <div className="img_cont_msg">
          <img src="https://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg" 
            alt="Foto"
          className="rounded-circle user_img_msg"/>
        </div>
        <div className="msg_cotainer" style={{width:'100%'}}>
          {Pesan}
          <span className="msg_time">{Wkt}</span>
        </div>
      </div>)
  }

  CetakIsiPercakapan(){
    let BalonChat=[];
    for(let i=0;i<this.state.IsiChat.length;i++){
      let EachChat=this.state.IsiChat[i];
      let sKey=`Balon${i}`;
      if(EachChat.KodeDari==='BOT'){
        BalonChat.push(this.CetakUcapanBOT(sKey,EachChat.Pesan,EachChat.Wkt))
      }else{
        let ImgUrl="https://ui-avatars.com/api/?name="+this.getInsialName()
        BalonChat.push(
          <div key={sKey} className="d-flex justify-content-end mb-4">
            <div className="msg_cotainer_send" style={{width:'100%'}}>
              {EachChat.Pesan}
              <span className="msg_time">{EachChat.Wkt}</span>
            </div>
            <div className="img_cont_msg">
            <img src={ImgUrl}
            alt="foto User"
            className="rounded-circle user_img_msg"/>
             </div>
          </div>
        )
      }
    }
    if(this.props.App.isLoading) BalonChat.push(
      this.CetakUcapanBOT("Bln1",'Sebentar saya lagi meramal...',"Barusan"))
    return(<div className="card-body msg_card_body">{BalonChat}
       <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
    </div>);
  }

  showLayout(){
    return(
      <div className="col-md-8 col-xl-6 chat">
      <div className="card">
        <div className="card-header msg_head">
          <div className="d-flex bd-highlight">
            <div className="img_cont">
              <img src="https://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg" 
              alt="Foto BOT"
              className="rounded-circle user_img"/>
              <span className="online_icon"></span>
            </div>
            <div className="user_info">
            <span>Chat with Cuaca BOT</span>
              <p>Siap membantu anda dalam meramal cuaca</p>
            </div>
            <span id="action_menu_btn" 
              onClick={(x)=>this.keNextPage()} ><i className="fas fa-times"></i></span>
          </div>
        </div>
        {this.CetakIsiPercakapan()}
        <div className="card-footer">
          <div className="input-group">
            <input className="form-control type_msg" placeholder="Masukkan nama kota..."
              onKeyPress={(x)=>this.handleKeyPress(x)} autoFocus
              onChange={(x)=>this.IsiInput(x,"Pesan")} value={this.state.Pesan} />
            <div className="input-group-append">
              <span onClick={(x)=>this.KlikKirimPesan()}
               className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></span>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }

  handleKeyPress(event){
    if(event.charCode === 13) this.KlikKirimPesan()
  }

  IsiInput(Obj,field){
    let Nilai=Obj.target.value;
    //console.log(Nilai)
    this.setState({[field]: Nilai});
  }

  KlikKirimPesan(){
    let kota=this.state.Pesan;
    this.doAddIsiChat('USER',kota);
    this.setState({Pesan:""});
    this.props.SaatTanyaKeBOT(kota,(kode,datadikirm)=>this.OlahRespon(kode,datadikirm));
  }

  keNextPage(){
    this.props.history.push('/thankyou');    
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  OlahRespon(kode,datadikirm){
    if(kode===0){
      this.doAddIsiChat('BOT',['Waduh!!! Pandangan saya tentang kota "'+datadikirm.kota+'" kok gelap ya...',
        <br key="a"/>,datadikirm.ErrTxt,<br key="a"/>,
      'Coba Kamu tanya lagi, kota mana lagi yg mau diramal?'])
    }else{
      let LinkURL="https://www.google.com/maps/@"+datadikirm.coord_lat+","+
        datadikirm.coord_lon+",14z";
      this.doAddIsiChat('BOT',['Hore, ada visi ttg kota "'+datadikirm.kota+'" ...',
        <br key={this.MakeKeyUnik("a")} />,
        'Perkiraan kota "'+datadikirm.perkiraan_kota+'" akan "'+
        datadikirm.perkiraan_cuaca+'" dengan kecepatan angin '+datadikirm.speed_wind,
        <br key={this.MakeKeyUnik("a1")} />,<a key={this.MakeKeyUnik("hub")}
        rel="noopener noreferrer"
        href={LinkURL} target="_blank">Lihat Peta</a>,
      ])
    }
  }

  render() {
      if(!this.props.pemakai.sdh_daftar){
        return(<Redirect to="/" />)
      } else 
        return this.showLayout();
    }
}

function SaatTanyaKeBOT(kota,OnHasil){
  return (dispatch)=>{

   dispatch(AksiApp.ubahLoading(true,""))
  
   axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      q:kota,APPID:"cdd6b720d64ea808dcd0ac43f54470a0"
    }}
    ).then(resp =>{
      console.log(resp)
      let hasilnya={kota: kota,
        perkiraan_kota: resp.data.name,
        perkiraan_cuaca: resp.data.weather[0].description,
        speed_wind: resp.data.wind.speed,
        coord_lon: resp.data.coord.lon,
        coord_lat: resp.data.coord.lat,
      }
      dispatch(AksiApp.ubahLoading(false,""))
      OnHasil(1,hasilnya)
    })
    .catch(err =>{
      dispatch(AksiApp.ubahLoading(false, err.message))
      OnHasil(0,{kota: kota,ErrTxt: err.message})
    })
  }
}

const mapStateToProps = (state) => {
  return {
    App: state.tentang_app,
    pemakai: state.pemakai,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {  
    SaatTanyaKeBOT: (kota,OnHasil) => dispatch(SaatTanyaKeBOT(kota,OnHasil)),
    ResetApp: () => dispatch(AksiApp.ResetLoadingApp()), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PgCuaca)