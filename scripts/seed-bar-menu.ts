import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { categories, menuItems } from "../src/data/menu";

loadEnvConfig(process.cwd());

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required",
  );
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

async function seedBarMenu() {
  const barCategories = categories.filter((category) =>
    category.id.startsWith("bar-"),
  );
  const barItems = menuItems.filter((item) =>
    item.categoryId.startsWith("bar-"),
  );

  const categoryResult = await supabase.from("categories").upsert(
    barCategories.map((category) => ({
      id: category.id,
      slug: category.slug,
      name_ru: category.nameRu,
      name_kk: category.nameKk,
      sort_order: category.sortOrder,
      is_visible: category.isVisible,
    })),
    { onConflict: "id" },
  );
  if (categoryResult.error) throw categoryResult.error;

  const itemResult = await supabase.from("menu_items").upsert(
    barItems.map((item) => ({
      id: item.id,
      category_id: item.categoryId,
      slug: item.slug,
      name_ru: item.nameRu,
      name_kk: item.nameKk || null,
      description_ru: item.descriptionRu || null,
      description_kk: item.descriptionKk || null,
      price: item.price,
      image_url: item.imageUrl || null,
      sort_order: item.sortOrder,
      is_available: item.isAvailable,
      is_visible_public: item.isVisiblePublic,
      is_visible_dine_in: item.isVisibleDineIn,
      is_featured: item.isFeatured,
      is_spicy: item.isSpicy,
      is_new: item.isNew,
      is_archived: item.isArchived,
      needs_review: item.needsReview,
      piece_count: item.pieceCount || null,
      source: item.source,
    })),
    { onConflict: "id" },
  );
  if (itemResult.error) throw itemResult.error;

  console.log(
    `Seeded ${barCategories.length} bar categories and ${barItems.length} bar menu items.`,
  );
}

seedBarMenu().catch((error) => {
  console.error(error);
  process.exit(1);
});
