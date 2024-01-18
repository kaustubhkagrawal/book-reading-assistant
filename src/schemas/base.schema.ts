import camelcaseKeys from 'camelcase-keys'
import { CamelCasedPropertiesDeep } from 'type-fest' // need CamelCasedPropertiesDeep because of https://github.com/sindresorhus/camelcase-keys/issues/77#issuecomment-1339844470
import { ZodEffects, z } from 'zod'

export const zodToCamelCase = <T extends z.ZodTypeAny>(
  zod: T,
): ZodEffects<z.ZodTypeAny, CamelCasedPropertiesDeep<T['_output']>> =>
  zod.transform((val) => camelcaseKeys(val) as CamelCasedPropertiesDeep<T>)
