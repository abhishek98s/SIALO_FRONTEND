import { Metadata } from "next";

import Navbar from "@/components/navbar";
import Story from "@/components/story";
import { IStory } from "@/model";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'Sialo | Connect with the World and Share Your Story',
}

export default function Home() {
  const stories: IStory[] = [{
    id: 1,
    img: 'https://res.cloudinary.com/dxsqdqnoe/image/upload/v1716979684/litmark/rvagutddnyavcvcbsmxy.jpg',
    name: 'Dial',
  },
  {
    id: 2,
    img: 'https://sialo.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdxsqdqnoe%2Fimage%2Fupload%2Fv1698732760%2Faslnekafekoyjgptsnfc.jpg&w=640&q=75',
    name: 'Dial',
  },
  {
    id: 3,
    img: 'https://sialo.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdxsqdqnoe%2Fimage%2Fupload%2Fv1698733846%2Fcydcb1ok1oxwg8nyxjuo.jpg&w=640&q=75',
    name: 'Dial',
  },
  {
    id: 4,
    img: 'https://sialo.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdxsqdqnoe%2Fimage%2Fupload%2Fv1685030438%2Fsmfhjdaqncnfxxdz1unw.png&w=640&q=75',
    name: 'Dial'
  },]
  return (
    <>
      <Navbar />

      <div className="container px-[8px]">

        <section className="stories-list-wrapper my-[16px]">
          <ul className="stories-list flex gap-[12px]">
            <li>
              <div className="post_story flex w-[90px] h-[120px] gradient-white border-primary-60 rounded-4" >
                <Image className="m-auto" src="/icons/add-story.svg" alt={'icon-story'} width={32} height={32} />
              </div>
            </li>
            {stories.map((story) => {
              return (
                <li key={story.id}>
                  <Story story={story} />
                </li>
              )
            })}
          </ul>
        </section>

        <section className="user_post">
            
        </section>
      </div>
    </>
  );
}
