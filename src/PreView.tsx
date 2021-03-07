import { AttachFile, Close, Create, Crop, MusicNote, Note, Send, TextFields, Timer } from '@material-ui/icons'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import { v4 as uuid } from 'uuid'
import { db, storage } from './firebase'
import firebase from 'firebase'
import { selectUser } from './features/appSlice';

const PreView: FC = () => {
    const cameraImage = useSelector(selectCameraImage)
    const user = useSelector(selectUser)
    const history = useHistory()
    const dispatch = useDispatch()

    const closePreview = () => dispatch(resetCameraImage())

    const sendPost = () => {
        const id = uuid()
        const uploadImage = storage
        .ref(`posts/${id}`)
        .putString(cameraImage!, 'data_url')

        uploadImage.on(
            'state_changed',
            null,
            err => alert(err),
            () => storage
            .ref('posts')
            .child(id)
            .getDownloadURL()
            .then(url => {
                db
                .collection('posts')
                .add({
                    imageUrl: url,
                    userName: user.userName,
                    read: false,
                    profilePic: user.profilePic,
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                history.replace('/chats')
            })
        )
    }

    useEffect(() => {
        if(!cameraImage) history.replace('/')
    }, [cameraImage, history])

    return (
        <div className='preview'>
            <Close className='preview-close' onClick={closePreview} />

            <div className="preview-toolbar">
                <TextFields />
                <Create />
                <Note />
                <MusicNote />
                <AttachFile />
                <Crop />
                <Timer />
            </div>

            <img src={cameraImage!} alt="selfie"/>

            <div className="preview-footer" onClick={sendPost}>
                <h2>Send Now</h2>
                <Send className='preview-send-icon' fontSize='small' />
            </div>
        </div>
    )
}

export default PreView
