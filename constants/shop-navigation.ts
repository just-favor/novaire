export interface NavLink {
  name: string;
  href: string;
  subCategories?: string[];
}

export const shopNavigation: NavLink[] = [
  {
    name: "New Arrivals",
    href: "/shop/new-arrivals",
  },
  {
    name: "Men",
    href: "/shop/men",
    subCategories: ["Suits", "Watches", "Shirts", "Trousers", "Outerwear", "Shoes", "Accessories"],
  },
  {
    name: "Women",
    href: "/shop/women",
    subCategories: ["Gowns", "Dresses", "Blouses", "Handbags", "Heels", "Jewellery", "Scarves"],
  },
  {
    name: "Children",
    href: "/shop/children",
    subCategories: ["Boys 2-8 yrs", "Girls 2-8 yrs", "Teens 9-16 yrs", "School Wear", "Footwear", "Accessories"],
  },
  {
    name: "Essentials",
    href: "/shop/essentials",
    subCategories: ["Knitwear", "Loungewear", "Fragrance", "Leather Goods", "Stationery"],
  },
  {
    name: "Sale",
    href: "/shop/sale",
  },
];