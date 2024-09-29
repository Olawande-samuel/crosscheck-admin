// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from 'react';
// // next
// import { useRouter } from 'next/router';
// // components
// import { useSelector } from 'react-redux';
// import LoadingScreen from '../components/loading-screen';
// //
// import Login from '../pages/account/login';
// import { useAuthContext } from './useAuthContext';

// // ----------------------------------------------------------------------

// type AuthGuardProps = {
//   children: React.ReactNode;
// };

// /**
//  * AuthGuard is a higher-order component that wraps the application routes and
//  * enforces authentication before allowing access to the protected routes.
//  *
//  * It checks if the user is authenticated and if the user's authentication status
//  * is initialized. If the user is not authenticated or the authentication
//  * status is not initialized, it displays a loading screen.
//  *
//  * If the user is authenticated, it checks if the user has completed the account
//  * setup process. If the user is a vendor and has not completed the account setup,
//  * it redirects the user to the account setup page.
//  *
//  * If the user is a vendor and has completed the account setup, it allows access
//  * to the dashboard.
//  *
//  * If the user is not a vendor, it allows access to the previous route or home
//  * if no previous route is available.
//  *
//  * @param {Object} props - The component props.
//  * @param {React.ReactNode} props.children - The child components to be rendered.
//  * @returns {JSX.Element} - The rendered component.
//  */
// export default function AuthGuard({ children }: AuthGuardProps) {
//   // Get the authentication context
//   const { isAuthenticated, isUserAuthenticating, isInitialized }: any = useAuthContext();
//   const { current_user, in_session } = useSelector((state: any) => state.user);
//   // Get the router context
//   const { pathname, push, replace } = useRouter();

//   // Store the requested location to redirect the user after authentication
//   const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

//   // Effect hook to handle authentication and redirection logic
//   useEffect(
//     () => {
//       // Log the requested location for debugging purposes
//       if (
//         in_session &&
//         current_user?.account_type === 'vendor' &&
//         current_user.shop &&
//         pathname === '/account/create'
//       ) {
//         console.log('hmm');
//         replace('/dashboard/app');
//       }
//       if (
//         in_session &&
//         current_user?.account_type === 'vendor' &&
//         !current_user.shop &&
//         pathname.includes('dashboard')
//       ) {
//         replace('/account/create');
//       }

//       // If the user has requested a specific location and the current location is not the requested location
//       if (requestedLocation && pathname !== requestedLocation) {
//         console.log('hhhere');

//         // Redirect the user to the requested location
//         push(requestedLocation);
//       }
//       // If the user is not in the process of authenticating and is authenticated
//       if (!isUserAuthenticating && isAuthenticated) {
//         // If the user is a vendor and has completed the account setup
//         if (current_user?.account_type === 'vendor' && current_user.shop) {
//           // Allow access to the dashboard
//           setRequestedLocation(null);
//         } else if (
//           isAuthenticated &&
//           current_user?.account_type === 'vendor' &&
//           !current_user.shop
//         ) {
//           // Redirect the user to the account setup page
//           replace('/account/create');
//         }
//       }
//     },
//     [
//       // isAuthenticated, isUserAuthenticating, pathname, push, replace, requestedLocation
//     ]
//   );

//   // If the authentication status is not initialized or the user is in the process of authenticating, display a loading screen
//   if (!isInitialized) {
//     return <LoadingScreen />;
//   }

//   // If the user is not authenticated, display the login page
//   if (!isAuthenticated && !isUserAuthenticating && pathname.includes('dashboard')) {
//     // If the current location is not the requested location, store the current location as the requested location
//     if (pathname !== requestedLocation) {
//       setRequestedLocation(pathname);
//     }
//     return <Login />;
//   }

//   // Render the child components
//   return <>{children}</>;
// }
