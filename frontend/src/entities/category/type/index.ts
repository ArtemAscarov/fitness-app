export type CategoryGroup = {
  id: number;
  name: string;
  categories: Category[];
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  categoryGroupId: Number;
};
