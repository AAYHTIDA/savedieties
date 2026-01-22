import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import templeAbout from "@/assets/temple-about.jpg";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-dark-bg py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={templeAbout}
              alt="Hindu Temple"
              className="w-full h-[400px] object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-saffron rounded-full flex items-center justify-center">
              <span className="text-3xl font-display text-primary-foreground">ॐ</span>
            </div>
          </div>

          {/* Content */}
          <div className="text-primary-foreground">
            <p className="text-lg leading-relaxed mb-6">
              {t("about.description")}
            </p>
            <Button variant="saffron" size="lg">
              {t("about.knowMore")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
