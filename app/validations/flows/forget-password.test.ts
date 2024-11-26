import { describe, test, expect } from 'vitest';
import { validateForgetPassword } from './forget-password';

describe('validate "Forget Password"', () => {
  test('should return success: false when emailaddress is missing', async () => {
    const formData = new FormData();
    formData.append('emailaddress', '');

    const request = new Request('https://localhost:3000/forgot-password', {
      method: 'POST',
      body: formData,
    });

    const result = await validateForgetPassword(request);

    expect(result).toEqual({
      success: false,
      errors: {
        emailaddress: [
          {
            errorCode: 'too_small',
          },
          { errorCode: 'invalid_string' },
        ],
      },
    });
  });

  test('should return success: false when emailaddress is invalid', async () => {
    const formData = new FormData();
    formData.append('emailaddress', 'invalid');

    const request = new Request('https://localhost:3000/forgot-password', {
      method: 'POST',
      body: formData,
    });

    const result = await validateForgetPassword(request);

    expect(result).toEqual({
      success: false,
      errors: {
        emailaddress: [{ errorCode: 'invalid_string' }],
      },
    });
  });

  test('should return success: true when emailaddress is valid', async () => {
    const formData = new FormData();
    formData.append('emailaddress', 'donald@duck.com');

    const request = new Request('https://localhost:3000/forgot-password', {
      method: 'POST',
      body: formData,
    });

    const result = await validateForgetPassword(request);

    expect(result).toEqual({
      success: true,
      data: {
        emailaddress: 'donald@duck.com',
      },
    });
  });
});
