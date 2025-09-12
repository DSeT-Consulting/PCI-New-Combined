import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify, SignJWT } from 'jose';

// In a real app, use environment variables for these
const JWT_SECRET = new TextEncoder().encode('your-secret-key-should-be-long-and-secure');
const COOKIE_NAME = 'auth-token';

// For demo purposes only - in a real app, these would be in a database
const VALID_CREDENTIALS = {
  email: 'website@pci.com',
  password: 'PCI_DSeTC@2025',
};

export interface UserData {
  email: string;
  isLoggedIn: boolean;
  [key: string]: string | boolean | number; // Add index signature to make it compatible with JWTPayload
}

export async function login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
  // Validate credentials (simplified for demo purposes)
  if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
    const token = await createToken({ email, isLoggedIn: true });
    
    // Set HttpOnly cookie that JavaScript can't access
    cookies().set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict',
    });
    
    return { success: true };
  }
  
  return { success: false, message: 'Invalid email or password' };
}

export async function logout() {
  cookies().delete(COOKIE_NAME);
}

export async function getUser(): Promise<UserData | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  
  if (!token) return null;
  
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload as unknown as UserData;
  } catch (error) {
    // Token is invalid or expired
    return null;
  }
}

export async function createToken(user: UserData): Promise<string> {
  return new SignJWT({ ...user }) // Spread the user object to ensure it's treated as a plain object
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

// Middleware function for protected routes
export async function requireAuth() {
  const user = await getUser();
  
  if (!user?.isLoggedIn) {
    redirect('/login');
  }
  
  return user;
}