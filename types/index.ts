export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  body: string;
}
