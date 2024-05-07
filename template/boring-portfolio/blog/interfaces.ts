export interface Data {
  title: string;
  filename: string;
  date: string;
  description: string;
}

export interface Blog {
  data: Data;
  content: string;
  excrept?: string;
  orig: Buffer;
  language: string;
  matter: string;
  stringify(lang: string): string;
}