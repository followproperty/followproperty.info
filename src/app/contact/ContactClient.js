"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Check, Lock } from 'lucide-react';
import contentData from '../../data/content.json';

export default function ContactClient() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phone: '',
    alreadyOwn: false,
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contact = contentData.contactDetails || {};

  const handleFieldChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      errs.phone = "Please enter a valid 10-digit phone number";
    }
    if (!form.message.trim()) errs.message = "Message is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          city: form.city,
          phone: form.phone,
          alreadyOwn: form.alreadyOwn,
          message: form.message,
          leadSource: 'contact'
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(true);
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          city: '',
          phone: '',
          alreadyOwn: false,
          message: ''
        });
      } else {
        setErrors({ submit: data.message || 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white border-b border-brand-borderMid/10 flex flex-col items-center justify-center min-h-[600px]">
      {/* Dot mesh background */}
      <div className="absolute inset-0 bg-dot-mesh pointer-events-none z-0"></div>

      {/* Decorative glows */}
      <div className="absolute top-1/4 right-1/4 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-brand-primary/3 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-brand-teal/2 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-primaryBorder/20 text-[10px] sm:text-xs font-semibold tracking-widest text-brand-primary uppercase mb-6 transition-premium font-sans mx-auto">
            <Mail className="w-4 h-4 text-brand-primary shrink-0" />
            CONTACT US
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight font-sans leading-tight mb-6">
            Get in touch with our intelligence desk.
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-brand-slate font-normal leading-relaxed max-w-2xl mx-auto font-sans">
            Have questions about our data products, construction tracking index, or B2B advisory feeds? Reach out to our team in Gurgaon.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-5xl mx-auto w-full">
          {/* Left Column: Details */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="bg-brand-bgAlt border border-brand-border/40 rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
              <h3 className="text-lg font-bold text-brand-navy font-sans tracking-tight">
                Our Office Location
              </h3>
              
              <div className="flex flex-col gap-5 text-sm font-semibold text-brand-navy">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-start gap-3.5 hover:text-brand-primary transition-colors font-sans">
                    <Mail className="w-5 h-5 text-brand-slateLight shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-brand-slateLight tracking-wider uppercase">Email Us</span>
                      <span className="text-xs sm:text-sm font-bold mt-0.5">{contact.email}</span>
                    </div>
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-start gap-3.5 hover:text-brand-primary transition-colors font-sans">
                    <Phone className="w-5 h-5 text-brand-slateLight shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-brand-slateLight tracking-wider uppercase">Call Us</span>
                      <span className="text-xs sm:text-sm font-bold mt-0.5">{contact.phone}</span>
                    </div>
                  </a>
                )}
                {contact.address && (
                  <div className="flex items-start gap-3.5 text-brand-slate font-sans">
                    <MapPin className="w-5 h-5 text-brand-slateLight shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-brand-slateLight tracking-wider uppercase">Visit Us</span>
                      <span className="text-xs sm:text-sm font-bold text-brand-navy mt-0.5">{contact.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Clean support note card */}
            <div className="px-6 py-5 rounded-2xl bg-brand-primaryBg border border-brand-primaryBorder/30 text-xs text-brand-slate font-medium leading-relaxed font-sans">
              🟢 **Response Guarantee**: We review all incoming regulatory queries and data inquiries within 24 business hours.
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 w-full bg-brand-bgAlt border border-brand-border/40 rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-brand-primaryBg border border-brand-primaryBorder/40 flex items-center justify-center text-brand-primary mb-5 shrink-0 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg sm:text-xl font-extrabold text-brand-navy font-sans tracking-tight mb-2.5">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-brand-slate font-normal leading-relaxed max-w-sm mb-6 font-sans">
                  Thank you for contacting the FollowProperty desk. A representative will review your message and reply via email shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm transition-all duration-300 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-brand-navy tracking-tight font-sans">
                    Send a Message
                  </h3>
                  <p className="text-xs text-brand-slate font-normal mt-0.5">
                    Please fill out the details below and we will get back to you shortly.
                  </p>
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans">
                      First Name <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="e.g. John"
                      value={form.firstName}
                      onChange={(e) => handleFieldChange('firstName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans ${
                        errors.firstName
                          ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                          : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                      }`}
                    />
                    {errors.firstName && (
                      <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans">
                      Last Name <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="e.g. Doe"
                      value={form.lastName}
                      onChange={(e) => handleFieldChange('lastName', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans ${
                        errors.lastName
                          ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                          : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                      }`}
                    />
                    {errors.lastName && (
                      <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans">
                    Email Address <span className="text-brand-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john.doe@example.com"
                    value={form.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans ${
                      errors.email
                        ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                        : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* City & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans">
                      City <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      placeholder="e.g. Gurgaon"
                      value={form.city}
                      onChange={(e) => handleFieldChange('city', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans ${
                        errors.city
                          ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                          : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                      }`}
                    />
                    {errors.city && (
                      <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans">
                        {errors.city}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans">
                      Phone Number <span className="text-brand-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="9856XXXXXX"
                      value={form.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans ${
                        errors.phone
                          ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                          : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Already Own Property Checkbox */}
                <div className="flex items-center py-0.5">
                  <label className="relative flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      id="alreadyOwn"
                      checked={form.alreadyOwn}
                      onChange={(e) => handleFieldChange('alreadyOwn', e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className={`w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center text-white transition-premium shadow-sm group-hover:border-brand-primaryLight ${
                      form.alreadyOwn 
                        ? 'bg-brand-primary border-brand-primary' 
                        : 'border-brand-border bg-white'
                    }`}>
                      <Check className={`w-3.5 h-3.5 transition-opacity duration-200 ${
                        form.alreadyOwn ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-brand-navy select-none transition-premium group-hover:text-brand-primary font-sans">
                      Own Property in Gurgaon
                    </span>
                  </label>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-wider text-brand-navy mb-1.5 font-sans">
                    Your Message <span className="text-brand-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Please describe your query in detail..."
                    value={form.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm text-brand-navy bg-white border outline-none transition-premium font-sans resize-none ${
                      errors.message
                        ? "border-brand-red focus:ring-4 focus:ring-brand-red/10"
                        : "border-brand-border/40 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/5"
                    }`}
                  ></textarea>
                  {errors.message && (
                    <span className="text-[10px] text-brand-red font-semibold mt-1 block font-sans">
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submission Error Banner */}
                {errors.submit && (
                  <p className="text-xs text-brand-red text-center font-bold font-sans bg-brand-redBg border border-brand-red/10 py-2.5 px-4 rounded-xl animate-fadeIn">
                    ⚠️ {errors.submit}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold tracking-widest uppercase bg-white text-brand-navy border border-brand-navy/80 hover:bg-brand-navy hover:text-white hover:border-brand-navy shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-premium flex items-center justify-center gap-2 cursor-pointer font-sans disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Privacy Lock footer */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-brand-slateLight pt-2">
                  <Lock className="w-3 h-3" />
                  Your inquiries are protected under institutional privacy ledgers.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
