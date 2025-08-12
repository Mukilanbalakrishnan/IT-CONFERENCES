import React, { useState } from 'react';
import '../App.css';

// --- Data for the tables ---
// This data-driven approach makes the component easy to manage.
const eventData = [
    {
        id: 'evt1',
        type: 'event', // A type property to help the modal distinguish items
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

// --- Styles Component (No changes needed here) ---
const Styles = () => {
    const css = `
        /* All the previous CSS styles go here... */
        /* --- Animation Keyframes --- */ @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } /* --- Global Variables --- */ :root { --brand-orange: #F57C00; --brand-orange-dark: #E65100; --brand-blue-dark: #0D47A1; --brand-blue-primary: #1976D2; --brand-blue-light: #E3F2FD; --brand-red: #D32F2F; --text-primary: #111318; --text-secondary: #6c757d; --surface-light: #f8f9fa; --surface-dark: #e9ecef; --white: #FFFFFF; --page-max-width: 1200px; --gutter: 1.25rem; --radius: 12px; --shadow-soft: 0 6px 20px rgba(17, 19, 24, 0.06); --shadow-strong: 0 10px 30px rgba(17, 19, 24, 0.1); } .content-section { padding: 3rem 0; border-bottom: 1px solid var(--surface-dark); opacity: 0; animation: fadeInUp 0.7s ease-out forwards; } #venue { animation-delay: 0.2s; } #accommodation { animation-delay: 0.4s; } .content-section:last-child { border-bottom: none; } .content-section h2 { font-size: 2.2rem; font-weight: 700; color: var(--brand-blue-dark); margin-top: 0; margin-bottom: 2rem; text-align: center; } .content-box { background-color: var(--white); border: 1px solid var(--surface-dark); border-left: 4px solid var(--brand-orange); border-radius: var(--radius); box-shadow: var(--shadow-soft); padding: 1.5rem; overflow-x: auto; transition: transform 0.3s ease, box-shadow 0.3s ease; } .content-box:hover { transform: translateY(-5px); box-shadow: var(--shadow-strong); } .info-table { width: 100%; border-collapse: collapse; font-size: 0.95rem; } .info-table th, .info-table td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--surface-dark); vertical-align: middle; } .info-table th { background-color: var(--brand-blue-light); color: var(--brand-blue-dark); font-weight: 600; } .info-table tbody tr { transition: background-color 0.2s ease; } .info-table tbody tr:hover { background-color: var(--brand-blue-light); } .info-table td { color: var(--text-secondary); transition: color 0.2s ease; } .info-table td:nth-child(2) { color: var(--text-primary); font-weight: 500; } .info-table tbody tr:hover td { color: var(--text-primary); } .info-table th:last-child, .info-table td:last-child { text-align: center; } /* --- UNIFIED BUTTON STYLES --- */ .btn { display: inline-flex; align-items: center; justify-content: center; border: none; font-weight: 600; border-radius: 8px; cursor: pointer; text-decoration: none; transition: all 0.2s ease-in-out; } .btn:hover { transform: translateY(-2px); } .btn-details { padding: 0.5rem 1rem; font-size: 0.85rem; background-color: var(--brand-blue-primary); color: var(--white); box-shadow: 0 4px 12px rgba(25, 118, 210, 0.2); } .btn-details:hover { background-color: var(--brand-blue-dark); box-shadow: 0 6px 16px rgba(25, 118, 210, 0.3); transform: translateY(-1px) scale(1.05); } /* --- MODAL STYLES --- */ .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1rem; animation: fadeIn 0.3s ease; } .modal-content { background: var(--white); border-radius: var(--radius); box-shadow: 0 10px 40px rgba(0,0,0,0.2); width: 100%; max-width: 700px; max-height: 90vh; overflow-y: auto; position: relative; } .modal-close-btn { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 2.5rem; color: var(--text-secondary); cursor: pointer; line-height: 1; } .modal-image { width: 100%; height: 300px; object-fit: cover; border-radius: var(--radius) var(--radius) 0 0; } .modal-body { padding: 1.5rem 2rem 2rem; } .modal-body h3 { font-size: 1.8rem; color: var(--brand-blue-dark); margin: 0 0 0.5rem; } .modal-meta { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem; } .modal-map { margin-top: 1.5rem; border-radius: var(--radius); overflow: hidden; }
    `;
    return <style>{css}</style>;
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
            <Styles />
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