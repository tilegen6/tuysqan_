import { describe, expect, it } from "vitest";
import { menuItems } from "@/data/menu";
import { groupBarMenuItems } from "@/lib/bar-menu";

describe("bar menu variants", () => {
  it("groups Americano by temperature and size", () => {
    const coffee = menuItems.filter((item) => item.categoryId === "bar-coffee");
    const americano = groupBarMenuItems(coffee).find(
      (group) => group.key === "bar-americano",
    );

    expect(americano?.nameRu).toBe("Американо");
    expect(americano?.minPrice).toBe(990);
    expect(americano?.hasVariablePrice).toBe(true);
    expect(americano?.variants).toHaveLength(4);
    expect(
      americano?.variants.map(({ temperature, volume, item }) => ({
        temperature,
        volume,
        price: item.price,
      })),
    ).toEqual([
      { temperature: "hot", volume: "0,2 л", price: 990 },
      { temperature: "hot", volume: "0,3 л", price: 1090 },
      { temperature: "ice", volume: "0,2 л", price: 990 },
      { temperature: "ice", volume: "0,3 л", price: 1090 },
    ]);
  });

  it("groups teas and lemonades by size", () => {
    const tea = groupBarMenuItems(
      menuItems.filter((item) => item.categoryId === "bar-tea"),
    );
    const lemonade = groupBarMenuItems(
      menuItems.filter((item) => item.categoryId === "bar-lemonades"),
    );

    expect(tea).toHaveLength(7);
    expect(tea.every((group) => group.variants.length === 2)).toBe(true);
    expect(lemonade).toHaveLength(10);
    expect(lemonade.every((group) => group.variants.length === 2)).toBe(true);
  });

  it("capitalizes drink names after removing the ice variant prefix", () => {
    const signatureDrinks = groupBarMenuItems(
      menuItems.filter((item) => item.categoryId === "bar-signature"),
    );

    expect(
      signatureDrinks.find(
        (group) => group.key === "bar-ice-matcha-salted-foam",
      )?.nameRu,
    ).toBe("Матча с ванильно-солёной пеной");
    expect(
      signatureDrinks.find((group) => group.key === "bar-ice-mocha-cherry-foam")
        ?.nameRu,
    ).toBe("Мокко с вишнёво-сливочной пеной");
    expect(
      signatureDrinks.find((group) => group.key === "bar-ice-latte-berry-foam")
        ?.nameRu,
    ).toBe("Латте со смородинно-малиновой пеной");
  });

  it("uses extracted photos only for drinks pictured in the bar menu", () => {
    const picturedTea = groupBarMenuItems(
      menuItems.filter((item) => item.categoryId === "bar-tea"),
    ).find((group) => group.key === "bar-tea-bright");
    const unpicturedTea = groupBarMenuItems(
      menuItems.filter((item) => item.categoryId === "bar-tea"),
    ).find((group) => group.key === "bar-tea-tashkent");
    const americano = groupBarMenuItems(
      menuItems.filter((item) => item.categoryId === "bar-coffee"),
    ).find((group) => group.key === "bar-americano");

    expect(
      picturedTea?.variants.every(
        (variant) =>
          variant.item.imageUrl === "/bar-menu/bar-tea-bright-black.webp",
      ),
    ).toBe(true);
    expect(
      unpicturedTea?.variants.every((variant) => !variant.item.imageUrl),
    ).toBe(true);
    expect(americano?.variants.every((variant) => !variant.item.imageUrl)).toBe(
      true,
    );
  });
});
