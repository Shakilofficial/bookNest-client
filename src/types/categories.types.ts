export const CATEGORY_OPTIONS = [
  "Fiction",
  "Science",
  "SelfDevelopment",
  "Poetry",
  "Religious",
  "Fantasy",
  "Adventure",
  "Horror",
  "Romance",
  "Comedy",
  "Action",
  "Thriller",
  "Drama",
  "Western",
  "Mystery",
  "ScienceFiction",
  "History",
  "Technology",
] as const;

export const categoryOptions = CATEGORY_OPTIONS.map((cat) => ({
  value: cat,
  label: cat,
}));
