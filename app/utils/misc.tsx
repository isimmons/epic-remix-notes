import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A handy utility that makes constructing class names easier.
 * It also merges tailwind classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Provide a condition and if that condition is falsey, this throws a 400
 * Response with the given message.
 *
 * inspired by invariant from 'tiny-invariant'
 *
 * @example
 * invariantResponse(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw
 * @param responseInit Additional response init options if a response is thrown
 *
 * @throws {Response} if condition is falsey
 */
export function invariantResponse(
  condition: unknown,
  message?: string | (() => string),
  responseInit?: ResponseInit,
): asserts condition {
  if (!condition) {
    throw new Response(
      typeof message === 'function'
        ? message()
        : message ||
          'An invariant failed, please provide a message to explain why.',
      { status: 400, ...responseInit },
    );
  }
}

/**
 * Check a value to see if it is not undefined or null
 *
 * @param value The value to check
 *
 * @example
 * assertDefined(foo)
 *
 * @throws {Response} if the value is undefined or null
 */
export function assertDefined<Value>(
  value: Value | null | undefined,
): asserts value is Value {
  if (value === undefined || value === null) {
    throw new Response('Not found', { status: 404 });
  }
}
