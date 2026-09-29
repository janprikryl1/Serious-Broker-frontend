import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// 1. Rozhranie pre zosúladenie s MUI
interface StyledTabsProps {
  children?: React.ReactNode;
  value: string; // zmenil som na string, keďže používaš napr. "one", "two" alebo idčka
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
}

// 2. Štylizované Tabs, ktoré tvoria tú krátku čiaru
export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    variant="scrollable"
    scrollButtons="auto"
    allowScrollButtonsMobile
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
  />
))({
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  width: '100%',
  minWidth: 0,
  overflowX: 'auto',
  '& .MuiTabs-scroller': {
    overflowX: 'auto !important',
  },
  '& .MuiTabs-flexContainer': {
    flexWrap: 'nowrap',
    minWidth: 'max-content',
  },
  '& .MuiTabs-scrollButtons': {
    color: 'var(--secondary-color)',
  },
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: 'var(--secondary-color)',
    borderRadius: '2px',
  },
});

interface StyledTabProps {
  label: string;
  value: string;
  disabled?: boolean;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(16),
  minWidth: 0,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  paddingLeft: 0,
  paddingRight: 0,
  marginRight: theme.spacing(3),
  fontFamily: 'Inter, sans-serif',
  '&:last-child': {
    marginRight: 0,
  },
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: 'var(--white-color)',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
  '&.Mui-disabled': {
    color: 'rgba(255, 255, 255, 0.25) !important',
    cursor: 'not-allowed !important',
    pointerEvents: 'auto !important',
  },
}));