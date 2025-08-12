// import React from 'react';

// const tracksData = [
//     {
//         title: 'Electrical Engineering',
//         summary: 'Innovative and sustainable smart technologies covering smart grids, renewable energy, and electric vehicles.',
//         icon: '⚡',
//         borderColor: 'border-[#646cff]', // Your primary color
//         bgColor: 'bg-[#646cff]/5', // Very light tint of primary
//         buttonColor: 'bg-[#646cff] hover:bg-[#5158cc]', // Primary + darker hover
//         textColor: 'text-[#646cff]' // Primary for text accents
//     },
//     {
//         title: 'Communication Engineering',
//         summary: 'Next-gen communication systems including 5G/6G networks, IoT sensors, and AI for network optimization.',
//         icon: '📡',
//         borderColor: 'border-[#61dafb]', // Complementary blue
//         bgColor: 'bg-[#61dafb]/5',
//         buttonColor: 'bg-[#61dafb] hover:bg-[#4fb8d8]',
//         textColor: 'text-[#61dafb]'
//     },
//     {
//         title: 'Biomedical Engineering',
//         summary: 'Smart healthcare solutions with wearable monitors, AI diagnostics, and green medical materials.',
//         icon: '🩺',
//         borderColor: 'border-[#ff6b6b]', // Vibrant coral
//         bgColor: 'bg-[#ff6b6b]/5',
//         buttonColor: 'bg-[#ff6b6b] hover:bg-[#e05555]',
//         textColor: 'text-[#ff6b6b]'
//     },
//     {
//         title: 'Computer Science & Multidisciplinary',
//         summary: 'Sustainable computing with energy-efficient algorithms, AI, and IoT systems for smart solutions.',
//         icon: '💻',
//         borderColor: 'border-[#9c6cff]', // Purple variant
//         bgColor: 'bg-[#9c6cff]/5',
//         buttonColor: 'bg-[#9c6cff] hover:bg-[#8a5ae8]',
//         textColor: 'text-[#9c6cff]'
//     }
// ];

// const Tracks = () => {
//     return (
//         <div className="min-h-screen py-16 flex items-center justify-center bg-gradient-to-b from-[#f8f9ff] to-[#eef0ff]">
//             <div className="container mx-auto max-w-7xl px-6">
//                 {/* Header with your color palette */}
//                 <div className="text-center mb-16">
//                     <span className="text-sm uppercase tracking-wider text-[#646cff] font-medium mb-2 inline-block">
//                         2024 Conference
//                     </span>
//                     <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
//                         Technical Tracks
//                     </h1>
//                     <div className="w-24 h-1 bg-gradient-to-r from-[#646cff] to-[#61dafb] mx-auto"></div>
//                 </div>
                
//                 {/* Vibrant track cards with distinct colors */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
//                     {tracksData.map((track, index) => (
//                         <div
//                             key={index}
//                             className={`relative group border-t-4 ${track.borderColor} ${track.bgColor} p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-lg`}
//                         >
//                             {/* Track header with icon */}
//                             <div className="flex items-center mb-4">
//                                 <span className={`text-3xl mr-3 ${track.textColor}`}>{track.icon}</span>
//                                 <span className={`text-sm uppercase tracking-wider ${track.textColor} font-medium`}>
//                                     Track 0{index + 1}
//                                 </span>
//                             </div>
                            
//                             {/* Track title */}
//                             <h2 className={`text-2xl font-bold text-slate-800 mb-4 leading-tight`}>
//                                 {track.title}
//                             </h2>
                            
//                             {/* Summary */}
//                             <p className="text-slate-600 mb-6 leading-relaxed">
//                                 {track.summary}
//                             </p>
                            
//                             {/* Color-coordinated buttons */}
//                             <div className="flex flex-wrap gap-3">
//                                 <a
//                                     href={`#/register?track=${index + 1}`}
//                                     className={`px-5 py-2.5 text-sm font-medium text-white ${track.buttonColor} transition-colors rounded-md flex items-center shadow-md hover:shadow-lg`}
//                                 >
//                                     Register Now
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                     </svg>
//                                 </a>

