import React from "react";

import styles from "./photo_preview.module.scss";

interface PhotoPreviewProps {
  photoDataUrl: string;
  onPhotoDiscarded: () => void;
  onPhotoConfirmed: () => void;
}

export const PhotoPreview: React.FC<PhotoPreviewProps> = ({
  photoDataUrl,
  onPhotoDiscarded,
  onPhotoConfirmed,
}) => {
  return (
    <>
      <section
        className={`${styles.confirm_photo} confirm_photo absolute top-0 left-0 right-0 bottom-0 bg-neutral-90 h-full w-full`}
      >
        <div>
          <img src={photoDataUrl} className="w-full opacity-10" alt="image" />
          <div
            className={`${styles.camera_actions} absolute left-0 bottom-0 right-0 py-[40px] px-[24px] flex gap-[12px]`}
          >
            <button
              onClick={onPhotoConfirmed}
              className="primary-btn w-full h-[48px] font-bold color-primary-80 text-[16px] inline-flex justify-center items-center"
            >
              Confirm
            </button>
            <button
              onClick={onPhotoDiscarded}
              className="error-btn w-full h-[48px] font-bold bg-error-80 border-error-50 color-neutral-0 text-[16px] inline-flex justify-center items-center"
            >
              Discard
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
