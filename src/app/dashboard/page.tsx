import { auth, signOut } from "@/auth"
import { Container, Typography, Box, Button, Avatar, Paper } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) return null

  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            src={session.user.image || undefined}
            alt={session.user.name || 'User'}
            sx={{ width: 80, height: 80, mr: 3 }}
          />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              {session.user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {session.user.email}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Dashboard Content
          </Typography>
          <Typography paragraph>
            Welcome to your private dashboard. Only authenticated users can see this page.
          </Typography>
        </Box>

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end' }}>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <Button
              type="submit"
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
            >
              Sign Out
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}