//                                 <a
//                                     href="#"
//                                     className={`px-5 py-2.5 text-sm font-medium ${track.textColor} hover:${track.textColor}/80 transition-colors border ${track.borderColor} hover:border-${track.borderColor}/80 rounded-md flex items-center bg-white/50`}
//                                 >
//                                     View Sessions
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                     </svg>
//                                 </a>
//                             </div>
                            
//                             {/* Decorative element */}
//                             <div className={`absolute bottom-0 right-0 w-16 h-16 rounded-tl-full ${track.bgColor.replace('5', '10')} opacity-30`}></div>
//                         </div>
//                     ))}
//                 </div>
                
//                 {/* Call-to-action section */}
//                 <div className="mt-16 text-center bg-white/50 p-8 rounded-xl border border-slate-200">
//                     <h3 className="text-xl font-bold text-slate-800 mb-3">Ready to Join?</h3>
//                     <p className="text-slate-600 max-w-2xl mx-auto mb-6">
//                         Explore all tracks and register today to secure your spot at the premier engineering conference of the year.
//                     </p>
//                     <a 
//                         href="#" 
//                         className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#646cff] to-[#61dafb] text-white font-medium rounded-md shadow-lg hover:shadow-xl transition-all"
//                     >
//                         View Full Program
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
//                         </svg>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tracks;

// import React from 'react';

// const tracksData = [
//     {
//         title: 'Track 1: Electrical Engineering',
//         summary: 'Focuses on innovative and sustainable smart technologies, covering everything from smart grids and renewable energy to electrical machine drives and electric vehicles.',
//         color: 'from-indigo-900 to-indigo-700'
//     },
//     {
//         title: 'Track 2: Communication Engineering',
//         summary: 'Explores next-generation communication systems, including energy-efficient 5G/6G networks, smart IoT sensors, and the use of AI for network optimization and security.',
//         color: 'from-teal-800 to-teal-600'
//     },
//     {
//         title: 'Track 3: Biomedical Engineering',
//         summary: 'Presents smart, sustainable solutions for healthcare, such as energy-efficient devices, wearable health monitors, AI-driven diagnostics, and green materials for medical applications.',
//         color: 'from-amber-800 to-amber-600'
//     },
//     {
//         title: 'Track 4: Computer Science & Multidisciplinary Applications',
//         summary: 'Covers sustainable computing, from energy-efficient algorithms and AI for societal impact to green cloud computing and IoT systems for a wide range of smart solutions.',
//         color: 'from-slate-800 to-slate-600'
//     }
// ];

// const Tracks = () => {
//     return (
//         <div className="min-h-screen p-8 flex items-center justify-center bg-slate-50">
//             <div className="container mx-auto max-w-7xl px-4">
//                 {/* Formal heading with serif font */}
//                 <div className="text-center mb-16">
//                     <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-4 tracking-tight">
//                         Conference Tracks
//                     </h1>
//                     <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     {tracksData.map((track, index) => (
//                         <div
//                             key={index}
//                             className={`relative group rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg`}
//                         >
//                             {/* Card with elegant border */}
//                             <div className="border-l-4 border-amber-500 bg-white p-8 h-full">
//                                 {/* Track title with formal typography */}
//                                 <h2 className={`text-2xl font-serif font-bold text-slate-800 mb-4 leading-tight`}>
//                                     {track.title}
//                                 </h2>
                                
//                                 {/* Summary with readable sans-serif font */}
//                                 <p className="text-slate-600 mb-6 font-sans leading-relaxed">
//                                     {track.summary}
//                                 </p>
                                
//                                 {/* Button container */}
//                                 <div className="flex space-x-4 mt-6">
//                                     <a
//                                         href={`#/register?track=${index + 1}`}
//                                         className={`bg-gradient-to-r ${track.color} text-white font-medium py-2.5 px-6 rounded-sm shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110`}
//                                     >
//                                         Register Now
//                                     </a>

