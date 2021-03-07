import { Avatar } from '@material-ui/core'
import { ChatBubble, RadioButtonUnchecked, Search } from '@material-ui/icons'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Chat from './Chat'
import './Chats.css'
import { resetSelectedImage, selectUser } from './features/appSlice'
import { auth, db } from './firebase'

export interface IPost {
    id: string;
    data: {
        imageUrl: string;
        read: boolean;
        timeStamp: Date;
        userName: string;
        profilePic: string;
    }
}

const Chats: FC = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    const user = useSelector(selectUser)
    const history = useHistory()
    const dispatch = useDispatch()

    const takeSnap = () => {
        dispatch(resetSelectedImage())
        history.push('/')
    }

    useEffect(() => {
        db
        .collection('posts')
        .orderBy('timeStamp', 'desc')
        .onSnapshot(snapshot =>{
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data() as IPost['data']
            })))
        })
    }, [])

    return (
        <div className='chats'>

            <div className="chats-header">
                <Avatar
                    src={user.profilePic}
                    className='chats-avatar'
                    onClick={() => auth.signOut()}
                />
                <div className="chats-search">
                    <Search className='chats-search-icon' />
                    <input type="text" placeholder='Friends' />
                </div>
                <ChatBubble className='chats-bubble-icon' />
            </div>

            <div className="chats-posts">
                {posts.map(({id, data: {imageUrl, read, timeStamp, userName, profilePic}}) => (
                    <Chat
                        key={id}
                        id={id}
                        read={read}
                        imageUrl={imageUrl}
                        timeStamp={timeStamp}
                        userName={userName}
                        profilePic={profilePic}
                    />
                ))}
            </div>

            <RadioButtonUnchecked
                className='chats-take-pic-icon'
                onClick={takeSnap}
                fontSize='large'
            />
        </div>
    )
}

export default Chats
