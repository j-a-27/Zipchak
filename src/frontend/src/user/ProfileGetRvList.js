import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";

function ProfileGetRvList(props) {
    const {user}=props;
    const [rvlist,setRvlist]=useState([]);
    const navi=useNavigate();
    const spURL='https://s3.ap-northeast-2.amazonaws.com/bitcampteam2/sp_img/';
    const [togglestatus,setTogglestatus]=useState(false);
    const [cnt, setCnt]=useState();
    const marks = [
        {value: 0, label: 'π€¬'},
        {value: 10, label: 'π‘'},
        {value: 20, label: 'οΈπ '},
        {value: 30, label: 'π'},
        {value: 40, label: 'π'},
        {value: 50, label: 'π'},
        {value: 60, label: 'π'},
        {value: 70, label: 'π'},
        {value: 80, label: 'π'},
        {value: 90, label: 'π₯°'},
        {value: 100, label: 'π'}
    ];
    const getrvlist=()=>{
        let rvlistURL=localStorage.url+"/getrv?ur_num="+user;
        axios.get(rvlistURL).then(res=>{
            setRvlist(res.data);
            setCnt(res.data.length);
        })
    }
    const spinfoClick=(item)=>{
        navi(`/shop/detail/${item.pd_num}/${item.sp_num}/1`);
    }
    const clicktoggle=()=>{
        setTogglestatus(!togglestatus);
    }
    useEffect(()=>getrvlist(),[user])
    return (
        <div>
            <div className={'mypage_title'} onClick={clicktoggle}>λ°μ νκΈ° λ¦¬μ€νΈ ({cnt}) {
                togglestatus?<ArrowDropUp/>:<ArrowDropDown/>}</div>
            <ul className={'mypage_ul'} >
            {rvlist.map((rv,i)=>
                <div key={i}  className={(i<3)?'card_show':togglestatus?'card_show':'card_hide'}>
                <li className={'mypage_li'} onClick={()=>spinfoClick(rv)}>

                        <div style={{display:"flex"}}>
                            <img alt={''} src={spURL+rv.img_name} className={'mypage_sp_img'}
                                />
                            <div className={'mypage_sp_title_for_rv'}>
                                μνλͺ : {rv.sp_title}
                                <br/>
                                νκΈ° : {rv.rv_txt}
                                &nbsp; ({marks[rv.rv_tmp/10].label + rv.rv_tmp}β)
                            </div>
                        </div>
                </li> </div>)
            }
            </ul>
        </div>
    );
}

export default ProfileGetRvList;