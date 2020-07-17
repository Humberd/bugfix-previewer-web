export interface BugfixUpdateRequest {
  ticket: string;
  name: string;
  bugPrefixUrl?: string;
  fixPrefixUrl?: string;
}
