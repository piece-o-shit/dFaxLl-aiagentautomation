export namespace ClipboardTool {
  export async function copy(text: string): Promise<void> {
    await navigator.clipboard.writeText(text)
  }
}