//                                     <a
//                                         href="#"
//                                         className="border border-slate-300 text-slate-700 font-medium py-2.5 px-6 rounded-sm transition-all duration-200 hover:bg-slate-50 hover:border-slate-400"
//                                     >
//                                         View Details
//                                     </a>
//                                 </div>
//                             </div>
                            
//                             {/* Subtle hover effect */}
//                             <div className={`absolute inset-0 bg-gradient-to-r ${track.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tracks;


// import React from 'react';

// const tracksData = [
//     {
//         title: 'Electrical Engineering',
//         summary: 'Innovative and sustainable smart technologies covering smart grids, renewable energy, and electric vehicles.',
//         icon: '⚡', // Lightning bolt emoji
//         color: 'border-indigo-600',
//         bgColor: 'bg-indigo-50'
//     },
//     {
//         title: 'Communication Engineering',
//         summary: 'Next-gen communication systems including 5G/6G networks, IoT sensors, and AI for network optimization.',
//         icon: '📡', // Satellite emoji
//         color: 'border-teal-600',
//         bgColor: 'bg-teal-50'
//     },
//     {
//         title: 'Biomedical Engineering',
//         summary: 'Smart healthcare solutions with wearable monitors, AI diagnostics, and green medical materials.',
//         icon: '🩺', // Stethoscope emoji
//         color: 'border-amber-600',
//         bgColor: 'bg-amber-50'
//     },
//     {
//         title: 'Computer Science & Multidisciplinary',
//         summary: 'Sustainable computing with energy-efficient algorithms, AI, and IoT systems for smart solutions.',
//         icon: '💻', // Computer emoji
//         color: 'border-slate-600',
//         bgColor: 'bg-slate-50'
//     }
// ];

// const Tracks = () => {
//     return (
//         <div className="min-h-screen py-16 flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
//             <div className="container mx-auto max-w-7xl px-6">
//                 {/* Enhanced Header with Conference Year */}
//                 <div className="text-center mb-16">
//                     <span className="text-sm uppercase tracking-wider text-amber-600 font-medium mb-2 inline-block">
//                         2024 Conference
//                     </span>
//                     <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-4 tracking-tight">
//                         Technical Tracks
//                     </h1>
//                     <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto"></div>
//                 </div>
                
//                 {/* Grid with Featured Track Highlight Option */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
//                     {tracksData.map((track, index) => (
//                         <div
//                             key={index}
//                             className={`relative group border-t-4 ${track.color} ${track.bgColor} p-8 transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
//                         >
//                             {/* Track Icon and Number */}
//                             <div className="flex items-center mb-4">
//                                 <span className="text-3xl mr-3">{track.icon}</span>
//                                 <span className="text-sm uppercase tracking-wider text-slate-500 font-medium">
//                                     Track 0{index + 1}
//                                 </span>
//                             </div>
                            
//                             {/* Track Title */}
//                             <h2 className={`text-2xl font-serif font-bold text-slate-800 mb-4 leading-tight`}>
//                                 {track.title}
//                             </h2>
                            
//                             {/* Summary */}
//                             <p className="text-slate-600 mb-6 font-sans leading-relaxed">
//                                 {track.summary}
//                             </p>
                            
//                             {/* Enhanced Action Buttons */}
//                             <div className="flex flex-wrap gap-3">
//                                 <a
//                                     href={`#/register?track=${index + 1}`}
//                                     className={`px-5 py-2.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-800 flex items-center`}
//                                 >
//                                     Register Now
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                     </svg>
//                                 </a>

//                                 <a
//                                     href="#"
//                                     className="px-5 py-2.5 text-sm font-medium text-slate-800 hover:text-slate-900 transition-colors border border-slate-300 hover:border-slate-400 flex items-center"
//                                 >
//                                     View Speakers
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                                     </svg>
//                                 </a>
//                             </div>
                            
//                             {/* Optional: Track Chair Badge */}
//                             <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
//                                 Chair: Dr. Smith
//                             </div>
//                         </div>
//                     ))}
//                 </div>
                
