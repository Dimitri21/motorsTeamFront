
import { createMuiTheme } from '@material-ui/core/styles';
import {red, green} from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[900],
    },
    secondary: {
      main: green[500],
    },
  },
});