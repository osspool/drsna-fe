import nodemailer from "nodemailer";

// Determines which email service to use based on env vars
export function selectEmailServiceFromEnv() {
	const raw = (process.env.EMAIL_SERVICE || process.env.SMTP_SERVICE || process.env.service || "").toLowerCase();
	return raw;
}

// Create a nodemailer transporter based on selected service/env
export function createMailTransporter() {
	const service = selectEmailServiceFromEnv();

	if (service === "gmail") {
		const user = process.env.SMTP_USER;
		const pass = process.env.SMTP_PASS;
		if (!user || !pass) throw new Error("Missing SMTP_USER/SMTP_PASS for Gmail service");
		return nodemailer.createTransport({
			service: "gmail",
			auth: { user, pass },
		});
	}

	if (service === "titan") {
		const user = process.env.SMTP_USER;
		const pass = process.env.SMTP_PASS;
		if (!user || !pass) throw new Error("Missing SMTP_USER/SMTP_PASS for Titan service");
		const host = process.env.SMTP_HOST || "smtp.titan.email";
		const port = Number(process.env.SMTP_PORT || 587); // Titan recommends 587 (STARTTLS)
		const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
		const requireTLS = process.env.SMTP_REQUIRE_TLS ? process.env.SMTP_REQUIRE_TLS === "true" : port === 587;
		const authMethod = process.env.SMTP_AUTH_METHOD || "LOGIN"; // default to LOGIN for Titan
		const tlsRejectUnauthorized = process.env.SMTP_TLS_REJECT_UNAUTHORIZED;
		return nodemailer.createTransport({
			host,
			port,
			secure,
			auth: { user, pass },
			...(requireTLS ? { requireTLS: true } : {}),
			...(authMethod ? { authMethod } : {}),
			...(tlsRejectUnauthorized === "false" ? { tls: { rejectUnauthorized: false } } : {}),
		});
	}

	if (service === "local" || service === "test" || service === "json") {
		// For local/testing environments, do not actually send the email
		return nodemailer.createTransport({ jsonTransport: true });
	}

	// Generic SMTP fallback if host is provided
	if (process.env.SMTP_HOST) {
		const host = process.env.SMTP_HOST;
		const port = Number(process.env.SMTP_PORT || 587);
		const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
		const user = process.env.SMTP_USER;
		const pass = process.env.SMTP_PASS;
		const requireTLS = process.env.SMTP_REQUIRE_TLS === "true";
		const authMethod = process.env.SMTP_AUTH_METHOD;
		const tlsRejectUnauthorized = process.env.SMTP_TLS_REJECT_UNAUTHORIZED;
		return nodemailer.createTransport({
			host,
			port,
			secure,
			auth: user && pass ? { user, pass } : undefined,
			...(requireTLS ? { requireTLS: true } : {}),
			...(authMethod ? { authMethod } : {}),
			...(tlsRejectUnauthorized === "false" ? { tls: { rejectUnauthorized: false } } : {}),
		});
	}

	throw new Error(`Unknown EMAIL_SERVICE "${service || "unset"}" and no SMTP_HOST provided`);
}

// Build a proper From header using configured sender
export function buildFromHeader(displayName) {
	const fromEmail = process.env.EMAIL_FROM || process.env.SMTP_USER;
	if (!fromEmail) return undefined;
	return displayName ? `"${displayName}" <${fromEmail}>` : fromEmail;
}


