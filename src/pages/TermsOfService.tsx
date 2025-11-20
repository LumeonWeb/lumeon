import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfService = () => {
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

        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Services Provided</h2>
            <p>
              We provide professional website development services including design, development,
              and maintenance. The specific scope of work will be defined in individual project
              agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Payment Terms</h2>
            <p>
              Payment is required before project commencement. We accept various payment methods
              as listed on our pricing page. Monthly maintenance subscriptions are billed on a
              recurring basis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Project Timeline</h2>
            <p>
              Project timelines are estimates and may vary based on project complexity and client
              feedback. We will keep you informed of any delays or changes to the schedule.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
            <p>
              Upon full payment, you will own the rights to the final delivered website. We retain
              the right to showcase the project in our portfolio unless otherwise agreed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Liability</h2>
            <p>
              We are not liable for any indirect, incidental, or consequential damages arising
              from the use of our services. Our liability is limited to the amount paid for the
              specific service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Termination</h2>
            <p>
              Either party may terminate the agreement with written notice. Refunds for
              terminated projects will be handled according to our Refund Policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
