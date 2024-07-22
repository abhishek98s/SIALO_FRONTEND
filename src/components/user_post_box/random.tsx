import { useState, useEffect, useRef } from 'react';

export default function CameraApp() {
    const [mediaStream, setMediaStream] = useState(null);
    const videoRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setMediaStream(stream);
        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    };
    useEffect(() => {

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [mediaStream]);

    useEffect(() => {
        if (mediaStream && videoRef.current) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [mediaStream]);

    const handleStartCamera = () => {
        startCamera();
    };

    const handleStopCamera = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
    };

    return (
        <div>
            <video ref={videoRef} width="640" height="480" autoPlay muted></video>
            <button onClick={handleStartCamera} disabled={mediaStream !== null}>
                Start Camera
            </button>
            <button onClick={handleStopCamera} disabled={mediaStream === null}>
                Stop Camera
            </button>
        </div>
    );
}