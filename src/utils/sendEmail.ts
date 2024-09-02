import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

// email js configuration
const SERVICE_ID = "rentngo";
const PUBLIC_KEY = "LHLlu1j3Zu_y4Qe8d";

async function sendEmail(templateId: string, templateParams: Record<string, string>): Promise<EmailJSResponseStatus | null> {

    try {
        const res = await emailjs.send(SERVICE_ID, templateId, templateParams, PUBLIC_KEY);
        return res
    } catch (error) {
        console.log(error);
        return null
    }
}

export default sendEmail;