import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import logoImage from "@/assets/logo.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { t, language } = useTranslation();
  const { setLanguage } = useLanguage();
  const { user, logout } = useAuth();

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

  const handleAdminLoginSuccess = () => {
    setShowAdminLogin(false);
  };

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logoImage} alt="Save Deities" className="h-14 w-auto" />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1 whitespace-nowrap rounded-lg ${
                  item.active
                    ? "bg-saffron text-primary-foreground"
                    : "text-foreground hover:text-saffron hover:bg-gray-100"
                }`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </a>
            ))}
          </nav>

          {/* Right Section - Language Toggle, Admin Login & Mobile Menu Button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2 border-saffron text-saffron hover:bg-saffron hover:text-primary-foreground px-4"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">{language === 'en' ? 'മലയാളം' : 'English'}</span>
            </Button>
            
            {!user ? (
              <Button
                onClick={() => setShowAdminLogin(true)}
                size="sm"
                className="hidden sm:flex items-center gap-2 bg-saffron hover:bg-saffron/90 text-primary-foreground font-semibold px-4"
              >
                <Lock className="w-4 h-4" />
                <span className="text-xs font-medium">Admin Login</span>
              </Button>
            ) : (
              <Button
                onClick={logout}
                size="sm"
                variant="outline"
                className="hidden sm:flex items-center gap-2 px-4"
              >
                <span className="text-xs font-medium">Logout</span>
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200 bg-gray-50">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  item.active ? "text-saffron bg-saffron/10" : "text-foreground hover:text-saffron hover:bg-gray-100"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 py-4 border-t border-gray-200 space-y-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="w-full border-saffron text-saffron hover:bg-saffron hover:text-primary-foreground flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'മലയാളം' : 'English'}
              </Button>
              {!user ? (
                <Button
                  onClick={() => {
                    setShowAdminLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  size="sm"
                  className="w-full bg-saffron hover:bg-saffron/90 text-primary-foreground font-semibold flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Admin Login
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  size="sm"
                  variant="outline"
                  className="w-full"
                >
                  Logout
                </Button>
              )}
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

      {/* Admin Login Dialog */}
      <Dialog open={showAdminLogin} onOpenChange={setShowAdminLogin}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
          </DialogHeader>
          <LoginForm onSuccess={handleAdminLoginSuccess} />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
