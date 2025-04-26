import { useState, useRef } from "react";
import { Send, Mail, User, MessageSquare, Loader } from "lucide-react";
import emailjs from "@emailjs/browser";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "@/integrations/emailjs/config";

const ContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const templateParams = {
      title: `Contact Us: ${formData.name}`,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(),
      to_email: "gsoni2092@gmail.com",
      reply_to: formData.email,
    };

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setSubmitStatus({
          success: true,
          message:
            "Your message has been sent successfully! I will get back to you soon.",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus({
        success: false,
        message:
          "There was a problem sending your message. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card max-w-lg mx-auto">
      <h3 className="text-2xl font-bold text-portfolio-lightestSlate mb-6">
        Get In Touch
      </h3>

      {submitStatus && (
        <div
          className={`p-4 mb-6 rounded-md ${
            submitStatus.success
              ? "bg-green-900/20 text-green-300 border border-green-500/30"
              : "bg-red-900/20 text-red-300 border border-red-500/30"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-portfolio-lightestSlate mb-2"
          >
            <User size={16} className="inline mr-2" />
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-portfolio-navy border border-portfolio-lightestNavy rounded-md p-3 text-portfolio-lightSlate focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-portfolio-lightestSlate mb-2"
          >
            <Mail size={16} className="inline mr-2" />
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-portfolio-navy border border-portfolio-lightestNavy rounded-md p-3 text-portfolio-lightSlate focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-portfolio-lightestSlate mb-2"
          >
            <MessageSquare size={16} className="inline mr-2" />
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full bg-portfolio-navy border border-portfolio-lightestNavy rounded-md p-3 text-portfolio-lightSlate focus:outline-none focus:ring-2 focus:ring-portfolio-cyan/50 focus:border-transparent"
            placeholder="Hello, I'd like to discuss..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader size={18} className="mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={18} className="mr-2" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
