'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";


// --
import toast, { Toaster } from 'react-hot-toast';

import styles from './user_post_box.module.scss';
import { toast_error_option, toast_info_option, toast_sucess_option } from "@/utils/toast";
import { isImage } from "@/utils/file";
import Modal from "react-responsive-modal";


// --
type AspectRatio = '3:4' | '1:1' | '9:16';

export default function UserPostBox() {

    // for camera model 
    //
    const [isCameraModalopen, setIsCameraModalopen] = useState(false);

    // for video stream
    // --
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

    // for image file
    const [image_file, setImage_file] = useState<File | null>(null);

    // for displaying the image
    // --
    const [user_inputted_image_url, setUser_inputted_image_url] = useState<string | null>(null);

    // for caption of the post
    const [caption, setCaption] = useState<string | null>(null);

    // for available camera
    const [iscameraAvailable, setIscameraAvailable] = useState(false);

    // for camera permisiion state
    // -- 
    const [isCameraAccessGranted, setIsCameraAccessGranted] = useState(false);
    const cameraModalRef = useRef(null);

    // --
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [aspectRatio, setAspectRatio] = useState<AspectRatio | null>('3:4');
    const [videoRatio, setVideoRatio] = useState({
        width: 500,
        height: 375,
    });


    useEffect(() => {
        const handleCameraPermission = async () => {
            if (navigator.mediaDevices) {
                setIscameraAvailable(true);
            } else {
                setIscameraAvailable(false)
            }
        };

        const handleRequestPermission = async () => {
            navigator.permissions.query({ name: 'camera' })
                .then(permission => {
                    if (permission.state === 'granted') {
                        setIsCameraAccessGranted(true);

                    } else if (permission.state === 'denied') {
                        setIsCameraAccessGranted(false);
                    }
                })
                .catch(error => {
                    setIsCameraAccessGranted(false);
                });
        };

        handleCameraPermission();
        handleRequestPermission();
    }, [])

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


    // For showing the video to the video tag
    useEffect(() => {
        if (mediaStream && videoRef.current) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [mediaStream]);


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

    //--
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

    const clearImage = () => setUser_inputted_image_url(null);

    const handleChange = (e: any) => {
        const value = e.target as HTMLInputElement;

        const file = value.files ? value.files![0] : null;

        switch (value.name) {


            /* The below code check if the file is present or not
                get the file absolute url. if file is not present or image is not .jpg, .png or .jpeg
                error is notificed. File is set in the image_file state url is set to display the image 
            */
            case 'image_select':
                if (!file || !isImage(file)) {
                    toast.error('Image type should be .jpg, .png or .jpeg', toast_error_option)
                };
                const fileURL = URL.createObjectURL(file!);
                setImage_file(file);
                setUser_inputted_image_url(fileURL);
                break;


            /* set the caption of the post to the state */
            case 'input_caption':
                const caption = e.target.value;
                setCaption(caption)
                break;
            default:
                break;
        }
    }


    const onPostSubmit = (e: any) => {
        e.preventDefault();

        if (!user_inputted_image_url || !caption) {
            toast.error('Image and caption is required', toast_error_option);
            return
        }

        toast.success('Post added', toast_sucess_option);
    };

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
            <form
                onSubmit={onPostSubmit}
                className={`${styles.user_post_wrapper} transition-4 order-neutral-86 bg-neutral-90 mb-[16px] px-[12px] pt-[20px] pb-[10px] rounded-4`}>
                <div className="top flex gap-[12px] mb-[16px]">
                    <Image src="/user.png" alt="user" width={40} height={40} className="rounded-full border-primary-60 max-w-[40px] w-full" />
                    <input type="text" className="bg-neutral-88 border-neutral-86 px-[16px] py-[8px]" onChange={handleChange} name="input_caption" placeholder="Mind writing something?" />
                </div>


                {user_inputted_image_url && <div className={`${styles.middle} relative rounded-4 border-neutral-40 w-[60px] h-[60px] mb-[16px]`}>
                    <Image className="rounded-4 object-cover h-full w-full" src={user_inputted_image_url} width={60} height={60} alt={image_file ? image_file.name : ''} />
                    <button type="button"
                        onClick={clearImage}
                        className={`focus-visible-primary-65 rounded-4 opacity-60 w-full h-full bg-neutral-90 position-center flex-center`}>
                        <Image src={`/icons/icon-close.svg`} width={17} height={17} alt="icon-close" />
                    </button>
                </div>}

                <div className="down">
                    <div className="action flex gap-[4px]">
                        {iscameraAvailable && <button type="button"
                            onClick={CameraModel.open}
                            className="w-[40px] h-[40px] focus-visible-primary-45 flex-center rounded-full">
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5997 2.58014H12.5757L12.3197 1.78016C12.1538 1.31075 11.846 0.904581 11.4389 0.617913C11.0318 0.331245 10.5457 0.178274 10.0478 0.180194H5.95188C5.44913 0.181134 4.95936 0.339937 4.55172 0.634188C4.14407 0.92844 3.83913 1.34328 3.67992 1.82016L3.42393 2.62014H2.39995C1.76344 2.62014 1.15301 2.87299 0.702929 3.32307C0.252851 3.77315 0 4.38359 0 5.02009V11.42C0 12.0565 0.252851 12.6669 0.702929 13.117C1.15301 13.5671 1.76344 13.8199 2.39995 13.8199H13.5997C14.2362 13.8199 14.8467 13.5671 15.2967 13.117C15.7468 12.6669 15.9997 12.0565 15.9997 11.42V5.02009C16.005 4.70158 15.9468 4.38519 15.8286 4.08938C15.7104 3.79358 15.5344 3.52427 15.311 3.29716C15.0877 3.07005 14.8213 2.88968 14.5275 2.76658C14.2337 2.64348 13.9183 2.5801 13.5997 2.58014ZM14.3997 11.38C14.3997 11.5921 14.3154 11.7956 14.1654 11.9456C14.0154 12.0957 13.8119 12.1799 13.5997 12.1799H2.39995C2.18778 12.1799 1.9843 12.0957 1.83428 11.9456C1.68425 11.7956 1.59997 11.5921 1.59997 11.38V4.98009C1.59997 4.76793 1.68425 4.56445 1.83428 4.41442C1.9843 4.26439 2.18778 4.18011 2.39995 4.18011H3.99992C4.17437 4.18922 4.347 4.14097 4.49145 4.04274C4.63591 3.94451 4.74424 3.8017 4.7999 3.63612L5.23189 2.32415C5.28556 2.16526 5.38781 2.02725 5.52418 1.92963C5.66056 1.83201 5.82416 1.77973 5.99188 1.78016H10.0878C10.2555 1.77973 10.4191 1.83201 10.5555 1.92963C10.6919 2.02725 10.7941 2.16526 10.8478 2.32415L11.2798 3.63612C11.3311 3.78871 11.4273 3.92227 11.5557 4.01932C11.6842 4.11638 11.8389 4.17241 11.9998 4.18011H13.5997C13.8119 4.18011 14.0154 4.26439 14.1654 4.41442C14.3154 4.56445 14.3997 4.76793 14.3997 4.98009V11.38ZM7.99983 4.18011C7.36695 4.18011 6.74827 4.36778 6.22205 4.7194C5.69582 5.07101 5.28568 5.57077 5.04348 6.15548C4.80129 6.74019 4.73792 7.38359 4.86139 8.00432C4.98486 8.62505 5.28962 9.19522 5.73714 9.64274C6.18466 10.0903 6.75483 10.395 7.37556 10.5185C7.99628 10.642 8.63968 10.5786 9.2244 10.3364C9.80911 10.0942 10.3089 9.68406 10.6605 9.15783C11.0121 8.63161 11.1998 8.01293 11.1998 7.38004C11.1998 6.53137 10.8626 5.71745 10.2625 5.11735C9.66243 4.51725 8.84851 4.18011 7.99983 4.18011ZM7.99983 8.98001C7.68339 8.98001 7.37405 8.88617 7.11094 8.71037C6.84783 8.53456 6.64276 8.28468 6.52166 7.99232C6.40056 7.69997 6.36887 7.37827 6.43061 7.06791C6.49234 6.75754 6.64473 6.47246 6.86849 6.2487C7.09225 6.02494 7.37733 5.87256 7.6877 5.81082C7.99806 5.74908 8.31976 5.78077 8.61211 5.90187C8.90447 6.02296 9.15435 6.22804 9.33016 6.49115C9.50596 6.75426 9.5998 7.0636 9.5998 7.38004C9.5998 7.80438 9.43123 8.21134 9.13118 8.51139C8.83113 8.81144 8.42417 8.98001 7.99983 8.98001Z" fill="#71A145" />
                            </svg>
                        </button>}

                        <div className="relative w-[40px] h-[40px] flex-center ">
                            <input type="file"
                                onChangeCapture={handleChange}
                                className={`${styles.image_input} absolute z-0 border-neutral-90 outline-none`} id="image-input" accept=".png,.jpg,.jpeg" name="image_select" />
                            <label htmlFor="image-input" className="absolute z-5 rounded-full w-full h-full flex-center cursor-pointer bg-neutral-90">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9 0.5H2.1C1.54305 0.5 1.0089 0.705446 0.615076 1.07114C0.221249 1.43684 0 1.93283 0 2.45V11.55C0 12.0672 0.221249 12.5632 0.615076 12.9289C1.0089 13.2946 1.54305 13.5 2.1 13.5H11.9C12.0151 13.4985 12.1299 13.4876 12.243 13.4675L12.453 13.422H12.502H12.537L12.796 13.331L12.887 13.2855C12.957 13.2465 13.034 13.214 13.104 13.1685C13.1975 13.1046 13.2863 13.0352 13.37 12.9605L13.419 12.902C13.4877 12.8373 13.5509 12.7678 13.608 12.694L13.671 12.6095C13.7199 12.5371 13.762 12.461 13.797 12.382C13.8162 12.3508 13.8326 12.3182 13.846 12.2845C13.881 12.2065 13.902 12.122 13.93 12.0375V11.94C13.9697 11.813 13.9932 11.6821 14 11.55V2.45C14 1.93283 13.7788 1.43684 13.3849 1.07114C12.9911 0.705446 12.457 0.5 11.9 0.5ZM2.1 12.2C1.91435 12.2 1.7363 12.1315 1.60503 12.0096C1.47375 11.8877 1.4 11.7224 1.4 11.55V8.7485L3.703 6.6035C3.76807 6.54258 3.84549 6.49422 3.9308 6.46122C4.0161 6.42822 4.10759 6.41123 4.2 6.41123C4.29241 6.41123 4.3839 6.42822 4.4692 6.46122C4.55451 6.49422 4.63193 6.54258 4.697 6.6035L10.717 12.2H2.1ZM12.6 11.55C12.5993 11.6301 12.5827 11.7095 12.551 11.784C12.535 11.8157 12.5163 11.8461 12.495 11.875C12.4763 11.9025 12.4552 11.9286 12.432 11.953L8.687 8.4755L9.303 7.9035C9.36807 7.84258 9.44549 7.79422 9.5308 7.76122C9.6161 7.72822 9.70759 7.71123 9.8 7.71123C9.89241 7.71123 9.9839 7.72822 10.0692 7.76122C10.1545 7.79422 10.2319 7.84258 10.297 7.9035L12.6 10.0485V11.55ZM12.6 8.209L11.284 7C10.8834 6.64704 10.3522 6.45028 9.8 6.45028C9.24777 6.45028 8.71659 6.64704 8.316 7L7.7 7.572L5.684 5.7C5.2834 5.34704 4.75223 5.15028 4.2 5.15028C3.64777 5.15028 3.1166 5.34704 2.716 5.7L1.4 6.909V2.45C1.4 2.27761 1.47375 2.11228 1.60503 1.99038C1.7363 1.86848 1.91435 1.8 2.1 1.8H11.9C12.0857 1.8 12.2637 1.86848 12.395 1.99038C12.5263 2.11228 12.6 2.27761 12.6 2.45V8.209Z" fill="#71A145" />
                                </svg>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="primary-btn ml-auto color-primary-80 bg-primary-60 rounded-4 text-[14px] max-w-[60px] w-full h-[30px] font-bold">Post</button>
                    </div>
                </div>
            </form>
        </>
    );
}
