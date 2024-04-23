const theme = {
  COLORS: {
    LIGHT_100: "#FFFFFF",
    LIGHT_200: "#FFFAF1",
    LIGHT_300: "#E1E1E6",
    LIGHT_400: "#C4C4CC",
    LIGHT_500: "#7C7C8A",
    LIGHT_600: "#76797B",
    LIGHT_700: "#4D585E",

    DARK_100: "#000405",
    DARK_200: "#00070A",
    DARK_300: "#000204",
    DARK_400: "#000A0F",
    DARK_500: "#000C12",
    DARK_600: "#00111A",
    DARK_700: "#001119",
    DARK_800: "#0D161B",
    DARK_900: "#0D1D25",
    DARK_1000: "#192227",

    TOMATO_100: "#750310",
    TOMATO_200: "#92000E",
    TOMATO_300: "#AB222E",
    TOMATO_400: "#AB4D55",

    CAKE_100: "#065E7C",
    CAKE_200: "#82F3FF",

    MINT_100: "#04D361",

    CARROT_100: "#FBA94C"
  },
  FONTS: {
    Poppins_100_medium: {
      fontFamily: "Poppins",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "24px",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Poppins_200_medium: {
      fontFamily: "Poppins",
      fontWeight: "normal",
      fontSize: "20px",
      lineHeight: "160%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Poppins_300_bold: {
      fontFamily: "Poppins",
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "140%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Poppins_300_normal: {
      fontFamily: "Poppins",
      fontWeight: "normal",
      fontSize: "24px",
      lineHeight: "140%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Poppins_400_medium: {
      fontFamily: "Poppins",
      fontWeight: "normal",
      fontSize: "32px",
      lineHeight: "140%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Poppins_500_medium: {
      fontFamily: "Poppins",
      fontWeight: "normal",
      fontSize: "40px",
      lineHeight: "140%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Roboto_Smallest_normal: {
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontSize: "12px",
      lineHeight: "160%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Roboto_Smaller_normal: {
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "160%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Roboto_Smaller_bold: {
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "160%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Roboto_Small_spaced: {
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "160%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Roboto_Small_normal: {
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "100%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Roboto_Big_bold: {
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: "20px",
      lineHeight: "160%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Roboto_Bigger_bold: {
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: "24px",
      lineHeight: "Auto",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Roboto_Biggest_normal: {
      fontFamily: "Roboto",
      fontWeight: "normal",
      fontSize: "32px",
      lineHeight: "160%",
      letterSpacing: "0",
      textDecoration: "none"
    },
    Roboto_Giant_bold: {
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: "42px",
      lineHeight: "Auto",
      letterSpacing: "0",
      textDecoration: "none"
    }
  },

  getFontStyle: (fontName) => {
    return theme.FONTS[fontName] || {};
  },
  getColorStyle: (colorName) => {
    return theme.COLORS[colorName] || {};
  }
};

export default theme;
