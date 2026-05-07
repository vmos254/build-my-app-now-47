import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  try {
    // Require authenticated user — never trust client-supplied userId/email
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const authedUserId = userData.user.id;
    const authedEmail = userData.user.email ?? undefined;

    const { priceId, returnUrl, environment } = await req.json();

    if (!priceId || !/^[a-zA-Z0-9_-]+$/.test(priceId)) throw new Error("Invalid priceId");
    if (environment !== "sandbox" && environment !== "live") throw new Error("Invalid environment");
    if (!returnUrl || typeof returnUrl !== "string") throw new Error("Missing returnUrl");

    // Restrict returnUrl to a known allow-list of origins to prevent open-redirect/phishing
    const allowedOrigins = [
      "https://lumencatholic.com",
      "https://www.lumencatholic.com",
      "https://id-preview--7d1c2d52-6965-43ec-a57f-de36f904b3c7.lovable.app",
      "https://7d1c2d52-6965-43ec-a57f-de36f904b3c7.lovable.app",
      "http://localhost:8080",
      "http://localhost:5173",
    ];
    let parsedReturnUrl: URL;
    try {
      parsedReturnUrl = new URL(returnUrl);
    } catch {
      throw new Error("Invalid returnUrl");
    }
    if (!allowedOrigins.includes(parsedReturnUrl.origin)) {
      throw new Error("returnUrl origin not allowed");
    }

    const env: StripeEnv = environment;
    const stripe = createStripeClient(env);

    const prices = await stripe.prices.list({ lookup_keys: [priceId] });
    if (!prices.data.length) throw new Error("Price not found");
    const stripePrice = prices.data[0];
    const isRecurring = stripePrice.type === "recurring";

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: stripePrice.id, quantity: 1 }],
      mode: isRecurring ? "subscription" : "payment",
      ui_mode: "embedded_page",
      return_url: returnUrl,
      ...(authedEmail && { customer_email: authedEmail }),
      metadata: { userId: authedUserId },
      ...(isRecurring && { subscription_data: { metadata: { userId: authedUserId } } }),
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-checkout error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
