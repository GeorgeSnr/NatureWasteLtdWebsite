"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ClientRequest,
  RequestStatus,
  RequestPriority,
  AnnouncementBannerData,
  CompanySettings,
} from "@/types/admin";
import { initialClientRequests } from "@/data/initialRequests";
import {
  initialAnnouncementBanner,
  initialCompanySettings,
} from "@/data/initialCompanySettings";
import { SuburbCoverage, ugandaCoverageAreas } from "@/data/ugandaCoverage";
import { PricingPlan, pricingPlans } from "@/data/pricingPlans";
import { ServiceCategory, wasteServicesList } from "@/data/wasteServices";
import { BlogPost, blogPosts } from "@/data/blogPosts";
import { TestimonialItem, testimonials } from "@/data/testimonials";
import { ProjectItem, recentProjects } from "@/data/projects";

interface WebsiteDataContextType {
  // State
  isLoaded: boolean;
  requests: ClientRequest[];
  announcement: AnnouncementBannerData;
  companySettings: CompanySettings;
  coverageAreas: SuburbCoverage[];
  pricingList: PricingPlan[];
  wasteServices: ServiceCategory[];
  articles: BlogPost[];
  customerReviews: TestimonialItem[];
  projectsList: ProjectItem[];

  // Request handlers
  submitRequest: (
    data: Omit<ClientRequest, "id" | "createdAt" | "status" | "priority"> &
      Partial<Pick<ClientRequest, "status" | "priority">>
  ) => ClientRequest;
  updateRequestStatus: (id: string, status: RequestStatus) => void;
  updateRequestPriority: (id: string, priority: RequestPriority) => void;
  assignRequest: (id: string, assignedTo: string) => void;
  addRequestNote: (requestId: string, content: string, author?: string) => void;
  deleteRequest: (id: string) => void;

  // Content handlers
  updateAnnouncement: (data: Partial<AnnouncementBannerData>) => void;
  updateCompanySettings: (data: Partial<CompanySettings>) => void;
  addCoverageArea: (area: SuburbCoverage) => void;
  editCoverageArea: (id: string, updated: Partial<SuburbCoverage>) => void;
  deleteCoverageArea: (id: string) => void;
  editPricingPlan: (id: string, updated: Partial<PricingPlan>) => void;
  editWasteService: (id: string, updated: Partial<ServiceCategory>) => void;
  addBlogPost: (post: BlogPost) => void;
  editBlogPost: (slug: string, updated: Partial<BlogPost>) => void;
  deleteBlogPost: (slug: string) => void;
  addTestimonial: (item: TestimonialItem) => void;
  editTestimonial: (id: string, updated: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  editProject: (id: string, updated: Partial<ProjectItem>) => void;
  resetAllToDefault: () => void;
}

const STORAGE_KEYS = {
  REQUESTS: "nw_admin_requests_v1",
  ANNOUNCEMENT: "nw_admin_announcement_v1",
  SETTINGS: "nw_admin_settings_v1",
  COVERAGE: "nw_admin_coverage_v1",
  PRICING: "nw_admin_pricing_v1",
  SERVICES: "nw_admin_services_v1",
  BLOG: "nw_admin_blog_v1",
  TESTIMONIALS: "nw_admin_testimonials_v1",
  PROJECTS: "nw_admin_projects_v1",
};

const WebsiteDataContext = createContext<WebsiteDataContextType | undefined>(undefined);

export function WebsiteDataProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [requests, setRequests] = useState<ClientRequest[]>(initialClientRequests);
  const [announcement, setAnnouncement] = useState<AnnouncementBannerData>(initialAnnouncementBanner);
  const [companySettings, setCompanySettings] = useState<CompanySettings>(initialCompanySettings);
  const [coverageAreas, setCoverageAreas] = useState<SuburbCoverage[]>(ugandaCoverageAreas);
  const [pricingList, setPricingList] = useState<PricingPlan[]>(pricingPlans);
  const [wasteServices, setWasteServices] = useState<ServiceCategory[]>(wasteServicesList);
  const [articles, setArticles] = useState<BlogPost[]>(blogPosts);
  const [customerReviews, setCustomerReviews] = useState<TestimonialItem[]>(testimonials);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(recentProjects);

  // Initialize from localStorage and Neon database in client
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const storedRequests = localStorage.getItem(STORAGE_KEYS.REQUESTS);
        if (storedRequests) setRequests(JSON.parse(storedRequests));

