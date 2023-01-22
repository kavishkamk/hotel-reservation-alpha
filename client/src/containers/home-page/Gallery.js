import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

// import images
import img1 from "../../assets/home-page/img1.png"
import img2 from "../../assets/home-page/img2.png";
import img3 from "../../assets/home-page/img3.png";

export default function Gallery() {
	return (
		<>
			<div className="h-6 bg-[#1E293B]"></div>

			<div className="bg-[#E2E8F0] border-b-8 border-b-[#6B71CB]">
				<div className="font-poppins text-xl md:text-4xl font-extrabold text-textBlue py-6 border-textBlue border-b-4 w-[90%] md:max-w-lg text-center mx-auto">
					Gallery
				</div>
				<div className="flex flex-col md:flex-row items-center justify-center my-10 gap-10 py-5">
					<div className="">
						<Swiper
							spaceBetween={30}
							centeredSlides={true}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
							}}
							pagination={{
								clickable: true,
							}}
							navigation={true}
							modules={[Autoplay, Pagination, Navigation]}
							className="w-[300px] mx-auto"
						>
							<SwiperSlide>
								<img
									src={img1}
									alt="slide 1"
								/>
							</SwiperSlide>
							<SwiperSlide>
								<img
									src={img2}
									alt="slide 2"
								/>
							</SwiperSlide>
							<SwiperSlide>
								<img
									src={img3}
									alt="slide 3"
								/>
							</SwiperSlide>
						</Swiper>
					</div>

					<div className="max-w-lg text-center text-lg md:text-2xl italic font-poppins font-medium my-5">
						"The best memories of our life can never be
						captured in pictures. They are always captured
						in heart."
					</div>
				</div>
			</div>
			<div className="h-6 bg-[#1E293B]"></div>
		</>
	);
}
