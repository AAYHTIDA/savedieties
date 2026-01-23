import { Mail, Phone, MapPin, Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-primary-foreground font-semibold text-lg mb-4">About Us</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Save Deities is dedicated to protecting temple properties and preserving our sacred heritage through legal advocacy and community support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-primary-foreground font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-primary-foreground/60 hover:text-saffron transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/court-cases" className="text-primary-foreground/60 hover:text-saffron transition-colors">
                  Court Cases
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="text-primary-foreground/60 hover:text-saffron transition-colors">
                  Contribute
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/60 hover:text-saffron transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-primary-foreground font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-saffron mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/60">contact@savedieties.org</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-saffron mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/60">+91 9946 116 845</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-saffron mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/60">Kaloor, Ernakulam, Kerala</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-primary-foreground font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/save.deities.3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-saffron/20 hover:bg-saffron text-saffron hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/save.deities.3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-saffron/20 hover:bg-saffron text-saffron hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCnP4EqfQ2yoOfcIs1UD1N5A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-saffron/20 hover:bg-saffron text-saffron hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60">
          <p>
            © {currentYear} Save Deities. {t("footer.copyright").replace("{year}", currentYear.toString())}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-saffron transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-saffron transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-saffron transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
