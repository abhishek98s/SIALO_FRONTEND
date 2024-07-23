import Modal from "react-responsive-modal";
import toast, { Toaster } from 'react-hot-toast';
import { toast_error_option, toast_info_option, toast_sucess_option } from "@/utils/toast";
import { useRef, useState } from "react";

import styles from './camera_model.module.scss';

export function CameraModel() {
    type AspectRatio = '3:4' | '1:1' | '9:16';
    
    
    const [isCameraModalopen, setIsCameraModalopen] = useState(false);
    const [isCameraAccessGranted, setIsCameraAccessGranted] = useState(false);
    const [user_inputted_image_url, setUser_inputted_image_url] = useState<string | null>(null);

    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cameraModalRef = useRef(null);

    const [aspectRatio, setAspectRatio] = useState<AspectRatio | null>('3:4');
    const [videoRatio, setVideoRatio] = useState({
        width: 500,
        height: 375,
    });

    const CameraModel = {
        /* The above code is a TypeScript React function that is triggered when a user tries to open the
        camera. It first checks if camera access has been granted. If camera access is not granted, it
        displays a toast message indicating that camera access is required. If camera access is granted, it
        sets the state to open the camera modal and then starts the camera action. */
        open: () => {
            if (!isCameraAccessGranted) {
                toast.error('Camera access required!',
                    toast_info_option
                );
                return
            }
            setUser_inputted_image_url(null)
            setIsCameraModalopen(true)
            cameraAction.startCamera();
        },
        /* The above code is a TypeScript React function that is closing a camera modal. It is calling the
        `setIsCameraModalopen` function with `false` as an argument to close the modal, and then calling
        `cameraAction.stopCamera()` to stop the camera. */
        close: () => {
            setIsCameraModalopen(false)
            setUser_inputted_image_url(null);
            cameraAction.stopCamera();
        },
    }

    const cameraAction = {
        /* The above code is a TypeScript React function named `startCamera` that is using the `async`
        keyword to define an asynchronous function. Inside the function, it is attempting to access
        the user's camera using `navigator.mediaDevices.getUserMedia({ video: true })` to get a video
        stream. If successful, it sets the obtained media stream using `setMediaStream(stream)`. If
        there is an error during the process, it logs the error message to the console using
        `console.error('Error accessing the camera:', error)`. */
        startCamera: async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                    },
                });
                setMediaStream(stream);
            } catch (error) {
                toast.error('Error accessing the camera!',
                    toast_info_option
                );
            }
        },
        /* The above code is a TypeScript React function named `stopCamera`. It checks if a
        `mediaStream` variable exists, and if it does, it stops all tracks of the media stream using
        `getTracks()` and `track.stop()`. It then sets the `mediaStream` variable to `null` and
        closes a camera modal by setting `isCameraModalOpen` to `false`. This function is used to
        stop the camera stream in a React component. */
        stopCamera: () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
                setMediaStream(null);
            }
        },

        /* The above code is a TypeScript React function called `takePhoto` that is used to capture a
        photo from a video element and display it on a canvas. Here is a breakdown of what the code is
        doing: */
        takePhoto: () => {
            if (videoRef.current && canvasRef.current) {
                const canvas = canvasRef.current;
                const video = videoRef.current;

                let desiredWidth, desiredHeight;
                switch (aspectRatio) {
                    case '9:16':
                        desiredWidth = 500;
                        desiredHeight = (desiredWidth * 9) / 16;
                        break;
                    case '3:4':
                        desiredWidth = 500;
                        desiredHeight = (desiredWidth * 3) / 4;
                        break;
                    case '1:1':
                        desiredWidth = 500;
                        desiredHeight = (desiredWidth * 1) / 1;
                        break;
                    default:
                        desiredWidth = 500;
                        desiredHeight = (desiredWidth * 9) / 16;
                }
                canvas.width = video.width;
                canvas.height = video.height;

                // Calculate the scaling factor to fit the video within the canvas
                const scaleX = canvas.width / video.videoWidth;
                const scaleY = canvas.height / video.videoHeight;
                const scale = Math.max(scaleX, scaleY);

                // Draw the video frame on the canvas, scaling and cropping as needed

                const context = canvas.getContext('2d');
                context?.translate(canvas.width, 0);
                context?.scale(-1, 1);
                context?.drawImage(
                    video,
                    (video.videoWidth - canvas.width / scale) / 2,
                    (video.videoHeight - canvas.height / scale) / 2,
                    canvas.width / scale,
                    canvas.height / scale,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


                const photoDataUrl = canvas.toDataURL('image/png');
                setUser_inputted_image_url(photoDataUrl);
            }
        },
        /* The above code is a TypeScript React function called `toggleAspectRatio` that takes a parameter
        `ratio` of type `AspectRatio` and sets the aspect ratio state to the provided `ratio` value. */
        toggleAspectRatio: (ratio: AspectRatio) => {
            setAspectRatio(ratio);
        },

        // discard the taken photo and takes back to the camera
        discardClickedPhoto: () => {
            setUser_inputted_image_url(null);
        },

        // close the model
        confirmTakenPhoto: () => {
            setIsCameraModalopen(false)
        }
    }
    return (
        <>
            <Modal open={isCameraModalopen}
                onClose={CameraModel.close}
                center
                container={cameraModalRef.current}
                classNames={{
                    modal: `camera_model ${isCameraModalopen ? 'animate' : 'animate-none'}`,
                }}
            >
                <canvas ref={canvasRef} className="hidden"></canvas>
                <video ref={videoRef}
                    width={videoRatio.width}
                    height={videoRatio.height}
                    className={`h-[${videoRatio.height}px]`}
                    style={{ transform: 'scaleX(-1)', maxWidth: '100%', opacity: '0.1', objectFit: 'cover', height: videoRatio.height + 'px', transition: '.2s' }} autoPlay muted></video>

                <section className={`${styles.ratio_wrapper} absolute top-[24px] left-[24px] flex gap-[16px]`}>
                    <button onClick={() => cameraAction.toggleAspectRatio("3:4")}
                        className={`${aspectRatio === '3:4' ? styles.active : ''}`}>3: 4</button>
                    <button onClick={() => cameraAction.toggleAspectRatio("9:16")}
                        className={`${aspectRatio === '9:16' ? styles.active : ''}`}>9: 16</button>
                    <button onClick={() => cameraAction.toggleAspectRatio("1:1")}
                        className={`${aspectRatio === '1:1' ? styles.active : ''}`}>1: 1</button>
                </section >

                <section className={`${styles.camera_actions} absolute left-0 bottom-0 right-0 py-[40px]`}>
                    <div className={`${styles.take_photo_btn_wrapper} flex flex-col items-center gap-[16px]`}>
                        <button className={`${styles.take_photo_btn} focus-visible-neutral-70 outline-neutral-90 w-[62px] h-[62px] bg-primary-45 rounded-full flex-center p-[8px]`} onClick={cameraAction.takePhoto}>
                            <div className={`${styles.shot_photo_btn} w-full h-full bg-neutral-0 rounded-full cursor-pointer`}></div>
                        </button>

                        <span className="color-primary-50 font-bold text-[18px]">Let's take a photo</span>
                    </div>
                </section>

                {
                    isCameraModalopen && user_inputted_image_url && <section className={`${styles.confirm_photo} confirm_photo absolute top-0 left-0 right-0 bottom-0 bg-neutral-90 h-full w-full`}>
                        <div>
                            <img src={user_inputted_image_url} className="w-full opacity-10" />
                            <div className={`${styles.camera_actions} absolute left-0 bottom-0 right-0 py-[40px] px-[24px] flex gap-[12px]`}>
                                <button
                                    onClick={cameraAction.confirmTakenPhoto}
                                    className="primary-btn w-full h-[48px] font-bold color-primary-80 text-[16px] inline-flex justify-center items-center">Confirm</button>
                                <button
                                    onClick={cameraAction.discardClickedPhoto}
                                    className="error-btn w-full h-[48px] font-bold bg-error-80 border-error-50 color-neutral-0 text-[16px] inline-flex justify-center items-center">Discard</button>
                            </div>
                        </div>
                    </section>}
            </Modal >
        </>
    )
}
