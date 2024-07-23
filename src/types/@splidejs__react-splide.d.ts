declare module '@splidejs/react-splide' {
    import { FC, ReactNode } from 'react';

    export interface SplideProps {
        options?: any;
        className?: string;
        children?: ReactNode;
    }

    export const Splide: FC<SplideProps>;

    export interface SlideProps {
        children?: ReactNode;
    }

    export const SplideSlide: FC<SlideProps>;
}
