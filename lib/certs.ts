export type Certificate = {
  id: string;
  provider: string;
  title: string;
  issuer: string;
  issued: string;
  logo: string;
  file: string;
  color: string;
};

/** Place PDFs in `public/certificates/` using these filenames (kebab-case). */
export const certificates: Certificate[] = [
  {
    id: "gen-ai-oracle",
    provider: "ORACLE CLOUD",
    title: "OCI Generative AI Professional",
    issuer: "Oracle",
    issued: "2024",
    logo: "/certificates/google-cloud-logo.svg", // Placeholder, ideally swap with Oracle logo
    file: "/certificates/gen-ai-oracle.pdf",
    color: "#F80000",
  },
  {
    id: "devops-oracle",
    provider: "ORACLE CLOUD",
    title: "OCI DevOps Professional",
    issuer: "Oracle",
    issued: "2024",
    logo: "/certificates/aws-logo.svg", // Placeholder
    file: "/certificates/devops-oracle.pdf",
    color: "#F80000",
  },
  {
    id: "ai-vector-search",
    provider: "ORACLE UNIVERSITY",
    title: "AI Vector Search Professional",
    issuer: "Oracle",
    issued: "2024",
    logo: "/certificates/mongodb-logo.svg", // Placeholder
    file: "/certificates/ai-vector-search.pdf",
    color: "#F80000",
  },
  {
    id: "gen-ai-chatgpt",
    provider: "GENERATIVE AI",
    title: "Gen AI and ChatGPT",
    issuer: "OpenAI/Various",
    issued: "2024",
    logo: "/certificates/meta-logo.svg", // Placeholder
    file: "/certificates/gen-ai-chatgpt.pdf",
    color: "#00A67E",
  },
];
