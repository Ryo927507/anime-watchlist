export const ANIME_STATUSES = ['Geschaut', 'Begonnen', 'Abgebrochen', 'Aktueller Stand', 'Geplant'] as const;

export type AnimeStatus = (typeof ANIME_STATUSES)[number];

export const DEFAULT_ANIME_STATUS: AnimeStatus = 'Aktueller Stand';

export const ANIME_STATUS_OPTIONS: ReadonlyArray<{
  value: AnimeStatus;
  icon: string;
  className: string;
}> = [
  { value: 'Geschaut', icon: 'check_circle', className: 'watched' },
  { value: 'Begonnen', icon: 'play_circle', className: 'started' },
  { value: 'Abgebrochen', icon: 'cancel', className: 'dropped' },
  { value: 'Aktueller Stand', icon: 'pending_actions', className: 'current' },
  { value: 'Geplant', icon: 'event', className: 'planned' },
];

export function normalizeAnimeStatus(status: string): AnimeStatus {
  if (ANIME_STATUSES.includes(status as AnimeStatus)) {
    return status as AnimeStatus;
  }

  return DEFAULT_ANIME_STATUS;
}
