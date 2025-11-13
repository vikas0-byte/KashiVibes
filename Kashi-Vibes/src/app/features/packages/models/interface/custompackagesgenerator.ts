interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

interface FormData {
  destinations: string[];
  duration: string;
  travelers: string;
  budget: string;
  interests: string[];
  accommodation: string;
  transport: string;
  specialRequests: string;
  contactInfo: ContactInfo;
}