//                 {/* Additional Conference Information */}
//                 <div className="mt-16 text-center">
//                     <h3 className="font-serif text-xl text-slate-700 mb-4">Cross-Track Sessions Available</h3>
//                     <p className="text-slate-600 max-w-3xl mx-auto mb-6">
//                         Explore interdisciplinary topics through our special cross-track sessions combining multiple technical domains.
//                     </p>
//                     <a href="#" className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium">
//                         View Full Program Schedule
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                         </svg>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tracks;


// import React from 'react';

// const tracksData = [
//     {
//         title: 'Track 1: Electrical Engineering',
//         summary: 'Focuses on innovative and sustainable smart technologies, covering everything from smart grids and renewable energy to electrical machine drives and electric vehicles.',
//         color: {
//             primary: 'from-indigo-700 to-violet-600',
//             border: 'border-indigo-500',
//             text: 'text-indigo-700',
//             hover: 'hover:from-indigo-600 hover:to-violet-500'
//         }
//     },
//     {
//         title: 'Track 2: Communication Engineering',
//         summary: 'Explores next-generation communication systems, including energy-efficient 5G/6G networks, smart IoT sensors, and the use of AI for network optimization and security.',
//         color: {
//             primary: 'from-teal-600 to-cyan-500',
//             border: 'border-teal-400',
//             text: 'text-teal-700',
//             hover: 'hover:from-teal-500 hover:to-cyan-400'
//         }
//     },
//     {
//         title: 'Track 3: Biomedical Engineering',
//         summary: 'Presents smart, sustainable solutions for healthcare, such as energy-efficient devices, wearable health monitors, AI-driven diagnostics, and green materials for medical applications.',
//         color: {
//             primary: 'from-amber-600 to-orange-500',
//             border: 'border-amber-400',
//             text: 'text-amber-700',
//             hover: 'hover:from-amber-500 hover:to-orange-400'
//         }
//     },
//     {
//         title: 'Track 4: Computer Science & Multidisciplinary Applications',
//         summary: 'Covers sustainable computing, from energy-efficient algorithms and AI for societal impact to green cloud computing and IoT systems for a wide range of smart solutions.',
//         color: {
//             primary: 'from-slate-600 to-gray-500',
//             border: 'border-slate-400',
//             text: 'text-slate-700',
//             hover: 'hover:from-slate-500 hover:to-gray-400'
//         }
//     }
// ];

// const Tracks = () => {
//     return (
//         <div className="min-h-screen p-8 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
//             <div className="container mx-auto max-w-7xl px-4">
//                 {/* Enhanced heading with gradient text */}
//                 <div className="text-center mb-16">
//                     <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-amber-500 mb-4 tracking-tight">
//                         Conference Tracks
//                     </h1>
//                     <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-amber-400 mx-auto rounded-full"></div>
//                 </div>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     {tracksData.map((track, index) => (
//                         <div
//                             key={index}
//                             className={`relative group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
//                         >
//                             {/* Card with elegant border and subtle gradient overlay */}
//                             <div className={`border-l-4 ${track.color.border} bg-white p-8 h-full relative z-10`}>
//                                 {/* Track title with color-coordinated text */}
//                                 <h2 className={`text-2xl font-serif font-bold ${track.color.text} mb-4 leading-tight`}>
//                                     {track.title}
//                                 </h2>
                                
//                                 {/* Summary text */}
//                                 <p className="text-slate-600 mb-6 font-sans leading-relaxed">
//                                     {track.summary}
//                                 </p>
                                
//                                 {/* Button container */}
//                                 <div className="flex space-x-4 mt-6">
//                                     <a
//                                         href={`#/register?track=${index + 1}`}
//                                         className={`bg-gradient-to-r ${track.color.primary} ${track.color.hover} text-white font-medium py-2.5 px-6 rounded-md shadow-md transition-all duration-300 transform hover:scale-[1.02]`}
//                                     >
//                                         Register Now
//                                     </a>

