"use client";

import Image from "next/image";
import {
  CupSoda,
  Flame,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { CartPanel } from "@/components/cart/cart-panel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  groupBarMenuItems,
  type BarDrinkGroup,
  type BarTemperature,
} from "@/lib/bar-menu";
import { cartQuantity, cartTotal, canOrder } from "@/lib/cart";
import { cn, formatPrice, localize } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useLocaleStore } from "@/store/locale-store";
import type { Category, MenuItem } from "@/types/domain";

const enlargedImageSlugs = new Set(["pizza-bolognese"]);
const enlargedTwentyPercentImageSlugs = new Set([
  "pepperoni",
  "pizza-kazy",
  "mexican",
  "margherita",
  "pizza-chicken-mushrooms",
]);
const rotatedImageClasses: Record<string, string> = {
  "noodles-meatballs": "rotate-[80deg] scale-[0.86]",
  "t-bone": "rotate-[270deg] scale-[1.15]",
  "khachapuri-adjarian": "rotate-[30deg] scale-[1.5]",
  "chicken-wings-8": "rotate-[270deg]",
  "chicken-wings-16": "rotate-[270deg]",
  "fried-lagman": "rotate-[270deg]",
  "guyru-lagman": "rotate-[270deg]",
};

const isBarCategory = (categoryId: string) => categoryId.startsWith("bar-");
type MenuKind = "main" | "bar";

