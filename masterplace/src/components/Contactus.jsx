import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./ContactUs.css";
import axios from 'axios';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation controls
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [formRef, formInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [mapRef, mapInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const controls = useAnimation();

  useEffect(() => {
    if (heroInView) {
      controls.start("visible");
    }
  }, [controls, heroInView]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Make the API request with axios
        await axios.post('http://localhost:5000/api/contact', formData);
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div ref={heroRef} className="hero-section">
  <img
    src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
    alt="Real Estate Hero"
    className="hero-image"
  />
  <h1 className="hero-text">
    Get in Touch with Masterplace
  </h1>
</div>

      {/* Zig-Zag Section 1: Image Left, Info Right */}
      <motion.div
        ref={contactRef}
        className="zigzag-section"
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        <motion.div
          className="zigzag-image"
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -50 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be"
            alt="Office Contact"
            className="info-image"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <motion.div
          className="zigzag-content"
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: 50 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Contact Information
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={contactInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >📞 +91 9970017701</motion.p>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={contactInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >✉️ info@masterplace.in</motion.p>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={contactInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
          >📍 Kharadi, Pune</motion.p>
        </motion.div>
      </motion.div>

      {/* Zig-Zag Section 2: Image Right, Form Left */}
      <motion.div
        ref={formRef}
        className="zigzag-section"
        initial="hidden"
        animate={formInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: { staggerChildren: 0.2 }
          }
        }}
      >
        <motion.div
          className="zigzag-content"
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: -50 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Send Us a Message
          </motion.h2>
          
          {submitSuccess && (
            <motion.div 
              className="success-message"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              Thank you for your message! We'll get back to you soon.
            </motion.div>
          )}

          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={formInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="form-group">
              <motion.input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                value={formData.name}
                onChange={handleChange}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px #2563eb" }}
                transition={{ duration: 0.2 }}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <motion.input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px #2563eb" }}
                transition={{ duration: 0.2 }}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <motion.input 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleChange}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px #2563eb" }}
                transition={{ duration: 0.2 }}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <motion.textarea 
                name="message"
                placeholder="Your Message" 
                value={formData.message}
                onChange={handleChange}
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px #2563eb" }}
                transition={{ duration: 0.2 }}
              ></motion.textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <motion.button 
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {isSubmitting ? 'Sending...' : 'Submit'}
            </motion.button>
          </motion.form>
        </motion.div>
        <motion.div
          className="zigzag-image"
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0, x: 50 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1507209696998-3c532be9b2b5"
            alt="Contact Form Illustration"
            className="info-image"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Map Section */}
      <motion.div
        ref={mapRef}
        className="map-section-container"
        initial={{ opacity: 0, y: 50 }}
        animate={mapInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="section-title map-title"
          initial={{ opacity: 0, y: 20 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Find Us on Map
        </motion.h2>
        
        <motion.p 
          className="map-subtitle"
          initial={{ opacity: 0 }}
          animate={mapInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Visit our office in Kharadi, Pune
        </motion.p>

        <div className="map-content-wrapper">
          <motion.div
            className="map-embed-container"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.9148964152217!3d18.562061287384868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1625079322417!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Masterplace Location"
            ></iframe>
          </motion.div>

          <motion.div
            className="map-info-box"
            initial={{ opacity: 0 }}
            animate={mapInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3>Office Address</h3>
            <p>📍 Phoenix Marketcity Area</p>
            <p>Kharadi, Pune</p>
            <p>Maharashtra 411014</p>
            <div className="map-contact-info">
              <p><i className="fas fa-phone"></i> +91 9970017701</p>
              <p><i className="fas fa-envelope"></i> info@masterplace.in</p>
              <p><i className="fas fa-clock"></i> Mon-Sat: 9AM - 6PM</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
  
}