import { auth, signOut } from "@/auth"
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material"
import Link from "next/link"
import LogoutIcon from '@mui/icons-material/Logout';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export default async function Header() {
  const session = await auth()

  return (
    <AppBar position="fixed" color="default" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
            <AutoFixHighIcon /> AI English Coach
          </Link>
        </Typography>

        {session?.user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}>
                <Avatar
                  src={session.user.image || undefined}
                  alt={session.user.name || 'User'}
                  sx={{ width: 32, height: 32 }}
                />
                <Typography variant="body2" color="text.primary" sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 500 }}>
                  {session.user.name}
                </Typography>
              </Box>
            </Link>
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <Button type="submit" color="inherit" size="small" startIcon={<LogoutIcon />}>
                Logout
              </Button>
            </form>
          </Box>
        ) : (
          <Button component={Link} href="/auth/signin" variant="contained" color="primary" sx={{ px: 3, boxShadow: 'none' }}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
