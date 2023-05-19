import { useEffect, useState } from "react"
import SliderComponent from "../slider/slider.component"

import bannerSvc from "../../services/banner.service";


const HomeBanner = () => {
    const [banner, setBanner] = useState();

    const loadBanners = async() => {
        try{
            let response = await bannerSvc.getBannerForHomePage();
            let data = response.result.map((item) => {
                return {
                    image: process.env.REACT_APP_IMAGE_URL+"/"+item.image,
                    title: item.title
                }
            })
            setBanner(data)
        } catch(error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadBanners()
    }, [])
    return (<>
        <SliderComponent data={banner} />
    </>)
}

export default HomeBanner