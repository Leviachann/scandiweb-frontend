import { useState } from 'react';
import './ProductGallery.css';

const ProductGallery = ({ images = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [thumbOffset, setThumbOffset] = useState(0);
    const thumbHeight = 88;
    const visibleCount = 4;

    if (images.length === 0) return null;

    const canScrollUp = thumbOffset > 0;
    const canScrollDown = thumbOffset < (images.length - visibleCount) * thumbHeight;

    const scrollUp = () => setThumbOffset(prev => Math.max(0, prev - thumbHeight));
    const scrollDown = () => setThumbOffset(prev =>
        Math.min((images.length - visibleCount) * thumbHeight, prev + thumbHeight)
    );

    return (
        <div className="product-gallery">
            <div className="thumbnail-column">
                <button
                    className="thumb-scroll-btn"
                    onClick={scrollUp}
                    style={{ visibility: canScrollUp ? 'visible' : 'hidden' }}
                >
                    &#8963;
                </button>

                <div className="thumbnail-viewport">
                    <div
                        className="thumbnail-strip"
                        style={{ transform: `translateY(-${thumbOffset}px)` }}
                    >
                        {images.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`thumbnail-wrapper ${i === activeIndex ? 'thumbnail-active' : ''}`}
                            >
                                <img
                                    src={img}
                                    alt={`Product view ${i + 1}`}
                                    className="thumbnail-img"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="thumb-scroll-btn"
                    onClick={scrollDown}
                    style={{ visibility: canScrollDown ? 'visible' : 'hidden' }}
                >
                    &#8964;
                </button>
            </div>

            <div className="main-image-wrapper">
                <button
                    className="gallery-arrow gallery-arrow-left"
                    onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
                >
                    &#8249;
                </button>
                <img
                    src={images[activeIndex]}
                    alt="Product main view"
                    className="main-image"
                />
                <button
                    className="gallery-arrow gallery-arrow-right"
                    onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
};

export default ProductGallery;