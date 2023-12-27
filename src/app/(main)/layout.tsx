import { ReactNode } from 'react';
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

export const metadata = {
  title: 'CampusGuessr',
  description: 'CampusGuessr Online Game',
};

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AppBar position="fixed" sx={{ zIndex: 2000 }}>
        <Toolbar sx={{ backgroundColor: 'background.paper', color: 'black' }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            CampusGuessr
          </Typography>

          <Button color="inherit" component={Link} href="/">
            Featured
          </Button>
          {/* <Button color="inherit" component={Link} href="/categories">
            Categories
          </Button>
          <Button color="inherit" component={Link} href="/leaderboard">
            Leaderboard
          </Button> */}
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          bgcolor: 'background.default',
          mt: ['48px', '56px', '64px'],
        }}
      >
        {children}
      </Box>
    </div>
  );
}
