import React, { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { COLORS } from "../../../utils/constants";
import { getTheme } from "../../../utils/storage";

export const ThemeContext = React.createContext({
    isDark: true,
    setIsDark: (isDark: boolean) => { }
})

const YumlyThemeProvider: React.FC = ({ children }) => {
    const themeMode = getTheme();
    const [isDark, setIsDark] = useState(themeMode === "dark");

    if (isDark) {
        document.body.classList.add('Dark')
    } else {
        document.body.classList.remove('Dark')
    }

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: themeMode,
                primary: {
                    main: COLORS.yellow,
                },
                secondary: {
                    main: COLORS.light_red,
                    light: COLORS.skin,
                    dark: COLORS.cyan,
                },
            }

        })
    }, [themeMode])

    console.log("Rendering: ", { isDark })

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}

export default YumlyThemeProvider