const ProductCard = memo(function ProductCard({
  item,
  onOpen,
  eager = false,
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  eager?: boolean;
}) {
  const locale = useLocaleStore((state) => state.locale);
  const add = useCartStore((state) => state.add);
  const line = useCartStore((state) =>
    state.lines.find((entry) => entry.item.id === item.id),
  );
  const unavailable = !canOrder(item);
  return (
    <article className="group grid min-h-full grid-rows-[auto_1fr] overflow-hidden border border-[#020D13]/10 bg-white transition hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(2,13,19,.09)]">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative aspect-[4/3] overflow-hidden bg-[#020D13] text-left"
        aria-label={`Открыть ${item.nameRu}`}
      >
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={localize(locale, item.nameRu, item.nameKk)}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw"
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            className={cn(
              "object-contain p-2 transition duration-300 group-hover:opacity-90",
              enlargedImageSlugs.has(item.slug) && "scale-[1.4]",
              enlargedTwentyPercentImageSlugs.has(item.slug) && "scale-[1.2]",
              item.categoryId === "fast-food" && "scale-[1.2]",
              item.categoryId === "shashlik" && "rotate-[95deg] scale-[1.44]",
              item.categoryId === "company" && "scale-[1.2]",
              item.categoryId === "eastern" && "scale-[1.2]",
              item.categoryId === "snacks" && "scale-[1.2]",
              rotatedImageClasses[item.slug],
            )}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(255,255,255,.08),transparent_58%)] text-xs font-bold uppercase tracking-[.25em] text-white/35">
            Tuysqan
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-2">
          {item.isSpicy && (
            <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-[10px] font-bold">
              <Flame className="size-3 text-red-600" /> Острое
            </span>
          )}
          {item.isNew && (
            <span className="rounded bg-white px-2 py-1 text-[10px] font-bold">
              Новинка
            </span>
          )}
        </div>
        {unavailable && (
          <div className="absolute inset-0 grid place-items-center bg-[#020D13]/65">
            <span className="rounded bg-white px-3 py-2 text-xs font-bold">
              Нет в наличии
            </span>
          </div>
        )}
      </button>
      <div className="flex flex-col p-3.5 sm:p-5">
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="text-left"
        >
          <h3 className="text-[15px] font-bold leading-snug sm:text-lg">
            {localize(locale, item.nameRu, item.nameKk)}
          </h3>
          {item.pieceCount && (
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#020D13]/45">
              {item.pieceCount} штук
            </p>
          )}
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#020D13]/55 sm:text-sm">
            {localize(locale, item.descriptionRu, item.descriptionKk) ||
              "Состав уточняйте у администратора."}
          </p>
        </button>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-4">
          <strong className="whitespace-nowrap text-base sm:text-lg">
            {formatPrice(item.price)}
          </strong>
          {line ? (
            <div className="ml-auto inline-flex max-w-full items-center rounded-md border border-[#020D13]/15">
              <button
                onClick={() => useCartStore.getState().decrease(item.id)}
                className="grid size-9 shrink-0 place-items-center sm:size-10"
                aria-label="Уменьшить"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-5 text-center text-sm font-bold sm:min-w-6">
                {line.quantity}
              </span>
              <button
                onClick={() => add(item)}
                className="grid size-9 shrink-0 place-items-center sm:size-10"
                aria-label="Увеличить"
              >
                <Plus className="size-4" />
              </button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={() => add(item)}
              disabled={unavailable}
              aria-label={`Добавить ${item.nameRu}`}
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">Добавить</span>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
});

const DrinkGroupCard = memo(function DrinkGroupCard({
  group,
}: {
  group: BarDrinkGroup;
}) {
  const locale = useLocaleStore((state) => state.locale);
  const add = useCartStore((state) => state.add);
  const [selectedItemId, setSelectedItemId] = useState(
    group.variants[0]?.item.id || "",
  );
  const selectedVariant =
    group.variants.find((variant) => variant.item.id === selectedItemId) ||
    group.variants[0];
  const item = selectedVariant.item;
  const line = useCartStore((state) =>
    state.lines.find((entry) => entry.item.id === item.id),
  );
  const unavailable = !canOrder(item);
  const temperatures = Array.from(
    new Set(
      group.variants
        .map((variant) => variant.temperature)
        .filter((value): value is BarTemperature => Boolean(value)),
    ),
  );
  const volumes = Array.from(
    new Set(
      group.variants
        .map((variant) => variant.volume)
        .filter((value): value is string => Boolean(value)),
    ),
  );

  const selectTemperature = (next: BarTemperature) => {
    const matchingVariant =
      group.variants.find(
        (variant) =>
          variant.temperature === next &&
          variant.volume === selectedVariant.volume,
      ) || group.variants.find((variant) => variant.temperature === next);
    if (!matchingVariant) return;
    setSelectedItemId(matchingVariant.item.id);
  };

  const selectVolume = (next: string) => {
    const matchingVariant =
      group.variants.find(
        (variant) =>
          variant.volume === next &&
          variant.temperature === selectedVariant.temperature,
      ) || group.variants.find((variant) => variant.volume === next);
    if (!matchingVariant) return;
    setSelectedItemId(matchingVariant.item.id);
  };

  return (
    <article className="group flex min-h-56 flex-col border border-[#020D13]/10 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#020D13]/20 hover:shadow-[0_16px_45px_rgba(2,13,19,.07)] sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        {item.imageUrl ? (
          <div className="relative size-24 shrink-0 overflow-hidden bg-[#001015] sm:size-28">
            <Image
              src={item.imageUrl}
              alt={localize(locale, group.nameRu, group.nameKk)}
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#020D13] text-white">
            <CupSoda className="size-5" aria-hidden="true" />
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-snug sm:text-lg">
            {localize(locale, group.nameRu, group.nameKk)}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#020D13]/55 sm:text-sm">
            {localize(
              locale,
              item.descriptionRu || group.descriptionRu,
              item.descriptionKk || group.descriptionKk,
            ) || "Напиток из барного меню Tuysqan."}
          </p>
        </div>
      </div>
      {(temperatures.length > 1 || volumes.length > 1) && (
        <div className="mt-4 space-y-3">
          {temperatures.length > 1 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold text-[#020D13]/50">
                Температура
              </p>
              <div className="flex flex-wrap gap-2">
                {temperatures.map((temperature) => (
                  <button
                    type="button"
                    key={temperature}
                    onClick={() => selectTemperature(temperature)}
                    aria-pressed={selectedVariant.temperature === temperature}
                    className={cn(
                      "min-h-11 rounded-md border px-3 text-sm font-semibold transition",
                      selectedVariant.temperature === temperature
                        ? "border-[#020D13] bg-[#020D13] text-white"
                        : "border-[#020D13]/12 bg-[#FFFBFC] hover:border-[#020D13]/30",
                    )}
                  >
                    {temperature === "hot"
                      ? locale === "kk"
                        ? "Ыстық"
                        : "Хот"
                      : locale === "kk"
                        ? "Салқын"
                        : "Айс"}
                  </button>
                ))}
              </div>
            </div>
          )}
          {volumes.length > 1 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold text-[#020D13]/50">
                Объём
              </p>
              <div className="flex flex-wrap gap-2">
                {volumes.map((volume) => (
                  <button
                    type="button"
                    key={volume}
                    onClick={() => selectVolume(volume)}
                    aria-pressed={selectedVariant.volume === volume}
                    className={cn(
                      "min-h-11 rounded-md border px-3 text-sm font-semibold transition",
                      selectedVariant.volume === volume
                        ? "border-[#020D13] bg-[#020D13] text-white"
                        : "border-[#020D13]/12 bg-[#FFFBFC] hover:border-[#020D13]/30",
                    )}
                  >
                    {volume}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <strong className="whitespace-nowrap text-lg">
          {formatPrice(item.price)}
        </strong>
        {line ? (
          <div className="inline-flex items-center rounded-md border border-[#020D13]/15">
            <button
              type="button"
              onClick={() => useCartStore.getState().decrease(item.id)}
              className="grid size-10 place-items-center"
              aria-label="Уменьшить"
            >
              <Minus className="size-4" />
            </button>
            <span className="min-w-6 text-center text-sm font-bold">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => add(item)}
              className="grid size-10 place-items-center"
              aria-label="Увеличить"
            >
              <Plus className="size-4" />
            </button>
          </div>
        ) : (
          <Button
            size="sm"
            onClick={() => add(item)}
            disabled={unavailable}
            aria-label={`Добавить ${item.nameRu}`}
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Добавить</span>
          </Button>
        )}
      </div>
    </article>
  );
});

type MenuSectionData = {
  category: Category;
  items: MenuItem[];
  drinkGroups: BarDrinkGroup[];
};

const MenuSection = memo(function MenuSection({
  section,
  sectionIndex,
  locale,
  onOpen,
}: {
  section: MenuSectionData;
  sectionIndex: number;
  locale: "ru" | "kk";
  onOpen: (item: MenuItem) => void;
}) {
  const categoryTitleId = `menu-title-${section.category.slug}`;
  const barSection = isBarCategory(section.category.id);

  return (
    <section
      id={`menu-category-${section.category.slug}`}
      data-category-id={section.category.id}
      aria-labelledby={categoryTitleId}
      className="scroll-mt-48 [contain:layout_style]"
    >
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#020D13]/10 pb-4">
        <h3
          id={categoryTitleId}
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {localize(locale, section.category.nameRu, section.category.nameKk)}
        </h3>
        <span className="shrink-0 text-xs font-semibold text-[#020D13]/45">
          {barSection ? section.drinkGroups.length : section.items.length} поз.
        </span>
      </div>
      <div
        className={cn(
          "grid gap-3 sm:gap-5",
          barSection
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
        )}
      >
        {barSection
          ? section.drinkGroups.map((group) => (
              <DrinkGroupCard key={group.key} group={group} />
            ))
          : section.items.map((item, itemIndex) => (
              <ProductCard
                key={item.id}
                item={item}
                eager={sectionIndex === 0 && itemIndex < 4}
                onOpen={onOpen}
              />
            ))}
      </div>
    </section>
  );
});

function MenuCartActions({ onOpen }: { onOpen: () => void }) {
  const quantity = useCartStore((state) => cartQuantity(state.lines));
  const total = useCartStore((state) => cartTotal(state.lines));

  if (quantity === 0) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#020D13] p-3 text-white shadow-2xl md:hidden">
        <button
          onClick={onOpen}
          aria-label={`Открыть корзину: ${quantity}`}
          className="mx-auto flex min-h-12 w-full max-w-lg items-center justify-between rounded-md bg-white px-5 font-bold text-[#020D13]"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="size-4" />
            Корзина · {quantity}
          </span>
          <span>{formatPrice(total)}</span>
        </button>
      </div>
      <button
        onClick={onOpen}
        aria-label={`Открыть корзину: ${quantity}`}
        className="fixed bottom-6 right-6 z-40 hidden min-h-12 items-center gap-3 rounded-md bg-[#020D13] px-5 font-bold text-white shadow-xl md:flex"
      >
        <ShoppingBag className="size-5" />
        <span>
          {quantity} · {formatPrice(total)}
        </span>
      </button>
    </>
  );
}

function ProductDialog({
  item,
  open,
  onOpenChange,
}: {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const locale = useLocaleStore((state) => state.locale);
  const add = useCartStore((state) => state.add);
  if (!item) return null;
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        onOpenChange(value);
        if (!value) setQuantity(1);
      }}
    >
      <DialogContent className="overflow-hidden p-0 md:grid md:grid-cols-[1.05fr_.95fr]">
        <div className="relative aspect-[4/3] bg-[#020D13] md:aspect-auto md:min-h-[470px]">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={localize(locale, item.nameRu, item.nameKk)}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className={cn(
                "object-contain p-3",
                enlargedImageSlugs.has(item.slug) && "scale-[1.4]",
                enlargedTwentyPercentImageSlugs.has(item.slug) && "scale-[1.2]",
                item.categoryId === "fast-food" && "scale-[1.2]",
                item.categoryId === "shashlik" && "rotate-[95deg] scale-[1.44]",
                item.categoryId === "company" && "scale-[1.2]",
                item.categoryId === "eastern" && "scale-[1.2]",
                item.categoryId === "snacks" && "scale-[1.2]",
                rotatedImageClasses[item.slug],
              )}
              priority
            />
          ) : (
            <div className="grid h-full place-items-center text-white/30">
              Tuysqan
            </div>
          )}
        </div>
        <div className="flex flex-col p-5 md:p-7">
          <DialogTitle className="pr-10 text-2xl font-bold leading-tight">
            {localize(locale, item.nameRu, item.nameKk)}
          </DialogTitle>
          <DialogDescription className="mt-4 text-sm leading-6 text-[#020D13]/60">
            {localize(locale, item.descriptionRu, item.descriptionKk) ||
              "Состав можно уточнить у команды Tuysqan."}
          </DialogDescription>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.isSpicy && (
              <span className="inline-flex items-center gap-1 rounded bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">
                <Flame className="size-3" />
                Острое
              </span>
            )}
            {item.pieceCount && (
              <span className="rounded bg-[#020D13]/6 px-2.5 py-1 text-xs font-bold">
                {item.pieceCount} штук
              </span>
            )}
          </div>
          <div className="mt-auto pt-8">
            <div className="mb-4 flex items-center justify-between">
              <strong className="text-2xl">
                {formatPrice(item.price * quantity)}
              </strong>
              <div className="inline-flex items-center rounded-md border border-[#020D13]/15">
                <button
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="grid size-11 place-items-center"
                  aria-label="Уменьшить"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((value) => value + 1)}
                  className="grid size-11 place-items-center"
                  aria-label="Увеличить"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                add(item, quantity);
                onOpenChange(false);
              }}
            >
              Добавить в корзину
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MenuExperience({
  categories,
  items,
  dineIn = false,
  preselectedTable,
  initialDishSlug,
}: {
  categories: Category[];
  items: MenuItem[];
  dineIn?: boolean;
  preselectedTable?: string;
  initialDishSlug?: string;
}) {
  const locale = useLocaleStore((state) => state.locale);
  const [query, setQuery] = useState("");
  const initialDish = useMemo(
    () =>
      initialDishSlug
        ? items.find(
            (item) =>
              item.slug === initialDishSlug &&
              !item.isArchived &&
              (dineIn ? item.isVisibleDineIn : item.isVisiblePublic),
          )
        : undefined,
    [dineIn, initialDishSlug, items],
  );
  const [activeMenu, setActiveMenu] = useState<MenuKind>(() =>
    initialDish && isBarCategory(initialDish.categoryId) ? "bar" : "main",
  );
  const [activeCategory, setActiveCategory] = useState(
    initialDish?.categoryId ||
      categories.find((category) => !isBarCategory(category.id))?.id ||
      categories[0]?.id ||
      "",
  );
  const [selected, setSelected] = useState<MenuItem | null>(
    () => initialDish || null,
  );
  const [cartOpen, setCartOpen] = useState(false);
  const normalized = query.trim().toLocaleLowerCase();
  const availableItems = useMemo(
    () =>
      items.filter(
        (item) =>
          !item.isArchived &&
          (dineIn ? item.isVisibleDineIn : item.isVisiblePublic),
      ),
    [items, dineIn],
  );
  const mainCategories = useMemo(
    () =>
      categories.filter(
        (category) => category.isVisible && !isBarCategory(category.id),
      ),
    [categories],
  );
  const barCategories = useMemo(
    () =>
      categories.filter(
        (category) => category.isVisible && isBarCategory(category.id),
      ),
    [categories],
  );
  const menuCategories = activeMenu === "bar" ? barCategories : mainCategories;
  const visibleSections = useMemo(
    () =>
      menuCategories
        .map((category) => {
          const sectionItems = availableItems.filter((item) => {
            if (item.categoryId !== category.id) return false;
            if (!normalized) return true;

            return [
              item.nameRu,
              item.nameKk,
              item.descriptionRu,
              item.descriptionKk,
            ].some((value) => value?.toLocaleLowerCase().includes(normalized));
          });

          return {
            category,
            items: sectionItems,
            drinkGroups: isBarCategory(category.id)
              ? groupBarMenuItems(sectionItems)
              : [],
          };
        })
        .filter((section) => section.items.length > 0),
    [availableItems, menuCategories, normalized],
  );
  const visibleItemCount = visibleSections.reduce(
    (totalCount, section) => totalCount + section.items.length,
    0,
  );
  const dineInCheckoutHref = preselectedTable
    ? `/dine-in/cart?table=${encodeURIComponent(preselectedTable)}`
    : "/dine-in/cart";

  const openProduct = useCallback((item: MenuItem) => setSelected(item), []);
  const openCart = useCallback(() => setCartOpen(true), []);

  useEffect(() => {
    if (normalized || typeof IntersectionObserver === "undefined") return;

    const sectionElements = menuCategories
      .map((category) =>
        document.getElementById(`menu-category-${category.slug}`),
      )
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top - 192) -
              Math.abs(second.boundingClientRect.top - 192),
          )[0];
        const categoryId = activeEntry?.target.getAttribute("data-category-id");
        if (categoryId) {
          setActiveCategory((current) =>
            current === categoryId ? current : categoryId,
          );
        }
      },
      { rootMargin: "-190px 0px -65% 0px", threshold: 0 },
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [menuCategories, normalized]);

  useEffect(() => {
    document
      .querySelector<HTMLElement>(
        `[data-menu-category-button="${activeCategory}"]`,
      )
      ?.scrollIntoView({
        behavior: "instant",
        block: "nearest",
        inline: "center",
      });
  }, [activeCategory]);

  const changeMenu = (menu: MenuKind) => {
    const nextCategories = menu === "bar" ? barCategories : mainCategories;
    setActiveMenu(menu);
    setActiveCategory(nextCategories[0]?.id || "");
    setQuery("");
    requestAnimationFrame(() => {
      document.getElementById("menu-content")?.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    });
  };

  const scrollToCategory = (category: Category) => {
    setActiveCategory(category.id);
    setQuery("");
    requestAnimationFrame(() => {
      document
        .getElementById(`menu-category-${category.slug}`)
        ?.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
    });
  };

  const menuTitle =
    activeMenu === "bar"
      ? locale === "kk"
        ? "Бар мәзірі"
        : "Барное меню"
      : locale === "kk"
        ? "Негізгі мәзір"
        : "Основное меню";

  return (
    <div className="relative">
      <div className="sticky top-18 z-30 border-y border-[#020D13]/8 bg-[#FFFBFC]/95 backdrop-blur-md">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div
            className="grid grid-cols-2 gap-2 pt-3 sm:w-[380px]"
            aria-label="Раздел меню"
          >
            {(["main", "bar"] as const).map((menu) => (
              <button
                type="button"
                key={menu}
                onClick={() => changeMenu(menu)}
                aria-pressed={activeMenu === menu}
                disabled={menu === "bar" && barCategories.length === 0}
                className={cn(
                  "min-h-11 rounded-md px-4 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40",
                  activeMenu === menu
                    ? "bg-[#020D13] text-white"
                    : "border border-[#020D13]/12 bg-white hover:border-[#020D13]/30",
                )}
              >
                {menu === "bar"
                  ? locale === "kk"
                    ? "Бар мәзірі"
                    : "Барное меню"
                  : locale === "kk"
                    ? "Негізгі мәзір"
                    : "Основное меню"}
              </button>
            ))}
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
            {menuCategories.map((category) => (
              <button
                type="button"
                key={category.id}
                data-menu-category-button={category.id}
                onClick={() => scrollToCategory(category)}
                aria-pressed={activeCategory === category.id && !query}
                className={cn(
                  "min-h-11 shrink-0 rounded-md border px-4 text-xs font-bold transition",
                  activeCategory === category.id && !query
                    ? "border-[#020D13] bg-[#020D13] text-white"
                    : "border-[#020D13]/12 bg-white hover:border-[#020D13]/30",
                )}
              >
                {localize(locale, category.nameRu, category.nameKk)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        id="menu-content"
        className="mx-auto max-w-[1440px] scroll-mt-48 px-4 py-8 sm:px-6 lg:px-10 lg:py-12"
      >
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#020D13]/45">
              <Sparkles className="size-3.5" />
              {dineIn ? "Заказ в ресторане" : "Меню Tuysqan"}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {query ? "Результаты поиска" : menuTitle}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#020D13]/55">
              {query
                ? `Найдено позиций: ${visibleItemCount}`
                : "Выберите подраздел или листайте меню — категории продолжаются одной лентой."}
            </p>
          </div>
          <label className="relative block w-full sm:max-w-sm">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#020D13]/45" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                activeMenu === "bar" ? "Найти напиток…" : "Найти блюдо…"
              }
              className="pl-11"
              aria-label="Поиск по меню"
            />
          </label>
        </div>
        {visibleSections.length ? (
          <div className="space-y-14 sm:space-y-18">
            {visibleSections.map((section, sectionIndex) => (
              <MenuSection
                key={section.category.id}
                section={section}
                sectionIndex={sectionIndex}
                locale={locale}
                onOpen={openProduct}
              />
            ))}
          </div>
        ) : (
          <div className="grid min-h-64 place-items-center border border-dashed border-[#020D13]/20 bg-white p-8 text-center">
            <div>
              <Search className="mx-auto mb-3 size-8 text-[#020D13]/30" />
              <h3 className="text-xl font-bold">Ничего не найдено</h3>
              <p className="mt-2 text-sm text-[#020D13]/55">
                Попробуйте другое название на русском или казахском.
              </p>
            </div>
          </div>
        )}
      </div>
      <ProductDialog
        item={selected}
        open={!!selected}
        onOpenChange={(value) => !value && setSelected(null)}
      />
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent>
          <DialogTitle className="text-2xl font-bold">Корзина</DialogTitle>
          <DialogDescription className="mb-5 text-sm text-[#020D13]/55">
            Проверьте состав заказа.
          </DialogDescription>
          <CartPanel
            compact
            checkoutHref={dineIn ? dineInCheckoutHref : "/checkout"}
          />
        </DialogContent>
      </Dialog>
      <MenuCartActions onOpen={openCart} />
    </div>
  );
}
