export interface BannerConfig {
  logoText: string;
  headline: string;
  subtitle: string;
  ctaText: string;
  locationLabel: string;
  propertyTypeLabel: string;
  priceRangeLabel: string;
  selectedLocation: string;
  selectedPropertyType: string;
  selectedPriceRange: string;
  bannerRadius: string; // 'rounded-3xl', 'rounded-2xl', 'rounded-none'
  showFilterBar: boolean;
  showNavbar: boolean;
}

export interface PropertyConfigItem {
  type: string;
  carpetArea: string;
  priceRange: string;
}

export interface PropertyFAQ {
  question: string;
  answer: string;
}

export interface PropertyGalleryItem {
  url: string;
  caption: string;
}

export interface PropertyLocationLandmark {
  name: string;
  distance: string;
}

export interface Property {
  id: string;
  title: string;
  developer?: string;
  location: string;
  city: string;
  type: string;
  price: number;
  priceDisplay: string;
  pricePerSqft?: string;
  sqft: string;
  beds: string;
  baths: number;
  status: string;
  completionStatus: string;
  configuration: string;
  amenities: string;
  image: string;
  description: string;
  featured?: boolean;
  // Enhanced detailed tabs & specs
  overviewHighlights?: string[];
  possessionDate?: string;
  reraId?: string;
  projectArea?: string;
  totalUnitsStructure?: string;
  launchDate?: string;
  designLegends?: { role: string; name: string }[];
  amenitiesCategories?: { category: string; items: string; icon: string }[];
  localityHighlights?: { category: string; items: string; icon: string }[];
  gallery?: PropertyGalleryItem[];
  configsList?: PropertyConfigItem[];
  locationLandmarks?: PropertyLocationLandmark[];
  faqs?: PropertyFAQ[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}
