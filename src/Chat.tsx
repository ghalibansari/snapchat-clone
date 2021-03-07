import { Avatar } from '@material-ui/core'
import { StopRounded } from '@material-ui/icons'
import React, { FC } from 'react'
import './Chat.css'
import ReactTimeago from 'react-timeago'
import { useDispatch } from 'react-redux'
import { selectImage, setSelectedImage } from './features/appSlice'
import { db } from './firebase'
import { useHistory } from 'react-router-dom'

interface IPPost {
    id: string;
    imageUrl: string;
    read: boolean;
    timeStamp: Date;
    userName: string;
    profilePic: string;
}

const Chat: FC<IPPost> = ({id, imageUrl, read, timeStamp, userName, profilePic}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const open = () => {
        if(!read) {
            dispatch(setSelectedImage(imageUrl))
            db.collection('posts').doc(id).set({read: true}, {merge: true})
            history.push('/chat/view')
        }
    }

    return (
        <div className='chat' onClick={open}>
            <Avatar src={profilePic} className='chat-avatar' />
            <div className="chat-info">
                <h4>{userName}</h4>
                {/**
                //@ts-ignore */}
                <p>{!read && 'Tap to view - '}<ReactTimeago date={new Date(timeStamp?.toDate()).toUTCString()} /></p>
            </div>

            {!read && <StopRounded className='chat-read-icon' />} 
        </div>
    )
}

export default Chat

