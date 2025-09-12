import {
  Home,
  Users,
  Calendar,
  Image,
  Trophy,
  FileText,
  Settings,
  Mail,
  BarChart3,
  Globe,
  Bell,
  Search,
  Tag,
} from "lucide-react";

export interface NavigationItem {
  id: string;
  name: string;
  icon: any; // Lucide icon component
  active?: boolean;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "home-controls",
    name: "Home Page Controls",
    icon: Home,
  },
  {
    id: "athlete-management",
    name: "Athlete Management",
    icon: Users,
  },
  {
    id: "event-management",
    name: "Event Management",
    icon: Calendar,
  },
  {
    id: "news-management",
    name: "News Management",
    icon: FileText,
  },
  {
    id: "tags-management",
    name: "Tags Management",
    icon: Tag,
  },
  {
    id: "gallery-management",
    name: "Gallery Management",
    icon: Image,
  },
  {
    id: "medal-tracker",
    name: "Medal Tracker",
    icon: Trophy,
  },
  {
    id: "sponsor-management",
    name: "Sponsor Management",
    icon: Globe,
  },
  {
    id: "user-management",
    name: "User Management",
    icon: Users,
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: BarChart3,
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: Bell,
  },
  {
    id: "contact-messages",
    name: "Contact Messages",
    icon: Mail,
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
  },
  {
    id: "reports",
    name: "Reports & Analytics",
    icon: BarChart3,
  },
  {
    id: "permissions",
    name: "User Permissions",
    icon: Users,
  },
  {
    id: "content-moderation",
    name: "Content Moderation",
    icon: FileText,
  },
  {
    id: "backup-restore",
    name: "Backup & Restore",
    icon: Settings,
  },
  {
    id: "system-logs",
    name: "System Logs",
    icon: FileText,
  },
  {
    id: "api-management",
    name: "API Management",
    icon: Globe,
  },
  {
    id: "email-campaigns",
    name: "Email Campaigns",
    icon: Mail,
  },
  {
    id: "social-media",
    name: "Social Media",
    icon: Globe,
  },
  {
    id: "seo-tools",
    name: "SEO Tools",
    icon: Search,
  },
  {
    id: "security",
    name: "Security Center",
    icon: Settings,
  },
];
