'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";

import styles from './user_post_box.module.scss';

import { isImage } from "@/utils/file";
import { useAppSelector } from "@/lib/hooks";
import { axiosInterceptor } from "@/utils/axois.config";
import { toast_error_option, toast_info_option, toast_sucess_option } from "@/utils/toast";

import { CameraModel } from "../camera_model";
import { ImagePreview } from "../image_preview";
import toast from "react-hot-toast";

export default function UserPostBox() {

    // for camera model 
    const [isCameraModalopen, setIsCameraModalopen] = useState(false);
    const [iscameraAvailable, setIscameraAvailable] = useState(false);

    // for video stream
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

    // for image file
    const [image_file, setImage_file] = useState<File | null>(null);

    // for displaying the image
    const [user_inputted_image_url, setUser_inputted_image_url] = useState<string | null>(null);

    // for caption of the post
    const [caption, setCaption] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [isCameraAccessGranted, setIsCameraAccessGranted] = useState<boolean>(false);

    const auth_user_image = useAppSelector((state) => state.auth.user?.image);

    useEffect(() => {
        const handleCameraPermission = async () => {
            if (navigator.mediaDevices) {
                setIscameraAvailable(true);
            } else {
                setIscameraAvailable(false)
            }
        };

        const handleRequestPermission = async () => {
            // @ts-expect-error STFU
            navigator.permissions.query({ name: 'camera' })
                .then(permission => {
                    if (permission.state === 'granted') {
                        setIsCameraAccessGranted(true);

                    } else if (permission.state === 'denied') {
                        setIsCameraAccessGranted(false);
                    }
                })
                .catch(function () {
                    setIsCameraAccessGranted(false);
                });
        };

        handleCameraPermission();
        handleRequestPermission();
    }, [])

    const openCamera = async () => {
        if (!isCameraAccessGranted) {
            toast.error('Camera access required!',
                toast_info_option
            );
            return
        }
        setUser_inputted_image_url(null)
        setIsCameraModalopen(true)
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
    }

    const clearImage = () => setUser_inputted_image_url(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target as HTMLInputElement;

        const file = value.files ? value.files![0] : null;

        switch (value.name) {
            case 'image_select':
                if (!file || !isImage(file)) {
                    toast.error('Image type should be .jpg, .png or .jpeg', toast_error_option);
                } else {
                    const fileURL = URL.createObjectURL(file);
                    setImage_file(file);
                    setUser_inputted_image_url(fileURL);
                }
                break;

            case 'input_caption':
                const value = e.target.value;
                setCaption(value)
                break;
            default:
                break;
        }
    }

    const onPostSubmit = async (e: any) => {
        try {
            setIsLoading(true)
            e.preventDefault();

            if (!user_inputted_image_url || !caption) {
                setIsLoading(false)
                toast.error('Image and caption is required', toast_error_option);
                return
            }

            let user_file;
            const form_data = new FormData();

            if (!image_file) {
                form_data.append('base64_image', user_inputted_image_url);
            } else {
                user_file = image_file;
                form_data.append('sialo_image', user_file);
            }

            form_data.append('caption', caption);

            const axiosInstace = axiosInterceptor();
            const response = await axiosInstace.post('api/post', form_data);

            const { status } = response.data;

            if (!status) {
                setIsLoading(false);
                throw new Error('Error posting the post');
            }
            toast.success('Post added', toast_sucess_option);
        } catch (error) {
            setIsLoading(false);
            const err = error as Error;
            toast.error(err.message, toast_error_option);
        } finally {
            setUser_inputted_image_url(null);
            setCaption('');
            setImage_file(null);
            setIsLoading(false);
        }
    };

    return (
        <>
            <CameraModel user_inputted_image_url={user_inputted_image_url}
                setUser_inputted_image_url={setUser_inputted_image_url}
                isCameraModalopen={isCameraModalopen}
                setIsCameraModalopen={setIsCameraModalopen}
                mediaStream={mediaStream}
                setMediaStream={setMediaStream}
                isCameraAccessGranted={isCameraAccessGranted}
                setIsCameraAccessGranted={setIsCameraAccessGranted}
            />
            <form
                onSubmit={onPostSubmit}
                className={`${styles.user_post_wrapper} transition-4 order-neutral-86 bg-neutral-90 border-neutral-80 mb-[16px] px-[12px] pt-[20px] pb-[10px] rounded-4`}>
                <div className="top flex gap-[12px] mb-[16px]">
                    <Image src={auth_user_image ? auth_user_image : '/icons/icon-user.svg'} alt="user" width={40} height={40} className="rounded-full border-primary-60 max-w-[40px] w-full" />
                    <input type="text" value={caption ?? ''} className="bg-neutral-88 border-neutral-86 px-[16px] py-[8px]" onChange={handleChange} name="input_caption" placeholder="Mind writing something?" />
                </div>


                {user_inputted_image_url &&
                    <ImagePreview user_inputted_image_url={user_inputted_image_url}
                        clearImage={clearImage} />}

                <div className="down">
                    <div className="action flex gap-[4px]">
                        {iscameraAvailable && <button type="button"
                            onClick={openCamera}
                            className="w-[40px] h-[40px] focus-visible-primary-45 flex-center rounded-full">
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.5997 2.58014H12.5757L12.3197 1.78016C12.1538 1.31075 11.846 0.904581 11.4389 0.617913C11.0318 0.331245 10.5457 0.178274 10.0478 0.180194H5.95188C5.44913 0.181134 4.95936 0.339937 4.55172 0.634188C4.14407 0.92844 3.83913 1.34328 3.67992 1.82016L3.42393 2.62014H2.39995C1.76344 2.62014 1.15301 2.87299 0.702929 3.32307C0.252851 3.77315 0 4.38359 0 5.02009V11.42C0 12.0565 0.252851 12.6669 0.702929 13.117C1.15301 13.5671 1.76344 13.8199 2.39995 13.8199H13.5997C14.2362 13.8199 14.8467 13.5671 15.2967 13.117C15.7468 12.6669 15.9997 12.0565 15.9997 11.42V5.02009C16.005 4.70158 15.9468 4.38519 15.8286 4.08938C15.7104 3.79358 15.5344 3.52427 15.311 3.29716C15.0877 3.07005 14.8213 2.88968 14.5275 2.76658C14.2337 2.64348 13.9183 2.5801 13.5997 2.58014ZM14.3997 11.38C14.3997 11.5921 14.3154 11.7956 14.1654 11.9456C14.0154 12.0957 13.8119 12.1799 13.5997 12.1799H2.39995C2.18778 12.1799 1.9843 12.0957 1.83428 11.9456C1.68425 11.7956 1.59997 11.5921 1.59997 11.38V4.98009C1.59997 4.76793 1.68425 4.56445 1.83428 4.41442C1.9843 4.26439 2.18778 4.18011 2.39995 4.18011H3.99992C4.17437 4.18922 4.347 4.14097 4.49145 4.04274C4.63591 3.94451 4.74424 3.8017 4.7999 3.63612L5.23189 2.32415C5.28556 2.16526 5.38781 2.02725 5.52418 1.92963C5.66056 1.83201 5.82416 1.77973 5.99188 1.78016H10.0878C10.2555 1.77973 10.4191 1.83201 10.5555 1.92963C10.6919 2.02725 10.7941 2.16526 10.8478 2.32415L11.2798 3.63612C11.3311 3.78871 11.4273 3.92227 11.5557 4.01932C11.6842 4.11638 11.8389 4.17241 11.9998 4.18011H13.5997C13.8119 4.18011 14.0154 4.26439 14.1654 4.41442C14.3154 4.56445 14.3997 4.76793 14.3997 4.98009V11.38ZM7.99983 4.18011C7.36695 4.18011 6.74827 4.36778 6.22205 4.7194C5.69582 5.07101 5.28568 5.57077 5.04348 6.15548C4.80129 6.74019 4.73792 7.38359 4.86139 8.00432C4.98486 8.62505 5.28962 9.19522 5.73714 9.64274C6.18466 10.0903 6.75483 10.395 7.37556 10.5185C7.99628 10.642 8.63968 10.5786 9.2244 10.3364C9.80911 10.0942 10.3089 9.68406 10.6605 9.15783C11.0121 8.63161 11.1998 8.01293 11.1998 7.38004C11.1998 6.53137 10.8626 5.71745 10.2625 5.11735C9.66243 4.51725 8.84851 4.18011 7.99983 4.18011ZM7.99983 8.98001C7.68339 8.98001 7.37405 8.88617 7.11094 8.71037C6.84783 8.53456 6.64276 8.28468 6.52166 7.99232C6.40056 7.69997 6.36887 7.37827 6.43061 7.06791C6.49234 6.75754 6.64473 6.47246 6.86849 6.2487C7.09225 6.02494 7.37733 5.87256 7.6877 5.81082C7.99806 5.74908 8.31976 5.78077 8.61211 5.90187C8.90447 6.02296 9.15435 6.22804 9.33016 6.49115C9.50596 6.75426 9.5998 7.0636 9.5998 7.38004C9.5998 7.80438 9.43123 8.21134 9.13118 8.51139C8.83113 8.81144 8.42417 8.98001 7.99983 8.98001Z" fill="#71A145" />
                            </svg>
                        </button>}

                        <div className="relative w-[40px] h-[40px] flex-center ">
                            <input type="file"
                                onChangeCapture={handleChange}
                                name="image_select"
                                className={`${styles.image_input} absolute z-0 border-neutral-90 outline-none`} id="image-input" accept=".png,.jpg,.jpeg" />
                            <label htmlFor="image-input" className="absolute z-5 rounded-full w-full h-full flex-center cursor-pointer bg-neutral-90">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.9 0.5H2.1C1.54305 0.5 1.0089 0.705446 0.615076 1.07114C0.221249 1.43684 0 1.93283 0 2.45V11.55C0 12.0672 0.221249 12.5632 0.615076 12.9289C1.0089 13.2946 1.54305 13.5 2.1 13.5H11.9C12.0151 13.4985 12.1299 13.4876 12.243 13.4675L12.453 13.422H12.502H12.537L12.796 13.331L12.887 13.2855C12.957 13.2465 13.034 13.214 13.104 13.1685C13.1975 13.1046 13.2863 13.0352 13.37 12.9605L13.419 12.902C13.4877 12.8373 13.5509 12.7678 13.608 12.694L13.671 12.6095C13.7199 12.5371 13.762 12.461 13.797 12.382C13.8162 12.3508 13.8326 12.3182 13.846 12.2845C13.881 12.2065 13.902 12.122 13.93 12.0375V11.94C13.9697 11.813 13.9932 11.6821 14 11.55V2.45C14 1.93283 13.7788 1.43684 13.3849 1.07114C12.9911 0.705446 12.457 0.5 11.9 0.5ZM2.1 12.2C1.91435 12.2 1.7363 12.1315 1.60503 12.0096C1.47375 11.8877 1.4 11.7224 1.4 11.55V8.7485L3.703 6.6035C3.76807 6.54258 3.84549 6.49422 3.9308 6.46122C4.0161 6.42822 4.10759 6.41123 4.2 6.41123C4.29241 6.41123 4.3839 6.42822 4.4692 6.46122C4.55451 6.49422 4.63193 6.54258 4.697 6.6035L10.717 12.2H2.1ZM12.6 11.55C12.5993 11.6301 12.5827 11.7095 12.551 11.784C12.535 11.8157 12.5163 11.8461 12.495 11.875C12.4763 11.9025 12.4552 11.9286 12.432 11.953L8.687 8.4755L9.303 7.9035C9.36807 7.84258 9.44549 7.79422 9.5308 7.76122C9.6161 7.72822 9.70759 7.71123 9.8 7.71123C9.89241 7.71123 9.9839 7.72822 10.0692 7.76122C10.1545 7.79422 10.2319 7.84258 10.297 7.9035L12.6 10.0485V11.55ZM12.6 8.209L11.284 7C10.8834 6.64704 10.3522 6.45028 9.8 6.45028C9.24777 6.45028 8.71659 6.64704 8.316 7L7.7 7.572L5.684 5.7C5.2834 5.34704 4.75223 5.15028 4.2 5.15028C3.64777 5.15028 3.1166 5.34704 2.716 5.7L1.4 6.909V2.45C1.4 2.27761 1.47375 2.11228 1.60503 1.99038C1.7363 1.86848 1.91435 1.8 2.1 1.8H11.9C12.0857 1.8 12.2637 1.86848 12.395 1.99038C12.5263 2.11228 12.6 2.27761 12.6 2.45V8.209Z" fill="#71A145" />
                                </svg>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="primary-btn ml-auto color-primary-80 bg-primary-60 rounded-4 text-[14px] min-w-[60px] max-w-[80px] w-full h-[30px] font-bold">{isLoading ? 'Posting...' : 'Post'}</button>
                    </div>
                </div>
            </form>
        </>
    );
}
