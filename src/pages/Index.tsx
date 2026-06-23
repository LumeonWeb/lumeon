import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Check, Code, Palette, Rocket, Mail, Phone, MapPin, ExternalLink, Globe, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PaymentDialog } from "@/components/PaymentDialog";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import portfolioEcommerce from "@/assets/portfolio-ecommerce.jpg";
import portfolioRestaurant from "@/assets/portfolio-restaurant.jpg";
import portfolioCorporate from "@/assets/portfolio-corporate.jpg";
import portfolioCreative from "@/assets/portfolio-creative.jpg";
import portfolioMedical from "@/assets/portfolio-medical.jpg";
import portfolioRealEstate from "@/assets/portfolio-realestate.jpg";

const translations = {
  EN: {
    nav: {
      about: "About",
      portfolio: "Portfolio",
      pricing: "Pricing",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      title: "Transform Your Vision Into",
      titleHighlight: " Digital Reality",
      subtitle: "Professional website building services tailored to your business needs. From concept to launch, we create stunning, responsive websites that drive results.",
      viewPackages: "View Packages",
      getInTouch: "Get in Touch",
    },
    about: {
      title: "Why Choose Lumeon?",
      subtitle: "We're passionate about crafting beautiful, functional websites that help businesses thrive online.",
      customDesign: {
        title: "Custom Design",
        description: "Every website is uniquely crafted to reflect your brand identity and engage your target audience effectively.",
      },
      fastDelivery: {
        title: "Fast Delivery",
        description: "We work efficiently without compromising quality, delivering your project on time and within budget.",
      },
      modernTech: {
        title: "Modern Technology",
        description: "Built with the latest web technologies ensuring fast loading, security, and excellent performance.",
      },
    },
    portfolio: {
      title: "Our Recent Work",
      subtitle: "Take a look at some of the websites we've built for our clients across various industries",
      viewProject: "View Project",
      projects: [
        {
          title: "E-Commerce Platform",
          category: "Fashion Retail Store",
          description: "A sleek online shopping experience with integrated payment processing and inventory management.",
        },
        {
          title: "Restaurant Website",
          category: "Fine Dining Experience",
          description: "Beautiful design with online reservation system and interactive menu showcase.",
        },
        {
          title: "Corporate Website",
          category: "Business Consulting Firm",
          description: "Professional corporate presence with team profiles and service showcases.",
        },
        {
          title: "Creative Portfolio",
          category: "Photography Studio",
          description: "Stunning visual gallery with client booking system and portfolio management.",
        },
        {
          title: "Medical Practice",
          category: "Healthcare Clinic",
          description: "Patient-friendly interface with appointment scheduling and health information resources.",
        },
        {
          title: "Real Estate",
          category: "Property Listings",
          description: "Interactive property search with virtual tours and lead capture system.",
        },
      ],
    },
    pricing: {
      title: "Choose Your Package",
      subtitle: "Transparent pricing with no hidden fees. Each package includes everything you need to get online.",
      popular: "Most Popular",
      getStarted: "Get Started",
      plans: [
        {
          name: "Starter",
          description: "Perfect for small businesses and startups",
          features: [
            "Single-page website",
            "Responsive design",
            "Basic SEO optimization",
            "Contact form integration",
            "2 revisions included",
            "30-day support",
          ],
        },
        {
          name: "Professional",
          description: "Ideal for growing businesses",
          features: [
            "Up to 5 pages",
            "Custom responsive design",
            "Advanced SEO optimization",
            "Contact & newsletter forms",
            "Social media integration",
            "5 revisions included",
            "Google Analytics setup",
            "90-day support",
          ],
        },
        {
          name: "Enterprise",
          description: "For established businesses with complex needs",
          features: [
            "Up to 10 pages",
            "Premium custom design",
            "Full SEO optimization",
            "Advanced forms & automation",
            "E-commerce integration",
            "CMS implementation",
            "Unlimited revisions",
            "Priority support for 6 months",
            "Performance optimization",
          ],
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Got questions? We've got answers. If you don't find what you're looking for, feel free to contact us.",
      questions: [
        {
          question: "How long does it take to build a website?",
          answer: "Typical project timelines range from 2-4 weeks depending on the package selected and complexity of requirements. We'll provide a detailed timeline during our initial consultation.",
        },
        {
          question: "Do I need to provide content and images?",
          answer: "While we can work with content you provide, we also offer content creation and professional stock image sourcing as part of our service. We'll guide you through the process.",
        },
        {
          question: "Will my website be mobile-friendly?",
          answer: "Absolutely! All our websites are built with responsive design, ensuring they look great and function perfectly on all devices - phones, tablets, and desktops.",
        },
        {
          question: "What happens after the website is completed?",
          answer: "After launch, we provide support based on your chosen package. We also offer maintenance packages for ongoing updates, security, and improvements.",
        },
        {
          question: "Can I update the website myself?",
          answer: "Yes! For Professional and Enterprise packages, we can integrate a user-friendly CMS (Content Management System) that allows you to make updates without technical knowledge.",
        },
        {
          question: "What if I need changes after the project is complete?",
          answer: "Each package includes a certain number of revisions during the build process. After completion, we offer hourly rates for additional changes or monthly maintenance packages.",
        },
      ],
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Ready to start your project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your.email@example.com",
        message: "Message",
        messagePlaceholder: "Tell us about your project...",
        submit: "Send Message",
      },
      info: {
        email: "Email",
        phone: "Phone",
        location: "Location",
      },
    },
    footer: {
      tagline: "Building digital experiences that matter",
      rights: "All rights reserved.",
    },
    toast: {
      openingEmail: "Opening email client...",
      emailDescription: "Your default email application will open with your message.",
    },
  },
  EE: {
    nav: {
      about: "About",
      portfolio: "Portfolio",
      pricing: "Pricing",
      faq: "FAQ",
      contact: "Kontakt",
    },
    hero: {
      title: "Transform Your Vision Into",
      titleHighlight: " Digital Reality",
      subtitle: "Professional website building services tailored to your business needs. From concept to launch, we create stunning, responsive websites that drive results.",
      viewPackages: "View Packages",
      getInTouch: "Get in Touch",
    },
    about: {
      title: "Why Choose Lumeon?",
      subtitle: "We're passionate about crafting beautiful, functional websites that help businesses thrive online.",
      customDesign: {
        title: "Custom Design",
        description: "Every website is uniquely crafted to reflect your brand identity and engage your target audience effectively.",
      },
      fastDelivery: {
        title: "Fast Delivery",
        description: "We work efficiently without compromising quality, delivering your project on time and within budget.",
      },
      modernTech: {
        title: "Modern Technology",
        description: "Built with the latest web technologies ensuring fast loading, security, and excellent performance.",
      },
    },
    portfolio: {
      title: "Our Recent Work",
      subtitle: "Take a look at some of the websites we've built for our clients across various industries",
      viewProject: "View Project",
      projects: [
        {
          title: "E-Commerce Platform",
          category: "Fashion Retail Store",
          description: "A sleek online shopping experience with integrated payment processing and inventory management.",
        },
        {
          title: "Restaurant Website",
          category: "Fine Dining Experience",
          description: "Beautiful design with online reservation system and interactive menu showcase.",
        },
        {
          title: "Corporate Website",
          category: "Business Consulting Firm",
          description: "Professional corporate presence with team profiles and service showcases.",
        },
        {
          title: "Creative Portfolio",
          category: "Photography Studio",
          description: "Stunning visual gallery with client booking system and portfolio management.",
        },
        {
          title: "Medical Practice",
          category: "Healthcare Clinic",
          description: "Patient-friendly interface with appointment scheduling and health information resources.",
        },
        {
          title: "Real Estate",
          category: "Property Listings",
          description: "Interactive property search with virtual tours and lead capture system.",
        },
      ],
    },
    pricing: {
      title: "Choose Your Package",
      subtitle: "Transparent pricing with no hidden fees. Each package includes everything you need to get online.",
      popular: "Most Popular",
      getStarted: "Get Started",
      plans: [
        {
          name: "Starter",
          description: "Perfect for small businesses and startups",
          features: [
            "Single-page website",
            "Responsive design",
            "Basic SEO optimization",
            "Contact form integration",
            "2 revisions included",
            "30-day support",
          ],
        },
        {
          name: "Professional",
          description: "Ideal for growing businesses",
          features: [
            "Up to 5 pages",
            "Custom responsive design",
            "Advanced SEO optimization",
            "Contact & newsletter forms",
            "Social media integration",
            "5 revisions included",
            "Google Analytics setup",
            "90-day support",
          ],
        },
        {
          name: "Enterprise",
          description: "For established businesses with complex needs",
          features: [
            "Up to 10 pages",
            "Premium custom design",
            "Full SEO optimization",
            "Advanced forms & automation",
            "E-commerce integration",
            "CMS implementation",
            "Unlimited revisions",
            "Priority support for 6 months",
            "Performance optimization",
          ],
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Got questions? We've got answers. If you don't find what you're looking for, feel free to contact us.",
      questions: [
        {
          question: "How long does it take to build a website?",
          answer: "Typical project timelines range from 2-4 weeks depending on the package selected and complexity of requirements. We'll provide a detailed timeline during our initial consultation.",
        },
        {
          question: "Do I need to provide content and images?",
          answer: "While we can work with content you provide, we also offer content creation and professional stock image sourcing as part of our service. We'll guide you through the process.",
        },
        {
          question: "Will my website be mobile-friendly?",
          answer: "Absolutely! All our websites are built with responsive design, ensuring they look great and function perfectly on all devices - phones, tablets, and desktops.",
        },
        {
          question: "What happens after the website is completed?",
          answer: "After launch, we provide support based on your chosen package. We also offer maintenance packages for ongoing updates, security, and improvements.",
        },
        {
          question: "Can I update the website myself?",
          answer: "Yes! For Professional and Enterprise packages, we can integrate a user-friendly CMS (Content Management System) that allows you to make updates without technical knowledge.",
        },
        {
          question: "What if I need changes after the project is complete?",
          answer: "Each package includes a certain number of revisions during the build process. After completion, we offer hourly rates for additional changes or monthly maintenance packages.",
        },
      ],
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Ready to start your project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your.email@example.com",
        message: "Message",
        messagePlaceholder: "Tell us about your project...",
        submit: "Send Message",
      },
      info: {
        email: "Email",
        phone: "Phone",
        location: "Location",
      },
    },
    footer: {
      tagline: "Building digital experiences that matter",
      rights: "All rights reserved.",
    },
    toast: {
      openingEmail: "Opening email client...",
      emailDescription: "Your default email application will open with your message.",
    },
  },
};

const Index = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState<"EN" | "EE">("EN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Bot detection field
  });
  const [paymentDialog, setPaymentDialog] = useState<{
    open: boolean;
    packageName: string;
    packagePrice: string;
    priceId: string;
  }>({
    open: false,
    packageName: "",
    packagePrice: "",
    priceId: "",
  });

  const t = translations[language];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: t.nav.about, id: "about" },
    { label: t.nav.portfolio, id: "portfolio" },
    { label: t.nav.pricing, id: "pricing" },
    { label: t.nav.faq, id: "faq" },
    { label: t.nav.contact, id: "contact" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          honeypot: formData.honeypot,
        },
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const pricingPlans = [
    {
      name: t.pricing.plans[0].name,
      price: "300€",
      priceId: "price_1SS31VBtXWHTSC0saSjy876s",
      description: t.pricing.plans[0].description,
      features: t.pricing.plans[0].features,
    },
    {
      name: t.pricing.plans[1].name,
      price: "600€",
      priceId: "price_1SS31nBtXWHTSC0s59jYix7g",
      description: t.pricing.plans[1].description,
      features: t.pricing.plans[1].features,
      popular: true,
    },
    {
      name: t.pricing.plans[2].name,
      price: "1000€",
      priceId: "price_1SS31zBtXWHTSC0sb2fiT1Wq",
      description: t.pricing.plans[2].description,
      features: t.pricing.plans[2].features,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Code className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Lumeon</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Language Switcher & Mobile Menu */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1.5">
                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                <Button
                  variant={language === "EE" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage("EE")}
                  className="h-7 px-2.5 rounded-full text-xs"
                >
                  EE
                </Button>
                <Button
                  variant={language === "EN" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage("EN")}
                  className="h-7 px-2.5 rounded-full text-xs"
                >
                  EN
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col gap-6 mt-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Code className="h-5 w-5 text-primary" />
                      <span className="text-lg font-bold">Lumeon</span>
                    </div>
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="text-left text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <PaymentDialog
        open={paymentDialog.open}
        onOpenChange={(open) => setPaymentDialog({ ...paymentDialog, open })}
        packageName={paymentDialog.packageName}
        packagePrice={paymentDialog.packagePrice}
        priceId={paymentDialog.priceId}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center justify-center rounded-full bg-primary/10 px-6 py-3">
              <Code className="mr-2 h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Lumeon</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {t.hero.title}
              <span className="bg-gradient-primary bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="shadow-medium hover:shadow-soft transition-shadow">
                <a href="#pricing">{t.hero.viewPackages}</a>
              </Button>
              <Button size="lg" variant="outline">
                <a href="#contact">{t.hero.getInTouch}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {t.about.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-2 hover:shadow-soft transition-shadow">
              <CardHeader>
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t.about.customDesign.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.about.customDesign.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-soft transition-shadow">
              <CardHeader>
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t.about.fastDelivery.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.about.fastDelivery.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-soft transition-shadow">
              <CardHeader>
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t.about.modernTech.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.about.modernTech.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {t.portfolio.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.portfolio.subtitle}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group overflow-hidden border-2 hover:shadow-medium transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={portfolioEcommerce} 
                  alt="Modern e-commerce website with product grid and shopping cart"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button variant="secondary" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t.portfolio.viewProject}
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{t.portfolio.projects[0].title}</CardTitle>
                <CardDescription>{t.portfolio.projects[0].category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t.portfolio.projects[0].description}
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-2 hover:shadow-medium transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={portfolioRestaurant} 
                  alt="Elegant restaurant website with menu and booking system"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button variant="secondary" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t.portfolio.viewProject}
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{t.portfolio.projects[1].title}</CardTitle>
                <CardDescription>{t.portfolio.projects[1].category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t.portfolio.projects[1].description}
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-2 hover:shadow-medium transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={portfolioCorporate} 
                  alt="Professional corporate business website homepage"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button variant="secondary" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Corporate Website</CardTitle>
                <CardDescription>Business Consulting Firm</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Professional corporate presence with team profiles and service showcases.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-2 hover:shadow-medium transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={portfolioCreative} 
                  alt="Minimalist creative portfolio website with gallery"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button variant="secondary" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Creative Portfolio</CardTitle>
                <CardDescription>Photographer's Showcase</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Stunning visual gallery with minimalist design to highlight photography work.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-2 hover:shadow-medium transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={portfolioMedical} 
                  alt="Clean medical healthcare website with appointment booking"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button variant="secondary" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Healthcare Portal</CardTitle>
                <CardDescription>Medical Practice</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Patient-friendly interface with appointment scheduling and health information.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-2 hover:shadow-medium transition-all duration-300">
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={portfolioRealEstate} 
                  alt="Luxury real estate website with property listings"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Button variant="secondary" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle>Real Estate Platform</CardTitle>
                <CardDescription>Property Listings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Luxurious property showcase with advanced search and filter capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {t.pricing.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative ${plan.popular ? 'border-primary border-2 shadow-medium' : 'border-2'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-primary px-4 py-1 rounded-full text-sm font-semibold text-primary-foreground">
                      {t.pricing.popular}
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => setPaymentDialog({
                      open: true,
                      packageName: plan.name,
                      packagePrice: plan.price,
                      priceId: plan.priceId,
                    })}
                  >
                    {t.pricing.getStarted}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {t.faq.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.faq.subtitle}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {t.faq.questions.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              {t.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t.contact.form.name}</Label>
                    <Input
                      id="name"
                      placeholder={t.contact.form.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contact.form.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t.contact.form.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contact.form.message}</Label>
                    <Textarea
                      id="message"
                      placeholder={t.contact.form.messagePlaceholder}
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {t.contact.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="mr-3 h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t.contact.info.email}</p>
                      <p className="text-muted-foreground">lumeon.ee@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="mr-3 h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t.contact.info.phone}</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t.contact.info.location}</p>
                      <p className="text-muted-foreground">123 Web Street, Digital City, DC 12345</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-4">
            <div className="mb-4 inline-flex items-center justify-center">
              <Code className="mr-2 h-5 w-5" />
              <span className="font-bold">Lumeon</span>
            </div>
            <p className="text-sm opacity-80 mb-4">
              © 2025 Lumeon. {t.footer.rights} {t.footer.tagline}
            </p>
          </div>
          <div className="flex justify-center gap-6 text-sm opacity-80">
            <Link to="/refund-policy" className="hover:opacity-100 transition-opacity">
              Refund Policy
            </Link>
            <Link to="/terms-of-service" className="hover:opacity-100 transition-opacity">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
