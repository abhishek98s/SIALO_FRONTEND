import Modal from "react-responsive-modal";
import toast, { Toaster } from 'react-hot-toast';
import { toast_error_option, toast_info_option, toast_sucess_option } from "@/utils/toast";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import styles from './camera_model.module.scss';
import { PhotoPreview } from "../photo_preview";
import { Camera_Preview } from "../camera_preview";

type Props = {
    user_inputted_image_url: string | null;
    setUser_inputted_image_url: Dispatch<SetStateAction<string | null>>;
    isCameraModalopen: boolean
    setIsCameraModalopen: Dispatch<SetStateAction<boolean>>;
    mediaStream: MediaStream | null;
    setMediaStream: Dispatch<SetStateAction<MediaStream | null>>;
    isCameraAccessGranted: boolean,
    setIsCameraAccessGranted: Dispatch<SetStateAction<boolean>>;
};


type IAspectRatio = '3:4' | '1:1' | '9:16';

export const CameraModel: React.FC<Props> = ({ user_inputted_image_url, setUser_inputted_image_url, isCameraModalopen, setIsCameraModalopen, mediaStream, setMediaStream, isCameraAccessGranted, setIsCameraAccessGranted }) => {
    const [aspectRatio, setAspectRatio] = useState<IAspectRatio | null>('3:4');

    const cameraModalRef = useRef(null);

    const CameraModel = {
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

        /* The above code is a TypeScript React function called `toggleAspectRatio` that takes a parameter
       `ratio` of type `AspectRatio` and sets the aspect ratio state to the provided `ratio` value. */
        toggleAspectRatio: (ratio: IAspectRatio) => {
            setAspectRatio(ratio);
        },

        // discard the taken photo and takes back to the camera
        discardClickedPhoto: () => {
            setUser_inputted_image_url(null);
            cameraAction.startCamera()
        },

        // close the model
        confirmTakenPhoto: () => {
            setIsCameraModalopen(false)
            cameraAction.stopCamera()
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
                }}>

                <Camera_Preview
                    setMediaStream={setMediaStream}
                    setUser_inputted_image_url={setUser_inputted_image_url}
                    mediaStream={mediaStream} aspectRatio={aspectRatio} />

                <section className={`${styles.ratio_wrapper} absolute top-[24px] left-[24px] flex gap-[16px]`}>
                    <button onClick={() => cameraAction.toggleAspectRatio("3:4")}
                        className={`${aspectRatio === '3:4' ? styles.active : ''}`}>3: 4</button>
                    <button onClick={() => cameraAction.toggleAspectRatio("9:16")}
                        className={`${aspectRatio === '9:16' ? styles.active : ''}`}>9: 16</button>
                    <button onClick={() => cameraAction.toggleAspectRatio("1:1")}
                        className={`${aspectRatio === '1:1' ? styles.active : ''}`}>1: 1</button>
                </section >

                {
                    isCameraModalopen && user_inputted_image_url &&

                    <PhotoPreview
                        photoDataUrl={user_inputted_image_url}
                        onPhotoConfirmed={cameraAction.confirmTakenPhoto}
                        onPhotoDiscarded={cameraAction.discardClickedPhoto}
                    />
                }
            </Modal >
        </>
    )
}
