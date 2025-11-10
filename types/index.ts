export interface PortfolioItem {
  id: string
  name: string
  icon: string
  description: string
  link?: string
}

export interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  socialLinks?: SocialLink[]
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'x' | 'twitter'
  url: string
}

export interface BlogArticle {
  id: string
  title: string
  excerpt: string
  featuredImage: string
  date: string
  slug: string
}

export interface Industry {
  id: string
  name: string
  icon: string
  description: string
}

export interface StatItem {
  value: string
  label: string
}
