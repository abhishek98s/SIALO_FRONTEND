import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from './camera_preview.module.scss';

type IAspectRatio = '3:4' | '1:1' | '9:16';

type Camera_preview_props = {
    mediaStream: MediaStream | null;
    aspectRatio: IAspectRatio | null;
    setUser_inputted_image_url: Dispatch<SetStateAction<string | null>>;
    setMediaStream: Dispatch<SetStateAction<MediaStream | null>>;
}

export const Camera_Preview: React.FC<Camera_preview_props> = ({ mediaStream, aspectRatio, setUser_inputted_image_url, setMediaStream }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [videoRatio, setVideoRatio] = useState({
        width: 500,
        height: 375,
    });


    // For showing the video to the video tag
    useEffect(() => {
        if (mediaStream && videoRef.current) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [mediaStream]);

    // the code below set the height of the image based on the aspect ratio
    useEffect(() => {
        if (videoRef.current) {
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

            videoRef.current.width = desiredWidth;
            videoRef.current.height = desiredHeight;
            setVideoRatio({ width: desiredWidth, height: desiredHeight })
        }
    }, [, aspectRatio]);

    useEffect(() => {
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [mediaStream]);

    const cameraAction = {
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
                cameraAction.stopCamera()
            }
        },
    }
    return (
        <>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <video ref={videoRef}
                width={videoRatio.width}
                height={videoRatio.height}
                className={`h-[${videoRatio.height}px]`}
                style={{ transform: 'scaleX(-1)', maxWidth: '100%', opacity: '0.1', objectFit: 'cover', height: videoRatio.height + 'px', transition: '.2s' }} autoPlay muted></video>

            <section className={`${styles.camera_actions} absolute left-0 bottom-0 right-0 py-[40px]`}>
                <div className={`${styles.take_photo_btn_wrapper} flex flex-col items-center gap-[16px]`}>
                    <button className={`${styles.take_photo_btn} focus-visible-neutral-70 outline-neutral-90 w-[62px] h-[62px] bg-primary-45 rounded-full flex-center p-[8px]`} onClick={cameraAction.takePhoto}>
                        <div className={`${styles.shot_photo_btn} w-full h-full bg-neutral-0 rounded-full cursor-pointer`}></div>
                    </button>

                    <span className="color-primary-50 font-bold text-[18px]">Let's take a photo</span>
                </div>
            </section>
        </>
    )
}
