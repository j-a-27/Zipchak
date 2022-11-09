import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../css/Chat.css';

function ChatRoomList(props) {
    const [chatRoom, setChatRoom]=useState([]);
    const {ur_num, cr_click,chatList}=props;
    const chatRoomList=()=>{
        let url="http://localhost:9005/chat/list?ur_num="+ur_num;
        axios.get(url).then(res=>{
            setChatRoom(res.data);
        })
    }
    const readEvent=(i)=>{
        document.getElementById(`msg_sign${i}`).style.backgroundColor='gray';
    }
    useEffect(()=>{
        chatRoomList();
    },[]);

    return (
        <div >
            <br/>
            <ul>
                {
                    chatRoom &&
                    chatRoom.map((cr,i)=>
                        //sender 나중에 nickname으로 변경할 것.
                        <li key={i}  className={'crlist'}
                            onClick={()=>{
                                cr_click(cr.cr_num)
                                readEvent(i);
                                }} >
                            <div>
                                <span>
                                    {cr.buyer_num==ur_num?cr.ur_num:cr.buyer_num}
                                </span>
                                <span className={'cm_wdate'}>{cr.cm_wdate}</span>
                            </div>
                            <div className={'msg_sign'}>{cr.msg}
                                <div className={'read_sign'} id={`msg_sign${i}`} style={{backgroundColor:cr.sender==ur_num?"gray":cr.is_read==0?"#38B9E0":"gray"}}></div></div>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default ChatRoomList;