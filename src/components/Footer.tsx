import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-dark-bg py-8 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-primary-foreground/60 text-sm">
          {t("footer.copyright").replace("{year}", new Date().getFullYear().toString())}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
