import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, phone });

    // Send email to business owner
    const emailResponse = await resend.emails.send({
      from: "Premium Ceilings <onboarding@resend.dev>",
      to: ["aliishaqsandho@gmail.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h1>
          
          <div style="margin: 20px 0;">
            <h2 style="color: #555; font-size: 18px;">Contact Details:</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background-color: #f8f9fa; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 10px; background-color: #f8f9fa;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Email:</td>
                <td style="padding: 10px;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background-color: #f8f9fa; font-weight: bold;">Phone:</td>
                <td style="padding: 10px; background-color: #f8f9fa;">${phone}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h2 style="color: #555; font-size: 18px;">Message:</h2>
            <div style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #007bff; white-space: pre-wrap;">
${message}
            </div>
          </div>

          <div style="margin-top: 30px; padding: 15px; background-color: #e7f3ff; border-radius: 5px;">
            <p style="margin: 0; color: #666;">
              This email was sent from your website's contact form.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send confirmation email to customer
    await resend.emails.send({
      from: "Premium Ceilings <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Premium Ceilings!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h1>
          
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            Dear ${name},
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            Thank you for contacting Premium Ceilings! We have received your message and will get back to you as soon as possible.
          </p>

          <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
            <h2 style="color: #555; font-size: 18px; margin-top: 0;">Your Message:</h2>
            <p style="color: #666; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="font-size: 16px; line-height: 1.6; color: #555;">
            Our team typically responds within 24 hours. If you need immediate assistance, feel free to call us at <strong>+92 345 8783923</strong> or message us on WhatsApp.
          </p>

          <div style="margin-top: 30px; padding: 20px; background-color: #007bff; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: white; font-size: 18px;">
              <strong>25+ Years of Excellence</strong>
            </p>
            <p style="margin: 10px 0 0 0; color: white;">
              Premium False Ceiling Solutions
            </p>
          </div>

          <p style="margin-top: 20px; font-size: 14px; color: #999; text-align: center;">
            This is an automated confirmation. Please do not reply to this email.
          </p>
        </div>
      `,
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