//                                     <a
//                                         href="#"
//                                         className={`border ${track.color.border} ${track.color.text} bg-white font-medium py-2.5 px-6 rounded-md transition-all duration-300 hover:bg-opacity-10 hover:bg-${track.color.text.split('-')[1]}-100`}
//                                     >
//                                         View Details
//                                     </a>
//                                 </div>
//                             </div>
                            
//                             {/* Animated gradient overlay */}
//                             <div className={`absolute inset-0 bg-gradient-to-r ${track.color.primary} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
                            
//                             {/* Decorative corner */}
//                             <div className={`absolute bottom-0 right-0 w-16 h-16 rounded-tl-full ${track.color.border} opacity-10`}></div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tracks;

// import React from 'react';

// const tracksData = [
//     {
//         title: 'Electrical Engineering',
//         summary: 'Innovative and sustainable smart technologies covering smart grids, renewable energy, and electric vehicles.',
//         icon: '⚡',
//         borderColor: 'border-[#646cff]',
//         bgColor: 'bg-[#646cff]/5',
//         buttonColor: 'bg-[#646cff] hover:bg-[#5158cc]',
//         textColor: 'text-[#646cff]',
//         speakers: [
//             { name: 'Dr. Sarah Chen', affiliation: 'MIT' },
//             { name: 'Prof. James Wilson', affiliation: 'Stanford' }
//         ],
//         sessions: 12,
//         papers: 45
//     },
//     {
//         title: 'Communication Engineering',
//         summary: 'Next-gen communication systems including 5G/6G networks, IoT sensors, and AI for network optimization.',
//         icon: '📡',
//         borderColor: 'border-[#61dafb]',
//         bgColor: 'bg-[#61dafb]/5',
//         buttonColor: 'bg-[#61dafb] hover:bg-[#4fb8d8]',
//         textColor: 'text-[#61dafb]',
//         speakers: [
//             { name: 'Dr. Amina Khan', affiliation: 'ETH Zurich' },
//             { name: 'Prof. Michael Brown', affiliation: 'Cambridge' }
//         ],
//         sessions: 9,
//         papers: 38
//     },
//     {
//         title: 'Biomedical Engineering',
//         summary: 'Smart healthcare solutions with wearable monitors, AI diagnostics, and green medical materials.',
//         icon: '🩺',
//         borderColor: 'border-[#ff6b6b]',
//         bgColor: 'bg-[#ff6b6b]/5',
//         buttonColor: 'bg-[#ff6b6b] hover:bg-[#e05555]',
//         textColor: 'text-[#ff6b6b]',
//         speakers: [
//             { name: 'Dr. Elena Rodriguez', affiliation: 'Johns Hopkins' },
//             { name: 'Prof. David Kim', affiliation: 'Harvard' }
//         ],
//         sessions: 11,
//         papers: 42
//     },
//     {
//         title: 'Computer Science & Multidisciplinary',
//         summary: 'Sustainable computing with energy-efficient algorithms, AI, and IoT systems for smart solutions.',
//         icon: '💻',
//         borderColor: 'border-[#9c6cff]',
//         bgColor: 'bg-[#9c6cff]/5',
//         buttonColor: 'bg-[#9c6cff] hover:bg-[#8a5ae8]',
//         textColor: 'text-[#9c6cff]',
//         speakers: [
//             { name: 'Dr. Thomas Müller', affiliation: 'TU Munich' },
//             { name: 'Prof. Li Wei', affiliation: 'Tsinghua' }
//         ],
//         sessions: 14,
//         papers: 51
//     }
// ];

// const Tracks = () => {
//     return (
//         <div className="min-h-screen py-16 flex items-center justify-center bg-gradient-to-b from-[#f8f9ff] to-[#eef0ff]">
//             <div className="container mx-auto max-w-7xl px-6">
//                 {/* Enhanced Header */}
//                 <div className="text-center mb-16">
//                     <span className="text-sm uppercase tracking-wider text-[#646cff] font-medium mb-2 inline-block">
//                         2024 International Engineering Conference
//                     </span>
//                     <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
//                         Technical Tracks
//                     </h1>
//                     <div className="w-24 h-1 bg-gradient-to-r from-[#646cff] to-[#61dafb] mx-auto rounded-full"></div>
//                 </div>
                
