import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import models from '../modelData/models';
import { useParams } from 'react-router-dom';
function TopBar({ currentPage }) {
  const { userId } = useParams();
  const userName = models.userModel(userId).first_name;
  return (
    <AppBar
      className="topbar-appBar"
      position="fixed"
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Toolbar>
        <div style={{ flex: 1 }}>
          <h2>Tran Van Toan</h2>
        </div>
        <div style={{ flex: 1, textAlign: 'right' }}>
          <Typography variant="h6">
            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)} :{' '}
            {userName}
          </Typography>{' '}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
