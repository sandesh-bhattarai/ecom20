import { Image } from "react-bootstrap";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// const SliderItem = ({data}) => {
//     return (<>
//         {
//             data && data.map((item, index) => (
//                 <div key={index}>
//                     <Image src={item.image} fluid alt={item.title}/>
//                 </div>
//             ))
//         }
//     </>)
// }

const SliderComponent = ({
    config = {},
    data= []
}) => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        ...config
    }
    return (<>
        <Slider {...settings}>
        {
            data && data.map((item, index) => (
                <div key={index}>
                    <Image src={item.image} fluid alt={item.title}/>
                </div>
            ))
        }
        </Slider>
    </>)
}

export default SliderComponent;