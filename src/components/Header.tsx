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

interface HeaderProps {
  hideAdminLogin?: boolean;
  hideContribute?: boolean;
}

const Header = ({ hideAdminLogin = false, hideContribute = false }: HeaderProps) => {
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
    ...(hideContribute ? [] : [{ label: t("nav.contribute"), href: "/contribute" }]),
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
        <div className="flex items-center justify-between py-5 gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logoImage} alt="Save Deities" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-5 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap rounded-lg ${item.active
                  ? "bg-saffron text-primary-foreground shadow-sm"
                  : "text-foreground hover:text-saffron hover:bg-gray-50"
                  }`}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
              </a>
            ))}
          </nav>

          {/* Right Section - Language Toggle, Admin Login & Mobile Menu Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-2.5 border-saffron text-saffron hover:bg-saffron hover:text-primary-foreground px-5 py-2.5 h-auto"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-medium">{language === 'en' ? 'മലയാളം' : 'English'}</span>
            </Button>

            {!hideAdminLogin && !user ? (
              <Button
                onClick={() => setShowAdminLogin(true)}
                size="sm"
                className="hidden sm:flex items-center gap-2.5 bg-saffron hover:bg-saffron/90 text-primary-foreground font-semibold px-5 py-2.5 h-auto"
              >
                <Lock className="w-4 h-4" />
                <span className="text-xs font-medium">Admin Login</span>
              </Button>
            ) : !hideAdminLogin && user ? (
              <Button
                onClick={logout}
                size="sm"
                variant="outline"
                className="hidden sm:flex items-center gap-2.5 px-5 py-2.5 h-auto"
              >
                <span className="text-xs font-medium">Logout</span>
              </Button>
            ) : null}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden ml-2 h-10 w-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-5 border-t border-gray-200 bg-gray-50">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-6 py-3.5 text-sm font-medium transition-colors ${item.active ? "text-saffron bg-saffron/10" : "text-foreground hover:text-saffron hover:bg-gray-100"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="px-6 py-5 border-t border-gray-200 space-y-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="w-full border-saffron text-saffron hover:bg-saffron hover:text-primary-foreground flex items-center justify-center gap-2.5 py-2.5 h-auto"
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'മലയാളം' : 'English'}
              </Button>
              {!hideAdminLogin && !user ? (
                <Button
                  onClick={() => {
                    setShowAdminLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  size="sm"
                  className="w-full bg-saffron hover:bg-saffron/90 text-primary-foreground font-semibold flex items-center justify-center gap-2.5 py-2.5 h-auto"
                >
                  <Lock className="w-4 h-4" />
                  Admin Login
                </Button>
              ) : !hideAdminLogin && user ? (
                <Button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  size="sm"
                  variant="outline"
                  className="w-full py-2.5 h-auto"
                >
                  Logout
                </Button>
              ) : null}
            </div>
          </nav>
        )}
      </div>

      {/* Contribute Side Button - Removed */}

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
