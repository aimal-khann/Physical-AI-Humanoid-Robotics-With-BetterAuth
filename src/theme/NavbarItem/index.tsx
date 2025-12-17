import React from 'react';
import NavbarAuth from '@site/src/components/NavbarAuth';
import OriginalNavbarItem from '@theme-original/NavbarItem';

export default function NavbarItem({
  className,
  ...props
}) {
  if (className === 'custom-auth-placeholder') {
    return <NavbarAuth />;
  }
  return <OriginalNavbarItem {...props} className={className} />;
}
