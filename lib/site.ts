export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "arjundev@example.com";

export const linkedinUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://linkedin.com/in/arjundev";

export const githubProfileUrl =
  process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL ??
  `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "arjundev"}`;
