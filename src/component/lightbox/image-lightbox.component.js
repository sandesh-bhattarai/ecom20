import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const ImageLightboxComponent = ({image}) => {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (<>
        <LightGallery
            onInit={onInit}
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
        >
            {
                Array.isArray(image) ? <>
                    {
                        image.map((item) => (
                            <a href={process.env.REACT_APP_IMAGE_URL+"/"+item}>
                                Preview
                            </a>
                        ))
                    }
                </> : <>
                    <a href={process.env.REACT_APP_IMAGE_URL+"/"+image}>
                        Preview
                    </a>
                </>
            }
        </LightGallery>
    </>)
}

export default ImageLightboxComponent;