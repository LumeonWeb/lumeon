import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Validation schema
const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email").max(255, "Email too long"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message too long"),
  honeypot: z.string().optional(), // Bot detection field
});

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= MAX_REQUESTS) {
    return false;
  }
  
  record.count++;
  return true;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Validate input
    const rawData = await req.json();
    const validated = ContactSchema.parse(rawData);
    
    // Check honeypot field (bot detection)
    if (validated.honeypot && validated.honeypot.length > 0) {
      console.log("Bot detected via honeypot field");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Escape HTML to prevent XSS
    const safeName = escapeHtml(validated.name);
    const safeMessage = escapeHtml(validated.message);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Website Contact <onboarding@resend.dev>",
        to: [validated.email],
        subject: "Thank you for contacting us!",
        html: `
          <h1>Thank you for reaching out, ${safeName}!</h1>
          <p>We have received your message:</p>
          <blockquote style="border-left: 3px solid #ccc; padding-left: 10px; margin: 10px 0;">
            ${safeMessage}
          </blockquote>
          <p>We will get back to you as soon as possible.</p>
          <p>Best regards,<br>The Team</p>
        `,
      }),
    });

    const data = await emailResponse.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    
    // Handle validation errors
    if (error.name === "ZodError") {
      return new Response(
        JSON.stringify({ error: "Invalid input data", details: error.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
