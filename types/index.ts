export type ProgramWithCategory = NewProgram & {
  category: {
    category_name_en: string;
    category_name_ar: string;
    category_description_en: string;
    category_description_ar: string;
  };
};

export type NewUser = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginDetails = {
  email: string;
  password: string;
};

export type UserDetails = {
  id?: string;
  email: string;
  role: string;
  first_name: string;
};

export type NewBanner = {
  id?: string;
  name: string;
  image: string;
  description_en: string | null;
  description_ar: string | null;
};

export type TranslatedBanner = {
  name: string;
  image: string;
  description: string|null;
};

export type NewCategory = {
  id?: string;
  category_name_en: string;
  category_name_ar: string;
  logo: string | null;
  category_description_en: string | null;
  category_description_ar: string | null;
  slug: string;
};

export type TranslatedCategory = {
  id?: string;
  category_name: string;
  logo: string | null;
  category_description: string | null;
  slug: string;
};

export type NewProgram = {
  id?: string;
  program_title_en: string;
  program_title_ar: string;
  program_description_en: string | null;
  program_description_ar: string | null;
  duration_h: string;
  duration_d: string | null;
  slug: string;
  image: string | null;
  program_type: "life_programs" | "professional_programs";
  feature: boolean | null;
};

export type translatedProgram = {
  id?: string;
  program_title: string;
  program_description: string | null;
  duration_h: string;
  duration_d: string | null;
  slug: string;
  image: string | null;
  program_type: "life_programs" | "professional_programs";
};

export type newSetting = {
  id?: string;
  key_name_en?: string | null;
  key_name_ar?: string | null;
  value_en?: string | null;
  value_ar?: string | null;
};

export type Partners = {
  id?: string;
  name_en: string;
  name_ar: string;
  logo: string;
};

export type TranslatedPartners = {
  id?: string;
  name: string;
  logo: string;
};

export type NewApplication = {
  name: string;
  gender: "male" | "female";
  email: string;
  phone_number: string;
  location: string;
  education_level: string;
  program_id: string;
  major: string;
  date_of_birth: string;
};

export type NewApplicationForm = {
  name: string;
  gender: "male" | "female";
  email: string;
  phone_number: string;
  location: string;
  education_level: string;
  life_program_id: string;
  professional_programs_id: string;
  major: string;
  date_of_birth: Date | string;
};

export type NewMember = {
  id?: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  position_en: string;
  position_ar: string;
  display_order?: number | null | undefined;
  member_type: "founder" | "life_programs" | "professional_programs" | null;
  image: string | null;
};

export type TranslatedMember = {
  id?: string;
  name: string;
  description: string | null;
  position: string;
  display_order?: number | null | undefined;
  member_type: "founder" | "life_programs" | "professional_programs" | null;
  image: string | null;
};

export type MemberOrder = {
  id: string;
  display_order: number;
};

export type Locale = "en" | "ar";
