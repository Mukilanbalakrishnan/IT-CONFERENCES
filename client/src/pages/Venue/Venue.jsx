import React, { useState } from 'react';
import '/src/App.css';
import './Venue.css';


const eventData = [
    {
        id: 'evt1',
        type: 'event', 
        name: 'Inauguration Ceremony',
        venue: 'KSR Auditorium',
        time: '09:30 AM',
        description: 'The official opening of the Global Summit 2025, featuring a welcome address by the Chairman and a traditional lamp lighting ceremony to mark the auspicious beginning of the conference.',
        image: 'https://placehold.co/600x400/0D47A1/FFFFFF?text=KSR+Auditorium',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.3821538239442!2d77.8316064585666!3d11.358322062973798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964017038dfe3%3A0xd5a68d71e9c1aec7!2sK%20S%20R%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1754895362135!5m2!1sen!2sin" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        id: 'evt2',
        type: 'event',
        name: 'Keynote by Dr. Maya Singh',
        venue: 'Main Conference Hall',
        time: '11:00 AM',
        description: 'A thought-provoking keynote address by renowned AI researcher Dr. Maya Singh on "The Future of Artificial Intelligence and its Impact on Society". This session will explore cutting-edge developments and ethical considerations.',
        image: 'https://placehold.co/600x400/F57C00/FFFFFF?text=Conference+Hall',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.3821538239442!2d77.8316064585666!3d11.358322062973798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964017038dfe3%3A0xd5a68d71e9c1aec7!2sK%20S%20R%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1754895362135!5m2!1sen!2sin" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
];

const hostelData = [
    { 
        id: 'hst1',
        type: 'hostel',
        name: "Cauvery Men's Hostel",
        description: "A well-furnished hostel for men with modern amenities, including Wi-Fi, recreational areas, and 24/7 security. Ensures a comfortable and safe stay for all residents.",
        breakfast: '7:30 - 8:30 AM', 
        lunch: '12:30 - 1:30 PM', 
        dinner: '7:30 - 8:30 PM', 
        image: 'https://placehold.co/600x400/1976D2/FFFFFF?text=Men%27s+Hostel',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.3821538239442!2d77.8316064585666!3d11.358322062973798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964017038dfe3%3A0xd5a68d71e9c1aec7!2sK%20S%20R%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1754895362135!5m2!1sen!2sin" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    { 
        id: 'hst2',
        type: 'hostel',
        name: "Bhavani Women's Hostel",
        description: "A secure and comfortable hostel for women, offering a pleasant living environment with all necessary facilities. The hostel is monitored round-the-clock to ensure student safety.",
        breakfast: '7:30 - 8:30 AM', 
        lunch: '12:30 - 1:30 PM', 
        dinner: '7:30 - 8:30 PM',
        image: 'https://placehold.co/600x400/D32F2F/FFFFFF?text=Women%27s+Hostel',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.3821538239442!2d77.8316064585666!3d11.358322062973798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964017038dfe3%3A0xd5a68d71e9c1aec7!2sK%20S%20R%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1754895362135!5m2!1sen!2sin" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
];

// --- Reusable Modal Component ---
const DetailModal = ({ item, onClose }) => {
    if (!item) return null;

    // Conditionally render content based on item type
    const isEvent = item.type === 'event';

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <img src={item.image} alt={item.name} className="modal-image" />
                <div className="modal-body">
                    <h3>{item.name}</h3>
                    {isEvent ? (
                        <p className="modal-meta"><strong>Venue:</strong> {item.venue} | <strong>Time:</strong> {item.time}</p>
                    ) : (
                        <p className="modal-meta"><strong>Dining:</strong> Breakfast, Lunch & Dinner Provided</p>
                    )}
                    <p>{item.description}</p>
                    <div className="modal-map" dangerouslySetInnerHTML={{ __html: item.map }}></div>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---
const VenueAccommodation = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleViewDetails = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <main>
                <div className="container">
                    <section id="venue" className="content-section">
                        <h2>Event Schedule</h2>
                        <div className="content-box">
                            <table className="info-table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Event Name</th>
                                        <th>Venue</th>
                                        <th>Time</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {eventData.map((event, index) => (
                                        <tr key={event.id}>
                                            <td>{index + 1}</td>
                                            <td>{event.name}</td>
                                            <td>{event.venue}</td>
                                            <td>{event.time}</td>
                                            <td>
                                                <button className="btn btn-details" onClick={() => handleViewDetails(event)}>
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="accommodation" className="content-section">
                        <h2>Hostel & Dining Information</h2>
                        <div className="content-box">
                            <table className="info-table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Hostel Name</th>
                                        <th>Breakfast</th>
                                        <th>Lunch</th>
                                        <th>Dinner</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hostelData.map((hostel, index) => (
                                        <tr key={hostel.id}>
                                            <td>{index + 1}</td>
                                            <td>{hostel.name}</td>
                                            <td>{hostel.breakfast}</td>
                                            <td>{hostel.lunch}</td>
                                            <td>{hostel.dinner}</td>
                                            <td>
                                                <button className="btn btn-details" onClick={() => handleViewDetails(hostel)}>
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>

            <DetailModal item={selectedItem} onClose={closeModal} />
        </>
    );
};

export default VenueAccommodation;