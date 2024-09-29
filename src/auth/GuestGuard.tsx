// import { useEffect } from 'react';
// // next
// import { useRouter } from 'next/router';
// // routes
// import { useSelector } from 'react-redux';
// import { PATH_DASHBOARD } from '../routes/paths';
// // components
// import LoadingScreen from '../components/loading-screen';
// //
// import { useAuthContext } from './useAuthContext';

// // ----------------------------------------------------------------------

// type GuestGuardProps = {
//   children: React.ReactNode;
// };

// export default function GuestGuard({ children }: GuestGuardProps) {
//   const { push } = useRouter();

//   const { isAuthenticated, isInitialized, user }: any = useAuthContext();
//   const { current_user } = useSelector((state: any) => state.user);

//   useEffect(() => {
//     if (isAuthenticated && current_user?.account_type === 'vendor' && user?.shop) {
//       push(PATH_DASHBOARD.root);
//     }
//     if (isAuthenticated && current_user?.account_type === 'vendor' && !user?.shop) {
//       push('/account/create');
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isAuthenticated]);

//   if (isInitialized === isAuthenticated) {
//     return <LoadingScreen />;
//   }

//   return <> {children} </>;
// }
