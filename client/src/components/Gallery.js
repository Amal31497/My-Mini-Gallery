import React from 'react';
import Gallery from 'react-photo-gallery';
import img1 from '../img/img1.jpg';
import img2 from '../img/img2.jpg';
import img3 from '../img/img3.jpg';
import img4 from '../img/img4.jpg';
import img5 from '../img/img5.jpg';
import img6 from '../img/img6.jpg';
import img7 from '../img/img7.JPG';
import img8 from '../img/img8.jpg';
import img9 from '../img/img9.JPG';
import './gallery.css';

let photos = [
    {
        src: img1,
        width: 1,
        height: 1
    },
    {
        
        src: img2,
        width: 1,
        height: 1
    },
    {
        
        src: img3,
        width: 1,
        height: 1
    },
    {
        
        src: img4,
        width: 1,
        height: 1
    },
    {
        
        src: img5,
        width: 1,
        height: 1
    },
    {
        
        src: img6,
        width: 1,
        height: 1
    },
    {
        
        src: img7,
        width: 1,
        height: 1
    },
    {
        
        src: img8,
        width: 1,
        height: 1
    },
    {
        
        src: img9,
        width: 1,
        height: 1
    }
];


const gallery2 = () => {
    
    
            

    return (
        <div className="gallery">
            <Gallery photos={photos} />
        </div>
    )
}

export default gallery2;
