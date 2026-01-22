import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

const ContributeSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="bg-dark-section py-20" id="contribute">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display text-primary-foreground mb-6">
          {t("contribute.title")}
        </h2>
        <div className="w-24 h-1 bg-saffron mx-auto mb-8" />
        <p className="text-primary-foreground/80 max-w-3xl mx-auto text-lg mb-8 leading-relaxed">
          {t("contribute.description")}
        </p>
        <Button 
          variant="saffron" 
          size="xl"
          onClick={() => navigate('/contribute')}
        >
          {t("contribute.button")}
        </Button>
      </div>
    </section>
  );
};

export default ContributeSection;
