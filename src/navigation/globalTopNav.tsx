import React from 'react';

import type { TopNavAction, TopNavItem, TopNavUtilityButton } from '../blocks/molecules/GlobalTopNav.block';

export type GlobalTopNavKey = 'home' | 'projects' | 'library';

export const globalTopNavBrandIcon = (
  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
    <rect x="2.5" y="2.5" width="6.5" height="6.5" rx="1.2" />
    <rect x="11" y="2.5" width="6.5" height="6.5" rx="1.2" />
    <rect x="2.5" y="11" width="6.5" height="6.5" rx="1.2" />
    <rect x="11" y="11" width="6.5" height="6.5" rx="1.2" />
  </svg>
);

export const globalTopNavActions: TopNavAction[] = [
  {
    key: 'notifications',
    label: 'Notifications',
    hasPopup: true,
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 3.5a4.8 4.8 0 0 0-4.8 4.8v2.2L4 12.8h12l-1.2-2.3V8.3A4.8 4.8 0 0 0 10 3.5Z" />
        <path d="M8.3 14.6a1.7 1.7 0 0 0 3.4 0" />
      </svg>
    ),
    popupContent: (
      <div className="text-sm">
        <p className="font-semibold text-slate-900">Notifications</p>
        <p className="mt-1 text-slate-600">No new notifications right now.</p>
      </div>
    ),
  },
  {
    key: 'settings',
    label: 'Settings',
    hasPopup: true,
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="10" r="2.7" />
        <path d="M10 2.8v1.9M10 15.3v1.9M2.8 10h1.9M15.3 10h1.9M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4" />
      </svg>
    ),
    popupContent: (
      <div className="text-sm">
        <p className="font-semibold text-slate-900">Settings</p>
        <p className="mt-1 text-slate-600">Theme, language, and preference controls.</p>
      </div>
    ),
  },
  {
    key: 'announcements',
    label: 'Announcements',
    hasPopup: true,
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 10.8V8.7c0-.5.4-.9.9-.9h1.6l5.3-2.9a1 1 0 0 1 1.5.9v8.4a1 1 0 0 1-1.5.9l-5.3-2.9H4.4a.9.9 0 0 1-.9-.9Z" />
        <path d="M13.7 7.2c1 .5 1.6 1.6 1.6 2.8s-.6 2.3-1.6 2.8" />
        <path d="M6 12.1 7 15a.9.9 0 0 0 .8.6h.8" />
      </svg>
    ),
    popupContent: (
      <div className="text-sm">
        <p className="font-semibold text-slate-900">Announcements</p>
        <p className="mt-1 text-slate-600">Product notices and release updates.</p>
      </div>
    ),
  },
];

export function createGlobalTopNavItems(activeKey: GlobalTopNavKey, onNavigate: (path: string) => void): TopNavItem[] {
  const defs: Array<{ key: GlobalTopNavKey; label: string; path: string }> = [
    { key: 'home', label: 'Home', path: '/home' },
    { key: 'projects', label: 'Projects', path: '/projects' },
    { key: 'library', label: 'Library', path: '/library' },
  ];

  return defs.map((item) => ({
    key: item.key,
    label: item.label,
    active: item.key === activeKey,
    onClick: () => onNavigate(item.path),
  }));
}

export function createTemporaryTopUtilityButtons(
  onDescriptionClick: () => void,
  onLogoutClick: () => void,
): TopNavUtilityButton[] {
  return [
    { key: 'description-temp', label: 'Description (Temp)', onClick: onDescriptionClick },
    { key: 'logout-temp', label: 'Logout (Temp)', onClick: onLogoutClick },
  ];
}
