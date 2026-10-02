import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, CoupleProfile, TimelineEvent, MemoryItem, LoveLetter, 
  SurpriseGift, WeddingInvitation, Product, CartItem, Order, 
  AppNotification, GuestbookMessage, RSVPResponse 
} from '../types';
import { 
  initialUser, initialCoupleProfile, initialTimelineEvents, 
  initialMemories, initialLetters, initialSurprises, 
  initialInvitations, initialProducts, initialNotifications, 
  initialGuestbook 
} from '../utils/initialData';
import { soundManager } from '../utils/sound';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error' | 'love';
  message: string;
}

interface AppContextType {
  currentView: string;
  setCurrentView: (view: string) => void;
  user: User | null;
  setUser: (u: User | null) => void;
  coupleProfile: CoupleProfile;
  setCoupleProfile: React.Dispatch<React.SetStateAction<CoupleProfile>>;
  timelineEvents: TimelineEvent[];
  setTimelineEvents: React.Dispatch<React.SetStateAction<TimelineEvent[]>>;
  memories: MemoryItem[];
  setMemories: React.Dispatch<React.SetStateAction<MemoryItem[]>>;
  letters: LoveLetter[];
  setLetters: React.Dispatch<React.SetStateAction<LoveLetter[]>>;
  surprises: SurpriseGift[];
  setSurprises: React.Dispatch<React.SetStateAction<SurpriseGift[]>>;
  invitations: WeddingInvitation[];
  setInvitations: React.Dispatch<React.SetStateAction<WeddingInvitation[]>>;
  rsvps: RSVPResponse[];
  addRSVP: (rsvp: Omit<RSVPResponse, 'id' | 'createdAt'>) => void;
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, giftNote?: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  guestbook: GuestbookMessage[];
  addGuestbookMessage: (msg: Omit<GuestbookMessage, 'id' | 'date' | 'likes'>) => void;
  
  // Interactive Overlays & Modals
  activeSurpriseToUnbox: SurpriseGift | null;
  setActiveSurpriseToUnbox: (s: SurpriseGift | null) => void;
  activeLetterToRead: LoveLetter | null;
  setActiveLetterToRead: (l: LoveLetter | null) => void;
  activeInvitationView: WeddingInvitation | null;
  setActiveInvitationView: (inv: WeddingInvitation | null) => void;
  activePublicCoupleSlug: string;
  setActivePublicCoupleSlug: (slug: string) => void;

  // Music & Sound state
  isMuted: boolean;
  toggleMute: () => void;
  isAmbientPlaying: boolean;
  toggleAmbientMusic: () => void;

  // Dark/Light Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  // Toasts
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Demo helpers
  loginAsDemoCouple: () => void;
  loginAsDemoAdmin: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<string>('welcome');
  const [user, setUser] = useState<User | null>(initialUser);

