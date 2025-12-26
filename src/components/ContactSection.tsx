import { MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}`
      );
      
      const mailtoLink = `mailto:adithyaaskumar06@gmail.com?subject=${subject}&body=${body}`;
      
      // Open default email client
      window.location.href = mailtoLink;
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      toast.success('Email client opened! Please send the email from your email application.');
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to open email client. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="bg-dark-section py-20" id="contact">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display text-primary-foreground text-center mb-4">
          Contact Us
        </h2>
        <div className="w-24 h-1 bg-saffron mx-auto mb-12" />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-display text-saffron mb-6">
              SAKETHAM HINDU LITIGANTS TRUST
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-saffron mt-1 flex-shrink-0" />
                <p className="text-primary-foreground/80">
                  No 63/3171 Bharatham, Opposite NSS Karayogam, Palliparambu Lane, 
                  Ponoth Road, Kaloor P.O, PIN 682017
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-saffron flex-shrink-0" />
                <a
                  href="mailto:contact@savedeities.org"
                  className="text-primary-foreground/80 hover:text-saffron transition-colors"
                >
                  contact@savedeities.org
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-saffron flex-shrink-0" />
                <a
                  href="tel:+918138018300"
                  className="text-primary-foreground/80 hover:text-saffron transition-colors"
                >
                  +91 8138018300
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name *"
                  required
                  className="w-full px-4 py-3 bg-dark-card border border-border rounded-lg text-primary-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email *"
                  required
                  className="w-full px-4 py-3 bg-dark-card border border-border rounded-lg text-primary-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron"
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                className="w-full px-4 py-3 bg-dark-card border border-border rounded-lg text-primary-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message *"
                rows={5}
                required
                className="w-full px-4 py-3 bg-dark-card border border-border rounded-lg text-primary-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron resize-none"
              />
              <Button 
                type="submit" 
                variant="saffron" 
                size="lg" 
                className="w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Opening Email...' : 'Write to us'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
