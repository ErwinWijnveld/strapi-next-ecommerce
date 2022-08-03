import Image from 'next/image'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { imageToUrl } from '../utils/urls'


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImageSlider = ({images, className}: any) => {
    return (
        <Swiper
            className={className}
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            {images.map((image: any) => 
                <SwiperSlide key={image.id} className="swiper-slide">
                    <Image
                        src={imageToUrl(image)} 
                        width="100%" 
                        height={50}
                        layout="responsive" 
                        objectFit="cover"
                    />
                </SwiperSlide>
            )}
                
        </Swiper>
    )
}

export default ImageSlider