  // Profile & Domain Data with LocalStorage Persistence
  const [coupleProfile, setCoupleProfile] = useState<CoupleProfile>(() => {
    const saved = localStorage.getItem('janno_couple');
    return saved ? JSON.parse(saved) : initialCoupleProfile;
  });

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('janno_timeline');
    return saved ? JSON.parse(saved) : initialTimelineEvents;
  });

  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('janno_memories');
    return saved ? JSON.parse(saved) : initialMemories;
  });

  const [letters, setLetters] = useState<LoveLetter[]>(() => {
    const saved = localStorage.getItem('janno_letters');
    return saved ? JSON.parse(saved) : initialLetters;
  });

  const [surprises, setSurprises] = useState<SurpriseGift[]>(() => {
    const saved = localStorage.getItem('janno_surprises');
    return saved ? JSON.parse(saved) : initialSurprises;
  });

  const [invitations, setInvitations] = useState<WeddingInvitation[]>(() => {
    const saved = localStorage.getItem('janno_invitations');
    return saved ? JSON.parse(saved) : initialInvitations;
  });

  const [rsvps, setRsvps] = useState<RSVPResponse[]>(() => {
    const saved = localStorage.getItem('janno_rsvps');
    return saved ? JSON.parse(saved) : [
      {
        id: 'rsvp_1',
        invitationId: 'inv_1',
        guestName: 'Tariq Al-Mansoor',
        attendance: 'attending',
        guestCount: 4,
        mealPreference: 'Halal Gourmet',
        message: 'Looking forward to the joyful celebration!',
        createdAt: '2026-09-30'
      },
      {
        id: 'rsvp_2',
        invitationId: 'inv_1',
        guestName: 'Fatima & Zayd',
        attendance: 'attending',
        guestCount: 2,
        mealPreference: 'Seafood Special',
        message: 'Congratulations Ahmed & Ayaan!',
        createdAt: '2026-10-01'
      }
    ];
  });

  const [products] = useState<Product[]>(initialProducts);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('janno_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('janno_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [guestbook, setGuestbook] = useState<GuestbookMessage[]>(initialGuestbook);

  // Active Modal Controls
  const [activeSurpriseToUnbox, setActiveSurpriseToUnbox] = useState<SurpriseGift | null>(null);
  const [activeLetterToRead, setActiveLetterToRead] = useState<LoveLetter | null>(null);
  const [activeInvitationView, setActiveInvitationView] = useState<WeddingInvitation | null>(null);
  const [activePublicCoupleSlug, setActivePublicCoupleSlug] = useState<string>('ahmed-and-ayaan');

  // Sound & Theme state
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Toasts State
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('janno_couple', JSON.stringify(coupleProfile));
  }, [coupleProfile]);

  useEffect(() => {
    localStorage.setItem('janno_timeline', JSON.stringify(timelineEvents));
  }, [timelineEvents]);

  useEffect(() => {
    localStorage.setItem('janno_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('janno_letters', JSON.stringify(letters));
  }, [letters]);

  useEffect(() => {
    localStorage.setItem('janno_surprises', JSON.stringify(surprises));
  }, [surprises]);

  useEffect(() => {
    localStorage.setItem('janno_invitations', JSON.stringify(invitations));
  }, [invitations]);

  useEffect(() => {
    localStorage.setItem('janno_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('janno_orders', JSON.stringify(orders));
  }, [orders]);

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    soundManager.playShimmerSound();
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (muted) {
      setIsAmbientPlaying(false);
      addToast('Audio muted', 'info');
    } else {
      addToast('Audio unmuted', 'success');
    }
  };

  const toggleAmbientMusic = () => {
    const playing = soundManager.toggleAmbientMusic();
    setIsAmbientPlaying(playing);
    if (playing) {
      addToast('Playing ambient love melody 🎵', 'love');
    } else {
      addToast('Ambient music stopped', 'info');
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const addToCart = (product: Product, quantity = 1, giftNote?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, giftNote: giftNote || item.giftNote }
            : item
        );
      }
      return [...prev, { product, quantity, giftNote }];
    });
    addToast(`Added "${product.name}" to cart 🛍️`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now().toString(36)}`,
      status: 'Processing',
      createdAt: new Date().toLocaleDateString()
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    addToast('Order placed successfully! 🎉', 'success');
    return newOrder;
  };

  const addRSVP = (rsvpData: Omit<RSVPResponse, 'id' | 'createdAt'>) => {
    const newRsvp: RSVPResponse = {
      ...rsvpData,
      id: `rsvp_${Date.now().toString(36)}`,
      createdAt: new Date().toLocaleDateString()
    };
    setRsvps(prev => [newRsvp, ...prev]);
    
    // Add notification to couple
    const notif: AppNotification = {
      id: `notif_${Date.now().toString(36)}`,
      title: 'New RSVP Received 🎉',
      message: `${rsvpData.guestName} (${rsvpData.guestCount} guests) - ${rsvpData.attendance}`,
      timestamp: 'Just now',
      type: 'rsvp',
      isRead: false
    };
    setNotifications(prev => [notif, ...prev]);
    addToast('Thank you! Your RSVP has been submitted ❤️', 'love');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const addGuestbookMessage = (msg: Omit<GuestbookMessage, 'id' | 'date' | 'likes'>) => {
    const newMsg: GuestbookMessage = {
      ...msg,
      id: `gb_${Date.now().toString(36)}`,
      date: new Date().toLocaleDateString(),
      likes: 1
    };
    setGuestbook(prev => [newMsg, ...prev]);
    addToast('Wishes posted to Love Page! ❤️', 'success');
  };

  const loginAsDemoCouple = () => {
    setUser(initialUser);
    addToast('Signed in as Ahmed ❤️ (Couple Account)', 'success');
    setCurrentView('dashboard');
  };

  const loginAsDemoAdmin = () => {
    setUser({
      id: 'usr_admin',
      name: 'Janno Admin',
      email: 'admin@janno.love',
      role: 'admin'
    });
    addToast('Signed in as Janno Admin 👑', 'info');
    setCurrentView('admin');
  };

  const logout = () => {
    setUser(null);
    addToast('Logged out of Janno', 'info');
    setCurrentView('landing');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        user,
        setUser,
        coupleProfile,
        setCoupleProfile,
        timelineEvents,
        setTimelineEvents,
        memories,
        setMemories,
        letters,
        setLetters,
        surprises,
        setSurprises,
        invitations,
        setInvitations,
        rsvps,
        addRSVP,
        products,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        orders,
        createOrder,
        notifications,
        markNotificationRead,
        guestbook,
        addGuestbookMessage,
        activeSurpriseToUnbox,
        setActiveSurpriseToUnbox,
        activeLetterToRead,
        setActiveLetterToRead,
        activeInvitationView,
        setActiveInvitationView,
        activePublicCoupleSlug,
        setActivePublicCoupleSlug,
        isMuted,
        toggleMute,
        isAmbientPlaying,
        toggleAmbientMusic,
        isDarkMode,
        toggleDarkMode,
        toasts,
        addToast,
        removeToast,
        loginAsDemoCouple,
        loginAsDemoAdmin,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
