export interface Company {
  id: string;
  name: string;
  slug: string;
  description: string;
  email: string;
  logo: string;
  images: string[];
  service_centers: ServiceCenter[] | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceCenter {
  id: string;
  name: string;
  phone: string;
  email: string;
  image: string;
  company_id: string;
  company: Company | null;
  mechanics: Mechanic[] | null;
  specializations: Specialization[] | null;
  services: Service[] | null;
  locations: Location | null;
  appointments: any | null;
  operating_hours: OperatingHour[] | null;
  reviews: Review[] | null;
  service_bays: ServiceBay[] | null;
  created_at: string;
  updated_at: string;
}

export interface Mechanic {
  id: string;
  user_id: string;
  user: any | null;
  service_center_id: string;
  service_center: any | null;
  experience_level: 'EXPERT' | string;
  is_active: boolean;
  years_of_exp: number;
  appointments: any | null;
  specializations: any | null;
  created_at: string;
  updated_at: string;
}

export interface Specialization {
  id: string;
  name: string;
  description: string;
  service_center_id: string;
  service_center: any | null;
  mechanics: any | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  is_active: boolean;
  service_center_id: string;
  service_center: any | null;
  appoinment_items: any | null;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  service_center_id: string;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
}

export interface OperatingHour {
  id: string;
  service_center_id: string;
  day: number;
  open_time: string;
  close_time: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceBay {
  id: string;
  name: string;
  service_center_id: string;
  service_center: any | null;
  appointments: any | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  service_center_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}