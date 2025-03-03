
import { test, expect } from '@playwright/test';

// Base URL for your backend API
const BASE_URL = 'http://localhost:5173';

// You can hardcode this temporarily for testing, but it's better to load from .env
const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTMxNWQwNmRlNGM3OGQxZGZkMTdiYSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MDkyMTIzNSwiZXhwIjoxNzQxMDA3NjM1fQ.epIDgxBekhv2KkX9FivYUeAwmYRBITZjideijWlj1JI';  // Change this to your actual working token


let createdBlogId: string | null = null;

test.describe('Blog API Tests', () => {

  test('fetch all blogs', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/blogs/allBlog`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data.blogs)).toBe(true);
  });

  test('create a blog', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/blogs/addBlog`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        title: 'Test Blog',
        content: 'This is a test blog created via Playwright',
        author: 'Test Author',
        image: 'test-image.jpg'
      }
    });

    expect(response.status()).toBe(201);   // Check your backend! Maybe this is 200
    const responseData = await response.json();

    createdBlogId = responseData.blog?._id;   // Make sure this matches actual response
    expect(createdBlogId).toBeTruthy();       // Ensure blog was created
  });

  test('update a blog', async ({ request }) => {
    if (!createdBlogId) throw new Error('Blog was not created.');

    const response = await request.put(`${BASE_URL}/blogs/updateBlog/${createdBlogId}`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        title: 'Updated Blog Title',
        content: 'Updated content'
      }
    });

    expect(response.status()).toBe(200);
    const updatedBlog = await response.json();
    expect(updatedBlog.title).toBe('Updated Blog Title');
  });

  test('delete a blog', async ({ request }) => {
    if (!createdBlogId) throw new Error('Blog was not created.');

    const response = await request.delete(`${BASE_URL}/blogs/deleteBlog/${createdBlogId}`, {
      headers: {
        'Authorization': `Bearer ${TEST_TOKEN}`
      }
    });

    expect(response.status()).toBe(200);
  });

});
