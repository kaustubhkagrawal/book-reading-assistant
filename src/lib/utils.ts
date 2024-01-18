import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFilenameFromUrl(url: string): string {
  // Use the URL constructor to parse the URL
  let urlObject = new URL(url)

  // Get the pathname from the URL
  let pathname: string = urlObject.pathname

  // Use the last part of the pathname as the filename
  let filenameWithExtension: string = pathname.substring(
    pathname.lastIndexOf('/') + 1,
  )

  // Remove the extension
  let filenameWithoutExtension: string = filenameWithExtension
    .split('.')
    .slice(0, -1)
    .join('.')

  return filenameWithoutExtension
}
