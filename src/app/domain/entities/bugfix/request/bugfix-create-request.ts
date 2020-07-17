export interface BugfixCreateRequest {
  ticket: string;
  name: string;
  bugPrefixUrl?: string;
  fixPrefixUrl?: string;
}
