"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useActionState } from "react";
import { sendContactEmail } from "@/actions/sendContactEmail";
import FormInput from "@/components/form-utils/form-input";
import FormTextarea from "@/components/form-utils/form-textarea";

// Submit Button Component with Loading State
function SubmitButton({ isPending }) {
  return (
    <Button
      type="submit"
      variant="default"
      size="lg"
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 font-semibold shadow-lg"
      disabled={isPending}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isPending ? "Sending..." : "Send Message"}
        <Send className="w-4 h-4" />
      </span>
    </Button>
  );
}

export const ContactForm = () => {
  // Initialize form state
  const initialState = {
    message: "",
    success: false,
    error: false,
  };

  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  );

  return (
    <section id="contact" className="">
      {/* Show success/error messages */}
      {state?.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 rounded-xl border p-4 ${
            state.success
              ? "border-green-500/20 bg-green-500/10 text-green-500"
              : "border-red-500/20 bg-red-500/10 text-red-500"
          }`}
          role="alert"
          aria-live="polite"
        >
          {state.message}
        </motion.div>
      )}

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormInput
            name="name"
            label="Full Name"
            placeholder="Your full name"
            required
            disabled={isPending}
            inputClassName="bg-background border-border"
          />
          <FormInput
            name="email"
            type="email"
            label="Email Address"
            placeholder="your.email@example.com"
            required
            disabled={isPending}
            inputClassName="bg-background border-border"
          />
        </div>

        <FormInput
          name="phone"
          type="tel"
          label="Phone Number"
          placeholder="+44 7XXX XXXXXX"
          disabled={isPending}
          inputClassName="bg-background border-border"
        />

        <FormInput
          name="subject"
          label="Subject"
          placeholder="e.g., Consultation Inquiry, Treatment Information"
          disabled={isPending}
          inputClassName="bg-background border-border"
        />

        <FormTextarea
          name="message"
          label="Message"
          placeholder="Tell us about your aesthetic goals or any questions you have..."
          required
          rows={6}
          disabled={isPending}
          textareaClassName="bg-background border-border"
        />

        <div className="pt-2">
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </section>
  );
};
