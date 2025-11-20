import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            <p>
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Payment information</li>
              <li>Project details and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process payments and send transaction confirmations</li>
              <li>Communicate with you about your projects</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may
              share your information with:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our
              contact form.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
