
import React, { useState } from 'react';
import './Venue.css'; // Import the new stylesheet

const eventData = [
    {
        id: 'evt1',
        type: 'event',
        name: 'Inauguration Ceremony',
        venue: 'KSR Auditorium',
        time: '09:30 AM',
        description: 'The official opening of the Global Summit 2025, featuring a welcome address by the Chairman.',
        image: 'https://placehold.co/600x400/0D47A1/FFFFFF?text=KSR+Auditorium',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.3821538239442!2d77.8316064585666!3d11.358322062973798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964017038dfe3%3A0xd5a68d71e9c1aec7!2sK%20S%20R%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1754895362135!5m2!1sen!2sin" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    {
        id: 'evt2',
        type: 'event',
        name: 'Keynote by Dr. Maya Singh',
        venue: 'Main Conference Hall',
        time: '11:00 AM',
        description: 'A thought-provoking keynote address by renowned AI researcher Dr. Maya Singh.',
        image: 'https://placehold.co/600x400/F57C00/FFFFFF?text=Conference+Hall',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.3821538239442!2d77.8316064585666!3d11.358322062973798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964017038dfe3%3A0xd5a68d71e9c1aec7!2sK%20S%20R%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1754895362135!5m2!1sen!2sin" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
];

const hostelData = [
    {
        id: 'hst1',
        type: 'hostel',
        name: "Cauvery Men's Hostel",
        description: "A well-furnished hostel for men with modern amenities, including Wi-Fi and 24/7 security.",
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
        description: "A secure and comfortable hostel for women, offering a pleasant living environment.",
        breakfast: '7:30 - 8:30 AM',
        lunch: '12:30 - 1:30 PM',
        dinner: '7:30 - 8:30 PM',
        image: 'https://placehold.co/600x400/D32F2F/FFFFFF?text=Women%27s+Hostel',
        map: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d412.3821538239442!2d77.8316064585666!3d11.358322062973798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba964017038dfe3%3A0xd5a68d71e9c1aec7!2sK%20S%20R%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1754895362135!5m2!1sen!2sin" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
];

// Reusable Modal Component
const DetailModal = ({ item, onClose }) => {
    if (!item) return null;
    const isEvent = item.type === 'event';
    return (
        <div className="venue-modal-overlay" onClick={onClose}>
            <div className="venue-modal-content" onClick={e => e.stopPropagation()}>
                <button className="venue-modal-close-btn" onClick={onClose}>×</button>
                <img src={item.image} alt={item.name} className="venue-modal-image" />
                <div className="venue-modal-body">
                    <h3>{item.name}</h3>
                    {isEvent ? (
                        <p className="venue-modal-meta"><strong>Venue:</strong> {item.venue} | <strong>Time:</strong> {item.time}</p>
                    ) : (
                        <p className="venue-modal-meta"><strong>Dining:</strong> Breakfast, Lunch & Dinner Provided</p>
                    )}
                    <p>{item.description}</p>
                    <div className="venue-modal-map" dangerouslySetInnerHTML={{ __html: item.map }}></div>
                </div>
            </div>
        </div>
    );
};


const Venue = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <>
            <main className="venue-page">
                <section id="venue" className="content-section">
                    <h2>Event Schedule</h2>
                    <div className="content-box">
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>Event Name</th>
                                    <th>Venue</th>
                                    <th>Time</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventData.map((event) => (
                                    <tr key={event.id}>
                                        <td data-label="Event Name">{event.name}</td>
                                        <td data-label="Venue">{event.venue}</td>
                                        <td data-label="Time">{event.time}</td>
                                        <td data-label="Action">
                                            <button className="btn btn-details" onClick={() => setSelectedItem(event)}>
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
                    <h2>Hostel & Dining</h2>
                     <div className="content-box">
                        <table className="info-table">
                            <thead>
                                <tr>
                                    <th>Hostel Name</th>
                                    <th>Breakfast</th>
                                    <th>Lunch</th>
                                    <th>Dinner</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hostelData.map((hostel) => (
                                    <tr key={hostel.id}>
                                        <td data-label="Hostel Name">{hostel.name}</td>
                                        <td data-label="Breakfast">{hostel.breakfast}</td>
                                        <td data-label="Lunch">{hostel.lunch}</td>
                                        <td data-label="Dinner">{hostel.dinner}</td>
                                        <td data-label="Action">
                                            <button className="btn btn-details" onClick={() => setSelectedItem(hostel)}>
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
            <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        </>
    );
};

export default Venue;
