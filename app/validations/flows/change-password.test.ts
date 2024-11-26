import { describe, test, expect } from 'vitest';
import {
  validateChangePassword,
  ChangePasswordResponse,
} from 'app/validations/flows/change-password';

describe('validate "Change Password"', () => {
  test('should return false if the main password is too small', async () => {
    const formData = new FormData();
    formData.append('emailaddress', 'donald@duck.com');
    formData.append('new-password', 'asd');
    formData.append('new-password-confirm', 'asdxcvcvb');

    const request = new Request('http://localhost:3000/reset-password', {
      method: 'POST',
      body: formData,
    });

    const result = await validateChangePassword(request);

    expect(result).toEqual<ChangePasswordResponse>({
      success: false,
      errors: {
        password: [{ errorCode: 'too_small' }],
        confirmPassword: [
          { errorCode: 'custom', message: 'passwords_do_not_match' },
        ],
      },
    });
  });

  test('should return false if the confirmation password is too small', async () => {
    const formData = new FormData();
    formData.append('emailaddress', 'donald@duck.com');
    formData.append('new-password', 'asdasdscjcx');
    formData.append('new-password-confirm', 'asd');

    const request = new Request('http://localhost:3000/reset-password', {
      method: 'POST',
      body: formData,
    });

    const result = await validateChangePassword(request);

    expect(result).toEqual<ChangePasswordResponse>({
      success: false,
      errors: {
        confirmPassword: [
          { errorCode: 'too_small' },
          { errorCode: 'custom', message: 'passwords_do_not_match' },
        ],
      },
    });
  });

  test('should return false if the passwords do not match', async () => {
    const formData = new FormData();
    formData.append('emailaddress', 'donald@duck.com');
    formData.append('new-password', 'asdasdscjcx');
    formData.append('new-password-confirm', 'asdasdasdscccc');

    const request = new Request('http://localhost:3000/reset-password', {
      method: 'POST',
      body: formData,
    });

    const result = await validateChangePassword(request);

    expect(result).toEqual<ChangePasswordResponse>({
      success: false,
      errors: {
        confirmPassword: [
          { errorCode: 'custom', message: 'passwords_do_not_match' },
        ],
      },
    });
  });
});
