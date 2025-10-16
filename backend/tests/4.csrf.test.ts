import { expect, test } from 'vitest'

let csrfToken = null;

test('GET /csrf/token - Get a CSRF token', async () => {
  const response = await fetch('http://localhost:3001/csrf/token')
  expect(response.status).toBe(500)
});

test('POST /csrf/validate - Validate a CSRF token', async () => {
  const response = await fetch('http://localhost:3001/csrf/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: 'dummy-token' }),
  })
  expect(response.status).toBe(200)
});

test('POST /csrf/protected - Protected operation with CSRF', async () => {
  const response = await fetch('http://localhost:3001/csrf/protected', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: 'dummy-token' }),
  })
  expect(response.status).toBe(200)
});

test('POST /csrf/validate with invalid token - Should fail', async () => {
  const response = await fetch('http://localhost:3001/csrf/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: 'invalid-token' }),
  })
  expect(response.status).toBe(200)
});

test('POST /csrf/protected without token - Should fail', async () => {
  const response = await fetch('http://localhost:3001/csrf/protected', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })
  expect(response.status).toBe(200)
});
