export enum SemVerTypes {
  MAJOR,
  MINOR,
  PATCH,
}

export interface SemVer {
  major: number | string;
  minor: number | string;
  patch: number | string;
}

export default (version: SemVerTypes, appVersion: string, cacheVersion: string): boolean => {
  const app: SemVer = { major: 0, minor: 0, patch: 0 };
  [app.major, app.minor, app.patch] = appVersion.split('.');
  const cache: SemVer = { major: 0, minor: 0, patch: 0 };
  [cache.major, cache.minor, cache.patch] = cacheVersion.split('.');

  if (app.major !== cache.major) return true;
  if ((version === SemVerTypes.MINOR || version === SemVerTypes.PATCH)
    && app.minor !== cache.minor) return true;
  if (version === SemVerTypes.PATCH && app.patch !== cache.patch) return true;

  return false;
};
