import { expect, test } from "@playwright/test";

test("approved dishes appear once in their appropriate menu sections", async ({
  page,
}, testInfo) => {
  await page.goto("/menu", { waitUntil: "networkidle" });
  const fish = page.getByRole("region", { name: "Рыба", exact: true });
  await expect(fish.locator("article")).toHaveCount(8);
  await expect(
    page
      .getByRole("region", { name: "Рыбные комбо", exact: true })
      .locator("article"),
  ).toHaveCount(3);
  await expect(
    page.getByRole("region", { name: "Соусы", exact: true }).locator("article"),
  ).toHaveCount(3);
  const sets = page.getByRole("region", { name: "Сеты", exact: true });
  await expect(
    sets.getByRole("heading", { name: /^Рыбный сет №/ }),
  ).toHaveCount(3);
  const soups = page.getByRole("region", { name: "Супы", exact: true });
  await expect(
    soups.getByRole("heading", { name: "Уха", exact: true }),
  ).toHaveCount(1);
  await expect(
    soups.getByRole("heading", { name: "Том ям с рисом", exact: true }),
  ).toHaveCount(1);
  await expect(
    soups.getByRole("heading", { name: "Суп с морепродуктами", exact: true }),
  ).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: "Крылышки, 10 штук", exact: true }),
  ).toHaveCount(1);
  await expect(
    page.getByRole("heading", { name: /Крылышки Chicken/ }),
  ).toHaveCount(0);
  await expect(
    page
      .getByRole("region", { name: "Закуски", exact: true })
      .getByRole("heading", { name: "Креветки", exact: true }),
  ).toHaveCount(1);
  await expect(
    page
      .getByRole("region", { name: "Горячие блюда", exact: true })
      .getByRole("heading", { name: "Соте из морепродуктов", exact: true }),
  ).toHaveCount(1);
  await fish.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      fish
        .locator("img")
        .first()
        .evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await fish.screenshot({ path: testInfo.outputPath("fish-section.png") });
  await page
    .getByRole("region", { name: "Рыбные комбо", exact: true })
    .screenshot({ path: testInfo.outputPath("combo-section.png") });
  await sets
    .locator("article")
    .filter({
      has: page.getByRole("heading", { name: "Рыбный сет №1", exact: true }),
    })
    .screenshot({ path: testInfo.outputPath("fish-set-1.png") });
  await page
    .getByRole("textbox", { name: "Поиск по меню" })
    .fill("Жареный сазан");
  await expect(fish.locator("article")).toHaveCount(1);
  await expect(
    page.getByText("Найдено позиций: 1", { exact: true }),
  ).toBeVisible();
});

test("one fish card orders both portions with their own correct cart prices", async ({
  page,
}) => {
  await page.goto("/menu", { waitUntil: "networkidle" });
  const card = page
    .getByRole("region", { name: "Рыба", exact: true })
    .locator("article")
    .filter({
      has: page.getByRole("heading", { name: "Жареный сазан", exact: true }),
    });
  await expect(card).toHaveCount(1);
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator("strong")).toHaveText(/2\s*600/);
  await card.getByRole("button", { name: "1 кг", exact: true }).click();
  await expect(card.locator("strong")).toHaveText(/5\s*200/);
  await card
    .getByRole("button", { name: "Добавить Жареный сазан, 1 кг", exact: true })
    .click();
  await card.getByRole("button", { name: "0,5 кг", exact: true }).click();
  await card
    .getByRole("button", {
      name: "Добавить Жареный сазан, 0,5 кг",
      exact: true,
    })
    .click();
  await page.goto("/cart", { waitUntil: "networkidle" });
  await expect(
    page.getByText("Жареный сазан, 1 кг", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Жареный сазан, 0,5 кг", { exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/7\s*800/).first()).toBeVisible();
});

test("dine-in also groups portions and opens the approved tom yam description", async ({
  page,
}) => {
  await page.goto("/dine-in?table=table-7", {
    waitUntil: "networkidle",
  });
  await page
    .getByRole("button", { name: "Открыть Том ям с рисом", exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(
    dialog.getByRole("heading", { name: "Том ям с рисом", exact: true }),
  ).toBeVisible();
  await expect(dialog).toContainText("рис");
  await expect(dialog.locator("img")).toHaveAttribute("src", /fish-tom-yum/);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("region", { name: "Рыба", exact: true }).locator("article"),
  ).toHaveCount(8);
});
