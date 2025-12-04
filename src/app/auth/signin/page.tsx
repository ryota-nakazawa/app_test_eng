import { signIn } from "@/auth"
import { Button, Container, Typography, Paper } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';

export default function SignIn() {
  return (
    <Container maxWidth="sm" sx={{ py: 20, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center', width: '100%', borderRadius: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Sign in to access your dashboard
        </Typography>
        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: "/dashboard" })
          }}
        >
          <Button
            type="submit"
            variant="contained"
            startIcon={<GoogleIcon />}
            size="large"
            fullWidth
            sx={{ py: 1.5, fontSize: '1.1rem', textTransform: 'none' }}
          >
            Sign in with Google
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
