import { expect, test } from 'vitest'
import { setToken } from './shared.ts'

const user = {
  name: 'Admin User',
  email: 'admin' + Math.random() + '@example.com',
  password: 'password' + Math.random(),
}

test('POST /auth/register with valid credentials', async () => {
  const response = await fetch('http://localhost:3001/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  expect(response.status).toBe(201)
});

test('POST /auth/login with valid credentials', async () => {
  const response = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: user.email, password: user.password }),
  })
  expect(response.status).toBe(200)
  const data = await response.json()
  setToken(data.token)
});

test('GET /auth/me with valid token', async () => {
  const { getToken } = await import('./shared.js')
  const response = await fetch('http://localhost:3001/auth/me', {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  })
  expect(response.status).toBe(200)
});

test('GET /auth/me with invalid token', async () => {
  const response = await fetch('http://localhost:3001/auth/me', {
    headers: {
      'Authorization': `Bearer invalid`,
    },
  })
  expect(response.status).toBe(401)
});

test('POST /auth/login with invalid credentials', async () => {
  const response = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: 'invalid@example.com', password: 'invalid' }),
  })
  expect(response.status).toBe(401)
});

test('POST /auth/logout', async () => {
  const { getToken } = await import('./shared.js')
  const response = await fetch('http://localhost:3001/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({})
  })
  expect(response.status).toBe(200)
});

test('POST /auth/refresh', async () => {
  const { getToken } = await import('./shared.js')
  const response = await fetch('http://localhost:3001/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ refreshToken: 'dummy-refresh-token' })
  })
  // Le refresh token factice devrait retourner 401
  expect(response.status).toBe(401)
});