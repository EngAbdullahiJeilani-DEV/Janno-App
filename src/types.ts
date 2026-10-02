export type Role = 'couple' | 'guest' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  coupleId?: string;
  avatarUrl?: string;
}

export interface CoupleProfile {
  id: string;
  partner1Name: string;
  partner2Name: string;
  nickname: string;
  profilePhoto: string;
  coverPhoto: string;
  relationshipStartDate: string; // YYYY-MM-DD
  engagementDate?: string;
  weddingDate?: string;
  anniversaryDate?: string;
  location: string;
  loveStory: string;
  favoriteSong: string;
  favoriteSongArtist?: string;
  favoriteColor: string;
  personalMessage: string;
  slug: string; // e.g. "ahmed-and-ayaan"
}

export interface TimelineEvent {
  id: string;
  coupleId: string;
  date: string;
  title: string;
  description: string;
  photoUrl: string;
  location?: string;
  iconType?: 'heart' | 'ring' | 'rose' | 'home' | 'chat' | 'star' | 'plane';
}

export interface MemoryItem {
  id: string;
  coupleId: string;
  title: string;
  date: string;
  photoUrl: string;
  album: 'First Date' | 'Favorite Memories' | 'Engagement' | 'Wedding' | 'Travels' | 'Anniversary';
  caption: string;
  location?: string;
}

export interface LoveLetter {
  id: string;
  coupleId: string;
  toName: string;
  fromName: string;
  subject: string;
  message: string;
  date: string;
  fontStyle: 'handwriting' | 'serif' | 'sans';
  backgroundTheme: 'parchment' | 'rose-gold' | 'midnight' | 'silk';
  waxSeal: 'heart' | 'crown' | 'ring' | 'rose';
  isOpened?: boolean;
  photoUrl?: string;
}

export type GiftType = 
  | 'letter' 
  | 'box' 
  | 'roses' 
  | 'ring' 
  | 'chocolate' 
  | 'teddy' 
  | 'memories' 
  | 'song' 
  | 'video' 
  | 'premium';

export interface SurpriseGift {
  id: string;
  coupleId: string;
  senderName: string;
  recipientName: string;
  giftType: GiftType;
  title: string;
  personalMessage: string;
  scheduledDate: string;
  scheduledTime?: string;
  isAnonymous?: boolean;
  photoUrls?: string[];
  songTitle?: string;
  isOpened: boolean;
  openedAt?: string;
}

export type InvitationTheme = 
  | 'luxury-gold' 
  | 'elegant-rose' 
  | 'royal-burgundy' 
  | 'minimal-white' 
  | 'islamic-wedding' 
  | 'black-gold' 
  | 'floral-wedding' 
  | 'classic-traditional';

export interface WeddingInvitation {
  id: string;
  coupleId: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  address: string;
  googleMapsUrl: string;
  weddingMessage: string;
  dressCode: string;
  rsvpDeadline: string;
  theme: InvitationTheme;
  coverImage: string;
}

export interface RSVPResponse {
  id: string;
  invitationId: string;
  guestName: string;
  attendance: 'attending' | 'not-attending' | 'maybe';
  guestCount: number;
  mealPreference: string;
  message: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Wedding Gifts' | 'Anniversary Gifts' | "Valentine's Gifts" | 'Birthday Gifts' | 'Proposal Gifts' | 'Romantic Gifts' | 'Customized Gifts';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  giftNote?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingName: string;
  shippingAddress: string;
  deliveryDate: string;
  paymentMethod: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'surprise' | 'letter' | 'invitation' | 'rsvp' | 'order' | 'anniversary';
  isRead: boolean;
  linkUrl?: string;
}

export interface GuestbookMessage {
  id: string;
  coupleSlug: string;
  authorName: string;
  message: string;
  date: string;
  likes: number;
}
