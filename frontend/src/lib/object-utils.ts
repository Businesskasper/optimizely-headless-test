export const isObject = (obj: unknown): obj is object => {
  return !!obj && typeof obj === "object";
};

export const hasKey = <TKey extends string>(
  obj: object,
  key: TKey,
): obj is object & { [key in TKey]: unknown } => {
  return key in obj;
};

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isValueArray = (value: unknown): value is Array<unknown> => {
  return Array.isArray(value);
};

export const hasMember = <const T>(arr: Array<unknown>, member: T): boolean => {
  return arr.includes(member);
};

export const arrayStartsWith = <const T extends Array<string>>(
  arr: Array<unknown>,
  members: T,
): arr is [...T, ...any] => {
  return members.every((member, i) => arr[i] === member);
};
