import type { MenuItem } from "@/types/domain";

export type FoodGroup = { key: string; items: MenuItem[] };

export function groupFoodMenuItems(items: MenuItem[]): FoodGroup[] {
  const groups = new Map<string, FoodGroup>();
  for (const item of items) {
    const portion =
      item.categoryId === "fish" && item.slug.match(/^(.*)-(500g|1kg)$/);
    const key = portion ? portion[1] : item.slug;
    const group = groups.get(key) ?? { key, items: [] };
    group.items.push(item);
    groups.set(key, group);
  }
  for (const group of groups.values()) {
    group.items.sort(
      (a, b) =>
        Number(a.slug.endsWith("-1kg")) - Number(b.slug.endsWith("-1kg")),
    );
  }
  return [...groups.values()];
}
