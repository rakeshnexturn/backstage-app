import React, { PropsWithChildren, useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExtensionIcon from '@material-ui/icons/Extension';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import CreateComponentIcon from '@material-ui/icons/AddCircleOutline';
import CategoryIcon from '@material-ui/icons/Category';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarScrollWrapper,
  SidebarSpace,
  useSidebarOpenState,
  Link,
  SidebarExpandButton,
} from '@backstage/core-components';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { MyGroupsSidebarItem } from '@backstage/plugin-org';
import GroupIcon from '@material-ui/icons/People';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};

const useStyles = makeStyles({
  sidebarWrapper: {
    width: (props: { sidebarOpen: boolean }) =>
      props.sidebarOpen ? sidebarConfig.drawerWidthOpen : sidebarConfig.drawerWidthClosed,
    transition: 'width 0.3s',
  },
});

export const Root = ({ children }: PropsWithChildren<{}>) => {
  return (
      <SidebarPage>
          <Sidebar>
            <SidebarLogo />
            <SidebarExpandButton/> 
            <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
              <SidebarSearchModal />
            </SidebarGroup>
            <SidebarDivider />
            <SidebarGroup label="Menu" icon={<MenuIcon />}>
              {/* Global nav, not org-specific */}
              <SidebarItem icon={HomeIcon} to="/" text="Home" />
              {/*<SidebarItem icon={AccountCircleIcon} to="client-mgmt" text="Clients" />  
              <SidebarItem icon={AppRegistrationIcon} to="project-mgmt" text="Projects" />
              <MyGroupsSidebarItem
                singularTitle="My Group"
                pluralTitle="My Groups"
                icon={GroupIcon}
              />*/}
              <SidebarItem icon={LibraryBooks} to="ideas" text="Ideas" /> 
              {/*<SidebarItem icon={LibraryBooks} to="docs" text="Docs" />/}
              {/*<SidebarItem icon={CreateComponentIcon} to="create" text="Create..." />*/}
              {/* End global nav */}
              <SidebarDivider />
              <SidebarScrollWrapper>
                {/* Items in this group will be scrollable if they run out of space */}
              </SidebarScrollWrapper>
            </SidebarGroup>
            <SidebarSpace />
            <SidebarDivider />
            <SidebarGroup
              label="Settings"
              icon={<UserSettingsSignInAvatar />}
              to="/settings"
            >
              <SidebarSettings />
            </SidebarGroup>
          </Sidebar>
        {children}
      </SidebarPage>
    );
  }
