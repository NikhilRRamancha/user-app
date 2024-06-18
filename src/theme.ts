import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },

    components: {
        MuiCard: { 
            styleOverrides: {
                root: {
                    maxWidth: '345px',
                    margin: 'auto',
                    borderRadius: '20px',
                },
            },
         },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    borderTopRightRadius: '20px',
                    backgroundColor:'#fff',
                },
            },
        },
        MuiCardMedia: {
            styleOverrides: {
                media: {
                    borderRadius: '50%',
                    margin: '3px',
                },
            },
        },
        MuiAvatar: {   
            styleOverrides: {
                root: {
                  
                },
            }, 
        }
    },
});

