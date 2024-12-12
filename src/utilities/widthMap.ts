// Define practical width presets
const baseWidthMap = {
  25: 'sm:max-w-[calc(25%-1rem)]', // Quarter width
  33: 'sm:max-w-[calc(33.333%-1rem)]', // Third width
  50: 'sm:max-w-[calc(50%-1rem)]', // Half width
  66: 'sm:max-w-[calc(66.666%-1rem)]', // Two thirds width
  75: 'sm:max-w-[calc(75%-1rem)]', // Three quarters width
  100: 'sm:max-w-[calc(100%-1rem)]', // Full width
} as const

// Helper function to find the closest preset width
const getClosestWidth = (width: number) => {
  const presets = Object.keys(baseWidthMap).map(Number)
  return presets.reduce((prev, curr) =>
    Math.abs(curr - width) < Math.abs(prev - width) ? curr : prev,
  )
}

// Export a function that snaps to the nearest preset
export const getWidth = (width: number | undefined) => {
  if (!width) return undefined
  const closestWidth = getClosestWidth(width)
  return baseWidthMap[closestWidth as keyof typeof baseWidthMap]
}

export type WidthKey = number | undefined
