import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, message } = body;

		const { data, error } = await resend.emails.send({
			from: "Portfolio Contact <onboarding@resend.dev>", // Use onboarding@resend.dev for testing, or your verified domain
			to: ["rajfta@gmail.com"],
			replyTo: email, // Set the reply-to as the sender's email
			subject: `Portfolio Contact from ${name}`,
			html: `
				<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #333;">New message from your portfolio website</h2>
					<div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
						<p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
						<p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
						<p style="margin: 10px 0;"><strong>Message:</strong></p>
						<p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 3px;">${message}</p>
					</div>
				</div>
			`,
		});

		if (error) {
			console.error("Resend error:", error);
			return NextResponse.json(
				{ error: "Failed to send message" },
				{ status: 400 },
			);
		}

		console.log("Message sent successfully:", data);

		return NextResponse.json(
			{ success: true, id: data?.id },
			{ status: 200 },
		);
	} catch (err) {
		console.error("Unexpected error:", err);
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 },
		);
	}
}