//                 {/* Track Cards with Enhanced Features */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
//                     {tracksData.map((track, index) => (
//                         <div
//                             key={index}
//                             className={`relative group border-t-4 ${track.borderColor} ${track.bgColor} p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-lg overflow-hidden`}
//                         >
//                             {/* Track Header with Icon and Stats */}
//                             <div className="flex justify-between items-start mb-4">
//                                 <div className="flex items-center">
//                                     <span className={`text-3xl mr-3 ${track.textColor}`}>{track.icon}</span>
//                                     <span className={`text-sm uppercase tracking-wider ${track.textColor} font-medium`}>
//                                         Track 0{index + 1}
//                                     </span>
//                                 </div>
//                                 <div className="flex space-x-3">
//                                     <span className="text-xs bg-white/80 px-2 py-1 rounded-full shadow-sm text-slate-600">
//                                         {track.sessions} sessions
//                                     </span>
//                                     <span className="text-xs bg-white/80 px-2 py-1 rounded-full shadow-sm text-slate-600">
//                                         {track.papers} papers
//                                     </span>
//                                 </div>
//                             </div>
                            
//                             {/* Track Title */}
//                             <h2 className={`text-2xl font-bold text-slate-800 mb-4 leading-tight`}>
//                                 {track.title}
//                             </h2>
                            
//                             {/* Track Summary */}
//                             <p className="text-slate-600 mb-6 leading-relaxed">
//                                 {track.summary}
//                             </p>
                            
//                             {/* Featured Speakers */}
//                             <div className="mb-6">
//                                 <h3 className="text-sm font-medium text-slate-500 mb-2">Featured Speakers:</h3>
//                                 <div className="space-y-2">
//                                     {track.speakers.map((speaker, i) => (
//                                         <div key={i} className="flex items-center">
//                                             <div className={`w-2 h-2 rounded-full ${track.bgColor.replace('5', '100')} mr-2`}></div>
//                                             <span className="text-sm font-medium text-slate-700">{speaker.name}</span>
//                                             <span className="text-xs text-slate-500 ml-2">({speaker.affiliation})</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
                            
//                             {/* Action Buttons */}
//                             <div className="flex flex-wrap gap-3">
//                                 <button
//                                     onClick={() => console.log(`Register for ${track.title}`)}
//                                     className={`px-5 py-2.5 text-sm font-medium text-white ${track.buttonColor} transition-all rounded-md flex items-center shadow-md hover:shadow-lg group-hover:scale-[1.02]`}
//                                 >
//                                     Register Now
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                                     </svg>
//                                 </button>

//                                 <button
//                                     onClick={() => console.log(`View sessions for ${track.title}`)}
//                                     className={`px-5 py-2.5 text-sm font-medium ${track.textColor} hover:${track.textColor}/80 transition-colors border ${track.borderColor} hover:border-${track.borderColor}/80 rounded-md flex items-center bg-white/50 hover:bg-white/70`}
//                                 >
//                                     View Sessions
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                     </svg>
//                                 </button>
//                             </div>
                            
//                             {/* Decorative Elements */}
//                             <div className={`absolute bottom-0 right-0 w-16 h-16 rounded-tl-full ${track.bgColor.replace('5', '10')} opacity-30`}></div>
//                             <div className={`absolute top-4 right-4 text-6xl opacity-5 ${track.textColor} -z-0`}>{track.icon}</div>
//                         </div>
//                     ))}
//                 </div>
                
