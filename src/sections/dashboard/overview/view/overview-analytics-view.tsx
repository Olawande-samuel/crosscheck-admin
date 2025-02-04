import Api from '@/api';
import useUser from '@/hooks/useUser';
import { useQueries } from '@tanstack/react-query';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { DashboardContent } from 'src/layouts/dashboard';

import RecentPending from '../recent-pending';
import RecentCompleted from '../recent-completed';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsTrafficBySite } from '../analytics-traffic-by-site';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const { user } = useUser();
  const queries = useQueries({
    queries: [
      {
        queryKey: ['get weekly signups'],
        queryFn: () => Api.getWeeklySignups(),
      },
      {
        queryKey: ['get verification statistics'],
        queryFn: () => Api.getVerificationStatistics(),
      },
      {
        queryKey: ['get transcript statistics'],
        queryFn: () => Api.getTranscriptStatistics(),
      },
    ],
  });

  console.log({ queries });
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hi {user?.firstName ?? ''}, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="New Transcript Orders"
            percent={2.6}
            total={queries?.[2].data?.data.pendingTranscripts}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-bag.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="New Education Checks"
            percent={-0.1}
            total={queries?.[1].data?.data?.pendingVerifications ?? 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-users.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Completed Transcript Requests"
            percent={2.8}
            total={queries?.[2].data?.data?.completedTranscripts ?? 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-glass-buy.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Completed Education Checks"
            percent={3.6}
            total={queries?.[1].data?.data?.completedVerifications ?? 0}
            icon={<img alt="icon" src="/assets/icons/glass/ic-transcript.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>
        {/* 
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Current visits"
            chart={{
              series: [
                { label: 'America', value: 3500 },
                { label: 'Asia', value: 2500 },
                { label: 'Europe', value: 1500 },
                { label: 'Africa', value: 500 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website visits"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                { name: 'Team A', data: [43, 33, 22, 37, 67, 68, 37, 24, 55] },
                { name: 'Team B', data: [51, 70, 47, 67, 40, 37, 24, 70, 24] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Conversion rates"
            subheader="(+43%) than last year"
            chart={{
              categories: ['Italy', 'Japan', 'China', 'Canada', 'France'],
              series: [
                { name: '2022', data: [44, 55, 41, 64, 22] },
                { name: '2023', data: [53, 32, 33, 52, 13] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentSubject
            title="Current subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="News" list={_posts.slice(0, 5)} />
        </Grid> */}

        <Grid xs={12} md={6} lg={6}>
          {/* <AnalyticsOrderTimeline title="Recent Pending" list={_timeline} /> */}
          <RecentPending />
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <RecentCompleted />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AnalyticsTrafficBySite
            title="Traffic by site"
            list={[
              {
                value: 'signups',
                label: 'New signups this week',
                total: `${fShortenNumber(queries?.[0].data?.data.newSignups ?? 0)}`,
              },
              { value: 'earnings', label: 'Total Earinings', total: `₦${fShortenNumber(323234)}` },
            ]}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_tasks} />
        </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
