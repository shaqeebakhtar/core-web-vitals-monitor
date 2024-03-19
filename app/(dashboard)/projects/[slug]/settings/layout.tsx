import React from 'react';
import SettingsLayout from './_components/settings-layout';

const ProjectSettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const tabs = [
    {
      name: 'General',
      segment: null,
    },
    {
      name: 'Billing',
      segment: 'billing',
    },
    {
      name: 'People',
      segment: 'people',
    },
  ];

  return <SettingsLayout tabs={tabs}>{children}</SettingsLayout>;
};

export default ProjectSettingsLayout;
