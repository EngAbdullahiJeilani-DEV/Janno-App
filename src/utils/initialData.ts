import { CoupleProfile, TimelineEvent, MemoryItem, LoveLetter, SurpriseGift, WeddingInvitation, Product, AppNotification, GuestbookMessage, User } from '../types';

export const initialUser: User = {
  id: 'usr_1',
  name: 'Ahmed',
  email: 'ahmed@janno.love',
  role: 'couple',
  coupleId: 'cpl_1',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
};

export const initialCoupleProfile: CoupleProfile = {
  id: 'cpl_1',
  partner1Name: 'Ahmed',
  partner2Name: 'Ayaan',
  nickname: 'Ah & Ay',
  profilePhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  coverPhoto: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80',
  relationshipStartDate: '2023-06-20',
  engagementDate: '2025-02-14',
  weddingDate: '2027-06-12',
  anniversaryDate: '2027-06-12',
  location: 'Dubai & Istanbul',
  loveStory: 'We met on a rainy summer evening at a cozy rooftop coffee shop. From our very first conversation about poetry, architecture, and dream destinations, we knew our hearts spoke the same language. Three wonderful years later, every day feels like the start of our favorite story.',
  favoriteSong: 'Perfect - Ed Sheeran',
  favoriteSongArtist: 'Ed Sheeran',
  favoriteColor: 'Deep Rose & Champagne Gold',
  personalMessage: 'You are my today and all of my tomorrows. Forever yours.',
  slug: 'ahmed-and-ayaan'
};

export const initialTimelineEvents: TimelineEvent[] = [
  {
    id: 'tl_1',
    coupleId: 'cpl_1',
    date: 'June 20, 2023',
    title: 'First Meeting ❤️',
    description: 'We bumped into each other at the Artisan Coffee Roasters in downtown Dubai. A spilled latte led to a 4-hour conversation.',
    photoUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    location: 'Dubai, UAE',
    iconType: 'heart'
  },
  {
    id: 'tl_2',
    coupleId: 'cpl_1',
    date: 'July 15, 2023',
    title: 'First Conversation 💬',
    description: 'Our midnight phone call lasted till 5:00 AM as we watched the sunrise over the city skyline together over FaceTime.',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    location: 'Dubai Marina',
    iconType: 'chat'
  },
  {
    id: 'tl_3',
    coupleId: 'cpl_1',
    date: 'August 08, 2023',
    title: 'First Date 🌹',
    description: 'A romantic candlelit dinner overlooking the Dubai Fountains followed by late-night ice cream along the beach walk.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    location: 'Jumeirah Beach',
    iconType: 'rose'
  },
  {
    id: 'tl_4',
    coupleId: 'cpl_1',
    date: 'February 14, 2025',
    title: 'The Proposal & Engagement 💍',
    description: 'Under a canopy of fairy lights on a private yacht in the Bosphorus Strait, Ahmed got down on one knee. Ayaan wept tears of joy and said YES!',
    photoUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
    location: 'Istanbul, Turkey',
    iconType: 'ring'
  },
  {
    id: 'tl_5',
    coupleId: 'cpl_1',
    date: 'June 12, 2027',
    title: 'Our Grand Wedding 💒',
    description: 'The big day where we tie the knot surrounded by our cherished family, friends, and endless floral splendour.',
    photoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    location: 'Palazzo Luxury Resort',
    iconType: 'home'
  }
];

export const initialMemories: MemoryItem[] = [
  {
    id: 'mem_1',
    coupleId: 'cpl_1',
    title: 'Sunset Cruise in Bosphorus',
    date: 'February 14, 2025',
    photoUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    album: 'Engagement',
    caption: 'The moment right before he asked the question that changed our lives forever.',
    location: 'Istanbul, Turkey'
  },
  {
    id: 'mem_2',
    coupleId: 'cpl_1',
    title: 'Picnic at Miracle Garden',
    date: 'November 24, 2024',
    photoUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
    album: 'Favorite Memories',
    caption: 'Surrounded by millions of blooming roses under a warm winter sky.',
    location: 'Dubai'
  },
  {
    id: 'mem_3',
    coupleId: 'cpl_1',
    title: 'Hot Air Balloon at Sunrise',
    date: 'October 10, 2024',
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    album: 'Travels',
    caption: 'Floating above the golden desert sand dunes together as dawn broke.',
    location: 'Cappadocia'
  },
  {
    id: 'mem_4',
    coupleId: 'cpl_1',
    title: 'Our First Anniversary Celebration',
    date: 'June 20, 2024',
    photoUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
    album: 'Anniversary',
    caption: '365 days of laughter, warmth, and unconditional love.',
    location: 'Rooftop Lounge'
  },
  {
    id: 'mem_5',
    coupleId: 'cpl_1',
    title: 'Cozy Coffee Date',
    date: 'June 20, 2023',
    photoUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    album: 'First Date',
    caption: 'Where it all started over two mugs of cappuccino.',
    location: 'Artisan Coffee'
  },
  {
    id: 'mem_6',
    coupleId: 'cpl_1',
    title: 'Wedding Location Scouting',
    date: 'March 01, 2026',
    photoUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    album: 'Wedding',
    caption: 'Falling in love with the grand ballroom venue for our upcoming wedding.',
    location: 'Palazzo Resort'
  }
];