        const storedAnnouncement = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
        if (storedAnnouncement) setAnnouncement(JSON.parse(storedAnnouncement));

        const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (storedSettings) setCompanySettings(JSON.parse(storedSettings));

        const storedCoverage = localStorage.getItem(STORAGE_KEYS.COVERAGE);
        if (storedCoverage) setCoverageAreas(JSON.parse(storedCoverage));

        const storedPricing = localStorage.getItem(STORAGE_KEYS.PRICING);
        if (storedPricing) setPricingList(JSON.parse(storedPricing));

        const storedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
        if (storedServices) setWasteServices(JSON.parse(storedServices));

        const storedBlog = localStorage.getItem(STORAGE_KEYS.BLOG);
        if (storedBlog) setArticles(JSON.parse(storedBlog));

        const storedReviews = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
        if (storedReviews) setCustomerReviews(JSON.parse(storedReviews));

        const storedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
        if (storedProjects) setProjectsList(JSON.parse(storedProjects));
      }
    } catch (e) {
      console.error("Error loading stored website data:", e);
    } finally {
      setIsLoaded(true);
    }

    // Fetch live requests from Neon PostgreSQL
    fetch("/api/requests")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.requests) && data.requests.length > 0) {
          setRequests(data.requests);
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(data.requests));
          }
        }
      })
      .catch((err) => console.warn("Could not fetch requests from Neon API:", err));

    // Fetch announcement from Neon
    fetch("/api/announcement")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.announcement) {
          setAnnouncement(data.announcement);
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(data.announcement));
          }
        }
      })
      .catch(() => {});

    // Fetch settings from Neon
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setCompanySettings(data.settings);
          if (typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
          }
        }
      })
      .catch(() => {});
  }, []);

  // Save requests
  const saveRequests = (newRequests: ClientRequest[]) => {
    setRequests(newRequests);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(newRequests));
    }
  };

  // Submit request (called by customer forms)
  const submitRequest = (
    data: Omit<ClientRequest, "id" | "createdAt" | "status" | "priority"> &
      Partial<Pick<ClientRequest, "status" | "priority">>
  ): ClientRequest => {
    const newReq: ClientRequest = {
      ...data,
      id: `REQ-${new Date().getFullYear()}-${String(requests.length + 1).padStart(3, "0")}`,
      status: data.status || "new",
      priority: data.priority || "normal",
      createdAt: new Date().toISOString(),
    };
    const updated = [newReq, ...requests];
    saveRequests(updated);

    // Sync to Neon
    fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReq),
    }).catch((err) => console.error("Error saving request to Neon:", err));

    return newReq;
  };

  const updateRequestStatus = (id: string, status: RequestStatus) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r
    );
    saveRequests(updated);

    fetch("/api/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    }).catch((err) => console.error("Error updating status in Neon:", err));
  };

  const updateRequestPriority = (id: string, priority: RequestPriority) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, priority, updatedAt: new Date().toISOString() } : r
    );
    saveRequests(updated);

    fetch("/api/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, priority }),
    }).catch((err) => console.error("Error updating priority in Neon:", err));
  };

  const assignRequest = (id: string, assignedTo: string) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, assignedTo, updatedAt: new Date().toISOString() } : r
    );
    saveRequests(updated);

    fetch("/api/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, assignedTo }),
    }).catch((err) => console.error("Error assigning request in Neon:", err));
  };

  const addRequestNote = (requestId: string, content: string, author: string = "Admin Dispatch") => {
    const newNote = {
      id: `note-${Date.now()}`,
      author,
      content,
      createdAt: new Date().toISOString(),
    };
    const updated = requests.map((r) =>
      r.id === requestId
        ? {
            ...r,
            notes: [...(r.notes || []), newNote],
            updatedAt: new Date().toISOString(),
          }
        : r
    );
    saveRequests(updated);

    fetch("/api/requests", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: requestId, note: { content, author } }),
    }).catch((err) => console.error("Error adding note in Neon:", err));
  };

  const deleteRequest = (id: string) => {
    const updated = requests.filter((r) => r.id !== id);
    saveRequests(updated);
  };

  // Announcement
  const updateAnnouncement = (data: Partial<AnnouncementBannerData>) => {
    const updated = { ...announcement, ...data };
    setAnnouncement(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(updated));
      sessionStorage.removeItem("nw_announcement_dismissed");
    }

    fetch("/api/announcement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    }).catch((err) => console.error("Error updating banner in Neon:", err));
  };

  // Company Settings
  const updateCompanySettings = (data: Partial<CompanySettings>) => {
    const updated = { ...companySettings, ...data };
    setCompanySettings(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    }

    fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    }).catch((err) => console.error("Error updating settings in Neon:", err));
  };

  // Coverage Areas
  const addCoverageArea = (area: SuburbCoverage) => {
    const updated = [...coverageAreas, area];
    setCoverageAreas(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.COVERAGE, JSON.stringify(updated));
    }
  };

  const editCoverageArea = (id: string, updatedData: Partial<SuburbCoverage>) => {
    const updated = coverageAreas.map((a) => (a.id === id ? { ...a, ...updatedData } : a));
    setCoverageAreas(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.COVERAGE, JSON.stringify(updated));
    }
  };

  const deleteCoverageArea = (id: string) => {
    const updated = coverageAreas.filter((a) => a.id !== id);
    setCoverageAreas(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.COVERAGE, JSON.stringify(updated));
    }
  };

  // Pricing
  const editPricingPlan = (id: string, updatedData: Partial<PricingPlan>) => {
    const updated = pricingList.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
    setPricingList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(updated));
    }
  };

  // Services
  const editWasteService = (id: string, updatedData: Partial<ServiceCategory>) => {
    const updated = wasteServices.map((s) => (s.id === id ? { ...s, ...updatedData } : s));
    setWasteServices(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
    }
  };

  // Blog
  const addBlogPost = (post: BlogPost) => {
    const updated = [post, ...articles];
    setArticles(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(updated));
    }
  };

  const editBlogPost = (slug: string, updatedData: Partial<BlogPost>) => {
    const updated = articles.map((b) => (b.slug === slug ? { ...b, ...updatedData } : b));
    setArticles(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(updated));
    }
  };

  const deleteBlogPost = (slug: string) => {
    const updated = articles.filter((b) => b.slug !== slug);
    setArticles(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(updated));
    }
  };

  // Testimonials
  const addTestimonial = (item: TestimonialItem) => {
    const updated = [item, ...customerReviews];
    setCustomerReviews(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
    }
  };

  const editTestimonial = (id: string, updatedData: Partial<TestimonialItem>) => {
    const updated = customerReviews.map((t) => (t.id === id ? { ...t, ...updatedData } : t));
    setCustomerReviews(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
    }
  };

  const deleteTestimonial = (id: string) => {
    const updated = customerReviews.filter((t) => t.id !== id);
    setCustomerReviews(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
    }
  };

  // Projects
  const editProject = (id: string, updatedData: Partial<ProjectItem>) => {
    const updated = projectsList.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
    setProjectsList(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
    }
  };

  // Reset to default factory settings
  const resetAllToDefault = () => {
    setRequests(initialClientRequests);
    setAnnouncement(initialAnnouncementBanner);
    setCompanySettings(initialCompanySettings);
    setCoverageAreas(ugandaCoverageAreas);
    setPricingList(pricingPlans);
    setWasteServices(wasteServicesList);
    setArticles(blogPosts);
    setCustomerReviews(testimonials);
    setProjectsList(recentProjects);

    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    }
  };

  return (
    <WebsiteDataContext.Provider
      value={{
        isLoaded,
        requests,
        announcement,
        companySettings,
        coverageAreas,
        pricingList,
        wasteServices,
        articles,
        customerReviews,
        projectsList,
        submitRequest,
        updateRequestStatus,
        updateRequestPriority,
        assignRequest,
        addRequestNote,
        deleteRequest,
        updateAnnouncement,
        updateCompanySettings,
        addCoverageArea,
        editCoverageArea,
        deleteCoverageArea,
        editPricingPlan,
        editWasteService,
        addBlogPost,
        editBlogPost,
        deleteBlogPost,
        addTestimonial,
        editTestimonial,
        deleteTestimonial,
        editProject,
        resetAllToDefault,
      }}
    >
      {children}
    </WebsiteDataContext.Provider>
  );
}

export function useWebsiteData() {
  const context = useContext(WebsiteDataContext);
  if (!context) {
    throw new Error("useWebsiteData must be used within a WebsiteDataProvider");
  }
  return context;
}
