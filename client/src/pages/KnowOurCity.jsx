import React, { useState, useEffect, useCallback } from 'react';
import '../App.css';

// --- Reusable Image Slider Component ---
const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = useCallback(() => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, images.length]);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    // Auto-play functionality
    useEffect(() => {
        const sliderInterval = setInterval(goToNext, 4000);
        return () => clearInterval(sliderInterval);
    }, [goToNext]);

    return (
        <div className="slider-container">
            <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div className="slide" key={index}>
                        <img src={image.url} alt={image.alt} />
                    </div>
                ))}
            </div>
            <button className="slider-arrow left" onClick={goToPrevious}>&#10094;</button>
            <button className="slider-arrow right" onClick={goToNext}>&#10095;</button>
        </div>
    );
};


// --- Styles Component (No changes needed) ---
const Styles = () => {
    const css = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        :root {
            --brand-orange: #F57C00; --brand-blue-dark: #0D47A1;
            --brand-blue-light: #E3F2FD;
            --text-primary: #111318; --text-secondary: #6c757d;
            --surface-light: #f8f9fa; --surface-dark: #e9ecef; --white: #FFFFFF;
            --page-max-width: 1200px; --gutter: 1.25rem; --radius: 12px;
            --shadow-soft: 0 6px 20px rgba(17, 19, 24, 0.06);
        }
        .page-header {
            text-align: center; padding: 3rem 0;
            background-color: var(--brand-blue-light);
            animation: fadeInUp 0.5s ease-out;
        }
        .page-header h1 { font-size: 2.5rem; color: var(--brand-blue-dark); margin: 0; }
        .info-section {
            display: grid; grid-template-columns: 1fr 1fr;
            gap: 2.5rem; align-items: center; padding: 4rem 0;
            border-bottom: 1px solid var(--surface-dark);
            opacity: 0; animation: fadeInUp 0.7s ease-out forwards;
        }
        .info-section:last-child { border-bottom: none; }
        
        .info-section:nth-child(1) { animation-delay: 0.2s; }
        .info-section:nth-child(2) { animation-delay: 0.4s; }
        .info-section:nth-child(3) { animation-delay: 0.6s; }
        .info-section:nth-child(4) { animation-delay: 0.8s; }

        .info-section:nth-of-type(even) .info-text { order: 2; }
        .info-section:nth-of-type(even) .slider-container { order: 1; }

        .info-text h2 { font-size: 2rem; color: var(--brand-blue-dark); margin: 0 0 1rem; }
        .info-text p { font-size: 1.05rem; line-height: 1.7; color: var(--text-secondary); }
        
        .slider-container {
            position: relative; width: 100%; height: 400px;
            border-radius: var(--radius); box-shadow: var(--shadow-soft);
            overflow: hidden;
        }
        .slider-wrapper { display: flex; height: 100%; transition: transform 0.5s ease-in-out; }
        .slide { min-width: 100%; height: 100%; }
        .slide img { width: 100%; height: 100%; object-fit: cover; }
        .slider-arrow {
            position: absolute; top: 50%; transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.5); color: white; border: none;
            padding: 0.5rem 1rem; font-size: 1.5rem; cursor: pointer; z-index: 10;
            border-radius: 5px; transition: background-color 0.2s ease;
        }
        .slider-arrow:hover { background-color: rgba(0, 0, 0, 0.8); }
        .slider-arrow.left { left: 10px; }
        .slider-arrow.right { right: 10px; }
        
        @media (max-width: 900px) {
            .info-section { grid-template-columns: 1fr; gap: 2rem; }
            .info-section:nth-of-type(even) .info-text,
            .info-section:nth-of-type(even) .slider-container { order: initial; }
            .page-header h1 { font-size: 2rem; }
            .slider-container { height: 300px; }
        }
    `;
    return <style>{css}</style>;
};

// --- Main Component ---
const KnowOurCity = () => {
    const ksrImages = [
        { url: 'https://placehold.co/800x600/0D47A1/FFFFFF?text=KSR+Main+Building', alt: 'KSR Main Building' },
        { url: 'https://placehold.co/800x600/0D47A1/FFFFFF?text=KSR+Library', alt: 'KSR Library' },
        { url: 'https://placehold.co/800x600/0D47A1/FFFFFF?text=KSR+Auditorium', alt: 'KSR Auditorium' },
    ];
    const tiruchengodeImages = [
        { url: 'https://placehold.co/800x600/F57C00/FFFFFF?text=Ardhanareeswarar+Temple', alt: 'Ardhanareeswarar Temple' },
        { url: 'https://placehold.co/800x600/F57C00/FFFFFF?text=View+from+the+Hilltop', alt: 'View from Tiruchengode hill' },
        { url: 'https://placehold.co/800x600/F57C00/FFFFFF?text=Local+Textile+Market', alt: 'Local Textile Market' },
    ];
    const intiImages = [
        { url: 'https://placehold.co/800x600/D32F2F/FFFFFF?text=INTI+Campus+Facade', alt: 'INTI Campus Facade' },
        { url: 'https://placehold.co/800x600/D32F2F/FFFFFF?text=INTI+Student+Plaza', alt: 'INTI Student Plaza' },
        { url: 'https://placehold.co/800x600/D32F2F/FFFFFF?text=INTI+Modern+Architecture', alt: 'INTI Modern Architecture' },
    ];
    const nilaiImages = [
        { url: 'https://placehold.co/800x600/1976D2/FFFFFF?text=Nilai+University+Town', alt: 'Vibrant university town of Nilai' },
        { url: 'https://placehold.co/800x600/1976D2/FFFFFF?text=Sepang+International+Circuit', alt: 'Sepang International Circuit' },
        { url: 'https://placehold.co/800x600/1976D2/FFFFFF?text=Multicultural+Cuisine', alt: 'Multicultural food in Nilai' },
    ];

    return (
        <>
            <Styles />
            <main>
                <header className="page-header">
                    <div className="container">
                        <h1>About Our Institutions & Locations</h1>
                    </div>
                </header>

                <div className="container">
                    <section className="info-section">
                        <div className="info-text">
                            <h2>Our Host: KSR College of Engineering</h2>
                            <p>
                                Founded in 2001 by the visionary Dr. K. S. Rangasamy, our host institution is a leading autonomous college dedicated to shaping the future of technology and management. With the highest 'A++' grade accreditation from NAAC, KSRCE stands as a benchmark for academic excellence. The campus is a self-contained ecosystem with state-of-the-art laboratories, advanced research centers, a vast central library, and outstanding sports facilities, all designed to provide a holistic and enriching learning experience for every student.
                            </p>
                        </div>
                        <ImageSlider images={ksrImages} />
                    </section>

                    <section className="info-section">
                        <div className="info-text">
                            <h2>Location: Tiruchengode, India</h2>
                            <p>
                                Our campus is located near Tiruchengode, a town that weaves a unique tapestry of ancient faith and modern commerce. It is globally renowned for the Ardhanareeswarar Temple, a historic hilltop shrine mentioned in classical literature. Beyond its spiritual significance, Tiruchengode is a major industrial hub, recognized as the "Borewell Capital of India" and a center for textile manufacturing. This dynamic environment provides a unique cultural backdrop for our conference, blending rich heritage with the spirit of innovation.
                            </p>
                        </div>
                        <ImageSlider images={tiruchengodeImages} />
                    </section>

                    <section className="info-section">
                        <div className="info-text">
                            <h2>Our Partner: INTI International University</h2>
                            <p>
                                INTI International University is one of Malaysia's most respected and established private universities, bringing a truly global perspective to our collaboration. Recognized in the QS World University Rankings, INTI is renowned for its strong industry links and career-focused education. The university's emphasis on internationalism, innovation, and 21st-century skills development ensures its graduates are highly sought after and prepared to make a seamless transition into the global workforce, making them leaders in their chosen fields.
                            </p>
                        </div>
                        <ImageSlider images={intiImages} />
                    </section>

                    <section className="info-section">
                        <div className="info-text">
                            <h2>Location: Nilai, Malaysia</h2>
                            <p>
                                INTI's flagship campus is situated in Nilai, a vibrant and modern township celebrated as the "Education Hub of Malaysia." Its strategic location offers easy access to Kuala Lumpur International Airport (KLIA) and the capital city. As a melting pot of cultures with a large international student community, Nilai boasts excellent amenities, diverse cuisine, and major shopping centers. Its proximity to world-class attractions like the Sepang International Circuit makes it an exciting and convenient destination for education and exploration.
                            </p>
                        </div>
                        <ImageSlider images={nilaiImages} />
                    </section>
                </div>
            </main>
        </>
    );
};

export default KnowOurCity;