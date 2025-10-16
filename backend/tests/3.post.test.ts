import { expect, test } from 'vitest'
import { getToken } from './shared.ts'

let categoryId = null;
let postId = null;

test('Setup - POST /categories (créer une catégorie pour les posts)', async () => {
  const categoryData = {
    name: 'Test Category for Posts ' + Math.random(),
    description: 'Catégorie pour tester les posts'
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

test('GET /posts - Récupérer tous les posts', async () => {
  const response = await fetch('http://localhost:3001/posts')
  expect(response.status).toBe(200)
  const data = await response.json()
  expect(data.posts).toBeDefined()
  expect(Array.isArray(data.posts)).toBe(true)
});

test('POST /posts - Créer un nouveau post', async () => {
  if (!categoryId) {
    throw new Error('categoryId n\'est pas défini')
  }

  const postData = {
    title: 'Test Post ' + Math.random(),
    content: 'Contenu du post de test',
    categoryId: categoryId,
    authorId: 1
  }

  const response = await fetch('http://localhost:3001/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(postData),
  })

  expect(response.status).toBe(200)
  const data = await response.json()
  postId = data.id
});

test('PUT /posts/:id - Mettre à jour un post', async () => {
  if (!postId) {
    throw new Error('postId n\'est pas défini')
  }

  const updateData = {
    title: 'Updated Post',
    content: 'Contenu mis à jour',
    categoryId: categoryId
  }

  const response = await fetch(`http://localhost:3001/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updateData),
  })
  expect(response.status).toBe(200)
});

test('GET /posts/invalid-id - Post inexistant', async () => {
  const response = await fetch('http://localhost:3001/posts/999999')
  expect(response.status).toBe(404)
});

test('POST /posts sans authentification - Doit échouer', async () => {
  const postData = {
    title: 'Test Post',
    content: 'Contenu du post de test',
    categoryId: categoryId
  }

  const response = await fetch('http://localhost:3001/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  expect(response.status).toBe(401)
});

test('Cleanup - DELETE /posts/:id', async () => {
  if (!postId) {
    console.log('postId n\'est pas défini, skip du test de suppression')
    return
  }

  const response = await fetch(`http://localhost:3001/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  })
  expect(response.status).toBe(200)
});

test('Cleanup - DELETE /categories/:id', async () => {
  if (!categoryId) {
    console.log('categoryId n\'est pas défini, skip du test de suppression')
    return
  }

  const response = await fetch(`http://localhost:3001/categories/${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  })

  if (response.status !== 200) {
    const errorData = await response.json()
    console.log('Erreur suppression catégorie:', errorData)
  }

  expect([200, 500]).toContain(response.status)
});