//                 {/* Enhanced Call-to-Action */}
//                 <div className="mt-16 text-center bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
//                     <div className="max-w-2xl mx-auto">
//                         <h3 className="text-2xl font-bold text-slate-800 mb-4">Join the Premier Engineering Conference of 2024</h3>
//                         <p className="text-slate-600 mb-6">
//                             Network with {tracksData.reduce((sum, track) => sum + track.speakers.length, 0)} leading experts across {tracksData.length} technical tracks featuring {tracksData.reduce((sum, track) => sum + track.sessions, 0)} sessions and {tracksData.reduce((sum, track) => sum + track.papers, 0)} research papers.
//                         </p>
//                         <div className="flex flex-wrap justify-center gap-4">
//                             <button 
//                                 onClick={() => console.log("View full program")}
//                                 className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#646cff] to-[#61dafb] text-white font-medium rounded-md shadow-lg hover:shadow-xl transition-all"
//                             >
//                                 View Full Program
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//                                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
//                                 </svg>
//                             </button>
//                             <button 
//                                 onClick={() => console.log("View keynote speakers")}
//                                 className="inline-flex items-center px-6 py-3 border border-slate-300 text-slate-700 font-medium rounded-md shadow-sm hover:bg-slate-50 transition-all"
//                             >
//                                 Keynote Speakers
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
//                                     <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Tracks;


import React from 'react';

const tracksData = [
    {
        title: 'Electrical Engineering',
        summary: 'Innovative and sustainable smart technologies covering smart grids, renewable energy, and electric vehicles.',
        icon: '⚡',
        borderColor: 'border-[#1976D2]',
        bgColor: 'bg-[#E3F2FD]',
        buttonColor: 'bg-[#1976D2] hover:bg-[#0D47A1]',
        textColor: 'text-[#1976D2]',
        speakers: [
            { name: 'Dr. Sarah Chen', affiliation: 'MIT' },
            { name: 'Prof. James Wilson', affiliation: 'Stanford' }
        ],
        sessions: 12,
        papers: 45
    },
    {
        title: 'Communication Engineering',
        summary: 'Next-gen communication systems including 5G/6G networks, IoT sensors, and AI for network optimization.',
        icon: '📡',
        borderColor: 'border-[#F57C00]',
        bgColor: 'bg-[#F57C00]/10',
        buttonColor: 'bg-[#F57C00] hover:bg-[#E65100]',
        textColor: 'text-[#F57C00]',
        speakers: [
            { name: 'Dr. Amina Khan', affiliation: 'ETH Zurich' },
            { name: 'Prof. Michael Brown', affiliation: 'Cambridge' }
        ],
        sessions: 9,
        papers: 38
    },
    {
        title: 'Biomedical Engineering',
        summary: 'Smart healthcare solutions with wearable monitors, AI diagnostics, and green medical materials.',
        icon: '🩺',
        borderColor: 'border-[#D32F2F]',
        bgColor: 'bg-[#D32F2F]/10',
        buttonColor: 'bg-[#D32F2F] hover:bg-[#B71C1C]',
        textColor: 'text-[#D32F2F]',
        speakers: [
            { name: 'Dr. Elena Rodriguez', affiliation: 'Johns Hopkins' },
            { name: 'Prof. David Kim', affiliation: 'Harvard' }
        ],
        sessions: 11,
        papers: 42
    },
    {
        title: 'Computer Science & Multidisciplinary',
        summary: 'Sustainable computing with energy-efficient algorithms, AI, and IoT systems for smart solutions.',
        icon: '💻',
        borderColor: 'border-[#0D47A1]',
        bgColor: 'bg-[#0D47A1]/10',
        buttonColor: 'bg-[#0D47A1] hover:bg-[#082b63]',
        textColor: 'text-[#0D47A1]',
        speakers: [
            { name: 'Dr. Thomas Müller', affiliation: 'TU Munich' },
            { name: 'Prof. Li Wei', affiliation: 'Tsinghua' }
        ],
        sessions: 14,
        papers: 51
    }
];

