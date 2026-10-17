import { describe, expect, it } from "vitest";
import { categories, menuItems } from "@/data/menu";
import { groupFoodMenuItems } from "@/lib/food-portions";

const active = menuItems.filter((item) => !item.isArchived);
const bySlug = new Map(active.map((item) => [item.slug, item]));

describe("approved seafood menu", () => {
  it("matches every photographed price, including both fish portions", () => {
    const sourcePrices = {
      "fish-combo-1": 9900,
      "fish-combo-2": 10500,
      "fish-combo-3": 11200,
      "fish-set-1": 14900,
      "fish-set-2": 16900,
      "fish-set-3": 17900,
      "fried-crucian-carp-500g": 1500,
      "fried-crucian-carp-1kg": 3000,
      "fried-carp-500g": 2600,
      "fried-carp-1kg": 5200,
      "fried-zander-500g": 2850,
      "fried-zander-1kg": 5700,
      "fried-grass-carp-500g": 3000,
      "fried-grass-carp-1kg": 6000,
      "fried-bersh-500g": 2250,
      "fried-bersh-1kg": 4500,
      "fried-trout-potatoes": 3250,
      "salmon-rice": 3800,
      "baked-trout": 5500,
      "royal-fish-soup": 1700,
      "seafood-soup": 2200,
      "tom-yum": 2800,
      "wings-ten": 1900,
      "shrimp-350g": 3900,
      "seafood-saute": 3990,
      "red-sauce": 100,
      "white-sauce": 200,
      "cheese-sauce": 200,
    };
    for (const [slug, price] of Object.entries(sourcePrices)) {
      const item = bySlug.get(slug);
      expect(item, slug).toBeDefined();
      expect(item?.price, slug).toBe(price);
      expect(item?.descriptionRu, slug).toBeTruthy();
      expect(item?.descriptionKk, slug).toBeTruthy();
      expect(item?.imageUrl, slug).toMatch(
        /^\/menu-generated\/seafood\/.+\.webp$/,
      );
    }
  });

  it("places dishes in their appropriate sections", () => {
    for (const [slug, category] of Object.entries({
      "fish-combo-1": "fish-combos",
      "fish-set-1": "sushi-sets",
      "fried-carp-500g": "fish",
      "baked-trout": "fish",
      "salmon-rice": "fish",
      "seafood-soup": "soups",
      "royal-fish-soup": "soups",
      "tom-yum": "soups",
      "wings-ten": "fast-food",
      "shrimp-350g": "snacks",
      "seafood-saute": "hot-dishes",
      "cheese-sauce": "sauces",
    }))
      expect(bySlug.get(slug)?.categoryId, slug).toBe(category);
    expect(categories.find((category) => category.id === "fish")?.nameRu).toBe(
      "Рыба",
    );
  });

  it("keeps one active soup and wings recipe and preserves old record IDs", () => {
    expect(active.filter((item) => /^Уха/i.test(item.nameRu))).toHaveLength(1);
    expect(active.filter((item) => /^Том ям/i.test(item.nameRu))).toHaveLength(
      1,
    );
    expect(
      active.filter(
        (item) =>
          item.categoryId === "fast-food" && /крылышки/i.test(item.nameRu),
      ),
    ).toHaveLength(1);
    for (const slug of ["chicken-wings-8", "chicken-wings-16"]) {
      expect(menuItems.find((item) => item.slug === slug)?.isArchived).toBe(
        true,
      );
    }
    expect(bySlug.get("royal-fish-soup")?.id).toBe("item-030");
    expect(bySlug.get("tom-yum")?.id).toBe("item-031");
    expect(bySlug.get("bar-espresso-hot")?.id).toBe("item-140");
    expect(bySlug.get("bar-water-1l")?.id).toBe("item-236");
    expect(bySlug.get("royal-fish-soup")?.descriptionRu).toContain("рис");
    expect(bySlug.get("tom-yum")?.descriptionRu).toContain("рис");
  });

  it("groups size variants into one card without losing orderable item IDs", () => {
    const fish = active.filter((item) => item.categoryId === "fish");
    const groups = groupFoodMenuItems(fish);
    expect(fish).toHaveLength(13);
    expect(groups).toHaveLength(8);
    const carp = groups.find((group) => group.key === "fried-carp");
    expect(carp?.items.map((item) => item.price)).toEqual([2600, 5200]);
    expect(new Set(carp?.items.map((item) => item.id)).size).toBe(2);
    expect(
      groupFoodMenuItems([...fish].reverse())
        .find((group) => group.key === "fried-carp")
        ?.items.map((item) => item.price),
    ).toEqual([2600, 5200]);
    expect(
      groups
        .flatMap((group) => group.items)
        .map((item) => item.id)
        .sort(),
    ).toEqual(fish.map((item) => item.id).sort());
  });

  it("does not merge distinct preparations or equal names from other sections", () => {
    const salmon = bySlug.get("salmon-rice")!;
    const mashedSalmon = bySlug.get("salmon-steak-puree")!;
    expect(groupFoodMenuItems([salmon, mashedSalmon])).toHaveLength(2);
    const control = {
      ...salmon,
      slug: "control-500g",
      categoryId: "hot-dishes",
    };
    expect(
      groupFoodMenuItems([control, { ...control, slug: "control-1kg" }]),
    ).toHaveLength(2);
  });
});
