import { Property, TeamMember, Testimonial } from '../types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Indiabulls Sky Forest',
    developer: 'Indiabulls Real Estate',
    location: 'Lower Parel, South Mumbai',
    city: 'Lower Parel',
    type: 'Sky Villas & Duplexes',
    price: 900000000,
    priceDisplay: '₹9 Cr – ₹100 Cr++',
    pricePerSqft: '₹52,000 – ₹68,000 / sq.ft.',
    sqft: '1,650–5,500 sq.ft.',
    beds: '3, 4, 5 BHK',
    baths: 4,
    status: 'Ready to Move',
    completionStatus: 'Ready to Move',
    configuration: '3, 4, 5 BHK, Duplex & Triplex Sky Villas',
    amenities: 'Private elevators, Sky forest, Infinity pool, Spa, Concierge, Tennis & Squash courts, Business centre, Panoramic sea & city views',
    image: 'https://lh3.googleusercontent.com/d/1x3vi0xRCoXdg8ptGl560c_CuB21nXKyQ=w1000',
    description: 'Ultra-luxury sky villas in Lower Parel featuring private elevators, lush sky forests, infinity pool, and unobstructed Arabian Sea and city skyline vistas.',
    featured: true,
    possessionDate: 'Ready to Move',
    reraId: 'Phase A2: P51900000467, Phase A3: P51900000616',
    projectArea: '3 Acres',
    totalUnitsStructure: '1 Building (420 Units)',
    launchDate: 'March 2013',
    amenitiesCategories: [
      { category: 'Recreation & Wellness', items: 'Swimming Pool, Gymnasium, Spa, Sauna Bath, Tennis Court, Table Tennis, Skating Rink, Mini Theatre', icon: 'Activity' },
      { category: 'Services & Security', items: 'Concierge Service, Fire Fighting System, Vastu Compliant design', icon: 'ShieldCheck' },
      { category: 'Layout Details', items: 'Servant quarters are available in 3.5 BHK, 4 BHK, and 4.5 BHK configurations.', icon: 'LayoutGrid' }
    ],
    localityHighlights: [
      { category: 'Education', items: 'Shardashram Vidyamandir International School, Helen Keller Institute, Cama Montessori & Primary School, Maharishi Dayanand College, Seth GS Medical College.', icon: 'GraduationCap' },
      { category: 'Healthcare', items: 'Gleneagles Hospital, Global Hospitals, KEM Hospital, Mahatma Gandhi Memorial (MGM) Hospital.', icon: 'Stethoscope' },
      { category: 'Shopping & Dining', items: 'Phoenix Palladium, High Street Phoenix, The Bombay Canteen.', icon: 'ShoppingBag' },
      { category: 'Connectivity & Transit', items: 'Bus Stop: Dadar Police Station Bus Stop (~1 km / 2 mins), Train Station: Currey Road Railway Station (~0.79 km), Parel & Lower Parel stations nearby, Road Infrastructure: Access to Eastern & Western Express Highways, Bandra-Worli Sea Link (~20 mins), and MTHL (Sewri to Nhava Sheva).', icon: 'Navigation' }
    ],
    overviewHighlights: [
      'Duplex & Triplex Sky Villas with private express elevators opening directly into foyer',
      '60,000 sq.ft. lush sky forest garden elevated at 300+ feet',
      'Double-height floor-to-ceiling glass facades overlooking the Arabian Sea',
      'Bespoke 24/7 concierge and five-star valet management'
    ],
    configsList: [
      { type: '3 BHK Sky Villa', carpetArea: '1,650 sq.ft.', priceRange: '₹9.0 Cr – ₹12.5 Cr' },
      { type: '4 BHK Duplex Residence', carpetArea: '2,850 sq.ft.', priceRange: '₹18.0 Cr – ₹26.0 Cr' },
      { type: '5 BHK Triplex Penthouse', carpetArea: '5,500 sq.ft.', priceRange: '₹45.0 Cr – ₹100.0 Cr++' }
    ],
    gallery: [
      { url: 'https://lh3.googleusercontent.com/d/1FXHaFYFgrkmlhgVrNPR7KO9BYnrpE7xd=w1000', caption: 'Sky Forest Exterior Facade' },
      { url: 'https://lh3.googleusercontent.com/d/16QWdx1BxvmpWRYhNxHZ14-AN6ep0OFE4=w1000', caption: 'Double-Height Living Salon' },
      { url: 'https://lh3.googleusercontent.com/d/1iissDkkrL9AlUJGvUjJJr5K_4jrT5lK2=w1000', caption: 'Private Infinity Pool & Deck' },
      { url: 'https://lh3.googleusercontent.com/d/1XO-9CMh8rJOqo014CHIJjTXrlgisnh7M=w1000', caption: 'Master Suite Sea View' },
      { url: 'https://lh3.googleusercontent.com/d/1f4Nua_Z_2ClP15WeAM66jDd0zRMj57SX=w1000', caption: 'Amenity Deck View' },
      { url: 'https://lh3.googleusercontent.com/d/1i4jgkUbHRVSJgDq2ziRLw3W19t2S0Ynk=w1000', caption: 'Lobby & Common Areas' },
      { url: 'https://lh3.googleusercontent.com/d/1piMbkNxQN5Ez9esNhn3vBrJzMoTI9V1N=w1000', caption: 'Residence Interior' }
    ],
    locationLandmarks: [
      { name: 'Bandra-Worli Sea Link', distance: '8 Mins' },
      { name: 'Palladium Mall & High Street Phoenix', distance: '3 Mins' },
      { name: 'Lower Parel Monorail Station', distance: '2 Mins' },
      { name: 'BKC Business Hub', distance: '18 Mins' },
      { name: 'Mumbai International Airport', distance: '30 Mins' }
    ],
    faqs: [
      { question: 'Is Indiabulls Sky Forest ready for immediate possession?', answer: 'Yes, the project has received full Occupancy Certificate (OC) and families are currently residing.' },
      { question: 'What security features are integrated into private elevators?', answer: 'Express elevators are equipped with biometric access controls opening directly into private apartment foyers.' },
      { question: 'Which major banks have approved home loans?', answer: 'Pre-approved loan facilities are available from SBI, HDFC Bank, ICICI Bank, Axis Bank, and Kotak Mahindra.' }
    ]
  },
  {
    id: '2',
    title: 'Lodha World Towers',
    developer: 'Lodha Group',
    location: 'Lower Parel, South Mumbai',
    city: 'Lower Parel',
    type: 'Luxury Towers',
    price: 1100000000,
    priceDisplay: '₹11 Cr – ₹30 Cr++',
    pricePerSqft: '₹65,000 – ₹85,000 / sq.ft.',
    sqft: '1,580–3,000+ sq.ft.',
    beds: '3, 4 & 5 BHK',
    baths: 4,
    status: 'Ready to Move',
    completionStatus: 'Ready to Move',
    configuration: '3, 4 & 5 BHK Residences',
    amenities: 'Private lift lobby, Clubhouse, Olympic-length pool, Spa, Concierge, Gymnasium, High-floor sea & skyline views',
    image: 'https://lh3.googleusercontent.com/d/1iQgCQIGGoxt0xwPvDPxB0fL1ToXZEf6y=w1000',
    description: 'An iconic architectural landmark in South Mumbai offering sprawling residences with private lift lobbies and world-class hospitality amenities.',
    featured: true,
    possessionDate: 'Ready to Move In',
    reraId: 'P51900008345, P51900008962',
    projectArea: '17 landscaped acres',
    designLegends: [
      { role: 'Interior Design', name: 'Armani/Casa' },
      { role: 'Architects', name: 'Pei Cobb Freed' },
      { role: 'Structural Engineers', name: 'LERA' },
      { role: 'Landscape Designer', name: 'Ken Smith' }
    ],
    amenitiesCategories: [
      { category: 'Club W (5 Levels)', items: 'Top-notch fitness centre, J Wellness Spa, Private theatre, Grand ballroom for stately events, Indoor pool with private cabanas, Outdoor poolside with a separate children’s pool, Multipurpose indoor court, Athletics track, Kid\'s playroom', icon: 'Activity' }
    ],
    localityHighlights: [
      { category: 'Connectivity', items: 'Located on Mumbai Mile / The Lodha Place, providing a secondary route for seamless connectivity to South Bombay (SOBO) and the Sea Link.', icon: 'Navigation' },
      { category: 'Shopping & Dining', items: 'Palladium & High Street Phoenix (05 minutes)', icon: 'ShoppingBag' },
      { category: 'Business Parks', items: 'Peninsula Corporate Park (10 minutes)', icon: 'Building2' },
      { category: 'Transit', items: 'Bandra-Worli Sea Link (20 minutes), Mumbai International Airport (30 minutes)', icon: 'Navigation' }
    ],
    overviewHighlights: [
      'Features a grand landscaped courtyard extending over almost 100,000 sq. ft. entrance',
      'Architectural masterpiece featuring World One and World Crest towers',
      'Common spaces & grand lobby designed exclusively by Armani/Casa',
      'Private 7-acre elevated park and athletic facilities',
      'Saint Amand five-star white-glove hospitality management'
    ],
    configsList: [
      { type: '3 BHK World Residence', carpetArea: '1,580 sq.ft.', priceRange: '₹11.0 Cr – ₹14.5 Cr' },
      { type: '4 BHK World Residence', carpetArea: '2,400 sq.ft.', priceRange: '₹17.5 Cr – ₹23.0 Cr' },
      { type: '5 BHK World Mansion', carpetArea: '3,200+ sq.ft.', priceRange: '₹30.0 Cr++' }
    ],
    gallery: [
      { url: 'https://lh3.googleusercontent.com/d/1tSWqJFC36RfKq-XNwgqxneZ2pVgESDxz=w1000', caption: 'World Towers Skyline View' },
      { url: 'https://lh3.googleusercontent.com/d/1b8HJB8yUwN3F9xCVm0IJzAmtRTI0PJ03=w1000', caption: 'Armani/Casa Styled Lobby' },
      { url: 'https://lh3.googleusercontent.com/d/1dOJCufFGWBsV5djEjiUq3ikzpRT-DZiB=w1000', caption: 'Olympic Size Swimming Pool' },
      { url: 'https://lh3.googleusercontent.com/d/17j1TZT0fvmFawat7L9qcPceLuNLePGDz=w1000', caption: 'Private Residence View' },
      { url: 'https://lh3.googleusercontent.com/d/1IPh0AKfxClPEAj6IgiVk-1Ae5pWEiCZ1=w1000', caption: 'Luxury Amenities' }
    ],
    locationLandmarks: [
      { name: 'Worli Sea Face & Coastal Road', distance: '5 Mins' },
      { name: 'Palladium Mall', distance: '4 Mins' },
      { name: 'Mahalaxmi Racecourse', distance: '7 Mins' },
      { name: 'Nariman Point', distance: '20 Mins' }
    ],
    faqs: [
      { question: 'Who designed the interiors of Lodha World Towers?', answer: 'The interior architecture and lobby spaces are exclusively styled by Armani/Casa with custom Italian finishes.' },
      { question: 'How many car parking spots are allocated per residence?', answer: 'Residences include 3 to 5 reserved covered parking bays inside the multi-level basement.' }
    ]
  },
  {
    id: '3',
    title: 'Lodha Park',
    developer: 'Lodha Group',
    location: 'Lower Parel, South Mumbai',
    city: 'Lower Parel',
    type: 'Parkside Residences',
    price: 500000000,
    priceDisplay: '₹5 Cr – ₹18 Cr++',
    pricePerSqft: '₹48,000 – ₹62,000 / sq.ft.',
    sqft: '850–2,500+ sq.ft.',
    beds: '2, 3, 4 & 5 BHK',
    baths: 3,
    status: 'Ready to Move & Under Construction',
    completionStatus: 'Ready to Move & Under Construction',
    configuration: '2, 3, 4 & 5 BHK',
    amenities: '7-acre private park, Sports courts, Luxury clubhouse, Infinity pool, Jogging track, Spa, Premium landscaping',
    image: 'https://lh3.googleusercontent.com/d/1AxALvPDdcQE5jdQKAZSe1vMQYI7kTjTp=w1000',
    description: 'A lush 7-acre private park ecosystem in the heart of Lower Parel featuring sports courts, infinity pool, and serene green landscape.',
    featured: true,
    possessionDate: 'Ready to Move In',
    reraId: 'P51900001339, P51900014937',
    designLegends: [
      { role: 'Interior Design (The Jewel)', name: 'Patricia Urquiola' }
    ],
    amenitiesCategories: [
      { category: 'The Jewel (Clubhouse)', items: 'Spread across 50,000 sq. ft., one of the largest in the city. Designed like a magnificent crystal.', icon: 'Building2' },
      { category: 'Recreation & Wellness', items: '7 swimming pools, world-class gymnasium featuring a boxing ring, multi-purpose courts, indoor games room.', icon: 'Activity' },
      { category: 'Nature & Leisure', items: '7-acre private park with gardens, lawns for picnics, an organic garden, and a private orchard.', icon: 'LayoutGrid' },
      { category: 'Community', items: 'Garden pavilions, a restaurant, banquet facilities, and a dedicated kids’ play area.', icon: 'CheckCircle2' }
    ],
    localityHighlights: [
      { category: 'Shopping & Dining', items: 'Palladium & High Street Phoenix (5 minutes)', icon: 'ShoppingBag' },
      { category: 'Business Hubs', items: 'Peninsula Corporate Park (10 minutes)', icon: 'Building2' },
      { category: 'Transit', items: 'Bandra-Worli Sea Link (20 minutes), Mumbai International Airport (30 minutes)', icon: 'Navigation' }
    ],
    overviewHighlights: [
      'Designed around a 7-acre private park, acting as a social ecosystem to foster a thriving community',
      'Ecosystem features specific towers including Lodha Adrina, Lodha Kiara, and Lodha Parkside',
      '7-acre private urban park with over 1,000 trees',
      '5 grand luxury residential towers inside a secure gated ecosystem',
      'Evander Holyfield gym and Serena Williams tennis training academy',
      'Organic vegetable garden, pet park, and tea pavilion'
    ],
    configsList: [
      { type: '2 BHK Parkside', carpetArea: '850 sq.ft.', priceRange: '₹5.0 Cr – ₹6.8 Cr' },
      { type: '3 BHK Luxury', carpetArea: '1,350 sq.ft.', priceRange: '₹8.5 Cr – ₹11.2 Cr' },
      { type: '4 BHK Suite', carpetArea: '1,950 sq.ft.', priceRange: '₹13.5 Cr – ₹16.0 Cr' },
      { type: '5 BHK Penthouse', carpetArea: '2,500+ sq.ft.', priceRange: '₹18.0 Cr++' }
    ],
    gallery: [
      { url: 'https://lh3.googleusercontent.com/d/1JLgmb-MqRKenRJVeXiy1LuRTGf4hXIQ0=w1000', caption: '7-Acre Private Park View' },
      { url: 'https://lh3.googleusercontent.com/d/1L9QPz8JFoatqNCv6w9pZM0SUh-HVXbL2=w1000', caption: 'Tower Exterior' },
      { url: 'https://lh3.googleusercontent.com/d/1BypuTh2xfLy8dCuJf3fTNyqq9FDHI6t-=w1000', caption: 'Clubhouse & Pool' }
    ],
    locationLandmarks: [
      { name: 'Senapati Bapat Marg', distance: '0 Mins' },
      { name: 'Palladium Mall', distance: '3 Mins' },
      { name: 'Breach Candy Hospital', distance: '12 Mins' },
      { name: 'BKC Financial Center', distance: '15 Mins' }
    ],
    faqs: [
      { question: 'What recreational amenities exist in the 7-acre private park?', answer: 'The park features 6 swimming pools, organic garden, tea pavilion, outdoor cinema, 1 km jogging track, and multi-sport courts.' }
    ]
  },
  {
    id: '4',
    title: 'Rustomjee Crown',
    developer: 'Rustomjee',
    location: 'Prabhadevi, South Mumbai',
    city: 'Prabhadevi',
    type: 'Luxury Residences',
    price: 800000000,
    priceDisplay: '₹8 Cr – ₹28 Cr++',
    pricePerSqft: '₹58,000 – ₹72,000 / sq.ft.',
    sqft: '1,335–3,000+ sq.ft.',
    beds: '3, 4 & 5 BHK',
    baths: 4,
    status: 'Ready to Move & Under Construction',
    completionStatus: 'Ready to Move & Under Construction',
    configuration: '3, 4 & 5 BHK',
    amenities: 'Grand clubhouse, Infinity pool, Wellness centre, Private dining, Children’s play village, Sea views (select residences)',
    image: 'https://lh3.googleusercontent.com/d/1a9AFagxEpqQmtI-W9VpaDyl5LNrpIkQY=w1000',
    description: 'Gated estate of grand luxury towers in Prabhadevi, offering sweeping ocean views, private dining, and bespoke wellness amenities.',
    featured: true,
    possessionDate: 'Ready to Move & Under Construction',
    reraId: 'P51900003268, P51900006367',
    projectArea: '5.75 acres (Urban Resort)',
    totalUnitsStructure: '3 Towers (186 Units)',
    amenitiesCategories: [
      { category: 'Pools & Water Features', items: 'Temperature Controlled Covered Pool, Dedicated Kids Pool, Infinity Pool', icon: 'Activity' },
      { category: 'Fitness & Wellness', items: 'Fitness Center / Gym, Spa & Jacuzzi, Yoga Zone', icon: 'Stethoscope' },
      { category: 'Sports & Games', items: 'Indoor Games, Squash Court, Basketball Court, Jogging Track', icon: 'Activity' },
      { category: 'Leisure & Social', items: 'Clubhouse & Lounge Area, Aroma Garden, Landscaped Garden, Kids Play Area, Cafeteria, Party Lawn, Library Room', icon: 'CheckCircle2' }
    ],
    localityHighlights: [
      { category: 'Key Landmarks', items: 'Siddhivinayak Temple (0.7 Km), Bandra Worli Sea Link (2.5 Km)', icon: 'Navigation' },
      { category: 'Connectivity', items: 'Eastern Express Highway (2 Km). Unmatched access to Trans-Harbour Link, Monorail, Eastern Freeway, Metro.', icon: 'Navigation' },
      { category: 'Shopping', items: 'Palladium Mall (2 Km)', icon: 'ShoppingBag' },
      { category: 'Education & Healthcare', items: 'Bombay Scottish School (3.1 Km), Hinduja Hospital (3 Km)', icon: 'GraduationCap' }
    ],
    overviewHighlights: [
      'Gated 5.75-acre "Urban Resort" estate with a palatial open podium spread across 2.52 acres',
      'Two towers rising to 68 storeys and one tower rising to 67 storeys',
      'Unobstructed views of the Arabian Sea and Bandra-Worli Sea Link',
      '60+ lifestyle & leisure amenities designed by Hafeez Contractor',
      'Subterranean parking with dedicated EV charging stations'
    ],
    configsList: [
      { type: '3 BHK Crown Residence', carpetArea: '1,335 sq.ft.', priceRange: '₹8.0 Cr – ₹11.5 Cr' },
      { type: '4 BHK Estate Suite', carpetArea: '2,100 sq.ft.', priceRange: '₹15.0 Cr – ₹21.0 Cr' },
      { type: '5 BHK Sky Mansion', carpetArea: '3,000+ sq.ft.', priceRange: '₹28.0 Cr++' }
    ],
    gallery: [
      { url: 'https://lh3.googleusercontent.com/d/1oTLDlOjqIc3o7Zk5M63X9bjGekbM-_st=w1000', caption: 'Sea Link & Ocean View Deck' },
      { url: 'https://lh3.googleusercontent.com/d/1BQodaQqXv1gkyHn6TXQC3kOTjSlb1gfa=w1000', caption: 'Grand Crown Clubhouse' },
      { url: 'https://lh3.googleusercontent.com/d/1GIpZ3r_WSLNcBEJMoOf3pqKqmNNbMz8k=w1000', caption: 'Luxury Residence Interior' },
      { url: 'https://lh3.googleusercontent.com/d/1qCH-kLN9ckChkq03LZoVjay-kpLfLJ7D=w1000', caption: 'Amenity Deck & Pool' }
    ],
    locationLandmarks: [
      { name: 'Siddhivinayak Temple', distance: '3 Mins' },
      { name: 'Bandra-Worli Sea Link', distance: '4 Mins' },
      { name: 'Dadar Chowpatty Beach', distance: '5 Mins' },
      { name: 'Hinduja Hospital', distance: '10 Mins' }
    ],
    faqs: [
      { question: 'Does Rustomjee Crown offer sea views?', answer: 'Yes, residences on middle and higher floors feature 270-degree views of the Arabian Sea and Sea Link.' }
    ]
  },
  {
    id: '5',
    title: 'The Aga Hall Estate',
    developer: 'Prince Aly Khan Hospital Trust & Associated Developers',
    location: 'Nesbit Road, Mazgaon, South Mumbai – 400010',
    city: 'Mazgaon',
    type: 'Heritage Estate',
    price: 50300000,
    priceDisplay: '₹5.03 Cr – ₹6.86 Cr',
    pricePerSqft: 'On Request',
    sqft: '841 – 960 sq.ft.',
    beds: '2 BHK',
    baths: 2,
    status: 'Nearing Completion (Limited Inventory)',
    completionStatus: 'Nearing Completion',
    configuration: '2 BHK Luxury Residences',
    amenities: 'Heritage estate living, Landscaped gardens, Premium clubhouse, Swimming pool, High security, Exclusive low-density development',
    image: 'https://lh3.googleusercontent.com/d/1JwBGvp3eWBJ30DhVSd1wF-WGha9FAcx7=w1000',
    description: 'Exclusive heritage estate living in Mazgaon featuring landscaped gardens, high-level security, and ultra-low density privacy.',
    featured: true,
    possessionDate: 'Nearing Completion',
    reraId: 'P51900026326',
    totalUnitsStructure: '2 High-rise Towers (East: 56 Stories, West: 45 Stories)',
    amenitiesCategories: [
      { category: 'Indoor Amenities', items: 'Gymnasiums, Squash Court, Box Cricket, Billiards Room, Yoga & Pilates Room', icon: 'Activity' },
      { category: 'Outdoor & Landscape', items: 'Swimming Pool with Deck, Kid\'s Pool, Jogging Track, Garden, Outdoor Kids Play Area', icon: 'LayoutGrid' },
      { category: 'Convenience', items: 'In-complex convenience store', icon: 'ShoppingBag' }
    ],
    localityHighlights: [
      { category: 'Nearby Shopping & Malls', items: 'Phoenix Palladium, Atria Mall, Heera Panna Shopping Centre, Taj Shopping Arcade, Kohinoor Square', icon: 'ShoppingBag' }
    ],
    overviewHighlights: [
      'Panoramic views of the Arabian Sea, Eastern Waterfront, and Rani Baug',
      '50% dedicated green spaces with lush centuries-old heritage trees',
      'Pre-certified Platinum Rated by IGBC and EDGE Advanced Certification by the World Bank',
      'Centuries of royal heritage site transformed into an ultra-low-density luxury sanctuary',
      'Direct integration with world-class medical concierge services'
    ],
    configsList: [
      { type: '2 BHK (N)', carpetArea: '841 sq.ft.', priceRange: '₹5.03 Cr – ₹5.72 Cr' },
      { type: '2 BHK (S)', carpetArea: '841 sq.ft.', priceRange: '₹5.59 Cr – ₹6.58 Cr' },
      { type: '2 BHK', carpetArea: '866 sq.ft.', priceRange: '₹5.53 Cr – ₹5.84 Cr' },
      { type: '2 BHK LARGE', carpetArea: '960 sq.ft.', priceRange: '₹5.15 Cr – ₹6.86 Cr' }
    ],
    gallery: [
      { url: 'https://lh3.googleusercontent.com/d/13jErM_xsm1I2a84o87tww7cwUYDFF7dx=w1000', caption: 'Aga Hall Estate Gardens' },
      { url: 'https://lh3.googleusercontent.com/d/1cPIeOjxaSjCysTF-oIQhxrZcS_sB8UHr=w1000', caption: 'Courtyard Architecture' },
      { url: 'https://lh3.googleusercontent.com/d/1sZRI6Wa2YXjnDzMH-MNojbwQ_x82mjqc=w1000', caption: 'Heritage Exterior' },
      { url: 'https://lh3.googleusercontent.com/d/1NZkfIbaONPVZfgsEueOZhCglxfVvu3Fb=w1000', caption: 'Green Spaces' },
      { url: 'https://lh3.googleusercontent.com/d/1MUP7UhCRD2cyiVD_zkNwzglCA8L5qigL=w1000', caption: 'Grand Lobby' },
      { url: 'https://lh3.googleusercontent.com/d/1YPlMwSO1jWtlCyXRn3BAgkZNODg3VI6R=w1000', caption: 'Luxury Amenities' },
      { url: 'https://lh3.googleusercontent.com/d/1ntNz7ZMWkvrpftncOcOZB-CUWIiSjhav=w1000', caption: 'Residence View' },
      { url: 'https://lh3.googleusercontent.com/d/1ME54pOIK_HkHVJD0FWAl8Aul6civRl0M=w1000', caption: 'Pool Deck' },
      { url: 'https://lh3.googleusercontent.com/d/1vtgWx8T1VVrXg9I15fvURECuh7ly_4EH=w1000', caption: 'Master Suite' }
    ],
    locationLandmarks: [
      { name: 'Eastern Freeway Entrance', distance: '3 Mins' },
      { name: 'South Mumbai Heritage District (Fort)', distance: '10 Mins' },
      { name: 'Masina Hospital', distance: '5 Mins' },
      { name: 'BKC Connector', distance: '15 Mins' }
    ],
    faqs: [
      { question: 'What makes Aga Hall Estate unique in South Mumbai?', answer: 'It combines low-density royal heritage grounds with modern earthquake-resistant luxury architecture and high-security seclusion.' }
    ]
  },
  {
    id: '6',
    title: 'Monte South',
    developer: 'Marathon Group & Adani Realty',
    location: 'Byculla, South Mumbai',
    city: 'Byculla',
    type: 'Skyscraper Residences',
    price: 500000000,
    priceDisplay: '₹5 Cr – ₹20 Cr++',
    pricePerSqft: '₹42,000 – ₹55,000 / sq.ft.',
    sqft: '900–2,800+ sq.ft.',
    beds: '2, 2.5, 3, 4 & 4.5 BHK',
    baths: 3,
    status: 'Ready to Move & Under Construction',
    completionStatus: 'Ready to Move & Under Construction',
    configuration: '2, 2.5, 3, 4 & 4.5 BHK',
    amenities: '2.5-acre podium, Infinity pool, Sky lounge, Banquet hall, Business lounge, Gym, Children’s play area, City & sea views (higher floors)',
    image: 'https://lh3.googleusercontent.com/d/1vG5557JLvpgfKnYBU-jXDItJ-n0PGYuL=w1000',
    description: 'Sprawling 2.5-acre podium amenity deck with sky lounge, infinity pool, and breathtaking city and sea panoramas.',
    featured: true,
    possessionDate: 'Ready to Move / 2025',
    reraId: 'P51900001936',
    projectArea: '12.5 Acres',
    totalUnitsStructure: '4 proposed towers (64 storeys each). 3 launched (Pilatus, Zermatt, Titlis)',
    designLegends: [
      { role: 'Principal Architect', name: 'Hafeez Contractor' }
    ],
    amenitiesCategories: [
      { category: 'Oasis in the Sky (8th Floor Podium)', items: 'Podium Beach (Artificial beach), Amazon-themed landscaping, Jain Derasar', icon: 'Activity' }
    ],
    overviewHighlights: [
      'Occupancy Certificate (OC) received up to 64th floor (Tower A) and 45th floor (Tower B)',
      'Massive 12.5-acre land parcel with a unique elevated amenity podium',
      'Artificial sand beach and palm tree lagoon swimming pool',
      'Panoramic vistas of Byculla Zoo botanical gardens and Eastern Harbour'
    ],
    configsList: [
      { type: '2.5 BHK Luxury', carpetArea: '900 sq.ft.', priceRange: '₹5.0 Cr – ₹6.5 Cr' },
      { type: '3 BHK Executive', carpetArea: '1,250 sq.ft.', priceRange: '₹8.0 Cr – ₹10.5 Cr' },
      { type: '4 BHK Grand', carpetArea: '1,850 sq.ft.', priceRange: '₹13.0 Cr – ₹16.5 Cr' },
      { type: '4.5 BHK Sky Suite', carpetArea: '2,800+ sq.ft.', priceRange: '₹20.0 Cr++' }
    ],
    gallery: [
      { url: 'https://lh3.googleusercontent.com/d/1qTJggwSwpD6-D7Qy_fQtgPeg2hd9ksIC=w1000', caption: 'Monte South Twin Towers' },
      { url: 'https://lh3.googleusercontent.com/d/1ST2P4zY7G_-dTXq4zZIoTEinP_XwPIr2=w1000', caption: 'Artificial Sand Beach Pool' },
      { url: 'https://lh3.googleusercontent.com/d/1NZEO6Aa_-9SQN2wHY-YLGQKTBNUhgxaL=w1000', caption: 'Sky Lounge Deck' },
      { url: 'https://lh3.googleusercontent.com/d/1Oy9tH5CBixU_vHAeyn5xE6b5fNcUGCpk=w1000', caption: 'Podium Amenities' },
      { url: 'https://lh3.googleusercontent.com/d/11x03oh2tVMJTKbOY6nskY72q51vnGNlK=w1000', caption: 'Luxury Interior' },
      { url: 'https://lh3.googleusercontent.com/d/187hEXRbz8WsEkIEr6eR8Hsx6koj9kNtd=w1000', caption: 'City Panorama' },
      { url: 'https://lh3.googleusercontent.com/d/1q7wJXyt52lFiD7i0xRSk1BxeP1NG6PWN=w1000', caption: 'Clubhouse' }
    ],
    locationLandmarks: [
      { name: 'Byculla Railway Station', distance: '2 Mins' },
      { name: 'Eastern Freeway', distance: '4 Mins' },
      { name: 'St. Xavier’s College', distance: '12 Mins' },
      { name: 'Marine Drive Promenade', distance: '15 Mins' }
    ],
    faqs: [
      { question: 'Is there a real sand beach inside Monte South?', answer: 'Yes, Monte South features a unique 2.5-acre elevated podium with a real sand beach and palm lagoon.' }
    ]
  },
  {
    id: '7',
    title: 'Piramal Aranya',
    developer: 'Piramal Realty',
    location: 'Byculla, South Mumbai',
    city: 'Byculla',
    type: 'Botanical Luxury Towers',
    price: 400000000,
    priceDisplay: '₹4 Cr – ₹22 Cr++',
    pricePerSqft: '₹45,000 – ₹58,000 / sq.ft.',
    sqft: '760–2,700+ sq.ft.',
    beds: '2, 3, 4 & 5 BHK',
    baths: 3,
    status: 'Ready to Move & Under Construction',
    completionStatus: 'Ready to Move & Under Construction',
    configuration: '2, 3, 4 & 5 BHK',
    amenities: 'Private elevator (select units), Infinity pool, Forest-themed landscaping, Wellness centre, Clubhouse, Harbour & Arabian Sea views',
    image: 'https://lh3.googleusercontent.com/d/118Mi_ycvseZMehwASCuJjsEt_rT9RHAN=w1000',
    description: 'Serene botanical luxury towers overlooking Byculla Zoo gardens, Eastern Harbour, and the Arabian Sea.',
    featured: false,
    possessionDate: 'Ready to Move & Under Construction',
    reraId: 'P51900003324',
    totalUnitsStructure: 'Multiple Towers. Arav (Tallest in Byculla). Avyan/Arav: Delivered. Ahan I: OC Received. Ahan II: Launched.',
    amenitiesCategories: [
      { category: 'Recreational Amenities', items: 'Active / Yoga Lawn & Viewing Terrace, Lap & Leisure Pools, Events Lawn, Amphitheatre, Picnic Area, Outdoor Café / Barbeque, Jogging Track, Multi-Use Sports Courts, Rock Climbing, Kids Zone, Theme Gardens, Pet Park', icon: 'LayoutGrid' },
      { category: 'Club Amenities', items: 'Double Height Lobby, Fitness Center, Golf Simulator, Badminton & Squash Courts, Swimming Pool, Spa and Salon, Indoor Games, Theater, Library, Multipurpose Hall, Cafeteria, Creche', icon: 'Building2' },
      { category: 'Tower Exclusive', items: 'Fitness Centre, Library & Reading Lounge, Viewing Terrace / Observation Deck', icon: 'CheckCircle2' }
    ],
    localityHighlights: [
      { category: 'Business Districts', items: 'Lower Parel (4.8 km), Ballard Estate (5.5 km), Nariman Point (8.2 km), BKC (12.8 km)', icon: 'Building2' }
    ],
    overviewHighlights: [
      '360-degree views of the 60-acre Rani Baug (Botanical Gardens), Eastern Harbour, and city skyline',
      'Access and exit points from 3 different directions',
      'Positioned to benefit from the proposed upcoming eastern waterfront development',
      'Residences feature floor-to-ceiling glass (up to 3.6m height), L-shaped corner windows, and modular kitchens',
      'Acoustic double-glazed windows providing peaceful urban sanctuary',
      'Designed in collaboration with UK-based Make Architects'
    ],
    configsList: [
      { type: '2 BHK Botanical View', carpetArea: '760 sq.ft.', priceRange: '₹4.0 Cr – ₹5.5 Cr' },
      { type: '3 BHK Garden View', carpetArea: '1,200 sq.ft.', priceRange: '₹7.5 Cr – ₹9.8 Cr' },
      { type: '4 BHK Harbour Suite', carpetArea: '1,900 sq.ft.', priceRange: '₹14.0 Cr – ₹17.5 Cr' },
      { type: '5 BHK Penthouse', carpetArea: '2,700+ sq.ft.', priceRange: '₹22.0 Cr++' }
    ],
    gallery: [
      { url: 'https://lh3.googleusercontent.com/d/1vBdVf3Fb94wkvrqqDERiQd7Uytp57KbR=w1000', caption: 'Botanical Gardens View' },
      { url: 'https://lh3.googleusercontent.com/d/1zhlUp1sQCGgUVqhMvGrz5U9-lf2pAdKM=w1000', caption: 'Infinity Pool & Harbour Deck' },
      { url: 'https://lh3.googleusercontent.com/d/1GcsD9KDcFJd9jKbubd96sgOokGFSrsOP=w1000', caption: 'Luxury Residence Interior' },
      { url: 'https://lh3.googleusercontent.com/d/1vKUFmWxgPj2J0chxLWR0_Y6FwaDqnvYj=w1000', caption: 'Tower Exterior' },
      { url: 'https://lh3.googleusercontent.com/d/1p8XY40ftAWTB7baDXWG18pImvpyL3Ucx=w1000', caption: 'Amenity Deck' },
      { url: 'https://lh3.googleusercontent.com/d/1GB0TdghRgKs7zctDnxG2GwV0NT-Lf46c=w1000', caption: 'Clubhouse' }
    ],
    locationLandmarks: [
      { name: 'Rani Baug Botanical Gardens', distance: '0 Mins' },
      { name: 'Eastern Freeway', distance: '3 Mins' },
      { name: 'Lower Parel Business District', distance: '10 Mins' },
      { name: 'Fort / Nariman Point', distance: '15 Mins' }
    ],
    faqs: [
      { question: 'Are the green views permanently protected?', answer: 'Yes, looking over the 60-acre heritage botanical gardens ensures your greenery views will never be obstructed.' }
    ]
  },
  {
    id: '8',
    title: 'Piramal Mahalaxmi',
    developer: 'Piramal Realty',
    location: 'Sane Guruji Marg, Mahalaxmi, Jacob Circle, Mumbai',
    city: 'Mahalaxmi',
    type: 'Racecourse View Towers',
    price: 500000000,
    priceDisplay: '₹5 Cr – ₹25 Cr++',
    pricePerSqft: '₹50,000 – ₹65,000 / sq.ft.',
    sqft: '740–2,600+ sq.ft.',
    beds: '2, 3, 4 & 5 BHK',
    baths: 3,
    status: 'Ready-to-Move-In / OC Received',
    completionStatus: 'Ready to Move / OC Received',
    configuration: '2, 3, 4 & 5 BHK',
    amenities: 'Private lift (select units), Infinity pool, Wellness club, Sky lounge, Racecourse & Arabian Sea views, Concierge services',
    image: 'https://lh3.googleusercontent.com/d/15n50TZ9Tsek3VRdUiMNTChlEazB2J7IF=w1000',
    description: 'Prestigious residential towers framing unobstructed views of Mahalaxmi Racecourse and the Arabian Sea coastline.',
    featured: false,
    possessionDate: 'Ready-to-Move-In (South Tower), OC Received (Central Tower)',
    reraId: 'P51900015854, P51900016482, P51900021057',
    totalUnitsStructure: '3 High-Rise Towers (South, Central, and North)',
    amenitiesCategories: [
      { category: 'Pool & Wellness', items: '5-Lane Lap Pool, Infinity-Edged Swimming Pool, Plunge Pool, Jacuzzi, Spa & Salon', icon: 'Activity' },
      { category: 'Sports & Fitness', items: 'Private Gymnasium, Yoga Room, Squash Court, Half Basketball Court, Cricket Pitch, Climbing Wall, Jogging Track', icon: 'Stethoscope' },
      { category: 'Leisure & Community', items: 'Rooftop Deck & Observatory Deck, Clubhouse Lounge, Library, Amphitheatre, Grand Lawn, Indoor Games Room', icon: 'CheckCircle2' }
    ],
    localityHighlights: [
      { category: 'Business Districts', items: 'Lower Parel (4.8 km), Ballard Estate (5.9 km), Nariman Point (8.2 km), BKC (12.5 km)', icon: 'Building2' },
      { category: 'Schools & Colleges', items: 'Cathedral & John Connon School (5.9 km), St. Xavier\'s College (6.0 km), Bombay Scottish (6.5 km), Jai Hind College (6.5 km), Dhirubhai Ambani Intl (12.4 km)', icon: 'GraduationCap' },
      { category: 'Healthcare', items: 'Wockhardt Hospital (1.0 km), Sir H.N. Reliance Foundation Hospital (3.0 km)', icon: 'Stethoscope' },
      { category: 'Recreation, Hotels & Sports', items: 'Mahalaxmi Racecourse (1.5 km), Royal Western India Turf Club (1.4 km), Willingdon Sports Club (1.9 km), St. Regis (2.0 km), Four Seasons (3.0 km), Wankhede Stadium (6.9 km)', icon: 'Activity' }
    ],
    overviewHighlights: [
      'Lifetime panoramic views of the Mahalaxmi Racecourse and the Arabian Sea',
      'Access and exit points from 3 different directions leading to 3 separate roads',
      'Developed in collaboration with leading global design, architecture, and construction experts',
      '3 distinct high-rise towers: Tower South, Central & North',
      'Each tower features a private gymnasium, library, and rooftop observatory deck',
      'Direct proximity to Jacob Circle and Coastal Road interchange'
    ],
    configsList: [
      { type: '2 BHK Racecourse View', carpetArea: '740 sq.ft.', priceRange: '₹5.0 Cr – ₹6.8 Cr' },
      { type: '3 BHK Signature', carpetArea: '1,150 sq.ft.', priceRange: '₹8.5 Cr – ₹11.5 Cr' },
      { type: '4 BHK Sky Mansion', carpetArea: '1,800 sq.ft.', priceRange: '₹16.0 Cr – ₹20.0 Cr' },
      { type: '5 BHK Penthouse', carpetArea: '2,600+ sq.ft.', priceRange: '₹25.0 Cr++' }
    ],
    gallery: [
      { url: 'https://lh3.googleusercontent.com/d/1-Y2j5ZiERZkkyOSg67n5HR6ri7mPh7zf=w1000', caption: 'Racecourse Facing Elevation' },
      { url: 'https://lh3.googleusercontent.com/d/1bNN_CTINB1RXm-dVTw9tlqzyDFSajlmi=w1000', caption: 'Sky Lounge Deck' },
      { url: 'https://lh3.googleusercontent.com/d/1Z5PUsTBWyIdAt4p75WUskLaWK5aUvdCD=w1000', caption: 'Luxury Interior' },
      { url: 'https://lh3.googleusercontent.com/d/17ylzruVwrNErSBqyvnF5BTBK7b5Meqxg=w1000', caption: 'Swimming Pool' },
      { url: 'https://lh3.googleusercontent.com/d/1EyMwd0R7yemvV6_ONU_RKyXTvvvo1-pS=w1000', caption: 'Racecourse View' },
      { url: 'https://lh3.googleusercontent.com/d/1ojm37MnOuNXxzzTvm1qAWXyM3UiA4p-G=w1000', caption: 'Tower Lobby' },
      { url: 'https://lh3.googleusercontent.com/d/1WbiIaBLPQjfiAaGPoK74s-7eZiwmZGQJ=w1000', caption: 'Luxury Suite' },
      { url: 'https://lh3.googleusercontent.com/d/1pWhKDbWuToLvC39i_gQpSdVVR4cvEDv-=w1000', caption: 'Amenity Deck' }
    ],
    locationLandmarks: [
      { name: 'Mahalaxmi Racecourse', distance: '1 Min' },
      { name: 'Mahalaxmi Railway Station', distance: '2 Mins' },
      { name: 'Willingdon Sports Club', distance: '3 Mins' },
      { name: 'Coastal Road Interchange', distance: '6 Mins' }
    ],
    faqs: [
      { question: 'Which towers offer direct views of the racecourse?', answer: 'Towers South and Central provide direct unobstructed green views of the 225-acre Racecourse turf.' }
    ]
  },
  {
    id: '9',
    title: 'Runwal 7 Mahalaxmi',
    developer: 'Runwal Enterprises & Shreepati Build Infra',
    location: 'Corner plot at N. M. Joshi Marg, Mahalaxmi, South Mumbai',
    city: 'Mahalaxmi',
    type: 'Contemporary Residences',
    price: 450000000,
    priceDisplay: '₹4.5 Cr – ₹15 Cr++',
    pricePerSqft: '₹40,000 – ₹52,000 / sq.ft.',
    sqft: '800–2,000+ sq.ft.',
    beds: '2, 3 & 4 BHK',
    baths: 3,
    status: 'Under Construction',
    completionStatus: 'Under Construction',
    configuration: '2, 3 & 4 BHK',
    amenities: 'Infinity pool, Sky deck, Clubhouse, Fitness centre, Landscaped podium, Children’s play area, Racecourse & city views',
    image: 'https://lh3.googleusercontent.com/d/1diVbbIUBmSy2pB4Hff3hBZkiILLTfdmx=w1000',
    description: 'Modern high-rise development in Mahalaxmi featuring up to 100 amenities spread across the podium landscape and rooftop.',
    featured: false,
    possessionDate: 'December 2027',
    reraId: 'P51900030012',
    amenitiesCategories: [
      { category: 'Rooftop & Sky Lounge', items: 'Open-air Sky Lounge with Arabian Sea & Mumbai skyline views, Party Pool', icon: 'CheckCircle2' },
      { category: 'Podium & Outdoor', items: 'Curated podium landscape, Multiple swimming pools & deck pool, Grand drop-off area, Amphitheatre & lawn pathway', icon: 'LayoutGrid' },
      { category: 'Indoor & Lifestyle', items: 'Fully-equipped Gymnasium, Banquet Hall, High-end interior finishes and private balconies/decks', icon: 'Building2' }
    ],
    localityHighlights: [
      { category: 'Roadways & Transit', items: 'Chinchpokli Station (200m), Mahalaxmi Station (1.1km), Lower Parel Metro (1.4km), Eastern Express Hwy (950m), Coastal Road (4.5km), Atal Setu (5.4km), Sea Link (6.0km)', icon: 'Navigation' },
      { category: 'Shopping & Malls', items: 'The Palladium (2.1km), Atria Mall (4.1km)', icon: 'ShoppingBag' },
      { category: 'Healthcare Facilities', items: 'Wockhardt Hospital (1.5km), Reliance Hospital & RC (3.5km), Jaslok Hospital (3.5km)', icon: 'Stethoscope' },
      { category: 'Luxury Hotels & Clubs', items: 'ITC Grand Central (1.7km), St. Regis (2.8km), Four Seasons (2.8km), Willingdon Sports Club (2.9km), NSCI Club (5.0km)', icon: 'Activity' }
    ],
    overviewHighlights: [
      'Tagline: Live Extraordinaire / Sea View Residences',
      'Financial Partner: IndusInd Bank Limited',
      'Developer Legacy: Over 4 decades of experience (founded 1978), 10,000+ units delivered, ~57M sq. ft.',
      'Smart home automation and sustainable eco-management systems',
      'Rooftop sky lounge with 360-degree views of the South Mumbai skyline',
      'Up to 100 amenities spread across the podium landscape and rooftop'
    ],
    configsList: [
      { type: '2 BHK Contemporary', carpetArea: '800 sq.ft.', priceRange: '₹4.5 Cr – ₹5.8 Cr' },
      { type: '3 BHK Luxury', carpetArea: '1,200 sq.ft.', priceRange: '₹7.8 Cr – ₹10.2 Cr' },
      { type: '4 BHK Sky Residence', carpetArea: '2,000+ sq.ft.', priceRange: '₹15.0 Cr++' }
    ],
    gallery: [
      { url: 'https://lh3.googleusercontent.com/d/1vsx-NpoqrVwqwGg5u6fNL-mOIDpFnwzM=w1000', caption: 'Runwal 7 High-Rise Tower' },
      { url: 'https://lh3.googleusercontent.com/d/1khKkWbAiNxZmINOP1vgSHn1IdZzQ8IzG=w1000', caption: 'Rooftop Sky Lounge' },
      { url: 'https://lh3.googleusercontent.com/d/1EkE9cOiPxGytVK25eD70tFto8av7y7TU=w1000', caption: 'Sky Deck View' },
      { url: 'https://lh3.googleusercontent.com/d/13VF5ERYEziwG0gvp7Vo1-phs0uVHUBN2=w1000', caption: 'Luxury Interior' },
      { url: 'https://lh3.googleusercontent.com/d/1NgHtu_kod01UFCvlglTm_-GOoffgSHza=w1000', caption: 'Podium Amenities' },
      { url: 'https://lh3.googleusercontent.com/d/1E9VPTCYck1CU2W_ruzdgY9ycM6w3aNXl=w1000', caption: 'Swimming Pool' },
      { url: 'https://lh3.googleusercontent.com/d/1M0ofEDs-Q-FF0nekJqkQJwo_5UdJEsEO=w1000', caption: 'Tower Lobby' },
      { url: 'https://lh3.googleusercontent.com/d/1cKiwxWI6W0PwT7cx8snq_LqLtbr7kahs=w1000', caption: 'Residence View' },
      { url: 'https://lh3.googleusercontent.com/d/1rgYkxU9OskTYMcjf1aUDbOZL0rciVpR_=w1000', caption: 'City Panorama' }
    ],
    locationLandmarks: [
      { name: 'Jacob Circle Monorail', distance: '2 Mins' },
      { name: 'Mahalaxmi Station', distance: '4 Mins' },
      { name: 'Palladium Mall', distance: '8 Mins' },
      { name: 'Lower Parel Commercial Hubs', distance: '7 Mins' }
    ],
    faqs: [
      { question: 'What is the possession date for Runwal 7 Mahalaxmi?', answer: 'Structure work is on schedule with anticipated possession by late 2027.' }
    ]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Vinay Karir',
    role: 'Founder & CEO',
    bio: "With over 10 years of experience in Mumbai's real estate industry, Vinay Karir founded Gem Homes Advisory & Realtors (G.H.A.R.) five years ago with a vision to redefine luxury real estate advisory through trust, transparency, and personalized service. Before establishing G.H.A.R., Vinay spent two years with Lodha, one of India's leading real estate developers, and further strengthened his expertise by working with other renowned developers in the industry. Today, Vinay specializes in luxury and ultra-luxury residences across South Mumbai, helping homebuyers, investors, and landlords make informed real estate decisions.",
    image: '/vinay.png'
  },
  {
    id: '2',
    name: 'Asif Sayyed',
    role: 'Director – Sales & Business Development',
    bio: "With over 10 years of experience in the real estate industry, Asif Sayyed brings extensive market knowledge, strategic sales expertise, and a passion for delivering exceptional client experiences. Having worked with several of India's leading real estate developers, Asif has built a strong understanding of residential sales, customer advisory, and business development. As Director – Sales & Business Development at Gem Homes Advisory & Realtors, Asif plays a key role in driving business growth, nurturing client relationships, and ensuring every transaction is handled with professionalism, integrity, and attention to detail.",
    image: '/asif.png'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh & Meera Mehta',
    role: 'Ultra-Luxury Homebuyers, Worli',
    quote: 'G.H.A.R. made our transaction at Lodha World Towers entirely seamless. Vinay and Asif’s deep expertise in South Mumbai luxury developments and direct connections made all the difference.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '2',
    name: 'Ananya Singhania',
    role: 'Property Investor, Lower Parel',
    quote: 'The level of trust and transparency provided by Gem Homes Advisory & Realtors is unmatched. Their client-first approach helped us secure an extraordinary sky villa at Indiabulls Sky Forest.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: '3',
    name: 'Vikramaditya Piramal',
    role: 'HNI Homeowner, Prabhadevi',
    quote: 'Their deep market intelligence and developer network allowed us to find the ideal residence at Rustomjee Crown before public release. True luxury advisors in every sense.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const CITIES = ['All Locations', 'Lower Parel', 'Prabhadevi', 'Mahalaxmi', 'Byculla', 'Mazgaon', 'Worli'];
export const PROPERTY_TYPES = ['All Types', 'Sky Villas & Duplexes', 'Luxury Towers', 'Parkside Residences', 'Heritage Estate', 'Skyscraper Residences'];
export const PRICE_RANGES = ['All Prices', 'Under ₹5 Cr', '₹5 Cr – ₹10 Cr', '₹10 Cr – ₹25 Cr', 'Above ₹25 Cr'];
