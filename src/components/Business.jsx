"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  ArrowRight,
  X,
  CheckCircle2,
  User,
  Building,
  MapPin,
  PhoneCall,
  Briefcase,
  Lock,
  ChevronDown,
} from "lucide-react";
import contentData from "../data/content.js";

export default function Business({ inlineForm = false }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isChatActive, setIsChatActive] = useState(false);

  useEffect(() => {
    const checkChatStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hour = now.getHours();

      // Active Monday to Saturday (1 to 6), between 9:00 AM (9) and 5:00 PM (17)
      const active = day >= 1 && day <= 6 && hour >= 9 && hour < 17;
      setIsChatActive(active);
    };

    checkChatStatus();
    const interval = setInterval(checkChatStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const businessData = contentData.business || {};
  const badgeText = businessData.badge || "DO YOU OWN A BUSINESS";

  const rawPhone = contentData.contactDetails?.phone || "+918796508866";
  const whatsappPhone = rawPhone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappPhone}`;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    businessType: "",
    location: "",
    designation: "",
    requirements: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsSubmitted(false);
    setError("");
    setFormErrors({});
    setForm({
      name: "",
      phone: "",
      city: "",
      businessType: "",
      location: "",
      designation: "",
      requirements: "",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFieldChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (formErrors[key]) {
      setFormErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name.trim()) errors.name = "Full name is required";
    if (!form.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!form.city.trim()) errors.city = "City is required";
    if (!form.businessType.trim())
      errors.businessType = "Business type is required";
    if (!form.location.trim())
      errors.location = "Business location is required";
    if (!form.designation.trim())
      errors.designation = "Designation is required";
    if (!form.requirements.trim())
      errors.requirements = "Real estate requirements are required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/business", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to submit B2B inquiry.");
      }

      // Save parameters to sessionStorage exactly like codebase
      sessionStorage.setItem("businessInquiry", JSON.stringify(form));
      console.log("Business inquiry successfully saved to DB:", data);

      setIsSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Could not connect to B2B registry. Please try again.",
      );
      setSubmitting(false);
    }
  };

  return (
    <section
      id="business"
      className="relative py-20 md:py-28 bg-white border-b border-brand-borderMid/10 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Modern structural dot mesh background */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

      {/* Decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] bg-brand-primary/2 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-brand-teal/2 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        {/* Borderless Callout Layout */}
        <div className="w-full relative overflow-hidden flex flex-col items-center text-center group/b2b">

          {(isModalOpen || inlineForm) ? (
            /* Inline Request Form & Success View */
            <div className="w-full flex flex-col items-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy tracking-tight font-sans leading-tight max-w-2xl mb-8 text-center">
                Are you a business owner looking to expand your business?
              </h2>
              <div className="w-full max-w-2xl bg-white border border-brand-border/40 rounded-3xl p-6 sm:p-10 shadow-brand animate-scaleIn relative z-10">
              
              {/* Close Button X */}
              {!inlineForm && (
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-2 rounded-xl hover:bg-brand-bgAlt text-brand-slateLight hover:text-brand-navy transition-all duration-200 cursor-pointer z-20"
                  title="Close Panel"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {isSubmitted ? (
                <div className="py-6 text-center flex flex-col items-center animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/40 flex items-center justify-center text-brand-primary mb-5 shrink-0 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-brand-navy font-sans tracking-tight mb-2">
                    Inquiry Submitted successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-slate font-normal leading-relaxed max-w-sm mb-6 font-sans">
                    Thank you for reaching out. Our business development team will
                    contact you shortly to discuss your expansion goals.
                  </p>
                  {!inlineForm && (
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm transition-all duration-300 cursor-pointer"
                    >
                      Back to Section
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full">
                  <div className="mb-6 text-left">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-brand-primaryBg border border-brand-primaryBorder/30 text-[9px] font-bold tracking-wider text-brand-primary uppercase mb-2 font-sans">
                      ★ BUSINESS EXPANSION
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy tracking-tight font-sans">
                      Connect With Us
                    </h3>
                    <p className="text-xs text-brand-slate font-normal mt-1">
                      Fill out the parameters below to help us tailor our
                      expansion assistance to your company.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    {/* Personal details header badge */}
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-primary border-b border-brand-border/20 pb-1.5 font-sans text-left">
                      Personal Details
                    </div>

                    {/* Name & Phone No */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                          Full Name <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. Vikram Sen"
                            value={form.name}
                            onChange={(e) =>
                              handleFieldChange("name", e.target.value)
                            }
                            className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans ${
                              formErrors.name
                                ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                                : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                            }`}
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight">
                            <User className="w-4 h-4" />
                          </div>
                        </div>
                        {formErrors.name && (
                          <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                            {formErrors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                          Phone Number{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. 9876543210"
                            value={form.phone}
                            onChange={(e) =>
                              handleFieldChange("phone", e.target.value)
                            }
                            className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans ${
                              formErrors.phone
                                ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                                : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                            }`}
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight">
                            <PhoneCall className="w-4 h-4" />
                          </div>
                        </div>
                        {formErrors.phone && (
                          <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                            {formErrors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Personal City */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                        Your City <span className="text-brand-primary">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Gurgaon"
                          value={form.city}
                          onChange={(e) =>
                            handleFieldChange("city", e.target.value)
                          }
                          className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans ${
                            formErrors.city
                              ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                              : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                          }`}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight">
                          <MapPin className="w-4 h-4" />
                        </div>
                      </div>
                      {formErrors.city && (
                        <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                          {formErrors.city}
                        </span>
                      )}
                    </div>

                    {/* Business details header badge */}
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-primary border-b border-brand-border/20 pb-1.5 pt-2 font-sans text-left">
                      Business Details
                    </div>

                    {/* Business Type & Designation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                          Business Type{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={form.businessType}
                            onChange={(e) =>
                              handleFieldChange("businessType", e.target.value)
                            }
                            className={`w-full pl-9 pr-10 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans appearance-none cursor-pointer ${
                              formErrors.businessType
                                ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                                : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                            }`}
                          >
                            <option value="">Select business type...</option>
                            <option value="Real Estate Developer">Real Estate Developer</option>
                            <option value="Property Broker / Agency">Property Broker / Agency</option>
                            <option value="Corporate Occupier">Corporate Occupier</option>
                            <option value="Co-working Provider">Co-working Provider</option>
                            <option value="Architect / Interior Designer">Architect / Interior Designer</option>
                            <option value="Retailer / Franchise Brand">Retailer / Franchise Brand</option>
                            <option value="Hospitality / Hotel Operator">Hospitality / Hotel Operator</option>
                            <option value="Investor / Wealth Manager">Investor / Wealth Manager</option>
                            <option value="Consultant / Valuer">Consultant / Valuer</option>
                            <option value="Legal Advisor / Law Firm">Legal Advisor / Law Firm</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight pointer-events-none">
                            <Building className="w-4 h-4" />
                          </div>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-slateLight">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                        {formErrors.businessType && (
                          <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                            {formErrors.businessType}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                          Your Designation{" "}
                          <span className="text-brand-primary">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="e.g. Managing Director"
                            value={form.designation}
                            onChange={(e) =>
                              handleFieldChange("designation", e.target.value)
                            }
                            className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans ${
                              formErrors.designation
                                ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                                : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                            }`}
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight">
                            <Briefcase className="w-4 h-4" />
                          </div>
                        </div>
                        {formErrors.designation && (
                          <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                            {formErrors.designation}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Business Location */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                        Business Location{" "}
                        <span className="text-brand-primary">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Sector 49, Gurgaon"
                          value={form.location}
                          onChange={(e) =>
                            handleFieldChange("location", e.target.value)
                          }
                          className={`w-full pl-9 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans ${
                            formErrors.location
                              ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                              : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                          }`}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-brand-slateLight">
                          <MapPin className="w-4 h-4" />
                        </div>
                      </div>
                      {formErrors.location && (
                        <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                          {formErrors.location}
                        </span>
                      )}
                    </div>

                    {/* Real Estate Requirements */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans text-left">
                        What exactly are you looking for in terms of real estate to expand your business? <span className="text-brand-primary">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          rows={3}
                          placeholder="e.g. 5,000 sq ft commercial office space near Sohna Road with corporate layout."
                          value={form.requirements}
                          onChange={(e) =>
                            handleFieldChange("requirements", e.target.value)
                          }
                          className={`w-full pl-4 pr-4 py-3 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans resize-none ${
                            formErrors.requirements
                              ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                              : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                          }`}
                        ></textarea>
                      </div>
                      {formErrors.requirements && (
                        <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans text-left">
                          {formErrors.requirements}
                        </span>
                      )}
                    </div>

                    {/* Error Banner */}
                    {error && (
                      <div className="p-3.5 rounded-xl bg-brand-redBg border border-brand-red/20 text-brand-red text-xs font-semibold font-sans text-left">
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold tracking-widest uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-premium flex items-center justify-center gap-2.5 cursor-pointer font-sans"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          submitting inquiry...
                        </>
                      ) : (
                        <>
                          Submit Inquiry
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-slateLight pt-2 font-sans">
                      <Lock className="w-3 h-3" />
                      Inquiries are protected under B2B privacy ledgers.
                    </div>
                  </form>
                </div>
              )}

            </div>
            </div>
          ) : (
            /* Standard Callout Introduction Text (Clean, Modern, Borderless) */
            <>
              {/* Section Indicator Pill */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-6 transition-premium font-sans mx-auto">
                <Building2 className="w-4 h-4 text-brand-primary shrink-0" />
                {badgeText}
              </span>

              {/* Catchy headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-sans leading-tight max-w-3xl mb-5 mx-auto">
                Are you a business owner looking to expand?
              </h2>

              {/* expansion subheading */}
              <p className="text-sm sm:text-base lg:text-lg text-brand-slate font-normal leading-relaxed max-w-2xl mx-auto mb-10 font-sans">
                Connect with our partnership desk to explore strategic collaborations, custom developer integrations, and institutional property insights tailored for your organization.
              </p>

              {/* Buttons */}
              <div className="flex flex-col items-center gap-3.5 w-full">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center">
                  <button
                    onClick={handleOpenModal}
                    className="w-full sm:w-auto max-w-xs sm:max-w-none px-5.5 py-2.5 sm:px-7 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.012] active:scale-[0.988] transition-premium flex items-center justify-center gap-2.5 cursor-pointer font-sans"
                  >
                    Get in Touch
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/b2b:translate-x-1" />
                  </button>

                  {isChatActive ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto max-w-xs sm:max-w-none px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-widest uppercase border border-[#22C55E] text-[#16A34A] hover:bg-[#22C55E]/5 hover:-translate-y-0.5 active:translate-y-0 hover:scale-[1.01] active:scale-[0.99] transition-premium flex items-center justify-center gap-2.5 cursor-pointer font-sans no-underline inline-flex shadow-sm"
                    >
                      <svg
                        className="w-4.5 h-4.5 fill-current text-[#22C55E] shrink-0"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.451L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.582 2.052 14.12 1.01 11.493 1.01 6.059 1.01 1.633 5.381 1.63 10.81c-.001 1.639.429 3.236 1.246 4.646L1.879 21.36l6.012-1.574L6.647 19.15z" />
                      </svg>
                      Chat with Us
                    </a>
                  ) : (
                    <div className="w-full sm:w-auto max-w-xs sm:max-w-none px-6 py-3.5 sm:px-8 sm:py-4.5 rounded-full text-brand-slate bg-brand-bgAlt border border-brand-border/40 text-[10px] font-bold uppercase tracking-wider font-sans flex items-center justify-center">
                      🟢 Chat Closed • Mon-Sat, 9AM-5PM
                    </div>
                  )}
                </div>

                {isChatActive && (
                  <span className="text-[10px] text-brand-slateLight font-semibold font-sans mt-1">
                    WhatsApp Desk available Mon - Sat • 9 AM - 5 PM
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
