"use client";

import React, { useState, useEffect } from "react";
import contentData from "../data/content.js";
import {
  Home,
  Briefcase,
  Layers,
  TreePine,
  Building2,
  Factory,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  MapPin,
  User,
  PhoneCall,
  Lock,
  X,
} from "lucide-react";

const iconMap = {
  Home,
  Briefcase,
  Layers,
  TreePine,
  Building2,
  Factory,
};

export default function WatchlistFlow({ data, onClose, plainLayout = false }) {
  const [isOpen, setIsOpen] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const submitted = sessionStorage.getItem("querySubmitted");
      if (submitted === "true") {
        setAlreadySubmitted(true);
      }
    }
  }, []);
  const [showOptional, setShowOptional] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    referrer: "",
    launchSubscription: false,
  });
  const [contactErrors, setContactErrors] = useState({});
  const [apiSubmitting, setApiSubmitting] = useState(false);
  const [isApiSuccess, setIsApiSuccess] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const [form, setForm] = useState({
    mainCategory: "",
    specificType: "",
    city: "",
    locality: "",
    budget: "",
    preApprovedBank: "",
    loanAmount: "",
    downPayment: "",
    possessionYear: "",
    preferredBuilder: "",
  });

  if (!data) return null;

  const categories = data.categories || [];
  const cities = data.cities || [];
  const banks = data.banks || [];
  const years = Array.from({ length: 12 }, (_, i) =>
    (new Date().getFullYear() + i).toString(),
  );

  const handleFieldChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (error) setError("");
  };

  const selectedCategory = categories.find((c) => c.id === form.mainCategory);

  const requiredFilled =
    form.mainCategory &&
    form.specificType &&
    form.city &&
    form.locality.trim() &&
    form.budget;

  const validateContactForm = () => {
    const errors = {};
    if (!contactForm.firstName.trim())
      errors.firstName = "First name is required";
    if (!contactForm.lastName.trim()) errors.lastName = "Last name is required";
    if (!contactForm.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!contactForm.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(contactForm.phone.trim())) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!contactForm.city.trim()) errors.city = "City is required";
    if (!contactForm.referrer) errors.referrer = "Please tell us how you heard about us";

    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requiredFilled) {
      setError("Please fill out all required fields.");
      return;
    }

    setError("");
    setStep(2);
    if (typeof window !== "undefined") {
      if (plainLayout) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const container = document.getElementById("watchlist-flow-container");
        if (container) {
          const offset = 80;
          const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
          const elementRect = container.getBoundingClientRect().top;
          const elementPosition = elementRect + scrollTop;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }
    }
  };

  const handleContactSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateContactForm()) return;

    setApiSubmitting(true);
    setError("");

    try {
      const payload = {
        ...contactForm,
        buyingRequirements: form,
      };

      const response = await fetch("/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to register your watchlist.");
      }

      // Save parameters to sessionStorage exactly like codebase
      sessionStorage.setItem("watchlistFilters", JSON.stringify(form));
      sessionStorage.setItem("querySubmitted", "true");
      console.log("Watchlist and contact details successfully saved:", data);

      setIsApiSuccess(true);
      setApiSubmitting(false);

      // If standalone/plain layout, stay on success screen permanently and do not reset or close
      if (plainLayout) {
        return;
      }

      // Wait 2.5 seconds, then reset and close
      setTimeout(() => {
        setIsApiSuccess(false);
        setIsOpen(false);
        setStep(1);

        // Reset primary form
        setForm({
          mainCategory: "",
          specificType: "",
          city: "",
          locality: "",
          budget: "",
          preApprovedBank: "",
          loanAmount: "",
          downPayment: "",
          possessionYear: "",
          preferredBuilder: "",
        });
        setContactForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          city: "",
          referrer: "",
          launchSubscription: false,
        });
        setShowOptional(true);

        if (onClose) {
          onClose();
        }
      }, 2500);
    } catch (err) {
      console.error(err);
      setError(
        err.message ||
          "Could not connect to server database. Please try again.",
      );
      setApiSubmitting(false);
    }
  };

  return (
    <div id="watchlist-flow-container" className="w-full relative">
      {/* Absolute Success Toast */}
      {showToast && (
        <div className="fixed top-24 right-4 sm:right-8 bg-white border-l-4 border-brand-teal p-5 rounded-2xl shadow-brand-lg z-50 animate-bounce flex items-center gap-4 max-w-sm border border-brand-borderMid/50">
          <div className="w-10 h-10 rounded-full bg-brand-tealBg flex items-center justify-center text-brand-teal shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
             <h4 className="text-sm font-bold text-brand-navy font-sans">
              {plainLayout ? "Query Submitted!" : (data.successTitle || "Radar Activated!")}
            </h4>
            <p className="text-[11px] text-brand-slate font-light mt-0.5 font-sans leading-relaxed">
              {plainLayout ? "Your property buying requirements are registered." : (data.successSubtitle || "Appreciation radar parameters written to sessionStorage.")}
            </p>
          </div>
        </div>
      )}

      {/* Decorative glows inside section */}
      <div className="absolute right-1/4 top-1/4 w-[400px] h-[400px] bg-brand-primary/3 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute left-1/4 bottom-10 w-[350px] h-[350px] bg-brand-teal/3 rounded-full blur-[90px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-0 sm:px-6 lg:px-8 relative z-10">
        {alreadySubmitted ? (
          /* Already Submitted State: Streamlined design matching user query */
          <div className={plainLayout ? "w-full animate-fadeIn text-center py-10 flex flex-col items-center justify-center" : "bg-[#FAFAF8] rounded-2xl sm:rounded-3xl border border-brand-borderMid/50 p-6 sm:p-10 shadow-brand-md overflow-hidden relative animate-fadeIn text-center flex flex-col items-center justify-center"}>
            {!plainLayout && <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-primary via-brand-primaryLight to-brand-teal"></div>}
            
            {!plainLayout && (
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full hover:bg-brand-borderMid/10 text-brand-slateLight hover:text-brand-navy transition-all duration-200 cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="w-14 h-14 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/40 flex items-center justify-center text-brand-primary mb-5 shrink-0 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-lg sm:text-xl font-extrabold text-brand-navy font-sans tracking-tight mb-2">
              You have already submitted your query!
            </h4>
            
            <p className="text-xs sm:text-sm text-brand-slate font-light leading-relaxed max-w-sm mb-6 font-sans">
              Your purchase requirements and contact details are already registered on our servers.
            </p>

            <div className="px-5 py-3.5 rounded-xl bg-brand-primaryBg border border-brand-primaryBorder/45 flex items-center justify-center gap-2.5 text-xs sm:text-sm text-brand-primary font-bold font-sans shadow-sm text-center max-w-md animate-pulse">
              <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0 animate-pulse"></span>
              <span>We will not call you. You will only receive alerts when matching properties are found.</span>
            </div>

            {!plainLayout && (
              <div className="flex justify-center pt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider text-brand-slate hover:text-brand-navy hover:bg-brand-borderMid/5 transition-all duration-250 flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  <X className="w-3.5 h-3.5 text-brand-slateLight" />
                  {data.collapseText}
                </button>
              </div>
            )}
          </div>
        ) : !isOpen ? (
          /* Closed State: Ultra-clean, borderless, matching landing page aesthetics */
          <div className="max-w-3xl mx-auto text-center py-6 sm:py-10 animate-fadeIn px-4 sm:px-0">
            {/* Small subtle pill badge */}
            <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-white border border-brand-primaryBorder/55 text-xs sm:text-[13px] font-extrabold tracking-[0.18em] text-brand-primary uppercase mb-5 shadow-[0_2px_10px_rgba(59,130,246,0.02)] font-sans">
              <span className="w-2 h-2 rounded-full bg-brand-primary inline-block mr-1.5 animate-pulse"></span>
              {data.badge || "VALUATION RADAR"}
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight font-sans mb-4">
              {data.title}
            </h3>

            <p className="text-sm sm:text-base text-brand-slate font-light leading-relaxed mb-8 max-w-xl mx-auto">
              {data.subtitle}
            </p>

            {/* Subtle premium EOI closing warning inline with site branding */}
            {contentData.marketCampaign && (
              <div className="mb-8 flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-rose-50 border border-rose-100/60 text-[9px] font-extrabold tracking-widest text-[#E11D48] uppercase animate-pulse">
                  ⚡ {contentData.marketCampaign.closingSoonText}
                </span>
                <span className="text-xs text-brand-navy font-bold font-sans">
                  {contentData.marketCampaign.inauguralOffer} on{" "}
                  <span className="text-[#E11D48] underline decoration-dotted">
                    {contentData.marketCampaign.deadline}
                  </span>
                </span>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={() => setIsOpen(true)}
                className="px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm transition-premium hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer font-sans"
              >
                {data.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Opened State: Beautifully framed card for the full wizard flow */
          <div className={plainLayout ? "w-full animate-fadeIn" : "bg-[#FAFAF8] rounded-2xl sm:rounded-3xl border border-brand-borderMid/50 p-4 sm:p-10 shadow-brand-md overflow-hidden relative animate-fadeIn"}>
            {/* High-end gradient border top */}
            {!plainLayout && <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-primary via-brand-primaryLight to-brand-teal"></div>}

            {/* Elegant Close Icon */}
            {!plainLayout && (
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full hover:bg-brand-borderMid/10 text-brand-slateLight hover:text-brand-navy transition-all duration-200 cursor-pointer z-20"
                title={data.collapseText}
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Elegant Header */}
            {!plainLayout && (
              <div className="text-center max-w-2xl mx-auto mb-8 px-8 sm:px-12">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight font-sans mb-3">
                  {data.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-slate font-light leading-relaxed max-w-xl mx-auto">
                  {data.subtitle}
                </p>
              </div>
            )}

            {/* Wizard Form */}
            <form
              onSubmit={step === 1 ? handleSubmit : handleContactSubmit}
              className="space-y-6 pt-6 border-t border-brand-borderMid/50"
            >
              {step === 1 && (
                <>
                  {/* Field 01: Main Category (Custom dynamic grid) */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-3 font-sans">
                      1. Main Category <span className="text-brand-primary">*</span>
                    </label>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
                      {categories.map((cat) => {
                        const IconComponent = iconMap[cat.icon] || Home;
                        const isSelected = form.mainCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              handleFieldChange("mainCategory", cat.id);
                              handleFieldChange("specificType", ""); // Reset child type
                            }}
                            className={`flex items-center gap-2 sm:gap-3.5 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-[0_2px_8px_rgba(15,22,41,0.01)] ${
                              isSelected
                                ? "border-brand-primary bg-brand-primaryBg shadow-[0_4px_12px_rgba(59,130,246,0.08)]"
                                : "border-brand-border/40 bg-white hover:border-brand-borderMid/80 hover:shadow-[0_4px_12px_rgba(15,22,41,0.02)]"
                            }`}
                          >
                            <div
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? "bg-brand-primary text-white"
                                  : "bg-brand-bgAlt text-brand-slateLight"
                              }`}
                            >
                              <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </div>
                            <span
                              className={`text-[10px] sm:text-xs font-bold font-sans tracking-tight leading-tight ${
                                isSelected
                                  ? "text-brand-primaryDark"
                                  : "text-brand-navyMid"
                              }`}
                            >
                              {cat.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 02: Specific Type (Dropdown) */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-2 font-sans">
                      2. Specific Type <span className="text-brand-primary">*</span>
                    </label>
                    <div className="relative">
                      <select
                        disabled={!form.mainCategory}
                        value={form.specificType}
                        onChange={(e) =>
                          handleFieldChange("specificType", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all duration-200 appearance-none cursor-pointer pr-10 font-sans font-medium"
                      >
                        <option value="">
                          {form.mainCategory
                            ? "Choose specific property type..."
                            : "Select a main category first"}
                        </option>
                        {selectedCategory?.types?.map((typeOption) => (
                          <option key={typeOption} value={typeOption}>
                            {typeOption}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-slateLight">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Field 03 & 04: City & Locality (Side-by-side) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* City select */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-2 font-sans">
                        3. City <span className="text-brand-primary">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={form.city}
                          onChange={(e) =>
                            handleFieldChange("city", e.target.value)
                          }
                          className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all duration-200 appearance-none cursor-pointer pr-10 font-sans font-medium"
                        >
                          <option value="">Select city...</option>
                          {cities.map((cityOption) => (
                            <option key={cityOption} value={cityOption}>
                              {cityOption}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-slateLight">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Locality text input */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-2 font-sans">
                        4. Locality / Sector{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Sector 49, Whitefield"
                          value={form.locality}
                          onChange={(e) =>
                            handleFieldChange("locality", e.target.value)
                          }
                          className="w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all duration-200 placeholder-brand-slateLight/75"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 text-brand-slateLight">
                          <MapPin className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Field 05: Budget */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-2 font-sans">
                      5. Budget (₹) <span className="text-brand-primary">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="e.g. 7500000"
                        value={form.budget}
                        onChange={(e) =>
                          handleFieldChange("budget", e.target.value)
                        }
                        className="w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all duration-200 placeholder-brand-slateLight/75"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-xs font-bold text-brand-slateLight">
                        ₹
                      </div>
                    </div>
                    {form.budget && (
                      <p className="text-[10px] text-brand-primary font-bold mt-1.5 font-sans pl-1">
                        ≈ ₹{(Number(form.budget) / 100000).toFixed(1)} Lakh
                      </p>
                    )}
                  </div>

                  {/* Collapsible Accordion Segment: Optional Parameters */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowOptional(!showOptional)}
                      className="flex items-center justify-between w-full py-3.5 px-4 rounded-xl border border-brand-borderMid/40 bg-white hover:bg-brand-bgAlt transition-colors cursor-pointer text-left font-sans"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-slate flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary"></span>
                        Optional Setup parameters
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-brand-slateLight transition-transform duration-300 ${
                          showOptional ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {showOptional && (
                      <div className="mt-4 p-4 rounded-2xl border border-brand-borderMid/30 bg-white space-y-4 animate-fadeIn">
                        {/* Pre-approved Bank */}
                        <div>
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                            Pre-approved Bank
                          </label>
                          <div className="relative">
                            <select
                              value={form.preApprovedBank}
                              onChange={(e) =>
                                handleFieldChange("preApprovedBank", e.target.value)
                              }
                              className="w-full px-4 py-2.5 rounded-xl text-xs text-brand-navy bg-white border border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all duration-250 appearance-none cursor-pointer pr-10 font-sans"
                            >
                              <option value="">
                                Select pre-approved bank (if any)
                              </option>
                              {banks.map((bankOption) => (
                                <option key={bankOption} value={bankOption}>
                                  {bankOption}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-slateLight">
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                        </div>

                        {/* Loan & Downpayment side by side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Loan Amount */}
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                              Loan Amount (₹)
                            </label>
                            <input
                              type="number"
                              placeholder="e.g. 5000000"
                              value={form.loanAmount}
                              onChange={(e) =>
                                handleFieldChange("loanAmount", e.target.value)
                              }
                              className="w-full px-4 py-2.5 rounded-xl text-xs text-brand-navy bg-white border border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all duration-200"
                            />
                          </div>

                          {/* Down Payment */}
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                              Down Payment (₹)
                            </label>
                            <input
                              type="number"
                              placeholder="e.g. 2500000"
                              value={form.downPayment}
                              onChange={(e) =>
                                handleFieldChange("downPayment", e.target.value)
                              }
                              className="w-full px-4 py-2.5 rounded-xl text-xs text-brand-navy bg-white border border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all duration-200"
                            />
                          </div>
                        </div>

                        {/* Possession Year & Preferred Builder */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Possession Year */}
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                              Possession Year
                            </label>
                            <div className="relative">
                              <select
                                value={form.possessionYear}
                                onChange={(e) =>
                                  handleFieldChange(
                                    "possessionYear",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-4 py-2.5 rounded-xl text-xs text-brand-navy bg-white border border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all duration-250 appearance-none cursor-pointer pr-10 font-sans"
                              >
                                <option value="">
                                  When do you want possession?
                                </option>
                                {years.map((yearOption) => (
                                  <option key={yearOption} value={yearOption}>
                                    {yearOption}
                                  </option>
                                ))}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-slateLight">
                                <ChevronDown className="w-4 h-4" />
                              </div>
                            </div>
                          </div>

                          {/* Preferred Builder */}
                          <div>
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                              Preferred Builder
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. DLF, M3M, Godrej"
                              value={form.preferredBuilder}
                              onChange={(e) =>
                                handleFieldChange(
                                  "preferredBuilder",
                                  e.target.value,
                                )
                              }
                              className="w-full px-4 py-2.5 rounded-xl text-xs text-brand-navy bg-white border border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 outline-none transition-all duration-200 placeholder-brand-slateLight/75"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Error Box */}
                  {error && (
                    <div className="p-3.5 rounded-xl bg-brand-redBg border border-brand-red/20 text-brand-red text-xs font-semibold font-sans">
                      {error}
                    </div>
                  )}

                  {/* Next Step Action */}
                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-widest uppercase transition-premium hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer font-sans ${
                      requiredFilled
                        ? "bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm"
                        : "bg-brand-slateLight text-white cursor-not-allowed opacity-60"
                    }`}
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {step === 2 && !isApiSuccess && (
                <>
                  {/* Step 2 Form Fields */}
                  <div className="mb-4 text-left">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-brand-primaryBg border border-brand-primaryBorder/60 text-[9px] font-bold tracking-wider text-brand-primary uppercase mb-2.5 font-sans">
                      ★ Step 2 of 2: Personal Details
                    </span>
                    <h4 className="text-lg font-bold text-brand-navy tracking-tight font-sans mb-1">
                      Almost there!
                    </h4>
                    <p className="text-xs text-brand-slate font-light leading-relaxed font-sans">
                      Please share your contact details to submit your watchlist query.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {/* Name fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                          First Name <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. John"
                            value={contactForm.firstName}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                              }))
                            }
                            className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-all duration-200 font-sans ${
                              contactErrors.firstName
                                ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                                : "border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                            }`}
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight">
                            <User className="w-4 h-4" />
                          </div>
                        </div>
                        {contactErrors.firstName && (
                          <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                            {contactErrors.firstName}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                          Last Name <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. Doe"
                            value={contactForm.lastName}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                              }))
                            }
                            className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-all duration-200 font-sans ${
                              contactErrors.lastName
                                ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                                : "border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                            }`}
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight">
                            <User className="w-4 h-4" />
                          </div>
                        </div>
                        {contactErrors.lastName && (
                          <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                            {contactErrors.lastName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                          Email Address <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="john.doe@example.com"
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                            className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-all duration-200 font-sans ${
                              contactErrors.email
                                ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                                : "border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                            }`}
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight">
                            <svg
                              className="w-4.5 h-4.5 fill-none stroke-current text-brand-slateLight"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                          </div>
                        </div>
                        {contactErrors.email && (
                          <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                            {contactErrors.email}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                          Phone Number <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="9856XXXXXX"
                            value={contactForm.phone}
                            onChange={(e) =>
                              setContactForm((prev) => ({
                                ...prev,
                                phone: e.target.value,
                              }))
                            }
                            className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-all duration-200 font-sans ${
                              contactErrors.phone
                                ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                                : "border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                            }`}
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight">
                            <PhoneCall className="w-4 h-4" />
                          </div>
                        </div>
                        {contactErrors.phone && (
                          <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                            {contactErrors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                        City <span className="text-brand-primary">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Gurgaon"
                          value={contactForm.city}
                          onChange={(e) =>
                            setContactForm((prev) => ({
                              ...prev,
                              city: e.target.value,
                            }))
                          }
                          className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-all duration-200 font-sans ${
                            contactErrors.city
                              ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                              : "border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                          }`}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight">
                          <MapPin className="w-4 h-4" />
                        </div>
                      </div>
                      {contactErrors.city && (
                        <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                          {contactErrors.city}
                        </span>
                      )}
                    </div>

                    {/* Where did you hear about us select dropdown */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                        Where did you hear about us? <span className="text-brand-primary">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={contactForm.referrer}
                          onChange={(e) =>
                            setContactForm((prev) => ({
                              ...prev,
                              referrer: e.target.value,
                            }))
                          }
                          className={`w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-all duration-200 font-sans appearance-none cursor-pointer pr-10 ${
                            contactErrors.referrer
                              ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                              : "border-brand-borderMid/50 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
                          }`}
                        >
                          <option value="">Select option...</option>
                          <option value="Google Search">Google Search</option>
                          <option value="Social Media">Social Media (Instagram/Facebook)</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Word of Mouth">Word of Mouth / Referral</option>
                          <option value="Newspaper / Article">Newspaper / Article</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-slateLight">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                      {contactErrors.referrer && (
                        <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                          {contactErrors.referrer}
                        </span>
                      )}
                    </div>

                    {/* Subscription Checkbox */}
                    <div className="flex items-start gap-3 pt-2 text-left">
                      <input
                        type="checkbox"
                        id="launchSubscription"
                        checked={contactForm.launchSubscription}
                        onChange={(e) =>
                          setContactForm((prev) => ({
                            ...prev,
                            launchSubscription: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded border-brand-borderMid/50 text-brand-primary focus:ring-brand-primary outline-none mt-0.5 cursor-pointer"
                      />
                      <label
                        htmlFor="launchSubscription"
                        className="text-xs text-brand-navy font-semibold font-sans cursor-pointer select-none"
                      >
                        Do you want to receive early access to our platform launch?
                      </label>
                    </div>

                    {/* Server error */}
                    {error && (
                      <div className="p-3.5 rounded-xl bg-brand-redBg border border-brand-red/20 text-brand-red text-xs font-semibold font-sans text-left">
                        {error}
                      </div>
                    )}

                    {/* Action buttons (Back + Submit) */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 w-full">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          if (typeof window !== "undefined") {
                            if (plainLayout) {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            } else {
                              const container = document.getElementById("watchlist-flow-container");
                              if (container) {
                                const offset = 80;
                                const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
                                const elementRect = container.getBoundingClientRect().top;
                                const elementPosition = elementRect + scrollTop;
                                const offsetPosition = elementPosition - offset;
                                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                              }
                            }
                          }
                        }}
                        className="w-full sm:w-1/3 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-widest uppercase border border-brand-borderMid text-brand-slate hover:bg-brand-bgAlt transition-premium cursor-pointer font-sans text-center"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={apiSubmitting}
                        className="w-full sm:w-2/3 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold tracking-widest uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm active:scale-[0.98] active:translate-y-0 transition-premium flex items-center justify-center gap-2.5 cursor-pointer font-sans"
                      >
                        {apiSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting query...
                          </>
                        ) : (
                          <>
                            Submit My Query
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-slateLight pt-2 font-sans">
                      <Lock className="w-3 h-3" />
                      Data is secured and encrypted under standard platform privacy ledgers.
                    </div>
                  </div>
                </>
              )}

              {step === 2 && isApiSuccess && (
                <div className="py-8 text-center flex flex-col items-center animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/40 flex items-center justify-center text-brand-primary mb-5 shrink-0 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-brand-navy font-sans tracking-tight mb-2">
                    {plainLayout ? "Buying Query Submitted!" : "Watchlist Created Successfully!"}
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-slate font-light leading-relaxed max-w-sm mb-5 font-sans">
                    {plainLayout 
                      ? "Your property purchase criteria and contact details have been successfully saved." 
                      : "Your property search criteria and contact details have been successfully saved to our database."}
                  </p>
                  
                  {plainLayout ? (
                    <div className="px-5 py-3.5 rounded-xl bg-brand-primaryBg border border-brand-primaryBorder/45 flex items-center justify-center gap-2.5 text-xs sm:text-sm text-brand-primary font-bold font-sans shadow-sm text-center max-w-md animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-brand-primary shrink-0 animate-pulse"></span>
                      <span>We will not call you. You will only receive alerts when matching properties are found.</span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-brand-slateLight font-sans">
                      Connecting you back to the services dashboard...
                    </p>
                  )}
                </div>
              )}

              {/* Close Setup Action (rendered only when not successful) */}
              {!isApiSuccess && (
                <>
                  {/* Reassurance Highlight Banner */}
                  <div className="mt-4 px-4 py-3 rounded-xl bg-brand-primaryBg border border-brand-primaryBorder/45 flex items-center justify-center gap-2 text-xs sm:text-sm text-brand-primary font-bold font-sans shadow-sm text-center">
                    <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse shrink-0"></span>
                    <span>We will not call you. You will only receive alerts when matching properties are found.</span>
                  </div>

                  {!plainLayout && (
                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider text-brand-slate hover:text-brand-navy hover:bg-brand-borderMid/5 transition-all duration-250 flex items-center gap-1.5 cursor-pointer font-sans"
                      >
                        <X className="w-3.5 h-3.5 text-brand-slateLight" />
                        {data.collapseText}
                      </button>
                    </div>
                  )}
                </>
              )}

              {step === 1 && (
                <p className="text-[10px] text-brand-slateLight font-light text-center leading-relaxed">
                  <span className="text-brand-primary font-bold">*</span> Required fields • Optional setup parameters help customize daily scrap alerts
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
