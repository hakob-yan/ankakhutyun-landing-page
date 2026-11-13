/**
 * Contact details and social profiles — the single place to change them.
 * Import from '@/data/contacts' wherever an email, phone or social link is shown.
 */
import { siFacebook, siInstagram, siYoutube } from 'simple-icons';

export const EMAIL = 'ankaxutyanserund20@gmail.com';
export const PHONE = '+374 62 72 22';
export const INSTAGRAM_HANDLE = 'ankakhutyan_serund';
export const YOUTUBE_HANDLE = '@ankakhpodcast';
export const FACEBOOK_HANDLE = 'ankakhutyanserundspi';

/** Ready-to-use hrefs */
export const EMAIL_HREF = `mailto:${EMAIL}`;
export const PHONE_HREF = `tel:${PHONE.replace(/\s/g, '')}`;
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
export const YOUTUBE_URL = `https://www.youtube.com/${YOUTUBE_HANDLE}`;
export const FACEBOOK_URL = `https://www.facebook.com/${FACEBOOK_HANDLE}`;

export type SocialLink = { label: string; href: string; handle: string; /** SVG path, 24×24 viewBox (Simple Icons) */ icon: string };

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Facebook', href: FACEBOOK_URL, handle: FACEBOOK_HANDLE, icon: siFacebook.path },
  { label: 'Instagram', href: INSTAGRAM_URL, handle: `@${INSTAGRAM_HANDLE}`, icon: siInstagram.path },
  { label: 'YouTube', href: YOUTUBE_URL, handle: YOUTUBE_HANDLE, icon: siYoutube.path },
];
