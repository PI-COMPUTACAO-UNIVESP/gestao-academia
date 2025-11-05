import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';

global.fetch = jest.fn();

describe('AuthContext', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should provide initial auth state', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 401,
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.user).toBeNull();
        expect(result.current.signIn).toBeDefined();
        expect(result.current.signOut).toBeDefined();
    });

    it('should load user on mount if authenticated', async () => {
        const mockUser = {
            id: 'user-123',
            name: 'Test User',
            email: 'test@example.com',
            profile: 'admin',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockUser,
        });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.user).toEqual(mockUser);
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/me');
    });

    it('should sign in successfully', async () => {
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    id: 'user-123',
                    name: 'Test User',
                    email: 'test@example.com',
                    profile: 'admin',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }),
            });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        let signInResult;
        await act(async () => {
            signInResult = await result.current.signIn(
                'test@example.com',
                'password123',
            );
        });

        expect(signInResult).toBeDefined();
        expect(result.current.user).toBeDefined();
        expect(result.current.user?.email).toBe('test@example.com');
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123',
            }),
        });
    });

    it('should return null on failed sign in', async () => {
        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
            })
            .mockResolvedValueOnce({
                ok: false,
                status: 401,
            });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        let signInResult;
        await act(async () => {
            signInResult = await result.current.signIn(
                'test@example.com',
                'wrong-password',
            );
        });

        expect(signInResult).toBeNull();
        expect(result.current.user).toBeNull();
    });

    it('should sign out successfully', async () => {
        const mockUser = {
            id: 'user-123',
            name: 'Test User',
            email: 'test@example.com',
            profile: 'admin',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        (global.fetch as jest.Mock)
            .mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({ message: 'Signed out successfully' }),
            });

        const { result } = renderHook(() => useAuth(), {
            wrapper: AuthProvider,
        });

        await waitFor(() => {
            expect(result.current.user).toEqual(mockUser);
        });

        await act(async () => {
            await result.current.signOut();
        });

        expect(result.current.user).toBeNull();
        expect(global.fetch).toHaveBeenCalledWith('/api/auth/signout', {
            method: 'POST',
        });
    });

    it('should throw error when useAuth is used outside provider', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation();

        expect(() => {
            renderHook(() => useAuth());
        }).toThrow('useAuth must be used within an AuthProvider');

        consoleErrorSpy.mockRestore();
    });
});
