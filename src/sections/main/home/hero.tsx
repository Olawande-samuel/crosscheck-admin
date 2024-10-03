/* eslint-disable import/no-extraneous-dependencies */
// next
import { m } from 'framer-motion';

// @mui
import { alpha, styled } from '@mui/material/styles';
import { Link, Grid, Stack, Button, Container, Typography } from '@mui/material';

import { bgGradient } from 'src/theme/styles';

// hooks

// routes

import { Iconify } from 'src/components/iconify';
import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  width: '100%',
  height: '100vh',
}));

const StyledDescription = styled('div')(({ theme }) => ({
  maxWidth: 480,

  // width: '100%',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(15, 0),
  height: '100%',
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  backgroundSize: '400%',
  fontSize: `${64 / 20}rem`,
  textAlign: 'center',
  lineHeight: 1,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 8,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

const StyledEllipseTop = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 480,
  height: 480,
  top: -80,
  right: 0,
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.12),
}));

const StyledEllipseBottom = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: 400,
  bottom: -200,
  left: '10%',
  right: '10%',
  borderRadius: '50%',
  filter: 'blur(100px)',
  WebkitFilter: 'blur(100px)',
  backgroundColor: alpha(theme.palette.primary.darker, 0.08),
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <StyledRoot>
      <Container
        // component={MotionContainer}
        sx={{ height: 1 }}
      >
        <Grid container spacing={10} sx={{ height: 1 }}>
          <Grid item xs={12} sx={{ height: 1 }}>
            <Description />
          </Grid>
        </Grid>
      </Container>

      <StyledEllipseTop />

      <StyledEllipseBottom />
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <StyledDescription>
      <m.div variants={varFade().in}>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          {/* Start a <br /> */}
          Verify identity with
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledGradientText>Crosscheck</StyledGradientText>
      </m.div>

      <m.div variants={varFade().in}>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Crosscheck is your simple and secure background checks and identity solution.
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <Stack spacing={1.5} direction={{ sm: 'row' }} sx={{ my: 5 }}>
          <Stack alignItems="center" spacing={2}>
            <Button
              component={Link}
              href="/sign-up"
              color="inherit"
              size="large"
              variant="contained"
              sx={{
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'text.primary',
                },
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </m.div>
    </StyledDescription>
  );
}
