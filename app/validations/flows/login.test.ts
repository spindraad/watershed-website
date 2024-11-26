import { describe, test, expect } from 'vitest';
import { validateLogin } from './login';

describe('validate "Login"', () => {
  test('should return success: false when emailaddress is missing', async () => {
    const formData = new FormData();
    formData.append('password', 'password');

    const request = new Request('https://localhost:3000/login', {
      method: 'POST',
      body: formData,
    });

    const result = await validateLogin(request);

    expect(result).toEqual({
      success: false,
      errors: {
        emailaddress: [{ errorCode: 'invalid_type' }],
      },
    });
  });

  test('should return success: false when emailaddress is invalid', async () => {
    const formData = new FormData();
    formData.append('emailaddress', 'invalid');
    formData.append('password', 'password');

    const request = new Request('https://localhost:3000/login', {
      method: 'POST',
      body: formData,
    });

    const result = await validateLogin(request);

    expect(result).toEqual({
      success: false,
      errors: {
        emailaddress: [{ errorCode: 'invalid_string' }],
      },
    });
  });

  test('should return success: false when password is missing', async () => {
    const formData = new FormData();
    formData.append('emailaddress', 'donald@duck.com');

    const request = new Request('https://localhost:3000/login', {
      method: 'POST',
      body: formData,
    });

    const result = await validateLogin(request);

    expect(result).toEqual({
      success: false,
      errors: {
        password: [{ errorCode: 'invalid_type' }],
      },
    });
  });

  test('should return success: false when password is too short', async () => {
    const formData = new FormData();
    formData.append('emailaddress', 'donald@duck.com');
    formData.append('password', 'short');

    const request = new Request('https://localhost:3000/login', {
      method: 'POST',
      body: formData,
    });

    const result = await validateLogin(request);

    expect(result).toEqual({
      success: false,
      errors: {
        password: [{ errorCode: 'too_small' }],
      },
    });
  });

  test('should return success: true when emailaddress and password are valid', async () => {
    const formData = new FormData();
    formData.append('emailaddress', 'donald@duck.com');
    formData.append('password', 'password123');

    const request = new Request('https://localhost:3000/login', {
      method: 'POST',
      body: formData,
    });

    const result = await validateLogin(request);

    expect(result).toEqual({
      success: true,
      data: {
        emailaddress: 'donald@duck.com',
        password: 'password123',
      },
    });
  });
});
