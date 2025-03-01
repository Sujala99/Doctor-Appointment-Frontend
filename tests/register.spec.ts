import { test, expect } from "@playwright/test";

test.describe("Register Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/register"); // Adjust URL as needed
  });

  // ✅ Test for successful registration
  test("should register a new user successfully", async ({ page }) => {
    const email = `testuser${Date.now()}@example.com`;

    await page.fill('input[name="fullname"]', "Test User");
    await page.fill('input[name="username"]', `testuser${Date.now()}`);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="phonenumber"]', "9876543210");
    await page.fill('input[name="dob"]', "2000-01-01");
    await page.fill('input[name="password"]', "StrongPass@123");

    // Wait for button to become enabled before clicking
    await page.waitForSelector('button[type="submit"]:not(:disabled)');
    await page.click('button[type="submit"]');

    // Wait for success response (adjust if needed)
    await page.waitForSelector("text=Registration Successful");

    // ✅ Ensure success message appears
    expect(await page.textContent("body")).toContain("Registration Successful");
  });

  // ✅ Test for error when required fields are missing
  test("should show an error when required fields are missing", async ({ page }) => {
    // Click submit button without filling any fields
    await page.waitForSelector('button[type="submit"]:disabled');
    await page.click('button[type="submit"]');

    // Expect error messages to appear
    await page.waitForSelector(".text-red-500"); // Adjust if needed

    expect(await page.textContent("body")).toContain("All fields are required");
  });

  // ✅ Test for weak password validation
//   test("should show an error for a weak password", async ({ page }) => {
//     await page.fill('input[name="fullname"]', "Weak User");
//     await page.fill('input[name="username"]', `weakuser${Date.now()}`);
//     await page.fill('input[name="email"]', `weakuser${Date.now()}@example.com`);
//     await page.fill('input[name="phonenumber"]', "9876543210");
//     await page.fill('input[name="dob"]', "2000-01-01");
//     await page.fill('input[name="password"]', "12345"); // Weak password

//     await page.waitForSelector('button[type="submit"]:not(:disabled)');
//     await page.click('button[type="submit"]');

//     await page.waitForSelector(".text-red-500"); // Adjust selector as needed
//     expect(await page.textContent("body")).toContain("Password is too weak");
//   });
});
