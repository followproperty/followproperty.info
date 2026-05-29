"use client";

import React, { useState } from 'react';
import { X, Check, Lock, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import contentData from '../data/content.js';

export default function LeadForm({ isOpen, onClose, ctaText, options }) {
  const pathname = usePathname();
  const strings = contentData.leadForm || {};
  const campaign = contentData.marketCampaign;

  const isCareers = pathname === '/careers' || options?.leadSource === 'careers';
  const isWaitlist = pathname === '/products' || options?.leadSource === 'waitlist';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: '',
    alreadyOwn: false,
    resumeLink: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const showCheckbox = pathname !== '/current-projects' && !options?.projectName && !isCareers && !isWaitlist;

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = strings.errors?.firstNameRequired || 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = strings.errors?.lastNameRequired || 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = strings.errors?.emailRequired || 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = strings.errors?.emailInvalid || 'Please enter a valid email address';
    }
    if (!isCareers && !formData.city.trim()) {
      newErrors.city = strings.errors?.cityRequired || 'City is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = strings.errors?.phoneRequired || 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = strings.errors?.phoneInvalid || 'Please enter a valid 10-digit phone number';
    }
    if (isCareers) {
      if (!formData.resumeLink || !formData.resumeLink.trim()) {
        newErrors.resumeLink = 'Google Drive resume link is required';
      } else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(formData.resumeLink.trim())) {
        newErrors.resumeLink = 'Please enter a valid resume URL link';
      }
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const endpoint = isCareers ? '/api/careers' : (isWaitlist ? '/api/waitlist' : '/api/leads');
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        leadSource: options?.leadSource || (isCareers ? 'careers' : (isWaitlist ? 'waitlist' : 'general'))
      };

      if (isCareers) {
        payload.resumeLink = formData.resumeLink;
      } else {
        payload.city = formData.city;
        payload.alreadyOwn = formData.alreadyOwn;
        if (options?.projectName) {
          payload.projectName = options.projectName;
        }
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          city: '',
          phone: '',
          alreadyOwn: false,
          resumeLink: ''
        });
      } else {
        setErrors({
          submit: data.message || 'Registration failed. Please try again.'
        });
      }
    } catch (err) {
      setErrors({
        submit: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Dark premium backdrop overlay */}
      <div 
        className="absolute inset-0 bg-[#0F1629]/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-brand-borderMid/50 shadow-brand-lg overflow-hidden z-10 transition-all duration-300 max-h-[90vh] flex flex-col animate-scaleIn">
        
        {/* Top brand bar in electric blue and teal gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-primary via-brand-primaryLight to-brand-teal"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-brand-slate hover:text-brand-navy hover:bg-[#FAFAF8] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-10 overflow-y-auto">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <img 
                    src="/logo.svg" 
                    alt="Follow Property Logo" 
                    className="h-6 sm:h-7 w-auto object-contain" 
                  />
                </div>
                {!isCareers && !isWaitlist && (
                  <>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-primaryBg border border-brand-primaryBorder/30 text-[9px] font-bold tracking-widest text-brand-primary uppercase mb-3">
                      {options?.projectName ? '★ PROJECT INQUIRY' : (strings.waitlistBadge || '★ ADVISORY DESK')}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight font-sans mb-2">
                      {options?.projectName ? `Inquire about ${options.projectName}` : (strings.title || 'Consult with Our Advisory Desk')}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-slate font-light leading-relaxed">
                      {options?.projectName 
                        ? `Register your interest for ${options.projectName}. A partner from our Gurgaon desk will contact you with pricing, layouts, and inventory updates.`
                        : (strings.subtitle || 'Register your property requirements or developer alliance requests below. A partner from our Gurgaon desk will contact you.')}
                    </p>
                  </>
                )}
                {isCareers && (
                  <>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-primaryBg border border-brand-primaryBorder/30 text-[9px] font-bold tracking-widest text-brand-primary uppercase mb-3">
                      ★ CAREER APPLICATION
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight font-sans mb-2">
                      {options?.jobTitle ? `Apply for ${options.jobTitle}` : 'Submit Your Application'}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-slate font-light leading-relaxed">
                      Please enter your student/applicant details and Google Drive resume link below.
                    </p>
                  </>
                )}
                {isWaitlist && (
                  <>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-primaryBg border border-brand-primaryBorder/30 text-[9px] font-bold tracking-widest text-brand-primary uppercase mb-3">
                      ★ PRODUCT WAITLIST
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy tracking-tight font-sans mb-2">
                      Join Early Access Waitlist
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-slate font-light leading-relaxed">
                      Get early access and updates when the FollowProperty Intelligence Platform launches.
                    </p>
                  </>
                )}
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                      {strings.firstNameLabel || 'First Name'} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={strings.firstNamePlaceholder || 'e.g. John'}
                      className={`w-full px-4 py-3.5 rounded-xl text-sm text-brand-navy bg-white border border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-premium placeholder-brand-slateLight/75 ${
                        errors.firstName ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/5' : ''
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-brand-red mt-1.5 font-semibold font-sans">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                      {strings.lastNameLabel || 'Last Name'} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={strings.lastNamePlaceholder || 'e.g. Doe'}
                      className={`w-full px-4 py-3.5 rounded-xl text-sm text-brand-navy bg-white border border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-premium placeholder-brand-slateLight/75 ${
                        errors.lastName ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/5' : ''
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-brand-red mt-1.5 font-semibold font-sans">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                    {strings.emailLabel || 'Email Address'} <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={strings.emailPlaceholder || 'john.doe@example.com'}
                    className={`w-full px-4 py-3.5 rounded-xl text-sm text-brand-navy bg-white border border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-premium placeholder-brand-slateLight/75 ${
                      errors.email ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/5' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-brand-red mt-1.5 font-semibold font-sans">{errors.email}</p>
                  )}
                </div>

                {/* City & Phone Number Grid (If not careers) */}
                {!isCareers ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                        {strings.cityLabel || 'City'} <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder={strings.cityPlaceholder || 'e.g. Gurgaon'}
                        className={`w-full px-4 py-3.5 rounded-xl text-sm text-brand-navy bg-white border border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-premium placeholder-brand-slateLight/75 ${
                          errors.city ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/5' : ''
                        }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-brand-red mt-1.5 font-semibold font-sans">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                        {strings.phoneLabel || 'Phone Number'} <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={strings.phonePlaceholder || '9856XXXXXX'}
                        className={`w-full px-4 py-3.5 rounded-xl text-sm text-brand-navy bg-white border border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-premium placeholder-brand-slateLight/75 ${
                          errors.phone ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/5' : ''
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-brand-red mt-1.5 font-semibold font-sans">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Careers Fields: Phone Number & Resume Link */
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                        {strings.phoneLabel || 'Phone Number'} <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={strings.phonePlaceholder || '9856XXXXXX'}
                        className={`w-full px-4 py-3.5 rounded-xl text-sm text-brand-navy bg-white border border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-premium placeholder-brand-slateLight/75 ${
                          errors.phone ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/5' : ''
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-brand-red mt-1.5 font-semibold font-sans">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="resumeLink" className="block text-[10px] font-bold uppercase tracking-wider text-brand-slate mb-2 font-sans">
                        Google Drive Resume Link <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="url"
                        id="resumeLink"
                        name="resumeLink"
                        value={formData.resumeLink}
                        onChange={handleChange}
                        placeholder="e.g. https://drive.google.com/..."
                        className={`w-full px-4 py-3.5 rounded-xl text-sm text-brand-navy bg-white border border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5 outline-none transition-premium placeholder-brand-slateLight/75 ${
                          errors.resumeLink ? 'border-brand-red focus:border-brand-red focus:ring-brand-red/5' : ''
                        }`}
                      />
                      {errors.resumeLink && (
                        <p className="text-xs text-brand-red mt-1.5 font-semibold font-sans">{errors.resumeLink}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Already Own Property Checkbox */}
                {showCheckbox && (
                  <div className="flex items-center py-1">
                    <label className="relative flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        id="alreadyOwn"
                        name="alreadyOwn"
                        checked={formData.alreadyOwn}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            alreadyOwn: e.target.checked
                          });
                        }}
                        className="peer sr-only"
                      />
                      <div className={`w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center text-white transition-premium shadow-sm group-hover:border-brand-primaryLight ${
                        formData.alreadyOwn 
                          ? 'bg-brand-primary border-brand-primary' 
                          : 'border-brand-border bg-white'
                      }`}>
                        <Check className={`w-3.5 h-3.5 stroke-[3.5] transition-opacity duration-200 ${
                          formData.alreadyOwn ? 'opacity-100' : 'opacity-0'
                        }`} />
                      </div>
                      <span className="text-sm font-semibold text-brand-navy select-none transition-premium group-hover:text-brand-primary">
                        {strings.alreadyOwnLabel || 'Already Own Property'}
                      </span>
                    </label>
                  </div>
                )}

                {/* Submission Error Banner */}
                {errors.submit && (
                  <p className="text-xs text-brand-red text-center font-bold font-sans bg-brand-redBg border border-brand-red/10 py-2.5 px-4 rounded-xl">
                    ⚠️ {errors.submit}
                  </p>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 mt-4 rounded-xl text-xs font-bold tracking-widest uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] hover:scale-[1.01] transition-premium disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {strings.buttonLoadingText || 'securing portal...'}
                    </>
                  ) : (
                    <>
                      {isCareers ? 'Submit Application' : (isWaitlist ? 'Join Waitlist' : (ctaText || strings.buttonText || 'Get Early Access'))}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
                {/* Privacy Lock footer */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-slateLight pt-2">
                  <Lock className="w-3 h-3" />
                  {strings.privacyText || 'Your data is protected by bank-grade security ledgers.'}
                </div>

              </form>
            </>
          ) : (
            /* Success Panel content */
            <div className="text-center py-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-brand-tealBg border border-brand-tealBorder flex items-center justify-center mb-6 text-brand-teal shadow-brand-md animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h3 className="text-2xl font-extrabold text-brand-navy mb-3 font-sans tracking-tight">
                {isCareers ? 'Application Received!' : (isWaitlist ? 'Waitlist Registration Received!' : (options?.projectName ? 'Registration Received!' : (strings.successTitle || 'Successfully Registered!')))}
              </h3>
              <p className="text-sm text-brand-slate font-light leading-relaxed mb-8 max-w-sm mx-auto font-sans">
                {isCareers 
                  ? 'Thank you for applying. A hiring partner from our team will review your student/candidate profile and contact you shortly.'
                  : (isWaitlist 
                    ? 'Thank you for joining our product launch early access waitlist. We will notify you as soon as the platform goes live.'
                    : (options?.projectName 
                      ? `Thank you for registering interest in ${options.projectName}. An advisory partner will contact you shortly.`
                      : (strings.successSubtitle || 'Thank you for registering. An advisory partner will contact you shortly to review your requirements.')))}
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide text-brand-navy bg-[#FAFAF8] hover:bg-[#F4F3EF] border border-brand-borderMid hover:border-brand-navyMid transition-premium cursor-pointer shadow-sm"
              >
                {strings.successCloseText || 'Close Panel'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
