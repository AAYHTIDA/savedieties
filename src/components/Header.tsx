import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImage from "@/assets/logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language } = useTranslation();
  const { setLanguage } = useLanguage();

  const navItems = [
    { label: t("nav.home"), href: "/", active: true },
    { label: t("nav.ourSeva"), href: "#seva", hasDropdown: true },
    { label: t("nav.mediaCentre"), href: "#media", hasDropdown: true },
    { label: t("nav.aboutUs"), href: "#about", hasDropdown: true },
    { label: t("nav.contactUs"), href: "#contact" },
    { label: t("nav.contribute"), href: "#contribute" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ml' : 'en');
  };

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logoImage} alt="Save Deities" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 whitespace-nowrap ${
                  item.active
                    ? "bg-saffron text-primary-foreground rounded-full"
                    : "text-foreground hover:text-saffron"
                }`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </a>
            ))}
          </nav>

          {/* Language Toggle & Mobile Menu Button - Right Aligned */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 border-saffron text-saffron hover:bg-saffron hover:text-primary-foreground"
            >
              <Globe className="w-4 h-4" />
              {language === 'en' ? 'മലയാളം' : 'English'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  item.active ? "text-saffron bg-saffron/10" : "text-foreground hover:text-saffron"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 py-3 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="w-full border-saffron text-saffron hover:bg-saffron hover:text-primary-foreground flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'മലയാളം' : 'English'}
              </Button>
            </div>
          </nav>
        )}
      </div>

      {/* Contribute Side Button */}
      <a
        href="#contribute"
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 bg-saffron text-primary-foreground py-4 px-2 writing-mode-vertical-rl rotate-180 font-semibold text-sm uppercase tracking-wider hover:bg-saffron-dark transition-colors z-40"
        style={{ writingMode: "vertical-rl" }}
      >
        ✻ {t("nav.contribute")}
      </a>
    </header>
  );
};

export default Header;
