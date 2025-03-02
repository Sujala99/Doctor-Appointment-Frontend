import { test, expect } from "@playwright/test";

test.describe("Add Doctor Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/addDoctor"); // Adjust URL if necessary
  });

  test("should add a new doctor successfully", async ({ page }) => {
    await page.fill('input[name="fullName"]', "Dr. John Doe");
    await page.fill('input[name="email"]', `dr.johndoe@gmail.com`);
    await page.fill('input[name="username"]', `drjohndoe`);
    await page.fill('input[name="password"]', "StrongPass@123");
    await page.fill('input[name="phoneNumber"]', "9876543210");
    await page.fill('input[name="address"]', "123 Medical Street");
    await page.selectOption('select[name="gender"]', "male");
    await page.fill('input[name="dob"]', "1980-05-15");
    await page.fill('input[name="specialization"]', "Cardiologist");
    await page.fill('input[name="experience"]', "15");
    await page.fill('input[name="fees"]', "200");
    await page.fill('input[name="availableSlots"]', "9 AM - 12 PM, 3 PM - 5 PM");

    await page.waitForSelector('button[type="submit"]:not(:disabled)');
    await page.click('button[type="submit"]');

    // Wait for success message
    await page.waitForSelector("text=Doctor Added Successfully");
    expect(await page.textContent("body")).toContain("Doctor Added Successfully");
  });

  test("should show error when required fields are missing", async ({ page }) => {
    await page.waitForSelector('button[type="submit"]:disabled');
    await page.click('button[type="submit"]');

    // Expect error messages to appear
    await page.waitForSelector(".text-red-500"); // Adjust if needed
    expect(await page.textContent("body")).toContain("All fields are required");
  });

  test("should validate email format", async ({ page }) => {
    await page.fill('input[name="email"]', "invalid-email");
    await page.click('button[type="submit"]');
    await page.waitForSelector(".text-red-500");
    expect(await page.textContent("body")).toContain("Invalid email format");
  });
});
