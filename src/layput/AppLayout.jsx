import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet} from 'react-router-dom';

const AppLayout = () => {
  const {isLoading } = useSelector((state) => state.user);

  if (isLoading) return <div></div>;

  return (
    <div className='min-w-[100dvw] min-h-[100dvh] flex'>
      {/* Header */}
      <Outlet />
      {/* Footer */}
    </div>
  );
};

export default AppLayout;
