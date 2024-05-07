// import React,{FC} from 'react'
// import CircularProgress from '@mui/material/CircularProgress';
// interface Props{
//     color?:"inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
//     }
// const Loader:FC<Props> = ({color}) => {
    
//   return (
//     <div className='w-full flex items-center justify-center'>
//          <CircularProgress color={`primary`}/>
//     </div>
//   )
// }

// export default Loader


// import React, { FC } from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// // interface Props {
// //   color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
// // }
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#EB4897",
//       // light: will be calculated from palette.primary.main,
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//     },
//     secondary: {
//       main: '#E0C2FF',
//       light: '#F5EBFF',
//       // dark: will be calculated from palette.secondary.main,
//       contrastText: '#47008F',
//     },
//   },
// });
// const Loader = ({ color }) => {
//   return (
//     <div className=' flex items-center justify-center'>
//        <ThemeProvider theme={theme}>
//       {/* Use the 'color' prop to set the color of CircularProgress */}
//       <CircularProgress color=`palette.primary.main` />
//       </ThemeProvider>
//     </div>
//   );
// };

// export default Loader;

import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: '#E0C2FF',
    },
  },
});

const Loader = () => {
  return (
    <div className='flex items-center justify-center'>
      <ThemeProvider theme={theme}>
        {/* Use the 'style' prop to set the color manually */}
        <CircularProgress style={{ color: theme.palette.primary.main }} />
      </ThemeProvider>
    </div>
  );
};

export default Loader;

