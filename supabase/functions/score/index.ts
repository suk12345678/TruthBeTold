import { serve } from "https://deno.land/std/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get request body text first
    const bodyText = await req.text();
    console.log('Received body:', bodyText);

    // Parse JSON
    const body = bodyText ? JSON.parse(bodyText) : {};
    const { rent, income, market_rent, unit_quality } = body;

    // Validate inputs
    if (rent === undefined || income === undefined || market_rent === undefined || unit_quality === undefined) {
      throw new Error('Missing required fields: rent, income, market_rent, unit_quality');
    }

    let score = 0;

    score += income > 0 && rent / income > 0.35 ? -20 : 20;
    score += market_rent > 0 && rent > market_rent * 1.1 ? -30 : 30;
    score += unit_quality * 5;

    score = Math.max(0, Math.min(100, score));

    const verdict =
      score > 75 ? "Fair" :
      score > 50 ? "Borderline" :
      score > 25 ? "Overpriced" :
      "Predatory";

    return new Response(JSON.stringify({ score, verdict }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
