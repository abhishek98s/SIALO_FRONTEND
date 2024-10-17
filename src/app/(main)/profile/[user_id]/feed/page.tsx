'use client';

import Image from "next/image";
import Link from "next/link";

import styles from './profile.module.scss';
import Feed from "@/components/feedd";
import ImageListPreview from "@/components/image_list-preview";

export default function ProfilePage() {

    return (
        <>
            <div role="feed_information" className="space-y-[12px]">
                <Feed />
                <Feed />
                <Feed />
            </div>
            <ImageListPreview />
        </>
    )
}
