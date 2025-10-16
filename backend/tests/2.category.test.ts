import { expect, test } from 'vitest'
import { getToken } from './shared.ts'

let categoryId = null;

test('Debug - Check if the token is available', async () => {
  const token = getToken()
  console.log('Token disponible:', token ? 'OUI' : 'NON')
  expect(token).toBeTruthy()
});

test('GET /categories - Get all categories', async () => {
  const response = await fetch('http://localhost:3001/categories')
  expect(response.status).toBe(200)
  const data = await response.json()
  expect(data.categories).toBeDefined()
  expect(Array.isArray(data.categories)).toBe(true)
});

test('POST /categories - Create a new category', async () => {
  const categoryData = {
    name: 'Test Category',
    description: 'Description de la catégorie de test'
  }

  const response = await fetch('http://localhost:3001/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(categoryData),
  })
  expect(response.status).toBe(201)
  const data = await response.json()
  categoryId = data.id
});

test('GET /categories/:id - Get a specific category', async () => {
  const response = await fetch(`http://localhost:3001/categories/${categoryId}`)
  expect(response.status).toBe(200)
  const data = await response.json()
  expect(data.id).toBe(categoryId)
});

test('PUT /categories/:id - Update a category', async () => {
  const updateData = {
    name: 'Updated Category',
    description: 'Description mise à jour'
  }

  const response = await fetch(`http://localhost:3001/categories/${categoryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updateData),
  })
  expect(response.status).toBe(200)
});

test('GET /categories/:id/posts - Get the posts of a category', async () => {
  const response = await fetch(`http://localhost:3001/categories/${categoryId}/posts`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  })
  expect(response.status).toBe(200)
  const data = await response.json()
  expect(data.posts).toBeDefined()
  expect(Array.isArray(data.posts)).toBe(true)
});

test('GET /categories/invalid-id - Category not found', async () => {
  const response = await fetch('http://localhost:3001/categories/999999')
  expect(response.status).toBe(404)
});

test('POST /categories without authentication - Should fail', async () => {
  const categoryData = {
    name: 'Test Category',
    description: 'Description de la catégorie de test'
  }

  const response = await fetch('http://localhost:3001/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryData),
  })
  expect(response.status).toBe(401)
});

test('Cleanup - DELETE /categories/:id', async () => {
  const response = await fetch(`http://localhost:3001/categories/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  })
  expect(response.status).toBe(200)
});
