import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
  packagePrice: string;
  priceId: string;
}

const MAINTENANCE_PRICE_ID = "price_1SSGBuBtXWHTSC0s5CA4cOFd";

export const PaymentDialog = ({ open, onOpenChange, packageName, packagePrice, priceId }: PaymentDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    addMaintenance: false,
  });

  const handlePayment = async () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing information",
        description: "Please provide your name and email",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // First, create payment for the package
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke("create-payment", {
        body: {
          priceId,
          customerEmail: formData.email,
          customerName: formData.name,
        },
      });

      if (paymentError) throw paymentError;

      // If maintenance is selected, also create subscription
      if (formData.addMaintenance) {
        const { data: subscriptionData, error: subscriptionError } = await supabase.functions.invoke("create-subscription", {
          body: {
            priceId: MAINTENANCE_PRICE_ID,
            customerEmail: formData.email,
            customerName: formData.name,
          },
        });

        if (subscriptionError) throw subscriptionError;

        toast({
          title: "Redirecting to checkout...",
          description: "You'll complete payment for the package first, then the maintenance subscription",
        });

        // Open package payment first
        if (paymentData?.url) {
          window.open(paymentData.url, '_blank');
        }

        // Wait a moment, then open subscription
        setTimeout(() => {
          if (subscriptionData?.url) {
            window.open(subscriptionData.url, '_blank');
          }
        }, 2000);
      } else {
        // Just package payment
        if (paymentData?.url) {
          window.open(paymentData.url, '_blank');
          toast({
            title: "Redirecting to checkout...",
            description: "Complete your payment in the new tab",
          });
        }
      }

      onOpenChange(false);
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Payment failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            {packageName} - {packagePrice}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="flex items-start space-x-2 rounded-lg border border-border p-4">
            <Checkbox
              id="maintenance"
              checked={formData.addMaintenance}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, addMaintenance: checked as boolean })
              }
              disabled={loading}
            />
            <div className="flex-1 space-y-1">
              <Label
                htmlFor="maintenance"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Add Monthly Maintenance (+100€/month)
              </Label>
              <p className="text-sm text-muted-foreground">
                Includes ongoing updates, security patches, and technical support
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Package</span>
              <span className="font-medium">{packagePrice}</span>
            </div>
            {formData.addMaintenance && (
              <div className="flex justify-between text-sm mb-1">
                <span>Monthly Maintenance</span>
                <span className="font-medium">100€/month</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-2 border-t border-border/50 mt-2">
              <span>Initial Payment</span>
              <span>{packagePrice}</span>
            </div>
            {formData.addMaintenance && (
              <p className="text-xs text-muted-foreground mt-1">
                + Monthly billing of 100€ starting after purchase
              </p>
            )}
          </div>
          <Button onClick={handlePayment} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Secure payment powered by Stripe
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
