import React from 'react';

export default function SettingPage() {
    return (
        <>
            <section className={`setting-wrapper px-[12px] lg:pl-[242px]`}>
                <form className="mb-[56px] max-w-[400px]">
                    <h3 className="my-[24px] text-[18px] font-bold color-primary-60">Settings</h3>

                    <div className="input-wrapper mb-[12px]">
                        <label htmlFor="current_pass" className="mb-[8px] text-[14px] block">Current Password</label>
                        <input id="current_pass" className="bg-neutral-88" />
                    </div>

                    <div className="input-wrapper mb-[12px]">
                        <label htmlFor="new_pass" className="mb-[8px] text-[14px] block">New Password</label>
                        <input id="new_pass" className="bg-neutral-88" />
                    </div>

                    <div className="input-wrapper mb-[12px]">
                        <label htmlFor="confirm_pass" className="mb-[8px] text-[14px] block">Confirm Password</label>
                        <input id="confirm_pass" className="bg-neutral-88" />
                    </div>

                    <input type="submit" className="primary-btn" />
                </form>

                <article className="max-w-[400px]">
                    <h3 className="mb-[4px] text-[18px] font-bold color-primary-60">Delete Account</h3>

                    <p className="text-[14px] color-neutral-40 leading-[1.5] mb-[24px]">Deleting the account will delete all the data from the platform and access to the services. Account Deletion is final. There is no way to restore the account.</p>

                    <button className="error-btn max-w-[75px] w-full h-[48px] font-bold bg-error-80 border-error-50 color-neutral-0 text-[14px] inline-flex justify-center items-center">Delete</button>
                </article>
            </section>
        </>
    )
}
