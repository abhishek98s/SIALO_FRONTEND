import React from 'react';

export default function SettingPage() {
    return (
        <>
            <section className={`setting-wrapper pt-[24px] px-[12px] max-w-[400px] w-full mx-auto`}>
                <form className="mb-[40px] w-full">
                    <h3 className="mb-[12px] text-[18px] font-bold color-primary-60">Change password</h3>

                    <div className="input-wrapper mb-[12px]">
                        <label htmlFor="current_pass" className="mb-[8px] text-[14px] block color-neutral-30">Current Password</label>
                        <input id="current_pass" className="bg-neutral-88 rounded-8" />
                    </div>

                    <div className="input-wrapper mb-[12px]">
                        <label htmlFor="new_pass" className="mb-[8px] text-[14px] block color-neutral-30">New Password</label>
                        <input id="new_pass" className="bg-neutral-88 rounded-8" />
                    </div>

                    <div className="input-wrapper mb-[12px]">
                        <label htmlFor="confirm_pass" className="mb-[8px] text-[14px] block color-neutral-30">Confirm Password</label>
                        <input id="confirm_pass" className="bg-neutral-88 rounded-8" />
                    </div>

                    <button type="submit" className="secondary-btn w-full">Change Password</button>
                </form>

                <form className="mb-[40px] w-full">
                    <h3 className="mb-[12px] text-[18px] font-bold color-primary-60">Change Username</h3>

                    <div className="input-wrapper mb-[12px]">
                        <label htmlFor="current_pass" className="mb-[8px] text-[14px] block color-neutral-30">New username</label>
                        <input id="current_pass" className="bg-neutral-88 rounded-8" />
                    </div>

                    <button type="submit" className="secondary-btn w-full">Change Username</button>
                </form>

                <article className="w-full">
                    <h3 className="mb-[4px] text-[18px] font-bold color-primary-60">Delete Account</h3>

                    <p className="text-[14px] color-neutral-40 leading-[1.5] mb-[24px]">Deleting the account will delete all the data from the platform and access to the services. Account Deletion is final. There is no way to restore the account.</p>

                    <button className="error-btn max-w-[75px] w-full h-[48px] font-bold bg-error-80 border-error-50 color-neutral-0 text-[14px] inline-flex justify-center items-center">Delete</button>
                </article>
            </section>
        </>
    )
}
