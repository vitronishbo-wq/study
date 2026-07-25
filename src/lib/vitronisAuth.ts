/**
 * Vitronis Ecosystem VIAS 1.0 Client Authentication Config & SSO Helper
 * 
 * Preparatório Oficial MININT acts as a Client Application within the Vitronis Ecosystem.
 * User authentication and account creation are delegated to JobExpress Angola / Vitronis Accounts (SSO).
 * All custom or internal local authentication forms are removed in favor of JobExpress SSO redirect.
 */

export interface VitronisUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  provider?: string;
}

export const JOBEXPRESS_URL = import.meta.env.VITE_JOBEXPRESS_URL || import.meta.env.JOBEXPRESS_URL || 'https://jobexpress-angola.onrender.com';

export const VITRONIS_CONFIG = {
  appName: import.meta.env.VITE_APP_NAME || 'Academia das Carreiras Públicas',
  appEnv: import.meta.env.VITE_APP_ENV || 'production',
  defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'pt-AO',
  country: import.meta.env.VITE_COUNTRY || 'AO',
  timezone: import.meta.env.VITE_TIMEZONE || 'Africa/Luanda',

  // Vitronis Platform & JobExpress SSO Endpoints
  platform: import.meta.env.VITE_VITRONIS_PLATFORM || 'vitronis',
  web: import.meta.env.VITE_VITRONIS_WEB || 'https://www.vitronis.co.ao',
  api: import.meta.env.VITE_VITRONIS_API || 'https://api.vitronis.co.ao',
  ssoDomain: import.meta.env.VITE_VITRONIS_SSO_DOMAIN || 'https://accounts.vitronis.co.ao',
  jobExpressUrl: import.meta.env.VITE_JOBEXPRESS_URL || 'https://jobexpress-angola.onrender.com',
  jwtIssuer: import.meta.env.VITE_VITRONIS_JWT_ISSUER || 'accounts.vitronis.co.ao',
  jwtAudience: import.meta.env.VITE_VITRONIS_JWT_AUDIENCE || 'vitronis-platform',
  returnAfterLogin: import.meta.env.VITE_RETURN_AFTER_LOGIN || 'https://academia-carreiras-publicas.vitronis.co.ao',
};

const TOKEN_STORAGE_KEY = 'vitronis_jwt_token';
const USER_CACHE_KEY = 'vitronis_user_profile';

/**
 * Decode JWT token client-side safely without crashing if malformed
 */
export function decodeVitronisJWT(token: string): VitronisUser | null {
  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      return {
        id: payload.sub || payload.id || 'jobexpress-user',
        name: payload.name || payload.full_name || payload.username || 'Candidato ao Estado',
        email: payload.email || 'candidato@vitronis.co.ao',
        avatar: payload.avatar || payload.picture,
        role: payload.role || 'Candidato a Carreira Pública',
        provider: 'JobExpress Angola'
      };
    }
  } catch (err) {
    console.warn('[Vitronis Auth] Token decoding warning:', err);
  }

  // Fallback if token is opaque string
  return {
    id: 'je-user-session',
    name: 'Candidato ao Estado',
    email: 'candidato@vitronis.co.ao',
    role: 'Candidato Verificado (JobExpress)',
    provider: 'JobExpress Angola'
  };
}

/**
 * Get stored JWT token from local storage or URL query parameter
 */
export function getVitronisToken(): string | null {
  if (typeof window === 'undefined') return null;

  // Check URL parameters for token returned after SSO redirect
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get('token') || params.get('jwt') || params.get('access_token');
  
  if (tokenFromUrl) {
    localStorage.setItem(TOKEN_STORAGE_KEY, tokenFromUrl);
    
    // Cache decoded user profile
    const user = decodeVitronisJWT(tokenFromUrl);
    if (user) {
      localStorage.setItem(USER_CACHE_KEY, JSON.stringify(user));
    }

    // Clean token query param from URL bar cleanly without refreshing
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    url.searchParams.delete('jwt');
    url.searchParams.delete('access_token');
    window.history.replaceState({}, '', url.pathname + (url.search ? url.search : '') + url.hash);
    return tokenFromUrl;
  }

  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

/**
 * Get cached user profile
 */
export function getVitronisUser(): VitronisUser | null {
  const token = getVitronisToken();
  if (!token) return null;

  try {
    const cached = localStorage.getItem(USER_CACHE_KEY);
    if (cached) return JSON.parse(cached);
  } catch (e) {
    // Ignore cache parse error
  }

  const decoded = decodeVitronisJWT(token);
  if (decoded) {
    localStorage.setItem(USER_CACHE_KEY, JSON.stringify(decoded));
  }
  return decoded;
}

/**
 * Redirect user to JobExpress / Vitronis Accounts SSO login
 */
export function redirectToVitronisSSO(targetReturnPath?: string) {
  if (typeof window === 'undefined') return;

  const returnBase = VITRONIS_CONFIG.returnAfterLogin || window.location.origin;
  const currentPath = targetReturnPath || window.location.pathname + window.location.search;
  const fullReturnUrl = encodeURIComponent(`${returnBase.replace(/\/$/, '')}${currentPath}`);

  // Endpoint de autenticação externalizado para JobExpress Angola
  const baseSsoUrl = VITRONIS_CONFIG.jobExpressUrl || VITRONIS_CONFIG.ssoDomain;
  const loginEndpoint = `${baseSsoUrl.replace(/\/$/, '')}/login?return_to=${fullReturnUrl}&client_id=academia-carreiras-publicas`;

  window.location.href = loginEndpoint;
}

/**
 * Logout current Vitronis session locally
 */
export function logoutVitronis() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_CACHE_KEY);
  }
}
