import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Outlet } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import TopBar from '../pages/TopBar';
import UserList from '../pages/UserList';
import { useLocation } from 'react-router-dom';

function RootLayout() {
  const location = useLocation();

  const currentPage = location.pathname.trim().split('/')[1];

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      {/* Topbar */}
      <div className="sticky top-0 z-50 bg-background shadow-md">
        <TopBar currentPage={currentPage} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Main View */}
        <Card className="flex-1 h-full overflow-hidden">
          <CardContent className="p-4 h-full overflow-auto">
            <Outlet />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RootLayout;
