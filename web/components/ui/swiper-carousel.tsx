'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SwiperCarouselProps {
  children: React.ReactNode[];
}

export const SwiperCarousel3D: React.FC<SwiperCarouselProps> = ({ children }) => {
  return (
    <div style={{ width: '100%', padding: '40px 0' }}>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper"
        style={{
          paddingBottom: '50px',
        }}
      >
        {children.map((child, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: '450px',
              maxWidth: '90vw',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {child}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper {
          width: 100%;
          padding-top: 20px;
        }

        .swiper-slide {
          background-position: center;
          background-size: cover;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: #22d3ee;
          background: rgba(34, 211, 238, 0.2);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(34, 211, 238, 0.4);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }

        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background: #22d3ee;
          width: 24px;
          border-radius: 6px;
        }

        .swiper-3d .swiper-slide-shadow-left,
        .swiper-3d .swiper-slide-shadow-right {
          background-image: linear-gradient(
            to right,
            rgba(34, 211, 238, 0.2),
            rgba(168, 85, 247, 0.2)
          );
        }
      `}</style>
    </div>
  );
};
