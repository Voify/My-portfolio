"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaWhatsapp,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import Toast from "./Toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // 1. Added phone to state
    service: "",
    message: "",
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "bcb5acd9-2568-424f-84ef-65d29a51d9bf",
          name: formData.name,
          email: formData.email,
          phone: formData.phone, // Include phone in submission
          service: formData.service,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setToast({
          show: true,
          message: `Success! Request received for ${formData.service}.`,
          type: "success",
        });
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      setToast({
        show: true,
        message: "Something went wrong. Please use WhatsApp!",
        type: "error",
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
// Inside your Contact component
useEffect(() => {
  const handlePlanEvent = (event: any) => {
    const selectedPlan = event.detail;
    setFormData(prev => ({
      ...prev,
      service: selectedPlan
    }));
  };

  // Listen for the custom event we created in ServicePlans
  window.addEventListener('planSelected', handlePlanEvent);
  
  return () => window.removeEventListener('planSelected', handlePlanEvent);
}, []);

// Ensure your select looks like this:
<select 
  id="service" 
  name="service" 
  value={formData.service} // This is the most important line
  onChange={handleChange} 
  required
>
  {/* ... options ... */}
</select>
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>
          Get In Touch
        </h2>
        <div className="contact-container">
          {/* Info Side */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p style={{ color: "#aaa", marginBottom: "2rem" }}>
              Ready to start your next project? Reach out through any of these channels.
            </p>

            <div className="contact-method">
              <div className="contact-icon"><FaEnvelope /></div>
              <div>
                <h4>Email</h4>
                <p>mithunminsara10@gmail.com</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon"><FaPhoneAlt /></div>
              <div>
                <h4>Phone / WhatsApp</h4>
                <p>+94 70 268 5025</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon"><FaMapMarkerAlt /></div>
              <div>
                <h4>Location</h4>
                <p>Colombo, Sri Lanka</p>
              </div>
            </div>

            <div className="social-links-grid">
              <a href="https://wa.me/94702685025" className="social-icon-btn whatsapp" target="_blank">
                <FaWhatsapp />
              </a>
              <a href="mailto:mithunminsara10@gmail.com" className="social-icon-btn email">
                <FaEnvelope />
              </a>
              <a href="https://linkedin.com" className="social-icon-btn linkedin" target="_blank">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com" className="social-icon-btn github" target="_blank">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-card">
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Mithun Minsara" />
              </div>
              
              <div className="form-row"> {/* Optional: put email and phone side-by-side */}
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+94 7X XXX XXXX" />
                </div>
              </div>

              <div className="form-group">
                <label>Service & Plan Tiers</label>
                <select id="service" name="service" value={formData.service} onChange={handleChange} required>
                  <option value="">Select a service plan</option>
                  
                  <optgroup label="Graphic Design">
                    <option value="Bronze - Graphic Design">Bronze - Graphic Design</option>
                    <option value="Silver - Graphic Design">Silver - Graphic Design</option>
                    <option value="Gold - Graphic Design">Gold - Graphic Design</option>
                  </optgroup>

                  <optgroup label="Web Development">
                    <option value="Bronze - Web Development">Bronze - Web Development</option>
                    <option value="Silver - Web Development">Silver - Web Development</option>
                    <option value="Gold - Web Development">Gold - Web Development</option>
                  </optgroup>

                  <optgroup label="Video Editing">
                    <option value="Bronze - Video Editing">Bronze - Video Editing</option>
                    <option value="Silver - Video Editing">Silver - Video Editing</option>
                    <option value="Gold - Video Editing">Gold - Video Editing</option>
                  </optgroup>
                </select>
              </div>

              <div className="form-group">
                <label>Your Message</label>
                <textarea name="message" rows={4} value={formData.message} onChange={handleChange} required placeholder="Tell me about your project..."></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toast
        isVisible={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </section>
  );
};

export default Contact;