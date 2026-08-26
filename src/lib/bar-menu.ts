import type { MenuItem } from "@/types/domain";

export type BarTemperature = "hot" | "ice";

export type BarDrinkVariant = {
  item: MenuItem;
  temperature?: BarTemperature;
  volume?: string;
};

export type BarDrinkGroup = {
  key: string;
  nameRu: string;
  nameKk?: string;
  descriptionRu?: string;
  descriptionKk?: string;
  minPrice: number;
  hasVariablePrice: boolean;
  variants: [BarDrinkVariant, ...BarDrinkVariant[]];
};

const volumePattern = /,\s*(\d+(?:,\d+)?)\s*л\s*$/i;

function groupKey(slug: string) {
  return slug
    .replace(/-(?:hot|ice)(?:-0[234])?$/i, "")
    .replace(/-(?:1l|04l)$/i, "");
}

function temperature(slug: string): BarTemperature | undefined {
  if (/(?:^|-)hot(?:-|$)/i.test(slug)) return "hot";
  if (/(?:^|-)ice(?:-|$)/i.test(slug)) return "ice";
  return undefined;
}

function volume(name: string) {
  const match = name.match(volumePattern);
  return match ? `${match[1]} л` : undefined;
}

function baseName(name?: string) {
  const normalized = name
    ?.replace(/^Айс\s+/i, "")
    .replace(volumePattern, "")
    .trim();

  if (!normalized) return normalized;
  return normalized.charAt(0).toLocaleUpperCase() + normalized.slice(1);
}

export function groupBarMenuItems(items: MenuItem[]): BarDrinkGroup[] {
  const groups = new Map<string, BarDrinkGroup>();

  for (const item of items) {
    const key = groupKey(item.slug);
    const variant: BarDrinkVariant = {
      item,
      temperature: temperature(item.slug),
      volume: volume(item.nameRu),
    };
    const existing = groups.get(key);

    if (existing) {
      existing.variants.push(variant);
      existing.minPrice = Math.min(existing.minPrice, item.price);
      existing.hasVariablePrice =
        existing.hasVariablePrice ||
        existing.variants.some((entry) => entry.item.price !== item.price);
      continue;
    }

    groups.set(key, {
      key,
      nameRu: baseName(item.nameRu) || item.nameRu,
      nameKk: baseName(item.nameKk),
      descriptionRu: item.descriptionRu,
      descriptionKk: item.descriptionKk,
      minPrice: item.price,
      hasVariablePrice: false,
      variants: [variant],
    });
  }

  return Array.from(groups.values());
}
