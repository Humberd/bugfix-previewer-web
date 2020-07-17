import { BugfixView } from '../../../domain/entities/bugfix/view/bugfix-view';

export interface BugfixModificationDialogData {
  bugfixView?: BugfixView;
  sprintId?: string;
}
