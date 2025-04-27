import { init } from "@emailjs/browser";

// EmailJS configuration
export const EMAILJS_SERVICE_ID = "service_vepbdhj";
export const EMAILJS_TEMPLATE_ID = "template_mg9vqcv";
export const EMAILJS_PUBLIC_KEY = "wcPfJZ8NyWylTCsGB";

export const initEmailJS = () => {
  init(EMAILJS_PUBLIC_KEY);
};

export default initEmailJS;
