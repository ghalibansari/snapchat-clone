import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './ChatView.css'
import { selectImage } from './features/appSlice'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const ChatView: FC = () => {
    const selectedImage = useSelector(selectImage)
    const history = useHistory()

    useEffect(() => {
        !selectedImage && exit()
    }, [selectedImage])

    const exit = () => history.replace('/chats')

    return (
        <div className='chat-view'>
            <img src={selectedImage!} onClick={exit} alt='snap' />
            <div className="chat-view-timer">
                <CountdownCircleTimer
                    isPlaying
                    duration={10}
                    strokeWidth={6}
                    size={50}
                    colors={[
                        ['#004777', 0.33],
                        ['#f7b801', 0.33],
                        ['#a30000', 0.33]
                    ]}
                >
                    {({remainingTime}) => !!remainingTime ? remainingTime : exit()}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default ChatView
