import * as bcrypt from 'bcryptjs';
import { HashPasswordUseCase } from './hash-password.usecase';

describe('HashPasswordUseCase', () => {
  
  let hashPasswordUseCase: HashPasswordUseCase;

  beforeEach(() => {
    hashPasswordUseCase = new HashPasswordUseCase();
  });

  it('should hash the password successfully', async () => {
    const password = 'mypassword123';
    
    const hashSpy = jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'hashedPassword');

    const hashedPassword = await hashPasswordUseCase.execute(password);

    expect(hashSpy).toHaveBeenCalledWith(password, 10); 
    expect(hashedPassword).toBe('hashedPassword'); 

    hashSpy.mockRestore();
  });

  it('should throw an error if bcrypt fails', async () => {
    const password = 'mypassword123';
    
    const hashSpy = jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      throw new Error('bcrypt error');
    });

    await expect(hashPasswordUseCase.execute(password)).rejects.toThrow('bcrypt error');

    hashSpy.mockRestore();
  });

});