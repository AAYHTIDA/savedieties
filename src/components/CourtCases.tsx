import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scale, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const CourtCases = () => {
  const [animated, setAnimated] = useState(false);
  const { t } = useTranslation();

  const stats = [
    { number: 44, label: t("courtCases.totalCases") },
    { number: 22, label: t("courtCases.inProgress") },
    { number: 22, label: t("courtCases.inCourt") },
    { number: 0, label: t("courtCases.completed") },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-dark-section py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display text-primary-foreground text-center mb-4">
          {t("courtCases.title")}
        </h2>
        <div className="w-24 h-1 bg-saffron mx-auto mb-12" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className={`text-5xl md:text-6xl font-display text-saffron mb-2 transition-all duration-1000 ${
                  animated ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {stat.number}
              </div>
              <p className="text-primary-foreground/70 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            {t("courtCases.description")}
          </p>
          <Link to="/court-cases">
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-saffron text-saffron hover:bg-saffron hover:text-dark-section transition-all duration-300"
            >
              <Scale className="mr-2 h-5 w-5" />
              {t("courtCases.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourtCases;
