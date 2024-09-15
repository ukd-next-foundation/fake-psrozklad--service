import crypto from 'node:crypto';

import { ClearedPSRozkladItem, PSRozkladItem, Tree } from './psrozklad-interfaces.js';

function hashValue(value: string, encoding: crypto.BinaryToTextEncoding = 'base64url') {
  return crypto.createHash('sha256').update(value).digest(encoding);
}

export class PSRozkladHandlers {
  static sort(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj
        .map(PSRozkladHandlers.sort)
        .map((obj) => JSON.stringify(obj))
        .sort()
        .map((obj) => JSON.parse(obj));
    }

    return Object.fromEntries(
      Object.keys(obj)
        .sort()
        .map((key) => [key, PSRozkladHandlers.sort(obj[key])]),
    );
  }

  static flatTree(tree: Tree) {
    return Object.values(tree)
      .map((obj) => Object.values(obj).map((obj) => Object.values(obj)))
      .flat(3);
  }

  static clearItems(items: Array<PSRozkladItem>): ClearedPSRozkladItem[] {
    return items.map((item) => {
      const { object, date, ...data } = item;

      return {
        ...data,
        groups: [object],
        date: date.split('.').reverse().join('-'),
      };
    });
  }

  static toTree(items: ClearedPSRozkladItem[]) {
    const tree: Tree = {};

    for (const item of items) {
      const rooms = tree[item.date] ?? (tree[item.date] = {});
      const times = rooms[item.room] ?? (rooms[item.room] = {});
      const groups = times[item.lesson_time] ?? (times[item.lesson_time] = []);

      if (!groups.length) {
        groups.push(item);
        continue;
      }

      const blockKeys = ['groups', 'group', 'lesson_number'];
      const itemKeys = Object.keys(item).filter((key) => !blockKeys.includes(key));
      const groupNames = item.groups;
      const newGroups = [];

      groups.forEach((group) => {
        const isDifferent = itemKeys.some((key) => group[key] !== item[key]);

        if (isDifferent) {
          newGroups.push(group);
        } else {
          groupNames.push(...group['groups']);
        }
      });

      newGroups.push({ ...item, groups: Array.from(new Set(groupNames)) });
      times[item.lesson_time] = newGroups;
    }

    return tree;
  }

  static compare(first: object, second: object) {
    const jsonHash = (obj: any) => hashValue(JSON.stringify(obj));
    const tree = {};

    Object.keys(second)
      .filter((key) => !Object.keys(first).includes(key))
      .forEach((newKey) => (tree[newKey] = second[newKey]));

    const sharedKeys = Object.keys(second).filter((key) => Object.keys(first).includes(key));

    for (const sharedKey of sharedKeys) {
      if (jsonHash(first[sharedKey]) !== jsonHash(second[sharedKey])) {
        tree[sharedKey] = Array.isArray(second[sharedKey])
          ? second[sharedKey]
          : PSRozkladHandlers.compare(first[sharedKey], second[sharedKey]);
      }
    }

    return tree;
  }
}
