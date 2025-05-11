import { Outlet } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import TopBar from '../components/TopBar';
import UserList from '../components/UserList';
import { useLocation } from 'react-router-dom';

function RootLayout() {
  const location = useLocation();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TopBar currentPage={location.pathname.trim().split('/')[1]} />{' '}
        </Grid>
        <Grid item sm={3} className="main-topbar-buffer">
          <Paper className="main-grid-item">
            <UserList />
          </Paper>
        </Grid>
        <Grid item sm={9} className="main-topbar-buffer">
          <Paper className="main-grid-item">
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default RootLayout;
