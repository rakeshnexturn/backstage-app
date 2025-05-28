import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Content, Header, Page } from '@backstage/core-components';
import { Card, makeStyles, Typography, Drawer, Box } from '@material-ui/core';
import { FeatureFlagged } from '@backstage/core-app-api';
import { ClockConfig, HeaderWorldClock } from '@backstage/plugin-home';
import { SearchBar } from '@backstage/plugin-search-react';
import {
  useApi,
  configApiRef,
  identityApiRef,
  featureFlagsApiRef,
} from '@backstage/core-plugin-api';

const backstageVer = '';

const useStyles = makeStyles(theme => ({
  searchBar: {
    display: 'flex',
    maxWidth: '60vw',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    margin: 'auto',
    borderRadius: '50px',
  },
  searchBarOutline: {
    borderStyle: 'none',
  },
}));

const clockConfigs: ClockConfig[] = [
  {
    label: 'Seattle',
    timeZone: 'America/Los_Angeles',
  },
  {
    label: 'Dallas',
    timeZone: 'America/Chicago',
  },
  {
    label: 'New York',
    timeZone: 'America/New_York',
  },
  {
    label: 'Delhi',
    timeZone: 'Asia/Kolkata',
  },
];

export const HomePage = () => {
  const classes = useStyles();
  const configApi = useApi(configApiRef);
  const identityApi = useApi(identityApiRef);
  const featureFlags = useApi(featureFlagsApiRef);
  const isNpsSurvey = featureFlags.isActive('enable-nps-survey');
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const toggleModal = (): void => setOpenSearchModal(prevState => !prevState);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [drawerState, setDrawerState] = useState<boolean>(false);

  const displayNotification = async () => {
    const isShow = false; //await fetchSurveyNotificationQuery(configApi, identityApi);
    setShowNotification(isShow);
  };

  useEffect(() => {
    (async () => {
      await displayNotification();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skipNotification = async () => {
    //await skipNotificationQuery(configApi, identityApi);
  };

  const surveyAction = (action: boolean) => {
    setDrawerState(action);
    setShowNotification(action);
  };

  const hideNotification = () => {
    setShowNotification(false);
  };

  const laterAction = (action: boolean) => {
    setShowNotification(action);
    skipNotification();
  };

  const toggleDrawer = (toggle: boolean) => {
    setDrawerState(toggle);
  };

  return (
    <Page themeId="home">
      <Header title="Home" style={{ display: 'flex' }} subtitle={backstageVer}>
        <HeaderWorldClock clockConfigs={clockConfigs} />
      </Header>
      <Content>
        <Grid container spacing={2} direction="row">
          
         
          <Grid container direction="row" justifyContent="center">
            
            <Grid item md={8}>
              {/* Should be added back instead of SearchBar when upgraded to 1.16.0 */}
              {/* <HomePageSearchBar
                  classes={{ root: classes.searchBar }}
                  inputProps={{
                    classes: { notchedOutline: classes.searchBarOutline },
                  }}
                  placeholder="Search"
                  size="small"
                /> */}
              
              
            </Grid>
           
          </Grid>
          

          <FeatureFlagged with="enable-support-module">
            <Grid item md={4}>
              <Card
                style={{
                  padding: '1em 2em',
                  justifyContent: 'center',
                  height: '25em',
                }}
              >
                <Typography variant="h4">
                  Most Common Support Questions
                </Typography>
                
              </Card>
            </Grid>
          </FeatureFlagged>
          
          <FeatureFlagged with="enable-techdocs-metrics-card">
            <Grid item md={4} style={{ width: '100%' }}>
              
            </Grid>
          </FeatureFlagged>
        </Grid>
      </Content>
      <Drawer
        anchor="right"
        open={drawerState}
        onClose={() => setDrawerState(false)}
      >
        <Box sx={{ width: 460, padding: 15 }} role="presentation">
          
        </Box>
      </Drawer>
    </Page>
  );
};
