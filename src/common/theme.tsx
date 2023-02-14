import { createTheme } from '@mui/material/styles';
import {red, blueGrey} from '@mui/material/colors';
import "@fontsource/noto-sans-jp"; 

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      "Noto Sans JP",
      "Lato",
      "游ゴシック Medium",
      "游ゴシック体",
      "Yu Gothic Medium",
      "YuGothic",
      "ヒラギノ角ゴ ProN",
      "Hiragino Kaku Gothic ProN",
      "メイリオ",
      "Meiryo",
      "ＭＳ Ｐゴシック",
      "MS PGothic",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      main: '#ffffff',
      dark: '#e0e0e0',
    },
    secondary: {
      main: blueGrey[300],
    },
    info: {
      main: '#1e88e5',
    },
    text: {
      primary: '#616161',
      secondary: '#9e9e9e',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
