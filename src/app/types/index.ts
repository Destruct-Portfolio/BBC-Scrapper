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
<<<<<<< HEAD
  BloomBerg: Inews[];
  Ny_Times: Inews[];
  Washington_Post: Inews[];
=======
  Washington: Inews[];
  Ny_Times: Inews[];
  BloomBerg: Inews[]
>>>>>>> 797addfe65cdd14743d134ba2b53a4614bf75b0a
}


export interface HTTP_Request {
  /**
   * 
   * @param url the url of the website 
   * @returns a string in succsess or undefined if it fails  
   */
  get(url: string): Promise<string | undefined>
}