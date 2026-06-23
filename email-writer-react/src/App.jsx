import { useState } from 'react';
import { Typography, Box, TextField, MenuItem, FormControl, InputLabel, Select, CircularProgress, Button, Paper, Alert, Container, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';

import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#8b5cf6',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
  },
});

function App() {

  const [emailContent, setEmail] = useState('')
  ;
  const [ tone, setTone] = useState('');

  const[generatedReply,setGeneratedReply] = useState('');

  const[loading,setLoading] = useState(false);

  const[error,setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try{
     
      const response = await axios.post("http://localhost:8081/api/email/generate", {emailContent,tone});
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));

  }
  catch(error){
    setError('Failed to generate reply. Please try again.');
    console.error('Error generating reply:', error);
  } finally {
    setLoading(false);
  }

  };
  
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 6,
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 3,
              background: '#ffffff',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{
                mb: 4,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Email Reply Generator
            </Typography>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                label="Email Content"
                placeholder="Enter your email content here..."
                value={emailContent || ''}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f8fafc',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                    },
                  },
                }}
              />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Select Tone (optional)</InputLabel>
                <Select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  sx={{
                    backgroundColor: '#f8fafc',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                    },
                  }}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="professional">Professional</MenuItem>
                  <MenuItem value="friendly">Friendly</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={loading || !emailContent}
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
                  },
                  '&:disabled': {
                    background: '#e2e8f0',
                    color: '#94a3b8',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={24} sx={{ color: '#ffffff' }} />
                    <Typography>Generating...</Typography>
                  </Box>
                ) : (
                  'Generate Reply'
                )}
              </Button>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 2,
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      color: '#ef4444',
                    },
                  }}
                >
                  {error}
                </Alert>
              )}
            </Box>

            {generatedReply && (
              <Box
                sx={{
                  mt: 4,
                  pt: 4,
                  borderTop: '2px solid #e2e8f0',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#1e293b',
                    }}
                  >
                    Generated Reply:
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  variant="outlined"
                  value={generatedReply || ''}
                  readOnly
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#f8fafc',
                      '& fieldset': {
                        borderColor: '#e2e8f0',
                      },
                    },
                  }}
                />

                <Button
                  variant="outlined"
                  onClick={() => navigator.clipboard.writeText(generatedReply)}
                  sx={{
                    mt: 2,
                    borderColor: '#6366f1',
                    color: '#6366f1',
                    '&:hover': {
                      borderColor: '#4f46e5',
                      backgroundColor: '#f0f4ff',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Copy to Clipboard
                </Button>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
