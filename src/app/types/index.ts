export interface Inews {
  link: string | null;
  headline: string | null;
  image_url: string | null;
  published: string | null;
  excerpt: string | null;
  author: string | null;
  category: string | null;
}

export interface JsonFile {
  Bbc_News: Inews[];
  FT_News: Inews[];
  Guardian_News: Inews[];
  BloomBerg: Inews[];
  Ny_Times: Inews[];
  Washington_Post: Inews[];
}
