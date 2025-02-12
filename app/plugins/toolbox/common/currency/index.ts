export namespace CurrencyTool {
  export function toHuman(amount: number, currency?: string): string {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }
}
