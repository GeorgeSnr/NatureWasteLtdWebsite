"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useWebsiteData } from "@/context/WebsiteDataContext";
import {
  Bell,
  CheckCircle2,
  Save,
  Eye,
  ArrowRight,
  AlertTriangle,
  Info,
  AlertCircle,
  X,
  Edit3,
  ExternalLink,
  Sparkles,
  Check,
  Radio,
  Clock,
  RotateCcw,
  Smartphone,
  Monitor,
} from "lucide-react";
import { AnnouncementBannerData } from "@/types/admin";

interface RouteNoticePreset {
  title: string;
  badge: string;
  type: "info" | "warning" | "emergency" | "success";
  message: string;
  linkText: string;
  linkUrl: string;
  description: string;
}

const PRESET_TEMPLATES: RouteNoticePreset[] = [
  {
    title: "Public Holiday Route Adjustment",
    badge: "Holiday Notice",
    type: "warning",
    message:
      "Due to the public holiday, Friday curbside pickups in Kitende, Lubowa, and Kajjansi will be serviced on Saturday morning starting at 6:30 AM.",
    linkText: "View Route Schedule",
    linkUrl: "/#schedule-finder",
    description: "Notify residential clients of adjusted pickup days ahead of national holidays.",
  },
  {
    title: "Severe Weather / Route Delay",
    badge: "Weather Alert",
    type: "emergency",
    message:
      "Heavy rains and flash floods along Entebbe Expressway corridor are causing 2-hour operational delays for afternoon collection crews. Thank you for your patience.",
    linkText: "Dispatch Hotline",
    linkUrl: "tel:+256766532915",
    description: "Alert residents of temporary truck delays due to adverse weather or road closures.",
  },
  {
    title: "EcoRewards Points & Sorting Campaign",
    badge: "EcoRewards Promo",
    type: "success",
    message:
      "Earn double EcoRewards points this month! Sort clean PET plastics into your yellow sack and redeem airtime vouchers upon verified weigh-in.",
    linkText: "View Rewards Rates",
    linkUrl: "/pricing",
    description: "Incentivize household segregation and reward participation in circular recovery.",
  },
  {
    title: "Commercial Skip Container Capacity",
    badge: "Commercial Notice",
    type: "info",
    message:
      "Same-day 10m³ and 15m³ heavy-duty roll-off skip container deliveries now available for construction and industrial sites across Kampala South & Wakiso.",
    linkText: "Request Skip Delivery",
    linkUrl: "/#quote-calculator",
    description: "Promote available industrial container capacity to commercial project managers.",
  },
];

const PRESET_TAGS = [
  "Operational Update",
  "Holiday Notice",
  "Route Reschedule",
  "Weather Alert",
  "EcoRewards Promo",
  "Commercial Notice",
  "Statutory Compliance",
];

