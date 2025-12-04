import { Grid, Paper, Typography, Box } from "@mui/material"
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';
import dbConnect from "@/lib/db";
import User from "@/models/User";
import Contact from "@/models/Contact";

// Fetch data directly in Server Component for efficiency
async function getStats() {
  await dbConnect();
  const userCount = await User.countDocuments();
  const contactCount = await Contact.countDocuments();
  return { userCount, contactCount };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3, display: 'flex', alignItems: 'center', height: '100%' }}>
            <Box sx={{ mr: 3, bgcolor: 'primary.light', p: 2, borderRadius: '50%', color: 'white' }}>
              <PeopleIcon fontSize="large" />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.userCount}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Users
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={2} sx={{ p: 3, display: 'flex', alignItems: 'center', height: '100%' }}>
            <Box sx={{ mr: 3, bgcolor: 'secondary.light', p: 2, borderRadius: '50%', color: 'white' }}>
              <EmailIcon fontSize="large" />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {stats.contactCount}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Inquiries
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
