import { useTranslation } from "@/hooks/useTranslation";

const QuoteSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-dark-bg py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-display text-primary-foreground italic mb-4">
          "{t("quote.text")}"
        </h2>
        <p className="text-primary-foreground/70 text-lg">
          "{t("quote.translation")}"
        </p>
      </div>
    </section>
  );
};

export default QuoteSection;
