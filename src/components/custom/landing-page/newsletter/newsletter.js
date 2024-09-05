import NewsletterForm from "./newsletterForm";

export const Newsletter = () => {
  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join Our Daily{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Newsletter
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <NewsletterForm />
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
