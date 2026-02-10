import { createContext, useContext, useMemo, useState } from 'react'
import { useColorScheme } from 'react-native'

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextType {
  mode: ThemeMode
  resolvedTheme: 'light' | 'dark'
  isDark: boolean
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  resolvedTheme: 'dark',
  isDark: true,
  setMode: () => {},
  toggle: () => {},
})

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme()
  const [mode, setMode] = useState<ThemeMode>('system')

  const resolvedTheme: 'light' | 'dark' =
    mode === 'system' ? ((systemColorScheme ?? 'dark') as 'light' | 'dark') : mode

  const isDark = resolvedTheme === 'dark'

  const value = useMemo<ThemeContextType>(() => {
    return {
      mode,
      resolvedTheme,
      isDark,
      setMode,
      toggle: () => setMode(isDark ? 'light' : 'dark'),
    }
  }, [mode, resolvedTheme, isDark])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeMode() {
  return useContext(ThemeContext)
}


