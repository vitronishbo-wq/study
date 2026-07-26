import React from 'react';
import { ExternalLink, Briefcase } from 'lucide-react';

export interface JobExpressLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Source context identifying where the click originated (e.g. 'footer', 'support_section', 'home_portal_banner')
   */
  source?: string;
  /**
   * Campaign name for analytics tracking
   */
  campaign?: string;
  /**
   * Custom utm_source for analytics (defaults to 'preparatorio')
   */
  utmSource?: string;
  /**
   * Optional custom CSS class names (if not provided, uses an institutional, discrete default)
   */
  className?: string;
  /**
   * Link content (defaults to institutional JobExpress partner text)
   */
  children?: React.ReactNode;
  /**
   * Whether to show a discrete external link icon (default: true)
   */
  showIcon?: boolean;
}

/**
 * Helper to construct a JobExpress URL with analytics tracking parameters.
 * Uses import.meta.env.JOBEXPRESS_URL or import.meta.env.VITE_JOBEXPRESS_URL.
 */
export const getJobExpressUrl = (
  source: string = 'preparatorio_footer',
  campaign: string = 'academia_referral',
  utmSource: string = 'preparatorio'
): string => {
  const baseUrl =
    import.meta.env.JOBEXPRESS_URL ||
    import.meta.env.VITE_JOBEXPRESS_URL ||
    'https://jobexpress-angola-s12y.onrender.com';

  try {
    const url = new URL(baseUrl);
    url.searchParams.set('utm_source', utmSource);
    url.searchParams.set('utm_medium', 'referral');
    url.searchParams.set('utm_campaign', campaign);
    url.searchParams.set('ref_source', source);
    return url.toString();
  } catch {
    const connector = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${connector}utm_source=${utmSource}&utm_medium=referral&utm_campaign=${campaign}&ref_source=${source}`;
  }
};

/**
 * Reusable JobExpressLink component for external Vitronis / JobExpress ecosystem redirection.
 * Features an institutional, discrete design tailored for footers, support cards, and sidebars.
 * Ensures open-in-new-tab behavior (target='_blank' rel='noopener noreferrer') and logs engagement analytics.
 */
export const JobExpressLink: React.FC<JobExpressLinkProps> = ({
  source = 'preparatorio_footer',
  campaign = 'academia_referral',
  utmSource = 'preparatorio',
  children,
  className,
  showIcon = true,
  onClick,
  ...props
}) => {
  const targetUrl = getJobExpressUrl(source, campaign, utmSource);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      const existing = JSON.parse(localStorage.getItem('jobexpress_engagement_analytics') || '[]');
      existing.push({
        event: 'jobexpress_partner_click',
        source,
        campaign,
        utmSource,
        url: targetUrl,
        timestamp: Date.now(),
        dateISO: new Date().toISOString()
      });
      localStorage.setItem('jobexpress_engagement_analytics', JSON.stringify(existing.slice(-100)));
    } catch {
      // Ignore localStorage errors
    }

    if (onClick) {
      onClick(e);
    }
  };

  const defaultClasses =
    'inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-amber-500 dark:text-neutral-400 dark:hover:text-amber-400 font-medium transition-colors cursor-pointer group';

  const defaultContent = (
    <>
      <Briefcase className="w-3.5 h-3.5 text-amber-500/80 group-hover:text-amber-500 transition-colors" />
      <span>Oportunidades no JobExpress Angola</span>
      {showIcon && <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity ml-0.5" />}
    </>
  );

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className || defaultClasses}
      {...props}
    >
      {children || defaultContent}
    </a>
  );
};

