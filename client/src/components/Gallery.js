import React, {useState} from 'react';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import img4 from '../img/img4.jpg';
import img5 from '../img/img5.jpg';
import './gallery.css';
import CloseIcon from '@material-ui/icons/Close';


const Gallery = () => {

    let data = [
        {
            id: 1,
            imgSrc: img1,
        },
        {
            id: 2,
            imgSrc: img2,
        },
        {
            id: 3,
            imgSrc: img3,
        },
        {
            id: 4,
            imgSrc: img4,
        },
        {
            id: 5,
            imgSrc: img5,
        }
]
        const [model, setModel] = useState(false);
        const [tempimgSrc, setTempImgSrc] = useState('')

        const getImg = (imgSrc) =>{
            setTempImgSrc(imgSrc);
            setModel(true)
        }
        return (
            <>
                <div className={model? "model open" : "model"}>
                    <img src={tempimgSrc} alt="cat" />
                    <CloseIcon onClick={()=> setModel(false )}/>
                </div>
            
                <div className="gallery">
                    {data.map((item, index) =>{
                        return(
                            <div className="pics" key={index} onClick={() => getImg(item.imgSrc)}>
                                <img src={item.imgSrc} style={{width: '100%'}} alt="dog" />
                            </div>
                        )

                    })}

                </div>
            </>
    )
}

export default Gallery
