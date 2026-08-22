export type ContentSource =
  'masterprompt' | 'legacy-current' | 'git-history' | 'missing';

export interface SourcedContent {
  readonly source: ContentSource;
  readonly sourceReference: string;
}

export interface Service extends SourcedContent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface Qualification extends SourcedContent {
  readonly id: string;
  readonly title: string;
}

export interface Region {
  readonly name: string;
  readonly schemaType: 'AdministrativeArea' | 'City';
  readonly priority: 'primary' | 'secondary';
}

export interface NavigationItem {
  readonly label: string;
  readonly href: string;
}
