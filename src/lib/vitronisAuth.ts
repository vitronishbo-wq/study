/**
 * Vitronis Ecosystem VIAS 1.0 Client Authentication Config & SSO Helper
 * 
 * Preparatório Oficial MININT acts as a Client Application within the Vitronis Ecosystem.
 * User authentication and account creation are delegated to Vitronis Accounts (SSO)
 * or temporarily via JobExpress Angola until accounts.vitronis.co.ao is live.
 */

export const VITRONIS_CONFIG = {
  appName: import.meta.env.VITE_APP_NAME || 'Preparatório Oficial MININT',
  appEnv: import.meta.env.VITE_APP_ENV || 'production',
  defaultLanguage: import.meta.env.VITE_DEFAULT_LANGUAGE || 'pt-AO',
  country: import.meta.env.VITE_COUNTRY || 'AO',
  timezone: import.meta.env.VITE_TIMEZONE || 'Africa/Luanda',

  // Vitronis Platform Endpoints
  platform: import.meta.env.VITE_VITRONIS_PLATFORM || 'vitronis',
  web: import.meta.env.VITE_VITRONIS_WEB || 'https://www.vitronis.co.ao',
  api: import.meta.env.VITE_VITRONIS_API || 'https://api.vitronis.co.ao',
  ssoDomain: import.meta.env.VITE_VITRONIS_SSO_DOMAIN || 'https://accounts.vitronis.co.ao',
  jobExpressUrl: import.meta.env.VITE_JOBEXPRESS_URL || 'https://jobexpress.vitronis.co.ao',
  jwtIssuer: import.meta.env.VITE_VITRONIS_JWT_ISSUER || 'accounts.vitronis.co.ao',
  jwtAudience: import.meta.env.VITE_VITRONIS_JWT_AUDIENCE || 'vitronis-platform',
  returnAfterLogin: import.meta.env.VITE_RETURN_AFTER_LOGIN || 'https://preparacao-oficial-minint-ckkm.onrender.com',
};

const TOKEN_STORAGE_KEY = 'vitronis_jwt_token';

/**
 * Get stored JWT token from local storage or URL query parameter
 */
export function getVitronisToken(): string | null {
  if (typeof window === 'undefined') return null;

  // Check URL parameters for token returned after SSO redirect
  const params = new URLSearchParams(window.location.search);
  const tokenFromUrl = params.get('token') || params.get('jwt');
  if (tokenFromUrl) {
    localStorage.setItem(TOKEN_STORAGE_KEY, tokenFromUrl);
    // Clean token from URL bar cleanly without refreshing
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    url.searchParams.delete('jwt');
    window.history.replaceState({}, '', url.toString());
    return tokenFromUrl;
  }

  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

/**
 * Redirect user to Vitronis Accounts SSO / JobExpress Angola login
 */
export function redirectToVitronisSSO(targetReturnPath?: string) {
  if (typeof window === 'undefined') return;

  const returnBase = VITRONIS_CONFIG.returnAfterLogin || window.location.origin;
  const currentPath = targetReturnPath || window.location.pathname + window.location.search;
  const fullReturnUrl = encodeURIComponent(`${returnBase.replace(/\/$/, '')}${currentPath}`);

  // Fallback check: if accounts.vitronis.co.ao is not active, use JobExpress login endpoint
  const baseSsoUrl = VITRONIS_CONFIG.ssoDomain || VITRONIS_CONFIG.jobExpressUrl;
  const loginEndpoint = `${baseSsoUrl.replace(/\/$/, '')}/login?return_to=${fullReturnUrl}&client_id=preparatorio-minint`;

  window.location.href = loginEndpoint;
}

/**
 * Logout current Vitronis session locally
 */
export function logoutVitronis() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