export default function AnnouncementAdminPage() {
  const { announcement, updateAnnouncement } = useWebsiteData();

  // Dialogue Box (Modal) state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Success Feedback state
  const [successNotification, setSuccessNotification] = useState<{
    visible: boolean;
    badge: string;
    message: string;
    enabled: boolean;
    timestamp: string;
  } | null>(null);

  const [toastAlert, setToastAlert] = useState<{
    visible: boolean;
    title: string;
    message: string;
  } | null>(null);

  // Preview device simulation state
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  // Edit form state
  const [form, setForm] = useState<AnnouncementBannerData>({
    enabled: announcement?.enabled ?? true,
    message:
      announcement?.message ||
      "Due to Independence Day holiday, Friday pickup in Kitende will move to Saturday morning.",
    badge: announcement?.badge || "Operational Update",
    linkText: announcement?.linkText || "Check Schedule",
    linkUrl: announcement?.linkUrl || "/#schedule-finder",
    type: announcement?.type || "info",
  });

  // Sync form when announcement changes externally if modal is closed
  useEffect(() => {
    if (!isModalOpen && announcement) {
      setForm({
        enabled: announcement.enabled,
        message: announcement.message,
        badge: announcement.badge || "Operational Update",
        linkText: announcement.linkText || "",
        linkUrl: announcement.linkUrl || "",
        type: announcement.type || "info",
      });
    }
  }, [announcement, isModalOpen]);

  // Handle ESC key to close dialogue box gracefully
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen && !isPublishing) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, isPublishing]);

  // Auto-dismiss floating toast after 6 seconds
  useEffect(() => {
    if (toastAlert?.visible) {
      const timer = setTimeout(() => {
        setToastAlert(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toastAlert]);

  // Open modal with current or preset values
  const handleOpenModal = (preset?: Partial<AnnouncementBannerData>) => {
    if (preset) {
      setForm((prev) => ({
        ...prev,
        ...preset,
      }));
    } else {
      setForm({
        enabled: announcement.enabled,
        message: announcement.message,
        badge: announcement.badge || "Operational Update",
        linkText: announcement.linkText || "",
        linkUrl: announcement.linkUrl || "",
        type: announcement.type || "info",
      });
    }
    setIsModalOpen(true);
  };

  // Close modal gracefully
  const handleCloseModal = () => {
    if (isPublishing) return;
    setIsModalOpen(false);
  };

  // Quick toggle on main page
  const handleQuickToggle = () => {
    const nextState = !announcement.enabled;
    updateAnnouncement({ enabled: nextState });

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setSuccessNotification({
      visible: true,
      badge: announcement.badge || "Notice",
      message: announcement.message,
      enabled: nextState,
      timestamp: timeStr,
    });

    setToastAlert({
      visible: true,
      title: nextState ? "Banner Enabled on Live Site" : "Banner Hidden from Live Site",
      message: nextState
        ? "The announcement banner is now visible to all public visitors."
        : "The announcement banner is now hidden on the public website.",
    });
  };

  // Submit and publish announcement from modal dialogue box
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);

    // Call updateAnnouncement
    updateAnnouncement(form);

    // Provide a smooth, graceful closing transition
    setTimeout(() => {
      setIsPublishing(false);
      setIsModalOpen(false); // Gracefully close dialogue box!

      const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      // Trigger prominent success confirmation
      setSuccessNotification({
        visible: true,
        badge: form.badge || "Notice",
        message: form.message,
        enabled: form.enabled,
        timestamp: timeStr,
      });

      setToastAlert({
        visible: true,
        title: "Announcement Published Successfully!",
        message: form.enabled
          ? "Banner is active and displayed to all public visitors."
          : "Banner content saved (currently hidden from public display).",
      });

      // Scroll smoothly to top of admin viewport if needed
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 400);
  };

  const themeMeta = {
    info: {
      label: "Emerald Green",
      category: "Standard Informational",
      bannerBg: "bg-[#004D38] text-white",
      badgeBg: "bg-black/20 text-white",
      pillBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
      icon: <Info className="w-3.5 h-3.5" />,
    },
    warning: {
      label: "Accent Yellow",
      category: "High Visibility Warning",
      bannerBg: "bg-[#FFCE00] text-[#1A1D20]",
      badgeBg: "bg-black/15 text-[#1A1D20]",
      pillBg: "bg-amber-100 text-amber-900 border-amber-300",
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#1A1D20]" />,
    },
    emergency: {
      label: "Crimson Red",
      category: "Severe Weather / Emergency",
      bannerBg: "bg-red-700 text-white",
      badgeBg: "bg-black/25 text-white",
      pillBg: "bg-red-100 text-red-800 border-red-300",
      icon: <AlertCircle className="w-3.5 h-3.5 text-white" />,
    },
    success: {
      label: "Vibrant Green",
      category: "Campaign / EcoRewards",
      bannerBg: "bg-emerald-700 text-white",
      badgeBg: "bg-black/20 text-white",
      pillBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-white" />,
    },
  };

  const currentTheme = themeMeta[announcement.type || "info"] || themeMeta.info;
  const modalTheme = themeMeta[form.type || "info"] || themeMeta.info;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* 1. Header with Primary Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2.5 py-1 rounded-sm border border-[#006F51]/20">
            <Bell className="w-3.5 h-3.5" />
            <span>Global Alert Header</span>
          </div>
          <h2 className="text-2xl font-black text-[#1A1D20] tracking-tight mt-1">
            Website Announcement &amp; Route Notice Banner
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Display timely alerts pinned to the top of all public pages (holiday route shifts, weather alerts, or EcoRewards promotions).
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleQuickToggle}
            className={`px-3.5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-colors border cursor-pointer flex items-center gap-2 shadow-xs ${
              announcement.enabled
                ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
            }`}
            title="Toggle public visibility immediately"
          >
            <Radio className={`w-3.5 h-3.5 ${announcement.enabled ? "text-emerald-600 animate-pulse" : "text-gray-400"}`} />
            <span>{announcement.enabled ? "Live on Site" : "Currently Off"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenModal()}
            className="bg-[#006F51] hover:bg-[#005a42] text-white px-5 py-2.5 rounded font-bold uppercase text-xs tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:shadow-md"
          >
            <Edit3 className="w-4 h-4" />
            <span>Compose / Edit Notice</span>
          </button>
        </div>
      </div>

      {/* 2. Success Alert Banner (Shown clearly to Admin after publishing) */}
      {successNotification?.visible && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-sm text-emerald-950">
                  Announcement Banner Successfully Published!
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    successNotification.enabled ? "bg-emerald-200 text-emerald-900" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {successNotification.enabled ? "Live on Public Site" : "Saved as Hidden"}
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">
                  &bull; Published at {successNotification.timestamp}
                </span>
              </div>
              <p className="text-xs text-emerald-800 mt-0.5 line-clamp-1">
                &ldquo;{successNotification.message}&rdquo;
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#006F51] hover:bg-[#005a42] text-white rounded text-xs font-bold transition-colors shadow-2xs"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={() => setSuccessNotification(null)}
              className="p-1.5 text-emerald-700 hover:text-emerald-950 hover:bg-emerald-100 rounded transition-colors cursor-pointer"
              title="Dismiss confirmation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 3. Floating Toast Notification (Guarantees Admin Feedback regardless of scroll position) */}
      {toastAlert?.visible && (
        <aside
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="fixed top-5 right-5 z-60 max-w-md bg-white border border-emerald-300 text-[#1A1D20] p-4 rounded-lg shadow-2xl flex items-start gap-3.5 animate-in slide-in-from-top-4 fade-in duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-xs text-[#1A1D20]">{toastAlert.title}</div>
            <div className="text-[11px] text-gray-600 mt-0.5 leading-snug">{toastAlert.message}</div>
            <div className="mt-2 flex items-center gap-2">
              <Link
                href="/"
                target="_blank"
                className="text-[11px] font-bold text-[#006F51] hover:underline inline-flex items-center gap-1"
              >
                <span>Preview on Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToastAlert(null)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded transition-colors cursor-pointer shrink-0"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* 4. Active Banner Operational Status Card */}
      <div className="bg-white rounded border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <span
              className={`w-3 h-3 rounded-full shrink-0 ${
                announcement.enabled ? "bg-emerald-500 animate-pulse ring-4 ring-emerald-100" : "bg-gray-400"
              }`}
            />
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-[#1A1D20] flex items-center gap-2">
                <span>Active Banner Status:</span>
                <span className={announcement.enabled ? "text-emerald-700" : "text-gray-500"}>
                  {announcement.enabled ? "Currently Active on Public Site" : "Currently Hidden"}
                </span>
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">
                {announcement.enabled
                  ? "Visitors see this banner at the top of the homepage and all customer navigation pages."
                  : "The banner is disabled and invisible to the public. Enable it below or open the dialogue box."}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={() => handleOpenModal()}
              className="px-3.5 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#006F51]" />
              <span>Edit Announcement</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 bg-[#1A1D20] hover:bg-black text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Current Active Details Strip */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-gray-100 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Urgency Level / Theme</span>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold border ${currentTheme.pillBg}`}>
                {currentTheme.icon}
                <span>{currentTheme.label}</span>
              </span>
              <span className="text-gray-400 text-[11px]">({currentTheme.category})</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Badge Identifier</span>
            <div className="font-bold text-[#1A1D20]">{announcement.badge || "Notice"}</div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Call-to-Action Link</span>
            <div>
              {announcement.linkText && announcement.linkUrl ? (
                <span className="font-medium text-[#006F51] underline flex items-center gap-1">
                  <span>{announcement.linkText}</span>
                  <span className="text-gray-400 text-[10px]">({announcement.linkUrl})</span>
                </span>
              ) : (
                <span className="text-gray-400 italic">No CTA link configured</span>
              )}
            </div>
          </div>
        </div>

        {/* 5. Live Preview Simulation */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-[#006F51]" />
              <span>Public Site Live Preview Simulation</span>
            </span>

            <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded border border-gray-200 text-xs">
              <button
                type="button"
                onClick={() => setPreviewDevice("desktop")}
                className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  previewDevice === "desktop" ? "bg-white text-[#1A1D20] shadow-2xs" : "text-gray-500 hover:text-black"
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>Desktop View</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice("mobile")}
                className={`px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  previewDevice === "mobile" ? "bg-white text-[#1A1D20] shadow-2xs" : "text-gray-500 hover:text-black"
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>Mobile View</span>
              </button>
            </div>
          </div>

          <div
            className={`mx-auto rounded border border-gray-300 shadow-xs overflow-hidden transition-all duration-300 ${
              previewDevice === "mobile" ? "max-w-sm" : "w-full"
            }`}
          >
            {announcement.enabled ? (
              <div
                className={`p-3 px-4 text-xs flex items-center justify-between gap-3 ${
                  currentTheme.bannerBg
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-extrabold uppercase text-[10px] px-2 py-0.5 rounded flex items-center gap-1 ${currentTheme.badgeBg}`}>
                    {currentTheme.icon}
                    <span>{announcement.badge || "Notice"}</span>
                  </span>
                  <span className="leading-snug">{announcement.message}</span>
                  {announcement.linkText && (
                    <span className="underline font-bold ml-1 inline-flex items-center gap-0.5">
                      <span>{announcement.linkText}</span>
                      <ArrowRight className="w-3 h-3 inline" />
                    </span>
                  )}
                </div>
                <span className="text-sm opacity-60 shrink-0 font-mono">&times;</span>
              </div>
            ) : (
              <div className="p-4 bg-gray-100 text-gray-500 text-xs italic text-center">
                Banner is currently disabled. Click &quot;Live on Site&quot; or open the dialogue box to activate on the live site.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 6. Ready-to-use Route & Operations Notice Presets */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#1A1D20] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFCE00]" />
            <span>Ready-to-Use Operational Route Presets</span>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Select a common operational notice preset to instantly open the dialogue box, review details, and publish to the live site.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESET_TEMPLATES.map((tmpl, idx) => {
            const meta = themeMeta[tmpl.type];
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded border border-[#E5E7EB] hover:border-[#006F51] transition-all shadow-xs flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border flex items-center gap-1 ${meta.pillBg}`}>
                      {meta.icon}
                      <span>{tmpl.badge}</span>
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      {meta.label}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-[#1A1D20] group-hover:text-[#006F51] transition-colors">
                    {tmpl.title}
                  </h4>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed bg-gray-50 p-2 rounded border border-gray-100">
                    &ldquo;{tmpl.message}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-gray-400">Link: {tmpl.linkText}</span>
                  <button
                    type="button"
                    onClick={() => handleOpenModal(tmpl)}
                    className="text-[#006F51] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Use Preset &amp; Edit</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. MODAL DIALOGUE BOX: Gracefully Opens, Previews, Publishes, and Closes with Success */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-announcement-title"
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={(e) => {
            // Close dialogue box if clicking outside the modal box
            if (e.target === e.currentTarget && !isPublishing) {
              handleCloseModal();
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[90vh] flex flex-col my-auto animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-[#E9F4F0] text-[#006F51] flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#006F51] bg-[#E9F4F0] px-2 py-0.2 rounded-xs border border-[#006F51]/20">
                      Announcement Dialogue Box
                    </span>
                  </div>
                  <h3 id="modal-announcement-title" className="text-base sm:text-lg font-black text-[#1A1D20] tracking-tight">
                    Publish Website Announcement &amp; Route Notice
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                disabled={isPublishing}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer disabled:opacity-50"
                aria-label="Close dialogue"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs">
              {/* Enable / Disable Switch */}
              <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded border border-gray-200">
                <div>
                  <div className="font-bold text-sm text-[#1A1D20] flex items-center gap-2">
                    <span>Banner Visibility on Public Site</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        form.enabled ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {form.enabled ? "Enabled (Live)" : "Disabled (Draft)"}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">
                    When enabled, this banner will appear pinned to the very top of all public website pages.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, enabled: !form.enabled })}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shrink-0 ${
                    form.enabled ? "bg-[#006F51]" : "bg-gray-300"
                  }`}
                  aria-pressed={form.enabled}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      form.enabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Urgency & Color Theme Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Color Theme &amp; Urgency Level *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(["info", "warning", "emergency", "success"] as const).map((t) => {
                    const isSelected = form.type === t;
                    const meta = themeMeta[t];
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, type: t })}
                        className={`p-2.5 rounded border text-left flex flex-col justify-between transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#006F51] bg-[#E9F4F0] ring-1 ring-[#006F51]"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`w-3 h-3 rounded-full ${
                            t === "info"
                              ? "bg-[#004D38]"
                              : t === "warning"
                              ? "bg-[#FFCE00]"
                              : t === "emergency"
                              ? "bg-red-700"
                              : "bg-emerald-600"
                          }`} />
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#006F51]" />}
                        </div>
                        <div className="font-bold text-[11px] text-[#1A1D20]">{meta.label}</div>
                        <div className="text-[9px] text-gray-500 leading-tight mt-0.5">{meta.category}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Badge Tag & Quick Presets */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Badge Tag Text
                  </label>
                  <span className="text-[10px] text-gray-400">Click pill below to set quickly</span>
                </div>
                <input
                  type="text"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  placeholder="e.g. Operational Update, Holiday Notice, Alert"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
                />

                {/* Quick Badge Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {PRESET_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setForm({ ...form, badge: tag })}
                      className={`text-[10px] px-2 py-0.5 rounded transition-colors cursor-pointer border ${
                        form.badge === tag
                          ? "bg-[#006F51] text-white border-[#006F51]"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                    Banner Announcement Message *
                  </label>
                  <span className="text-[10px] font-mono text-gray-400">
                    {form.message.length} characters
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="e.g. Due to Independence Day holiday, Friday curbside pickup in Kitende will move to Saturday morning..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white leading-relaxed"
                />
              </div>

              {/* Call-to-Action Link Text & URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Action Link Text (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.linkText}
                    onChange={(e) => setForm({ ...form, linkText: e.target.value })}
                    placeholder="e.g. Check Route Schedule, View Pricing"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Target Link URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.linkUrl}
                    onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                    placeholder="e.g. /#schedule-finder or tel:+256766532915"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded text-xs focus:outline-none focus:border-[#006F51] focus:bg-white"
                  />
                </div>
              </div>

              {/* Real-time In-Dialogue Preview Strip */}
              <div className="pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-[#006F51]" />
                  <span>Real-time Live Banner Preview:</span>
                </div>
                <div className="rounded border border-gray-300 overflow-hidden shadow-xs">
                  {form.enabled ? (
                    <div
                      className={`p-2.5 px-4 text-xs flex items-center justify-between gap-2 ${
                        modalTheme.bannerBg
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`font-extrabold uppercase text-[10px] px-2 py-0.5 rounded flex items-center gap-1 ${modalTheme.badgeBg}`}>
                          {modalTheme.icon}
                          <span>{form.badge || "Notice"}</span>
                        </span>
                        <span className="leading-snug">{form.message || "Announcement preview will appear here..."}</span>
                        {form.linkText && (
                          <span className="underline font-bold ml-1 inline-flex items-center gap-0.5">
                            <span>{form.linkText}</span>
                            <ArrowRight className="w-3 h-3 inline" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs opacity-60 font-mono">&times;</span>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-100 text-gray-500 text-xs italic text-center">
                      Banner is currently set to hidden (draft). Toggle switch above to activate on public website.
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isPublishing}
                  className="px-4 py-2.5 rounded font-bold text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Cancel / Close
                </button>

                <button
                  type="submit"
                  disabled={isPublishing}
                  className="bg-[#006F51] hover:bg-[#005a42] text-white px-6 py-2.5 rounded font-bold uppercase text-xs tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isPublishing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Publishing Notice...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Publish Announcement to Website</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
