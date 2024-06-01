import OrgControl from '@/components/dashboard/org-control'
import SideNav from '@/components/dashboard/side-nav'
import React from 'react'

const OrgIdLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex h-full w-full mt-8 px-4 md:px-8 lg:px-12">
    <OrgControl />
    <div className="hidden md:flex md:w-56 lg:w-72 xl:w-80 h-full">
      <SideNav />
    </div>
    <main>
        {children}
    </main>
  </div>
  )
}

export default OrgIdLayout