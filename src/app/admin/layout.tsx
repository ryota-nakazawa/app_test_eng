import { Container, Box, Typography, Paper } from "@mui/material"
import Link from "next/link"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Simple way to determine active tab based on URL (server-side)
  // In a real app, might use client component for tabs or usePathname
  // For now, we'll just render the layout structure

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Admin Dashboard
        </Typography>
        <Paper square sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <div style={{ display: 'flex' }}>
              <Link href="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                  Dashboard
                </Box>
              </Link>
              <Link href="/admin/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                  Users
                </Box>
              </Link>
              <Link href="/admin/contacts" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}>
                  Contacts
                </Box>
              </Link>
            </div>
          </Box>
        </Paper>
      </Box>
      {children}
    </Container>
  )
}
