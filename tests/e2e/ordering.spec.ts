import { expect, test } from "@playwright/test";

async function addFirstProduct(page: import("@playwright/test").Page) {
  await page.goto("/menu", { waitUntil: "domcontentloaded" });
  await page
    .getByRole("button", { name: /^Добавить / })
    .first()
    .click();
  await expect(
    page.getByRole("button", { name: "Уменьшить" }).first(),
  ).toBeVisible();
}

test("adds a product to the persistent cart", async ({ page }) => {
  await addFirstProduct(page);
  await page.goto("/cart", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Овсянка с яблоком и карамелью")).toBeVisible();
  await expect(page.getByText("Блюд: 1")).toBeVisible();
});

test("featured dish links open the requested menu item", async ({ page }) => {
  await page.goto("/menu?dish=oatmeal-apple-caramel", {
    waitUntil: "domcontentloaded",
  });
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.locator("img")).toHaveClass(/object-contain/);
  await expect(
    page.getByRole("heading", { name: "Овсянка с яблоком и карамелью" }),
  ).toBeVisible();
});

test("menu keeps categories in one continuous feed and switches to the bar", async ({
  page,
}) => {
  await page.goto("/menu", { waitUntil: "domcontentloaded" });

  const breakfasts = page.getByRole("region", {
    name: "Завтраки",
    exact: true,
  });
  const soups = page.getByRole("region", { name: "Супы", exact: true });
  await expect(breakfasts).toBeVisible();
  await expect(soups).toBeAttached();

  await page.getByRole("button", { name: "Супы", exact: true }).click();
  await expect(soups).toBeInViewport();

  const sets = page.getByRole("region", { name: "Сеты", exact: true });
  await page.getByRole("button", { name: "Сеты", exact: true }).click();
  await expect(sets).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Сеты", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "Барное меню", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Барное меню", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Кофейные напитки" }),
  ).toBeVisible();
  await expect(
    page.getByRole("region", { name: "Авторские напитки" }),
  ).toBeAttached();
  const lemonades = page.getByRole("region", {
    name: "Лимонады",
    exact: true,
  });
  await page.getByRole("button", { name: "Лимонады", exact: true }).click();
  await expect(lemonades).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Лимонады", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(breakfasts).toHaveCount(0);
});

test("checkout validates required delivery details", async ({ page }) => {
  await addFirstProduct(page);
  await page.goto("/checkout", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("link", { name: "Оформить заказ" })).toHaveCount(
    0,
  );
  await page.getByRole("button", { name: /Создать заказ/ }).click();
  await expect(page.getByText("Укажите имя")).toBeVisible();
  await expect(page.getByText("Укажите адрес доставки")).toBeVisible();
});

test("dine-in flow preselects a database-fed table", async ({ page }) => {
  await page.goto("/dine-in?table=table-7", {
    waitUntil: "domcontentloaded",
  });
  await page
    .getByRole("button", { name: /^Добавить / })
    .first()
    .click();
  await page.getByRole("button", { name: "Открыть корзину: 1" }).click();
  await page.getByRole("link", { name: "Оформить заказ" }).click();
  await expect(page).toHaveURL(/\/dine-in\/cart\?table=table-7/);
  await expect(page.getByLabel("Номер столика")).toHaveValue("table-7");
  await expect(
    page.getByRole("button", {
      name: "Создать заказ и перейти в WhatsApp",
    }),
  ).toBeVisible();
});

test("admin routes are protected", async ({ page }) => {
  await page.goto("/admin/menu", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(page.getByText("Вход для команды")).toBeVisible();
});
