import emailjs from "@emailjs/browser";

const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

export function initEmailJs() {
  if (publicKey) emailjs.init(publicKey);
}

export async function sendEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS environment variables are not configured.");
  }
  return emailjs.send(serviceId, templateId, {
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_name: "Arjun",
  });
}
