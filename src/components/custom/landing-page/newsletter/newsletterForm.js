"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Subscribed!");
};
const NewsletterForm = () => {
  return (
    <>
      <form
        className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="leomirandadev@gmail.com"
          className="bg-muted/50 dark:bg-muted/80 "
          aria-label="email"
        />
        <Button>Subscribe</Button>
      </form>
    </>
  );
};

export default NewsletterForm;
