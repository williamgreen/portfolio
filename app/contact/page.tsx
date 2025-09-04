"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import BottomNavigation from "@/components/bottom-navigation";
import Breadcrumb from "@/components/breadcrumb";
import Footer from "@/components/footer";
import AnimateOnScroll from "@/components/animate-on-scroll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const recaptchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Will Green - Contact";

    // Render reCAPTCHA after component mounts
    const renderRecaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        try {
          // Clear any existing content first
          recaptchaRef.current.innerHTML = "";

          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: "6Le_66QrAAAAAC7G2UEGdWnaqZDq9EjBHoL8foNB",
            theme: "light",
            size: "normal",
          });
          console.log("reCAPTCHA rendered successfully");
        } catch (error) {
          console.error("Error rendering reCAPTCHA:", error);
        }
      }
    };

    // Wait for grecaptcha to be ready
    if (window.grecaptcha) {
      window.grecaptcha.ready(renderRecaptcha);
    } else {
      // Poll for grecaptcha
      const checkForGrecaptcha = () => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(renderRecaptcha);
        } else {
          setTimeout(checkForGrecaptcha, 100);
        }
      };
      checkForGrecaptcha();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Check if reCAPTCHA was completed (same validation as working button)
    const recaptchaResponse = (window as any).grecaptcha?.getResponse();
    if (!recaptchaResponse) {
      e.preventDefault();
      alert("Please complete the reCAPTCHA verification");
      return;
    }

    // Replicate exactly what the working "Submit Real Form" button did
    e.preventDefault();
    setIsSubmitting(true);

    // Submit directly like the working button
    const form = e.currentTarget;
    form.onsubmit = null; // Remove this handler
    form.submit(); // Direct submission to Formspark
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <AnimateOnScroll loadOnMount={true}>
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
        </AnimateOnScroll>

        <AnimateOnScroll loadOnMount={true}>
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Get in touch</h1>
            <p className="text-muted-foreground mb-6">
              Reach out with a message or schedule a call below.
            </p>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">
                Available for freelance work
              </span>
            </div>

            <Link
              href="https://calendly.com/willgreen/15min?back=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Book a call
                <ArrowUpRight className="w-4 h-4 -ml-1 align-middle" />
              </Button>
            </Link>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll loadOnMount={true}>
          <form
            action="https://submit-form.com/qlcXz9id"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-6 mb-6"
          >
            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800">
                Sorry, there was an error sending your message. Please try
                again.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="bg-muted border-0 placeholder:text-muted-foreground"
                disabled={isSubmitting}
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="bg-muted border-0 placeholder:text-muted-foreground"
                disabled={isSubmitting}
              />
            </div>

            <Textarea
              name="message"
              placeholder="Message"
              required
              rows={8}
              className="bg-muted border-0 placeholder:text-muted-foreground resize-none"
              disabled={isSubmitting}
            />

            <div ref={recaptchaRef} style={{ minHeight: "78px" }}></div>

            <Button
              type="submit"
              className="w-full bg-foreground text-background hover:bg-foreground/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>
        </AnimateOnScroll>

        <AnimateOnScroll loadOnMount={true}>
          <div className="flex items-center gap-2 mb-12 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Avg. response 12 hours</span>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll loadOnMount={true}>
          <Footer />
        </AnimateOnScroll>
      </div>
      <BottomNavigation />
    </div>
  );
}
