export interface PSRozkladExport {
  roz_items: PSRozkladItem[];
  code: string;
}

export interface PSRozkladItem {
  object: string;
  date: string;
  comment: string;
  lesson_number: string;
  lesson_name: string;
  lesson_time: string;
  half: string;
  teacher: string;
  teachers_add: string;
  room: string;
  group: string;
  title: string;
  type: string;
  replacement: string;
  reservation: string;
  online: string;
  comment4link: string;
  link: string;
}

export interface ClearedPSRozkladItem extends Omit<PSRozkladItem, 'object'> {
  groups: string[];
}

export interface Tree {
  [key: string]: {
    [key: string]: {
      [key: string]: ClearedPSRozkladItem[];
    };
  };
}
