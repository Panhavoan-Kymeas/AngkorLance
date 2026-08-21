import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Envelope, Phone } from "phosphor-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="py-28 px-6 bg-gradient-to-b from-background to-muted/10">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground">
          We’d love to hear from you. Reach out with questions, feedback, or opportunities.
        </p>
      </div>

      {/* Grid: Form + Info */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-background/80 backdrop-blur-md border rounded-xl p-8 shadow-lg flex flex-col gap-6"
        >
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            required
          />
          <Button
            type="submit"
            size="lg"
            className="w-full hover:shadow-xl transition-all duration-300"
          >
            Send Message
          </Button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-8">
          <div className="flex items-start gap-4">
            <MapPin size={28} weight="bold" className="text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Our Office</h3>
              <p className="text-muted-foreground">
                123 Angkor Street, Phnom Penh, Cambodia
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Envelope size={28} weight="bold" className="text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Email Us</h3>
              <p className="text-muted-foreground">support@angkorlance.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone size={28} weight="bold" className="text-primary mt-1" />
            <div>
              <h3 className="font-semibold text-lg">Call Us</h3>
              <p className="text-muted-foreground">+855 12 345 678</p>
            </div>
          </div>

          {/* Optional Map Placeholder */}
          <div className="mt-6 w-full h-64 bg-muted/30 border rounded-xl flex items-center justify-center text-muted-foreground">
            Map Placeholder
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;