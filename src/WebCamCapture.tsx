import { RadioButtonUnchecked } from '@material-ui/icons'
import React, { FC, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Webcam from 'react-webcam'
import { setCameraImage } from './features/cameraSlice'
import './WebcamCapture.css'

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: 'user'
}

const WebCamCapture: FC = () => {
    const webcamRef = useRef<Webcam>(null)
    const dispatch = useDispatch()
    const history = useHistory()

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot()
        dispatch(setCameraImage(imageSrc!))
        history.push('/preview')
    }, [webcamRef])

    return (
        <div className="webcamcapture">
            <Webcam
                mirrored
                audio={false}
                height={videoConstraints.height}
                ref={webcamRef}
                screenshotFormat='image/jpeg'
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />

            <RadioButtonUnchecked
                className="webcamcapture-button"
                onClick={capture}
                fontSize={'large'}
            />
        </div>
    )
}

export default WebCamCapture
