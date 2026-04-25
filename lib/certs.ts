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
    id: "aws-solutions-architect",
    provider: "AWS CERTIFIED",
    title: "Solutions Architect Associate",
    issuer: "Amazon Web Services",
    issued: "Jan 2024",
    logo: "/certificates/aws-logo.svg",
    file: "/certificates/aws-solutions-architect.pdf",
    color: "#FF9900",
  },
  {
    id: "google-cloud-developer",
    provider: "GOOGLE CLOUD",
    title: "Professional Cloud Developer",
    issuer: "Google Cloud",
    issued: "Nov 2023",
    logo: "/certificates/google-cloud-logo.svg",
    file: "/certificates/google-cloud-developer.pdf",
    color: "#4285F4",
  },
  {
    id: "meta-frontend-developer",
    provider: "META CERTIFIED",
    title: "Front-End Developer Professional",
    issuer: "Meta",
    issued: "Aug 2023",
    logo: "/certificates/meta-logo.svg",
    file: "/certificates/meta-frontend-developer.pdf",
    color: "#0082FB",
  },
  {
    id: "mongodb-developer-associate",
    provider: "MONGODB UNIVERSITY",
    title: "MongoDB Developer Associate",
    issuer: "MongoDB",
    issued: "May 2023",
    logo: "/certificates/mongodb-logo.svg",
    file: "/certificates/mongodb-developer-associate.pdf",
    color: "#47A248",
  },
];
