'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import toast, { Toaster } from 'react-hot-toast';

import { logout } from '@/lib/features/auth.slice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { APP_BASE_URL } from '@/utils/app';
import { clearLocalStorage } from '@/utils/storage';
import { axiosInterceptor } from '@/utils/axois.config';
import { toast_error_option, toast_sucess_option } from '@/utils/toast';
import { handleApiError } from '@/utils/error';

export const Setting = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');

    const axiosInstance = axiosInterceptor();
    const authUserId = useAppSelector((state) => state.auth.user?.id);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case 'username':
                setUsername(value);
                break;

            case 'current-password':
                setCurrentPassword(value);
                break;

            case 'new-password':
                setNewPassword(value);
                break;

            case 'confirm-password':
                setConfirmPassword(value);
                break;

            default:
                break;
        }
    }

    const onUsernameSubmit = async (e: any) => {
        try {
            e.preventDefault();
            if (!username) {
                throw new Error('Username field is required');
            }

            if (username.length < 3) {
                throw new Error('Username should be 3 character long');
            }

            const response = await axiosInstance.patch(`${APP_BASE_URL}/user/${authUserId}`, { username })

            const { status, message } = response.data;

            if (!status) throw new Error();

            toast.success(message, toast_sucess_option);
        } catch (error: any) {
            const err = error as Error;
            toast.error(err.message, toast_error_option);
        }
    }

    const onPasswordSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!newPassword || !currentPassword || !confirmPassword) {
                throw new Error('Field empty');
            }

            if (newPassword !== confirmPassword) {
                throw new Error('New password and confirm password is not same');
            }

            const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            if (!regex.test(newPassword)) {
                throw new Error('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character');
            } else {
                console.log('Password matches the requirements');
            }

            const response = await axiosInstance.patch(`${APP_BASE_URL}/auth/changePassword`, { newPassword, currentPassword })

            const { status, message } = response.data;

            if (!status) throw new Error();

            dispatch(logout());
            clearLocalStorage();
            router.push('/login');

            toast.success(message, toast_sucess_option);
        } catch (error) {
            const errorMessage = handleApiError(error);
            toast.error(errorMessage, toast_error_option);
        }
    }

    return (
        <section className={`setting-wrapper pt-[24px] px-[12px] max-w-[400px] w-full mx-auto`}>

            <Toaster
                position='top-right'
                reverseOrder={false}
                toastOptions={{
                    success: { ...toast_sucess_option },
                    error: { ...toast_error_option },
                }}
            />
            <form className='mb-[40px] w-full' onSubmit={onPasswordSubmit}>
                <h3 className='mb-[12px] text-[18px] font-bold color-primary-60'>Change password</h3>

                <div className='input-wrapper mb-[12px]'>
                    <label htmlFor='current_pass' className='mb-[8px] text-[14px] block color-neutral-30'>Current Password</label>
                    <input onChange={handleChange} id='current_pass' name='current-password' className='bg-neutral-88 rounded-8' />
                </div>

                <div className='input-wrapper mb-[12px]'>
                    <label htmlFor='new_pass' className='mb-[8px] text-[14px] block color-neutral-30'>New Password</label>
                    <input onChange={handleChange} id='new_pass' name='new-password' className='bg-neutral-88 rounded-8' />
                </div>

                <div className='input-wrapper mb-[12px]'>
                    <label htmlFor='confirm_pass' className='mb-[8px] text-[14px] block color-neutral-30'>Confirm Password</label>
                    <input onChange={handleChange} id='confirm_pass' name='confirm-password' className='bg-neutral-88 rounded-8' />
                </div>

                <button type='submit' className='secondary-btn w-full'>Change Password</button>
            </form>

            <form className='mb-[40px] w-full' onSubmit={onUsernameSubmit}>
                <h3 className='mb-[12px] text-[18px] font-bold color-primary-60'>Change Username</h3>

                <div className='input-wrapper mb-[12px]'>
                    <label htmlFor='username' className='mb-[8px] text-[14px] block color-neutral-30'>New username</label>
                    <input onChange={handleChange} name='username' id='username' className='bg-neutral-88 rounded-8' />
                </div>

                <button type='submit' className='secondary-btn w-full'>Change Username</button>
            </form>

            <article className='w-full'>
                <h3 className='mb-[4px] text-[18px] font-bold color-primary-60'>Delete Account</h3>

                <p className='text-[14px] color-neutral-40 leading-[1.5] mb-[24px]'>Deleting the account will delete all the data from the platform and access to the services. Account Deletion is final. There is no way to restore the account.</p>

                <button className='error-btn max-w-[75px] w-full h-[48px] font-bold bg-error-80 border-error-50 color-neutral-0 text-[14px] inline-flex justify-center items-center'>Delete</button>
            </article>
        </section>
    )
};
