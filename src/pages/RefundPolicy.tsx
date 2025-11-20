import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RefundPolicy = () => {
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

        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>

        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Eligibility</h2>
            <p>
              We offer refunds under the following conditions:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Request made within 14 days of initial payment</li>
              <li>No substantial work has been completed on the project</li>
              <li>Valid reason provided for the refund request</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Non-Refundable Services</h2>
            <p>
              The following are not eligible for refunds:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Completed website projects</li>
              <li>Monthly maintenance subscriptions (after service has been rendered)</li>
              <li>Custom development work already delivered</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Refund Process</h2>
            <p>
              To request a refund, please contact us with your order details. Approved refunds
              will be processed within 5-10 business days and returned to the original payment method.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>
              For refund inquiries, please use our contact form or reach out directly.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
