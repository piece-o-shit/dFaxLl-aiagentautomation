import { StringTool } from '../string'

export namespace UtilityTool {
  export function sleep(milliseconds: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, milliseconds)
    })
  }

  export function isNull(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value === '')
    )
  }

  export function isDefined(value: any): boolean {
    const isEmptyString = typeof value === 'string' && value === ''
    return value !== null && value !== undefined && !isEmptyString
  }

  export function isEmpty<Type>(value: Type | Type[]): boolean {
    if (!isDefined(value)) {
      return true
    }

    const isArray = Array.isArray(value)

    if (isArray) {
      return value.length === 0
    }

    const isString = typeof value === 'string'

    if (isString) {
      return value.trim() !== ''
    }

    const isFile = value instanceof File

    if (isFile) {
      return value.size === 0
    }

    const isObject = typeof value === 'object'

    if (isObject) {
      return Object.entries(value).length === 0
    }

    return false
  }

  export function isEqualDeep(object1: any, object2: any) {
    if (object1 === object2) {
      return true
    }

    if (
      typeof object1 !== 'object' ||
      object1 === null ||
      typeof object2 !== 'object' ||
      object2 === null
    ) {
      return false
    }

    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)

    if (keys1.length !== keys2.length) {
      return false
    }

    for (const key of keys1) {
      if (!keys2.includes(key)) {
        return false
      }

      if (!isEqualDeep(object1[key], object2[key])) {
        return false
      }
    }

    return true
  }

  export function isEqualArrayDeep(
    arr1: Array<any>,
    arr2: Array<any>,
  ): boolean {
    if (arr1.length !== arr2.length) return false

    return arr1.every((item, index) => isEqualDeep(item, arr2[index]))
  }

  export function findOrFail<Type>(
    items: Type[],
    values: Partial<Type>,
  ): Type | never
  export function findOrFail<Type>(
    items: Record<string, Type>,
    values: Partial<Type>,
  ): Type | never
  export function findOrFail<Type>(
    items: Type[] | Record<string, Type>,
    values: Partial<Type>,
  ): Type | never {
    let itemFound: Type | undefined

    if (Array.isArray(items)) {
      // Handle array of items
      itemFound = items.find(item =>
        Object.keys(values).every(key => item[key] === values[key]),
      )
    } else {
      // Handle record of items
      const entries = Object.values(items)

      itemFound = entries.find(item =>
        Object.keys(values).every(key => item[key] === values[key]),
      )
    }

    if (!itemFound) {
      throw new Error(
        `Could not find item with specified criteria ${StringTool.stringify(
          values,
        )}`,
      )
    }

    return itemFound
  }

  export function findIndexOrFail<Type>(
    items: Type[],
    values: Partial<Type>,
  ): number | never
  export function findIndexOrFail<Type>(
    items: Record<string, Type>,
    values: Partial<Type>,
  ): number | never
  export function findIndexOrFail<Type>(
    items: Type[] | Record<string, Type>,
    values: Partial<Type>,
  ): number | never {
    let itemFound: number | undefined

    if (Array.isArray(items)) {
      // Handle array of items
      itemFound = items.findIndex(item =>
        Object.keys(values).every(key => item[key] === values[key]),
      )
    } else {
      // Handle record of items
      const entries = Object.values(items)

      itemFound = entries.findIndex(item =>
        Object.keys(values).every(key => item[key] === values[key]),
      )
    }

    if (isNull(itemFound) || itemFound === -1) {
      throw new Error(
        `Could not find index item with specified criteria ${StringTool.stringify(
          values,
        )}`,
      )
    }

    return itemFound
  }

  export function sortByString<Type>(items: Type[], key: keyof Type): Type[] {
    return items.sort((a: Type, b: Type) =>
      (a[key] as string).localeCompare(b[key] as string),
    )
  }

  export function sortByDate<Type>(
    items: Type[],
    key: keyof Type,
    order: 'ASC' | 'DESC' = 'ASC',
  ) {
    if (order === 'DESC') {
      return items.sort(
        (a, b) =>
          new Date(b[key] as unknown as string).getTime() -
          new Date(a[key] as unknown as string).getTime(),
      )
    } else {
      return items.sort(
        (a, b) =>
          new Date(a[key] as unknown as string).getTime() -
          new Date(b[key] as unknown as string).getTime(),
      )
    }
  }

  export function sortByNumber<Type>(
    items: Type[],
    key: keyof Type,
    order: 'ASC' | 'DESC' = 'ASC',
  ): Type[] {
    if (order === 'DESC') {
      return items.sort(
        (a: Type, b: Type) =>
          ((b[key] as number) ?? 0) - ((a[key] as number) ?? 0),
      )
    } else {
      return items.sort(
        (a: Type, b: Type) =>
          ((a[key] as number) ?? 0) - ((b[key] as number) ?? 0),
      )
    }
  }

  export function removeItemByKey<T>(array: T[], key: string, item: T): T[] {
    return [...array.filter(x => x[key] !== item[key])]
  }

  export function debounce<FunctionType extends (...args: any[]) => void>(
    func: FunctionType,
    delay: number,
  ): FunctionType {
    let timeoutId: ReturnType<typeof setTimeout>

    return function (...args: Parameters<FunctionType>) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        func(...args)
      }, delay)
    } as FunctionType
  }

  export function makeUnique<Type>(items: Type[], key?: keyof Type): Type[] {
    if (key) {
      return makeUniqueByKey(items, key)
    }

    const uniqueSet = new Set(items)
    return Array.from(uniqueSet)
  }

  function makeUniqueByKey<Type>(items: Type[], key: keyof Type): Type[] {
    return items.reduce((itemPrevious, itemCurrent) => {
      if (!itemPrevious.find(item => item[key] === itemCurrent[key])) {
        itemPrevious.push(itemCurrent)
      }
      return itemPrevious
    }, [])
  }

  export function filterByPattern(items: string[], pattern: string): string[] {
    if (isEmpty(items)) {
      return []
    }

    return items.filter(item => isPattern(pattern, item))
  }

  export function isPattern(pattern: string, key: string): boolean {
    const items = pattern.split('*')

    const keyStart = items[0] ?? ''
    const keyEnds = items.slice(-1)[0] ?? ''
    const keyMotifs = items.slice(1, -1)

    if (!key.startsWith(keyStart)) {
      return false
    }

    if (!key.endsWith(keyEnds)) {
      return false
    }

    let itemAnalyzed = key

    for (const keyMotif of keyMotifs) {
      if (!itemAnalyzed.includes(keyMotif)) {
        return false
      }

      itemAnalyzed = itemAnalyzed.split(keyMotif).slice(1).join(keyMotif)
    }

    return true
  }

  export function groupBy<Type>(
    items: Type[],
    key: keyof Type,
  ): Record<string, Type[]> {
    return items.reduce((store, item) => {
      const value = item[key] as string | number

      if (!store[value]) {
        store[value] = []
      }

      store[value].push(item)

      return store
    }, {} as Record<string, Type[]>)
  }

  export const batch = async (
    promiseBuilders: (() => Promise<any>)[],
    batchSize: number = 100,
    beforeBatch?: (
      countBatches: number,
      countItems: number,
      index: number,
    ) => any,
    afterBatch?: (
      countBatches: number,
      countItems: number,
      index: number,
    ) => any,
  ) => {
    const results: any[] = []

    const countBatches = Math.ceil(promiseBuilders.length / batchSize)

    for (let index = 0; index < promiseBuilders.length; index += batchSize) {
      const batch = promiseBuilders
        .slice(index, index + batchSize)
        .map(builder => builder())

      const countItems = batch.length
      const batchIndex = index / batchSize

      if (beforeBatch) {
        await beforeBatch(countBatches, countItems, batchIndex)
      }

      try {
        const batchResults = await Promise.all(batch)
        results.push(...batchResults)
      } finally {
        if (afterBatch) {
          await afterBatch(countBatches, countItems, batchIndex)
        }
      }
    }

    return results
  }
}
