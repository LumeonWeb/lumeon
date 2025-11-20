import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowLeft } from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // You could optionally fetch session details here if needed
    console.log("Payment successful, session ID:", sessionId);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-20">
      <Card className="max-w-lg w-full shadow-medium">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl">Payment Successful!</CardTitle>
          <CardDescription>
            Thank you for choosing Lumeon. We've received your payment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted/50 p-4">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>You'll receive a confirmation email with your order details</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Our team will reach out within 24 hours to discuss your project</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>We'll create a project timeline and begin work on your website</span>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Session ID: {sessionId}
            </p>
            <Button asChild className="w-full">
              <a href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </a>
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Need help? Contact us at info@webbuilders.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