export const initialLetters: LoveLetter[] = [
  {
    id: 'ltr_1',
    coupleId: 'cpl_1',
    toName: 'Ayaan',
    fromName: 'Ahmed',
    subject: 'My Promise to You',
    message: 'My dearest Ayaan,\n\nWhen I look into your eyes, I see my entire world. You have brought so much light, peace, and laughter into my life since the day we met.\n\nThank you for choosing me every single day. I promise to cherish your smile, hold your hand through every storm, and love you more with every breath.\n\nYours always,\nAhmed',
    date: 'October 02, 2026',
    fontStyle: 'handwriting',
    backgroundTheme: 'parchment',
    waxSeal: 'heart',
    isOpened: true,
    photoUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ltr_2',
    coupleId: 'cpl_1',
    toName: 'Ahmed',
    fromName: 'Ayaan',
    subject: 'A Surprise Note for My Heart',
    message: 'Dearest Ahmed,\n\nI was just thinking about the rainy day we met at the coffee shop. Who would have thought that a spilled cup of coffee would lead us to a lifetime of love?\n\nYou are my safe haven, my best friend, and my greatest blessing.\n\nAll my love,\nAyaan ❤️',
    date: 'September 28, 2026',
    fontStyle: 'serif',
    backgroundTheme: 'rose-gold',
    waxSeal: 'rose',
    isOpened: false
  }
];

export const initialSurprises: SurpriseGift[] = [
  {
    id: 'srp_1',
    coupleId: 'cpl_1',
    senderName: 'Ahmed',
    recipientName: 'Ayaan',
    giftType: 'ring',
    title: 'A Romantic Surprise For My Queen ❤️',
    personalMessage: 'You are one of the most beautiful chapters of my life. Every day with you is a gift from heaven. I love you beyond words!',
    scheduledDate: '2026-10-02',
    isAnonymous: false,
    photoUrls: [
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80'
    ],
    songTitle: 'Perfect - Ed Sheeran',
    isOpened: false
  }
];

export const initialInvitations: WeddingInvitation[] = [
  {
    id: 'inv_1',
    coupleId: 'cpl_1',
    brideName: 'Ayaan Khan',
    groomName: 'Ahmed Mansoor',
    weddingDate: '2027-06-12',
    weddingTime: '06:00 PM',
    venueName: 'The Royal Palazzo Grand Ballroom',
    address: 'Palm Jumeirah Boulevard, Villa 42, Dubai, UAE',
    googleMapsUrl: 'https://maps.google.com',
    weddingMessage: 'Together with our families, we joyfully invite you to celebrate our union of love and marriage as we begin our new journey together.',
    dressCode: 'Black Tie & Elegant Luxury Attire',
    rsvpDeadline: '2027-05-15',
    theme: 'luxury-gold',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod_1',
    name: 'Eternal Rose Crystal Box',
    category: 'Romantic Gifts',
    price: 129,
    originalPrice: 169,
    rating: 4.9,
    reviewsCount: 128,
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
    description: 'Handcrafted preserved real rose inside an illuminated acrylic luxury jewelry display case that lasts forever.',
    inStock: true,
    isBestseller: true
  },
  {
    id: 'prod_2',
    name: 'Custom Intertwined Initials Ring Set',
    category: 'Proposal Gifts',
    price: 249,
    originalPrice: 299,
    rating: 5.0,
    reviewsCount: 94,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    description: '18K Rose Gold plated sterling silver promise ring set customized with couple initials and anniversary date.',
    inStock: true,
    isBestseller: true
  },
  {
    id: 'prod_3',
    name: 'Gourmet Artisan Belgian Chocolates',
    category: "Valentine's Gifts",
    price: 75,
    rating: 4.8,
    reviewsCount: 210,
    imageUrl: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
    description: '24 luxury handcrafted truffles in a velvet heart-shaped box with gold foil wrapping.',
    inStock: true
  },
  {
    id: 'prod_4',
    name: 'Giant Luxury Plush Teddy Bear',
    category: 'Anniversary Gifts',
    price: 89,
    originalPrice: 110,
    rating: 4.9,
    reviewsCount: 65,
    imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-soft 4-foot giant plush teddy bear holding a velvet heart embroidered with "Forever Yours".',
    inStock: true
  },
  {
    id: 'prod_5',
    name: 'Engraved Luxury Couple Watch Set',
    category: 'Wedding Gifts',
    price: 389,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 42,
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
    description: 'Pair of matching minimalist luxury wristwatches engraved with couple names and wedding coordinates.',
    inStock: true,
    isBestseller: true
  },
  {
    id: 'prod_6',
    name: 'Aroma Romantic Massage & Candle Kit',
    category: 'Customized Gifts',
    price: 65,
    rating: 4.7,
    reviewsCount: 88,
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
    description: 'Organic soy wax candle with rose damascena essential oils and calming massage oil set.',
    inStock: true
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'Surprise Ready! 🎁',
    message: 'Ahmed sent you a romantic surprise box! Open it now.',
    timestamp: '10 mins ago',
    type: 'surprise',
    isRead: false
  },
  {
    id: 'notif_2',
    title: 'New Love Letter 💌',
    message: 'You received a new wax-sealed letter from Ahmed.',
    timestamp: '2 hours ago',
    type: 'letter',
    isRead: false
  },
  {
    id: 'notif_3',
    title: 'New RSVP Received 🎉',
    message: 'Tariq & Family confirmed attendance for your wedding (4 guests).',
    timestamp: 'Yesterday',
    type: 'rsvp',
    isRead: true
  }
];

export const initialGuestbook: GuestbookMessage[] = [
  {
    id: 'gb_1',
    coupleSlug: 'ahmed-and-ayaan',
    authorName: 'Sarah & Tariq',
    message: 'Wishing you both a lifetime of happiness, laughter, and endless blessings! You are such a radiant couple.',
    date: 'October 01, 2026',
    likes: 12
  },
  {
    id: 'gb_2',
    coupleSlug: 'ahmed-and-ayaan',
    authorName: 'Uncle Omar',
    message: 'May Allah bless your union and fill your home with warmth and peace. Can’t wait for the wedding celebration!',
    date: 'September 29, 2026',
    likes: 18
  }
];
