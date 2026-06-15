export type ConsultancyFocus =
  | "japanese-language"
  | "korean-language"
  | "europe-student-visa"
  | "test-prep-study-abroad"
  | "career-education"
  | "general-education"
  | "multipurpose-consultancy";

export type ConsultancyProfile = {
  key: string;
  aliases: string[];
  name: string;
  shortName: string;
  category: string;
  focus: ConsultancyFocus;
  city: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  facebookUrl: string;
  followers?: string;
  heroTagline: string;
  summary: string;
  primaryAudience: string;
  specialties: string[];
  destinations: string[];
  trainingPrograms: string[];
  proofPoints: string[];
  ctaLabel: string;
  evidenceNotes: string[];
};

export const consultancyProfiles: ConsultancyProfile[] = [
  {
    key: "friendly-japanese-academy",
    aliases: ["friendly-japanese", "friendly-japanese-academy-61564397532538"],
    name: "Friendly Japanese Academy",
    shortName: "Friendly Japanese",
    category: "Language School",
    focus: "japanese-language",
    city: "Kathmandu",
    address: "Basantanagar Road, Machapokhari, Kathmandu",
    phone: "986-0828739",
    email: "hopekc200@gmail.com",
    facebookUrl: "https://www.facebook.com/p/Friendly-Japanese-Academy-61564397532538/",
    followers: "348 followers",
    heroTagline: "Japanese language and Japan pathway support",
    summary: "A Kathmandu-based Japanese language school focused on N5/N4 classes, student visa support, and SSW preparation.",
    primaryAudience: "Students and workers preparing for Japan study, language, or SSW routes.",
    specialties: ["Japanese N5/N4 classes", "Student visa guidance", "SSW visa preparation", "Japan employment readiness"],
    destinations: ["Japan"],
    trainingPrograms: ["JLPT N5", "JLPT N4", "SSW interview readiness", "Basic Japanese conversation"],
    proofPoints: ["Public page lists N5 and N4 language support", "Public page mentions student and SSW visa services", "Kathmandu contact details are visible"],
    ctaLabel: "Start Japanese Preparation",
    evidenceNotes: ["Facebook intro: language school in Kathmandu offering N5/N4, student visa, and SSW visa services."],
  },
  {
    key: "shinsegae-korean-language",
    aliases: ["hangkukkorea", "shinsegae-consultancy", "korean-language-bagbazar"],
    name: "Shinsegae Consultancy Korean Language Bagbazar",
    shortName: "Shinsegae Korean",
    category: "Korean Language",
    focus: "korean-language",
    city: "Kathmandu",
    address: "Bagbazar, Kathmandu",
    phone: "01-5329507",
    email: "ShinsegaeConsultancy@gmail.com",
    facebookUrl: "https://www.facebook.com/hangkukkorea/",
    followers: "5.5K followers",
    heroTagline: "Korean language learning for study and work pathways",
    summary: "A Bagbazar-based Korean language brand with public content centered on Korean grammar and language learning.",
    primaryAudience: "Learners preparing for Korea-focused language, study, or work opportunities.",
    specialties: ["Korean language classes", "Grammar practice", "Korea pathway counseling", "Language-first preparation"],
    destinations: ["South Korea"],
    trainingPrograms: ["Korean grammar", "Beginner Korean", "Conversation practice", "Study/work readiness"],
    proofPoints: ["Public page title identifies Korean language services", "Recent public post references Korean grammar", "Kathmandu/Bagbazar positioning is visible"],
    ctaLabel: "Join Korean Language Class",
    evidenceNotes: ["Facebook metadata: Shinsegae Consultancy.korean language Bagbazar; page description says KOREAN LANGUAGE."],
  },
  {
    key: "journey-to-europe",
    aliases: ["study-europe", "study-europe2018", "journey-to-europe-student-visa"],
    name: "Journey To Europe Student Visa",
    shortName: "Journey To Europe",
    category: "Educational Consultant",
    focus: "europe-student-visa",
    city: "Kathmandu",
    phone: "980-8011175, +977-9860140040 (WhatsApp)",
    email: "riteshnepal36@gmail.com",
    facebookUrl: "https://www.facebook.com/study.europe2018/",
    followers: "123 followers",
    heroTagline: "Europe student visa guidance and Malta-focused options",
    summary: "A Kathmandu education consultant page focused on abroad-study suggestions, with public posts highlighting Malta student visa options.",
    primaryAudience: "Students comparing Europe and Malta study routes with practical visa guidance.",
    specialties: ["Europe student visa counseling", "Malta study route", "Abroad-study suggestions", "Documentation guidance"],
    destinations: ["Malta", "Europe"],
    trainingPrograms: ["Visa file planning", "Admission guidance", "Interview preparation", "Document checklist support"],
    proofPoints: ["Public intro says the group helps with abroad-study suggestions", "Public post highlights Study in Malta", "Contact phone and email are visible"],
    ctaLabel: "Plan Europe Study Route",
    evidenceNotes: ["Facebook intro: formed to help and give suggestions for abroad studies; visible Malta student visa post."],
  },
  {
    key: "sr-educational-consultancy",
    aliases: ["sr-educational-consultancy-new-baneshwor", "sr-educational"],
    name: "SR Educational Consultancy New Baneshwor",
    shortName: "SR Educational",
    category: "Educational Consultant",
    focus: "general-education",
    city: "Kathmandu",
    address: "New Baneshwor, Kathmandu",
    phone: "970-0220036",
    email: "sivrajedu@gmail.com",
    facebookUrl: "https://www.facebook.com/p/SR-Educational-Consultancy-New-Baneshwor-61564490922090/",
    followers: "2K followers",
    heroTagline: "Education counseling from New Baneshwor",
    summary: "A New Baneshwor-based educational consultancy page with a broad study-abroad counseling positioning.",
    primaryAudience: "Students looking for general education counseling and application support.",
    specialties: ["Education counseling", "University application support", "Student visa guidance", "Profile discussion"],
    destinations: ["Australia", "Canada", "United Kingdom", "Europe", "Japan"],
    trainingPrograms: ["Application roadmap", "SOP/document review", "Visa checklist", "Counselor consultation"],
    proofPoints: ["Public page identifies the business as an educational consultant", "New Baneshwor/Kathmandu name is visible", "Follower count is visible"],
    ctaLabel: "Book Education Counseling",
    evidenceNotes: ["Facebook metadata: SR Educational Consultancy New Baneshwor, Educational Consultant, Kathmandu."],
  },
  {
    key: "happy-educational-consultancy",
    aliases: ["happy-educational-consultancy-kathmandu", "happy-group"],
    name: "Happy Educational Consultancy Kathmandu",
    shortName: "Happy Educational",
    category: "Educational Consultant",
    focus: "general-education",
    city: "Kathmandu",
    phone: "9845545919",
    email: "chitwanhappyeducation@gmail.com",
    facebookUrl: "https://www.facebook.com/p/Happy-Educational-Consultancy-Kathmandu-100063976690712/",
    followers: "1.6K followers",
    heroTagline: "Friendly education counseling for abroad-study decisions",
    summary: "A Kathmandu educational consultancy page with broad abroad-study positioning and Happy Group branding cues.",
    primaryAudience: "Students and families seeking a simple, counselor-led abroad-study process.",
    specialties: ["Student counseling", "Application support", "Visa guidance", "Destination comparison"],
    destinations: ["Australia", "Canada", "United Kingdom", "Europe", "Japan"],
    trainingPrograms: ["Counseling session", "Document planning", "Admission support", "Visa preparation"],
    proofPoints: ["Public page identifies the business as an educational consultant", "Kathmandu location is visible", "Happy Group post language appears on the page"],
    ctaLabel: "Talk With Happy Education",
    evidenceNotes: ["Facebook metadata: Happy Educational Consultancy Kathmandu, Educational Consultant."],
  },
  {
    key: "euro-asia-education",
    aliases: ["euroasiaeducation", "euro-asia-education-consultancy"],
    name: "Euro Asia Education Consultancy Pvt. Ltd.",
    shortName: "Euro Asia Education",
    category: "Education Consultancy",
    focus: "test-prep-study-abroad",
    city: "Kathmandu",
    phone: "985-1130147",
    email: "info@euroasia.com.np",
    facebookUrl: "https://www.facebook.com/euroasiaeducation/",
    followers: "35K followers",
    heroTagline: "Study-abroad counseling with IELTS and PTE preparation",
    summary: "A large Kathmandu education consultancy page with visible IELTS/PTE test-prep messaging and study-abroad counseling.",
    primaryAudience: "Students who need both test preparation and overseas education counseling.",
    specialties: ["IELTS preparation", "PTE preparation", "Education counseling", "Study-abroad applications"],
    destinations: ["Australia", "Canada", "United Kingdom", "Europe", "United States"],
    trainingPrograms: ["IELTS Listening", "IELTS Reading", "IELTS Writing", "PTE score planning"],
    proofPoints: ["Public page has 35K followers", "Visible public post promotes IELTS/PTE score preparation", "Page description says it provides educational counseling"],
    ctaLabel: "Prepare IELTS / PTE",
    evidenceNotes: ["Facebook metadata and post text mention educational counseling plus IELTS/PTE score preparation."],
  },
  {
    key: "sbi-education",
    aliases: ["sbieducationn", "sbi-education-consultancy"],
    name: "SBI Education Consultancy Pvt. Ltd.",
    shortName: "SBI Education",
    category: "Education & Career Consultant",
    focus: "career-education",
    city: "Kathmandu",
    address: "Bagbazar, opposite Everest Bank, Kathmandu",
    phone: "01-5910252",
    email: "info.sbieducation@gmail.com",
    facebookUrl: "https://www.facebook.com/SBIEducationn/",
    followers: "14K followers",
    heroTagline: "Education and career counseling from Bagbazar",
    summary: "A Bagbazar-based education and career consultancy with visible phone, email, and Kathmandu office details.",
    primaryAudience: "Students seeking career-aware study-abroad counseling and application support.",
    specialties: ["Career counseling", "Education counseling", "Application guidance", "Visa documentation"],
    destinations: ["Australia", "Canada", "United Kingdom", "Europe", "United States"],
    trainingPrograms: ["Career-fit counseling", "Course selection", "Application support", "Visa checklist"],
    proofPoints: ["Public intro says Education & Career Consultant", "Bagbazar office location is visible", "Phone and email are visible"],
    ctaLabel: "Get Career Counseling",
    evidenceNotes: ["Facebook intro: Education & Career Consultant in Kathmandu, Nepal; Bagbazar address and contact details visible."],
  },
  {
    key: "sejong-education",
    aliases: ["sejongeducationconsultancy", "sejong-education-consultancy", "shejongeducation"],
    name: "Sejong Education Consultancy",
    shortName: "Sejong Education",
    category: "Consulting Agency",
    focus: "general-education",
    city: "Kathmandu",
    address: "Bagbazar, Kathmandu",
    phone: "986-3946815",
    email: "sejongconsultancy@gmail.com",
    website: "https://shejongeducation.com",
    facebookUrl: "https://www.facebook.com/sejongeducationconsultancy/",
    followers: "237 followers",
    heroTagline: "Structured consulting for education decisions",
    summary: "A Bagbazar consulting agency with public contact details and a leadership-oriented consulting message.",
    primaryAudience: "Students who want guided education planning with direct counselor contact.",
    specialties: ["Education consulting", "Student counseling", "Planning support", "Direct contact guidance"],
    destinations: ["South Korea", "Japan", "Australia", "Canada", "Europe"],
    trainingPrograms: ["Counseling session", "Destination fit check", "Document planning", "Application guidance"],
    proofPoints: ["Public intro identifies it as a consulting agency", "Bagbazar address, phone, email, and website are visible", "Kathmandu location is visible"],
    ctaLabel: "Consult Sejong Team",
    evidenceNotes: ["Facebook intro: consulting agency in Bagbazar with phone, email, and website listed."],
  },
  {
    key: "cross-country-consultancy",
    aliases: ["crosscountryconsultancy", "cross-country-multipurpose", "ccmpc"],
    name: "Cross Country Multipurpose Consultancy Pvt. Ltd.",
    shortName: "Cross Country",
    category: "Educational Consultant",
    focus: "multipurpose-consultancy",
    city: "Kathmandu",
    address: "Old Baneshwor, Kathmandu",
    phone: "01-5924144",
    email: "info@ccmpc.edu.np",
    website: "https://ccmpc.edu.np",
    facebookUrl: "https://www.facebook.com/crosscountryconsultancy/",
    followers: "201K followers",
    heroTagline: "Multipurpose education consulting with strong public credibility",
    summary: "A large Old Baneshwor consultancy page with visible ECAN/ICC/NCC membership claims and Europe visa-success posts.",
    primaryAudience: "Students who want established, multi-destination counseling and visa support.",
    specialties: ["Multi-destination counseling", "Visa documentation", "Hungary/Europe pathways", "Application management"],
    destinations: ["Hungary", "Europe", "Australia", "Canada", "United Kingdom", "United States"],
    trainingPrograms: ["Visa file review", "University shortlisting", "Documentation support", "Pre-departure planning"],
    proofPoints: ["Public page has 201K followers", "Intro lists ECAN, ICC & NCC membership", "Phone, email, website, and Old Baneshwor address are visible"],
    ctaLabel: "Start Cross-Country Plan",
    evidenceNotes: ["Facebook intro: Educational Consultant in Old Baneshwor; member of ECAN, ICC & NCC; website and email visible."],
  },
];

const profileByKey = new Map<string, ConsultancyProfile>();

for (const profile of consultancyProfiles) {
  profileByKey.set(profile.key, profile);
  for (const alias of profile.aliases) {
    profileByKey.set(alias, profile);
  }
}

export function getConsultancyProfile(key?: string | null) {
  if (!key) return undefined;
  return profileByKey.get(key.toLowerCase());
}

export function isKnownConsultancyKey(key?: string | null) {
  return Boolean(getConsultancyProfile(key));
}
