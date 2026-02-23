import { SignJWT, jwtVerify } from 'jose';

// Encoded the secret for work with jose
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

/**
 * Creation of tokens
 */
export const signToken = async (payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // The token lives for 7 days
    .sign(SECRET);
};

/**
 * Token validation
 */
export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (error) {
     console.error('Login error:', error);  // const router = useRouter();
    throw new Error('Invalid or expired token');
  }
};