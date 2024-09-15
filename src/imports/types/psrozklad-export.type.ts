export type PsrozkladExportType<K extends string, T> = {
  [P in K]: T[];
} & {
  code: string;
};
