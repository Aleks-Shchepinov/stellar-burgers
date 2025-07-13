import { describe, expect, it } from '@jest/globals';
import authReducer, {
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  updateUser,
  setAuthChecked,
  initialState
} from './AuthSlice';
import { TUser } from '@utils-types';
import * as cookieUtils from '../../utils/cookie';

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};

jest.mock('../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

global.localStorage = mockLocalStorage as unknown as Storage;

describe('Проверка AuthSlice reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser: TUser = {
    name: 'Test User',
    email: 'test@example.com'
  };

  const mockAuthResponse = {
    success: true,
    user: mockUser,
    accessToken: 'access-token',
    refreshToken: 'refresh-token'
  };

  it('Тест должен обрабатывать начальное состояние', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('Обрабатывает экшен setAuthChecked', () => {
    it('Должен устанавливать isAuthChecked', () => {
      const state = authReducer(initialState, setAuthChecked(true));
      expect(state.isAuthChecked).toBe(true);
    });
  });

  describe('Обрабатывает экшены registerUser', () => {
    it('Проверяет установку состояния загрузки в true в режиме pending', () => {
      const state = authReducer(
        initialState,
        registerUser.pending('pending', { email: '', password: '', name: '' })
      );
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('Проверяет установку user и завершение загрузки в режиме fulfilled', () => {
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = authReducer(
        previousState,
        registerUser.fulfilled(mockAuthResponse, 'fulfilled', {
          email: '',
          password: '',
          name: ''
        })
      );

      expect(state).toEqual({
        ...initialState,
        user: mockUser,
        loading: false,
        error: null
      });
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'refreshToken',
        mockAuthResponse.refreshToken
      );
      expect(cookieUtils.setCookie).toHaveBeenCalledWith(
        'accessToken',
        mockAuthResponse.accessToken
      );
    });

    it('Проверяет установку ошибки и завершение загрузки в режиме rejected', () => {
      const errorMessage = 'Registration failed';
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = authReducer(
        previousState,
        registerUser.rejected(new Error(errorMessage), 'rejected', {
          email: '',
          password: '',
          name: ''
        })
      );

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('Обрабатывает экшены loginUser', () => {
    it('Проверяет установку состояния загрузки в true в режиме pending', () => {
      const state = authReducer(
        initialState,
        loginUser.pending('pending', { email: '', password: '' })
      );
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('Проверяет установку user и завершение загрузки в режиме fulfilled', () => {
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = authReducer(
        previousState,
        loginUser.fulfilled(mockAuthResponse, 'fulfilled', {
          email: '',
          password: ''
        })
      );

      expect(state).toEqual({
        ...initialState,
        user: mockUser,
        loading: false,
        error: null
      });
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'refreshToken',
        mockAuthResponse.refreshToken
      );
      expect(cookieUtils.setCookie).toHaveBeenCalledWith(
        'accessToken',
        mockAuthResponse.accessToken
      );
    });

    it('Проверяет установку ошибки и завершение загрузки в режиме rejected', () => {
      const errorMessage = 'Login failed';
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = authReducer(
        previousState,
        loginUser.rejected(new Error(errorMessage), 'rejected', {
          email: '',
          password: ''
        })
      );

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('Обрабатывает экшены logoutUser', () => {
    it('Проверяет установку состояния загрузки в true в режиме pending', () => {
      const state = authReducer(
        { ...initialState, user: mockUser },
        logoutUser.pending('pending', undefined)
      );
      expect(state).toEqual({
        ...initialState,
        user: mockUser,
        loading: true,
        error: null
      });
    });

    it('Проверяет очистку user и завершение загрузки в режиме fulfilled', () => {
      const previousState = {
        ...initialState,
        user: mockUser,
        loading: true
      };

      const logoutResponse = {
        success: true,
        message: 'Logout successful'
      };

      const state = authReducer(
        previousState,
        logoutUser.fulfilled(logoutResponse, 'fulfilled', undefined)
      );

      expect(state).toEqual({
        ...initialState,
        user: null,
        loading: false,
        error: null
      });
      expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
      expect(cookieUtils.deleteCookie).toHaveBeenCalledWith('accessToken');
    });

    it('Проверяет установку ошибки и завершение загрузки в режиме rejected', () => {
      const errorMessage = 'Logout failed';
      const previousState = {
        ...initialState,
        user: mockUser,
        loading: true
      };

      const state = authReducer(
        previousState,
        logoutUser.rejected(new Error(errorMessage), 'rejected', undefined)
      );

      expect(state).toEqual({
        ...initialState,
        user: mockUser,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('Обрабатывает экшены fetchUser', () => {
    it('Проверяет установку состояния загрузки в true в режиме pending', () => {
      const state = authReducer(
        initialState,
        fetchUser.pending('pending', undefined)
      );
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('Проверяет установку user и isAuthChecked в режиме fulfilled', () => {
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = authReducer(
        previousState,
        fetchUser.fulfilled(
          { success: true, user: mockUser },
          'fulfilled',
          undefined
        )
      );

      expect(state).toEqual({
        ...initialState,
        user: mockUser,
        isAuthChecked: true,
        loading: false,
        error: null
      });
    });

    it('Проверяет установку isAuthChecked и ошибки в режиме rejected', () => {
      const errorMessage = 'Fetch user failed';
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = authReducer(
        previousState,
        fetchUser.rejected(new Error(errorMessage), 'rejected', undefined)
      );

      expect(state).toEqual({
        ...initialState,
        isAuthChecked: true,
        loading: false,
        error: errorMessage
      });
    });
  });

  describe('Обрабатывает экшены updateUser', () => {
    it('Проверяет установку состояния загрузки в true в режиме pending', () => {
      const state = authReducer(
        initialState,
        updateUser.pending('pending', { name: '', email: '' })
      );
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('Проверяет обновление user и завершение загрузки в режиме fulfilled', () => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      const previousState = {
        ...initialState,
        user: mockUser,
        loading: true
      };

      const state = authReducer(
        previousState,
        updateUser.fulfilled({ success: true, user: updatedUser }, 'fulfilled', {
          name: 'Updated Name',
          email: ''
        })
      );

      expect(state).toEqual({
        ...initialState,
        user: updatedUser,
        loading: false,
        error: null
      });
    });

    it('Проверяет установку ошибки и завершение загрузки в режиме rejected', () => {
      const errorMessage = 'Update user failed';
      const previousState = {
        ...initialState,
        loading: true
      };

      const state = authReducer(
        previousState,
        updateUser.rejected(new Error(errorMessage), 'rejected', {
          name: '',
          email: ''
        })
      );

      expect(state).toEqual({
        ...initialState,
        loading: false,
        error: errorMessage
      });
    });
  });
});
