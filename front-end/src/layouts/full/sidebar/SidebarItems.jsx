import React, { useMemo } from 'react';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import { useSelector } from 'react-redux';
import Menuitems from './MenuItems';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';

const SidebarItems = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  // Memoize filtered menu items for performance
  const filteredMenuItems = useMemo(() => {
    return Menuitems.filter((item) => {
      if (
        userInfo?.role === 'student' &&
        ['Create Exam', 'Add Questions', 'Exam Logs'].includes(item.title)
      ) {
        return false;
      }

      if (
        userInfo?.role === 'student' &&
        item.subheader === 'Teacher'
      ) {
        return false;
      }

      return true;
    });
  }, [userInfo?.role]);

  return (
    <Box 
      className="h-full bg-white border-r border-gray-100"
      sx={{ px: 2, py: 3 }}
    >
      <List 
        className="space-y-1"
        sx={{ 
          pt: 0,
          '& .MuiListItem-root': {
            borderRadius: '8px',
            marginBottom: '2px',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: '#f8fafc',
              transform: 'translateX(4px)',
            },
            '&.active': {
              backgroundColor: '#3b82f6',
              color: 'white',
              '&:hover': {
                backgroundColor: '#2563eb',
              }
            }
          }
        }}
        component="nav"
      >
        {filteredMenuItems.map((item, index) => {
          const isSubheader = Boolean(item.subheader);
          
          return (
            <React.Fragment key={item.subheader || item.id}>
              {/* Simple divider for sections */}
              {isSubheader && index > 0 && (
                <div className="h-px bg-gray-200 my-4 mx-2" />
              )}
              
              {isSubheader ? (
                <NavGroup item={item} />
              ) : (
                <NavItem 
                  item={item} 
                  pathDirect={pathname}
                  className={pathname === item.href ? 'active' : ''}
                />
              )}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default React.memo(SidebarItems);