const Tracks = () => {
    return (
        <div className="min-h-screen py-16 flex items-center justify-center bg-[#f8f9fa]">
            <div className="container mx-auto max-w-7xl px-6">
                {/* Enhanced Header */}
                <div className="text-center mb-16">
                    <span className="text-sm uppercase tracking-wider text-[#F57C00] font-medium mb-2 inline-block">
                        2024 International Engineering Conference
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#111318] mb-4 tracking-tight">
                        Technical Tracks
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#F57C00] to-[#1976D2] mx-auto rounded-full"></div>
                </div>
                
                {/* Track Cards with Enhanced Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                    {tracksData.map((track, index) => (
                        <div
                            key={index}
                            className={`relative group border-t-4 ${track.borderColor} ${track.bgColor} p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-lg overflow-hidden`}
                        >
                            {/* Track Header with Icon and Stats */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center">
                                    <span className={`text-3xl mr-3 ${track.textColor}`}>{track.icon}</span>
                                    <span className={`text-sm uppercase tracking-wider ${track.textColor} font-medium`}>
                                        Track 0{index + 1}
                                    </span>
                                </div>
                                <div className="flex space-x-3">
                                    <span className="text-xs bg-white/80 px-2 py-1 rounded-full shadow-sm text-[#6c757d]">
                                        {track.sessions} sessions
                                    </span>
                                    <span className="text-xs bg-white/80 px-2 py-1 rounded-full shadow-sm text-[#6c757d]">
                                        {track.papers} papers
                                    </span>
                                </div>
                            </div>
                            
                            {/* Track Title */}
                            <h2 className={`text-2xl font-bold text-[#111318] mb-4 leading-tight`}>
                                {track.title}
                            </h2>
                            
                            {/* Track Summary */}
                            <p className="text-[#6c757d] mb-6 leading-relaxed">
                                {track.summary}
                            </p>
                            
                            {/* Featured Speakers */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-[#6c757d] mb-2">Featured Speakers:</h3>
                                <div className="space-y-2">
                                    {track.speakers.map((speaker, i) => (
                                        <div key={i} className="flex items-center">
                                            <div className={`w-2 h-2 rounded-full ${track.bgColor.replace('10', '100')} mr-2`}></div>
                                            <span className="text-sm font-medium text-[#111318]">{speaker.name}</span>
                                            <span className="text-xs text-[#6c757d] ml-2">({speaker.affiliation})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => console.log(`Register for ${track.title}`)}
                                    className={`px-5 py-2.5 text-sm font-medium text-white ${track.buttonColor} transition-all rounded-md flex items-center shadow-md hover:shadow-lg group-hover:scale-[1.02]`}
                                >
                                    Register Now
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>

                                <button
                                    onClick={() => console.log(`View sessions for ${track.title}`)}
                                    className={`px-5 py-2.5 text-sm font-medium ${track.textColor} hover:opacity-80 transition-colors border ${track.borderColor} hover:border-opacity-80 rounded-md flex items-center bg-white/50 hover:bg-white/70`}
                                >
                                    View Sessions
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Decorative Elements */}
                            <div className={`absolute bottom-0 right-0 w-16 h-16 rounded-tl-full ${track.bgColor.replace('10', '20')} opacity-30`}></div>
                            <div className={`absolute top-4 right-4 text-6xl opacity-5 ${track.textColor} -z-0`}>{track.icon}</div>
                        </div>
                    ))}
                </div>
                
                {/* Enhanced Call-to-Action */}
                <div className="mt-16 text-center bg-white p-8 rounded-xl border border-[#e9ecef] shadow-sm">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-[#111318] mb-4">Join the Premier Engineering Conference of 2024</h3>
                        <p className="text-[#6c757d] mb-6">
                            Network with {tracksData.reduce((sum, track) => sum + track.speakers.length, 0)} leading experts across {tracksData.length} technical tracks featuring {tracksData.reduce((sum, track) => sum + track.sessions, 0)} sessions and {tracksData.reduce((sum, track) => sum + track.papers, 0)} research papers.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button 
                                onClick={() => console.log("View full program")}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#F57C00] to-[#1976D2] text-white font-medium rounded-md shadow-lg hover:shadow-xl transition-all"
                            >
                                View Full Program
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button 
                                onClick={() => console.log("View keynote speakers")}
                                className="inline-flex items-center px-6 py-3 border border-[#e9ecef] text-[#111318] font-medium rounded-md shadow-sm hover:bg-[#f8f9fa] transition-all"
                            >
                                Keynote Speakers
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracks;





