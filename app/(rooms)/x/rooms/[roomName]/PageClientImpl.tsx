// // 'use client';

// // import { decodePassphrase } from '@/lib/client-utils';
// // import { DebugMode } from '@/lib/Debug';
// // import { RecordingIndicator } from '@/lib/RecordingIndicator';
// // import { SettingsMenu } from '@/lib/SettingsMenu';
// // import { ConnectionDetails } from '@/lib/types';
// // import {
// //   formatChatMessageLinks,
// //   LiveKitRoom,
// //   LocalUserChoices,
// //   PreJoin,
// //   VideoConference,
// // } from '@livekit/components-react';
// // import {
// //   ExternalE2EEKeyProvider,
// //   RoomOptions,
// //   VideoCodec,
// //   VideoPresets,
// //   Room,
// //   DeviceUnsupportedError,
// //   RoomConnectOptions,
// // } from 'livekit-client';
// // import { useRouter } from 'next/navigation';
// // import { useAuth } from "@/lib/auth";
// // import React from 'react';

// // const CONN_DETAILS_ENDPOINT =
// //   process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? '/api/connection-details';
// // const SHOW_SETTINGS_MENU = process.env.NEXT_PUBLIC_SHOW_SETTINGS_MENU == 'true';

// // export function PageClientImpl(props: {
// //   roomName: string;
// //   region?: string;
// //   hq: boolean;
// //   codec: VideoCodec;
// // }) {
// //   const user = useAuth()!;
// //   const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(
// //     undefined,
// //   );
// //   const preJoinDefaults = React.useMemo(() => {
// //     const username = user?.username;
// //     return {
// //       username: username,
// //       videoEnabled: true,
// //       audioEnabled: true,
// //     };
// //   }, []);
// //   const [connectionDetails, setConnectionDetails] = React.useState<ConnectionDetails | undefined>(
// //     undefined,
// //   );


// //   const handlePreJoinSubmit = React.useCallback(async (values: LocalUserChoices) => {
// //     setPreJoinChoices(values);
// //     const url = new URL(CONN_DETAILS_ENDPOINT, window.location.origin);
// //     url.searchParams.append('roomName', props.roomName);
// //     url.searchParams.append('participantName', user.username);
// //     if (props.region) {
// //       url.searchParams.append('region', props.region);
// //     }
// //     const connectionDetailsResp = await fetch(url.toString());
// //     const connectionDetailsData = await connectionDetailsResp.json();
// //     setConnectionDetails(connectionDetailsData);
// //   }, []);
// //   const handlePreJoinError = React.useCallback((e: any) => console.error(e), []);

// //   return (
// //     <main data-lk-theme="default" style={{ height: '100%' }}>
// //       {connectionDetails === undefined || preJoinChoices === undefined ? (
// //         <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
// //           <PreJoin
// //             defaults={preJoinDefaults}
// //             onSubmit={handlePreJoinSubmit}
// //             onError={handlePreJoinError}
// //           />
// //         </div>
// //       ) : (
// //         <VideoConferenceComponent
// //           connectionDetails={connectionDetails}
// //           userChoices={preJoinChoices}
// //           options={{ codec: props.codec, hq: props.hq }}
// //         />
// //       )}
// //     </main>
// //   );
// // }

// // function VideoConferenceComponent(props: {
// //   userChoices: LocalUserChoices;
// //   connectionDetails: ConnectionDetails;
// //   options: {
// //     hq: boolean;
// //     codec: VideoCodec;
// //   };
// // }) {
// //   const e2eePassphrase =
// //     typeof window !== 'undefined' && decodePassphrase(location.hash.substring(1));

// //   const worker =
// //     typeof window !== 'undefined' &&
// //     e2eePassphrase &&
// //     new Worker(new URL('livekit-client/e2ee-worker', import.meta.url));
// //   const e2eeEnabled = !!(e2eePassphrase && worker);
// //   const keyProvider = new ExternalE2EEKeyProvider();
// //   const [e2eeSetupComplete, setE2eeSetupComplete] = React.useState(false);

// //   const roomOptions = React.useMemo((): RoomOptions => {
// //     let videoCodec: VideoCodec | undefined = props.options.codec ? props.options.codec : 'vp9';
// //     if (e2eeEnabled && (videoCodec === 'av1' || videoCodec === 'vp9')) {
// //       videoCodec = undefined;
// //     }
// //     return {
// //       videoCaptureDefaults: {
// //         deviceId: props.userChoices.videoDeviceId ?? undefined,
// //         resolution: props.options.hq ? VideoPresets.h2160 : VideoPresets.h720,
// //       },
// //       publishDefaults: {
// //         dtx: false,
// //         videoSimulcastLayers: props.options.hq
// //           ? [VideoPresets.h1080, VideoPresets.h720]
// //           : [VideoPresets.h540, VideoPresets.h216],
// //         red: !e2eeEnabled,
// //         videoCodec,
// //       },
// //       audioCaptureDefaults: {
// //         deviceId: props.userChoices.audioDeviceId ?? undefined,
// //       },
// //       adaptiveStream: { pixelDensity: 'screen' },
// //       dynacast: true,
// //       e2ee: e2eeEnabled
// //         ? {
// //           keyProvider,
// //           worker,
// //         }
// //         : undefined,
// //     };
// //   }, [props.userChoices, props.options.hq, props.options.codec]);

// //   const room = React.useMemo(() => new Room(roomOptions), []);

// //   React.useEffect(() => {
// //     const startCall = async () => {
// //       try {
// //         // Access roomName from connectionDetails
// //         const roomName = props.connectionDetails.roomName; // roomName from connectionDetails

// //         const response = await fetch(`/api/courses/${roomName}/live`, {
// //           method: 'POST',  // You can use POST since it triggers the start of the live event
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({
// //             isLive: true,  // Update the `isLive` status to true when the call starts
// //           }),
// //         });

// //         if (!response.ok) {
// //           throw new Error('Failed to update the course isLive status');
// //         }

// //         console.log('Course is now live');
// //       } catch (error) {
// //         console.error('Error starting call:', error);
// //       }
// //     };

// //     // Trigger the `startCall` function when the room is connected
// //     room.on('connected', startCall);

// //     // Clean up event listener when the component unmounts
// //     return () => {
// //       room.off('connected', startCall);
// //     };
// //   }, [room, props.connectionDetails]); // Include connectionDetails in the dependency array


// //   React.useEffect(() => {
// //     if (e2eeEnabled) {
// //       keyProvider
// //         .setKey(decodePassphrase(e2eePassphrase))
// //         .then(() => {
// //           room.setE2EEEnabled(true).catch((e) => {
// //             if (e instanceof DeviceUnsupportedError) {
// //               alert(
// //                 `You're trying to join an encrypted meeting, but your browser does not support it. Please update it to the latest version and try again.`,
// //               );
// //               console.error(e);
// //             } else {
// //               throw e;
// //             }
// //           });
// //         })
// //         .then(() => setE2eeSetupComplete(true));
// //     } else {
// //       setE2eeSetupComplete(true);
// //     }
// //   }, [e2eeEnabled, room, e2eePassphrase]);

// //   const connectOptions = React.useMemo((): RoomConnectOptions => {
// //     return {
// //       autoSubscribe: true,
// //     };
// //   }, []);

// //   const router = useRouter();
// //   const handleOnLeave = React.useCallback(() => router.push('/'), [router]);
// //   const handleError = React.useCallback((error: Error) => {
// //     console.error(error);
// //     alert(`Encountered an unexpected error, check the console logs for details: ${error.message}`);
// //   }, []);

// //   const handleEncryptionError = React.useCallback((error: Error) => {
// //     console.error(error);
// //     alert(
// //       `Encountered an unexpected encryption error, check the console logs for details: ${error.message}`,
// //     );
// //   }, []);
// //   const brandName = 'ـلم'
// //   return (
// //     <>
// //       <LiveKitRoom
// //         connect={e2eeSetupComplete}
// //         room={room}
// //         token={props.connectionDetails.participantToken}
// //         serverUrl={props.connectionDetails.serverUrl}
// //         connectOptions={connectOptions}
// //         video={props.userChoices.videoEnabled}
// //         audio={props.userChoices.audioEnabled}
// //         onDisconnected={handleOnLeave}
// //         onEncryptionError={handleEncryptionError}
// //         onError={handleError}
// //       >
// //         <div className="brand-name flex">
// //           <span> {brandName} </span>
// //           <img src="/favicon.ico" alt="Brand Logo" className="brand-logo m-0" />
// //         </div>
// //         <VideoConference
// //           chatMessageFormatter={formatChatMessageLinks}
// //           SettingsComponent={SHOW_SETTINGS_MENU ? SettingsMenu : undefined}
// //         />
// //         <DebugMode />
// //         <RecordingIndicator />
// //       </LiveKitRoom>
// //     </>
// //   );
// // }


// //---------------------------------------------------------------12/01 2:06

// 'use client';

// import { decodePassphrase } from '@/lib/client-utils';
// import { DebugMode } from '@/lib/Debug';
// import { RecordingIndicator } from '@/lib/RecordingIndicator';
// import { SettingsMenu } from '@/lib/SettingsMenu';
// import { ConnectionDetails } from '@/lib/types';
// import {
//   formatChatMessageLinks,
//   LiveKitRoom,
//   LocalUserChoices,
//   PreJoin,
//   VideoConference,
// } from '@livekit/components-react';
// import {
//   ExternalE2EEKeyProvider,
//   RoomOptions,
//   VideoCodec,
//   VideoPresets,
//   Room,
//   DeviceUnsupportedError,
//   RoomConnectOptions,
// } from 'livekit-client';
// import { useRouter } from 'next/navigation';
// import { useAuth } from "@/lib/auth";
// import React from 'react';
// import { UserRole } from '@prisma/client';

// const CONN_DETAILS_ENDPOINT =
//   process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? '/api/connection-details';
// const SHOW_SETTINGS_MENU = process.env.NEXT_PUBLIC_SHOW_SETTINGS_MENU == 'true';

// export function PageClientImpl(props: {
//   roomName: string;
//   region?: string;
//   hq: boolean;
//   codec: VideoCodec;

// }) {
//   const user = useAuth()!;
//   const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(
//     undefined,
//   );
//   const preJoinDefaults = React.useMemo(() => {
//     const username = user?.username;
//     return {
//       username: username,
//       videoEnabled: true,
//       audioEnabled: true,
//     };
//   }, []);
//   const [connectionDetails, setConnectionDetails] = React.useState<ConnectionDetails | undefined>(
//     undefined,
//   );


//   const handlePreJoinSubmit = React.useCallback(async (values: LocalUserChoices) => {
//     setPreJoinChoices(values);
//     const url = new URL(CONN_DETAILS_ENDPOINT, window.location.origin);
//     url.searchParams.append('roomName', props.roomName);
//     url.searchParams.append('participantName', user.username);
//     url.searchParams.append('role', user.role);
//     if (props.region) {
//       url.searchParams.append('region', props.region);
//     }
//     const connectionDetailsResp = await fetch(url.toString());
//     const connectionDetailsData = await connectionDetailsResp.json();
//     setConnectionDetails(connectionDetailsData);
//   }, []);
//   const handlePreJoinError = React.useCallback((e: any) => console.error(e), []);

//   return (
//     <main data-lk-theme="default" style={{ height: '100%' }}>
//       {connectionDetails === undefined || preJoinChoices === undefined ? (
//         <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
//           <PreJoin
//             defaults={preJoinDefaults}
//             onSubmit={handlePreJoinSubmit}
//             onError={handlePreJoinError}
//           />
//         </div>
//       ) : (
//         <VideoConferenceComponent
//           user={user}
//           connectionDetails={connectionDetails}
//           userChoices={preJoinChoices}
//           options={{ codec: props.codec, hq: props.hq }}
//         />
//       )}
//     </main>
//   );
// }

// function VideoConferenceComponent(props: {
//   user: any;
//   userChoices: LocalUserChoices;
//   connectionDetails: ConnectionDetails;
//   options: {
//     hq: boolean;
//     codec: VideoCodec;
//   };
// }) {
//   const e2eePassphrase =
//     typeof window !== 'undefined' && decodePassphrase(location.hash.substring(1));

//   const worker =
//     typeof window !== 'undefined' &&
//     e2eePassphrase &&
//     new Worker(new URL('livekit-client/e2ee-worker', import.meta.url));
//   const e2eeEnabled = !!(e2eePassphrase && worker);
//   const keyProvider = new ExternalE2EEKeyProvider();
//   const [e2eeSetupComplete, setE2eeSetupComplete] = React.useState(false);

//   const roomOptions = React.useMemo((): RoomOptions => {
//     let videoCodec: VideoCodec | undefined = props.options.codec ? props.options.codec : 'vp9';
//     if (e2eeEnabled && (videoCodec === 'av1' || videoCodec === 'vp9')) {
//       videoCodec = undefined;
//     }
//     return {
//       videoCaptureDefaults: {
//         deviceId: props.userChoices.videoDeviceId ?? undefined,
//         resolution: props.options.hq ? VideoPresets.h2160 : VideoPresets.h720,
//       },
//       publishDefaults: {
//         dtx: false,
//         videoSimulcastLayers: props.options.hq
//           ? [VideoPresets.h1080, VideoPresets.h720]
//           : [VideoPresets.h540, VideoPresets.h216],
//         red: !e2eeEnabled,
//         videoCodec,
//       },
//       audioCaptureDefaults: {
//         deviceId: props.userChoices.audioDeviceId ?? undefined,
//       },
//       adaptiveStream: { pixelDensity: 'screen' },
//       dynacast: true,
//       e2ee: e2eeEnabled
//         ? {
//           keyProvider,
//           worker,
//         }
//         : undefined,
//     };
//   }, [props.userChoices, props.options.hq, props.options.codec]);

//   const room = React.useMemo(() => new Room(roomOptions), []);

//   React.useEffect(() => {
//     const startCall = async () => {
//       try {
//         const roomName = props.connectionDetails.roomName;

//         const response = await fetch(`/api/courses/${roomName}/live`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             isLive: true,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to update the course isLive status');
//         }

//         console.log('Course is now live');
//       } catch (error) {
//         console.error('Error starting call:', error);
//       }
//     };

//     room.on('connected', startCall);

//     return () => {
//       room.off('connected', startCall);
//     };
//   }, [room, props.connectionDetails]);

//   React.useEffect(() => {
//     if (e2eeEnabled) {
//       keyProvider
//         .setKey(decodePassphrase(e2eePassphrase))
//         .then(() => {
//           room.setE2EEEnabled(true).catch((e) => {
//             if (e instanceof DeviceUnsupportedError) {
//               alert(
//                 `You're trying to join an encrypted meeting, but your browser does not support it. Please update it to the latest version and try again.`,
//               );
//               console.error(e);
//             } else {
//               throw e;
//             }
//           });
//         })
//         .then(() => setE2eeSetupComplete(true));
//     } else {
//       setE2eeSetupComplete(true);
//     }
//   }, [e2eeEnabled, room, e2eePassphrase]);

//   const connectOptions = React.useMemo((): RoomConnectOptions => {
//     return {
//       autoSubscribe: true,
//     };
//   }, []);

//   const router = useRouter();

//   const handleOnLeave = React.useCallback(async () => {
//     try {
//       const roomName = props.connectionDetails.roomName;

//       const response = await fetch(`/api/courses/${roomName}/live`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           isLive: false,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update course live status');
//       }

//       console.log('Course is no longer live');
//       router.push('/');
//     } catch (error) {
//       console.error('Error leaving call:', error);
//       alert('There was an error while ending the call.');
//     }
//   }, [router, props.connectionDetails]);


//   // const handleLeaveAndDelete = React.useCallback(async () => {
//   //   if (props.user.role === 'TEACHER') {
//   //     try {
//   //       const roomName = props.connectionDetails.roomName;

//   //       // Step 1: Delete the room (ask for confirmation and proceed)
//   //       const url = new URL(`/api/connection-details?roomName=${roomName}`, window.location.origin);

//   //       const deleteResponse = await fetch(url.toString(), {
//   //         method: 'DELETE',
//   //       });

//   //       if (!deleteResponse.ok) {
//   //         const errorDetails = await deleteResponse.json();
//   //         console.error('Error deleting room:', errorDetails);
//   //         alert('Failed to delete the room.');
//   //         return; // Exit early if the deletion fails
//   //       }

//   //       if (deleteResponse.ok) {
//   //         alert('Room deleted successfully!');
//   //         router.push('/'); // Redirect after successful deletion
//   //       } else {
//   //         alert('Failed to delete the room.');
//   //       }

//   //       // alert('Room deleted successfully!');
//   //       // console.log('Redirecting to home...');

//   //       // Step 2: Now update the course live status to false
//   //       const liveStatusResponse = await fetch(`/api/courses/${roomName}/live`, {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //         },
//   //         body: JSON.stringify({
//   //           isLive: false,
//   //         }),
//   //       });

//   //       if (!liveStatusResponse.ok) {
//   //         throw new Error('Failed to update course live status');
//   //       }

//   //       console.log('Course is no longer live');

//   //       // Redirect to home after both operations
//   //       // await router.push('/');  // Ensure this is awaited

//   //     } catch (error) {
//   //       console.error('Error handling leave and delete:', error);
//   //       alert('There was an error while leaving the call and deleting the room.');
//   //     }
//   //   } else {
//   //     console.log('Only teachers can perform this action');
//   //   }
//   // }, [router, props.connectionDetails, props.user]);


//   const handleDeleteRoom = async () => {
//     if (props.user.role == 'TEACHER') {
//     const confirmDelete = confirm(`Are you sure you want to delete the room: ${props.connectionDetails.roomName}?`);
//     if (!confirmDelete) return; // Exit if the user doesn't confirm

//     const url = new URL(`/api/connection-details?roomName=${props.connectionDetails.roomName}`, window.location.origin);

//     try {
//       const response = await fetch(url.toString(), {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         // alert('Room deleted successfully!');

//         try {
//           const response = await fetch(`/api/courses/${props.connectionDetails.roomName}/live`, {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify({
//                     isLive: false,
//                   }),
//                 });

//         }catch {
//           console.log ('didnt change the course status')
//         }
//       } else {
//         // alert('Failed to delete the room.');
//         router.push('/');
//       }
//     } catch (error) {
//       console.error('Error deleting the room:', error);
//       alert('An error occurred while deleting the room.');
//     }} else {
//       router.push('/');
//     }
//   };

//   const handleError = React.useCallback((error: Error) => {
//     console.error(error);
//     alert(`Encountered an unexpected error: ${error.message}`);
//   }, []);

//   const handleEncryptionError = React.useCallback((error: Error) => {
//     console.error(error);
//     alert(`Encountered an encryption error: ${error.message}`);
//   }, []);

//   return (
//     <>
//       <LiveKitRoom
//         connect={e2eeSetupComplete}
//         room={room}
//         token={props.connectionDetails.participantToken}
//         serverUrl={props.connectionDetails.serverUrl}
//         connectOptions={connectOptions}
//         video={props.userChoices.videoEnabled}
//         audio={props.userChoices.audioEnabled}
//         onDisconnected={handleDeleteRoom}
//         onEncryptionError={handleEncryptionError}
//         onError={handleError}
//       >
//         <div className="brand-name flex">
//           <span>{'ـلم'}</span>
//           <img src="/favicon.ico" alt="Brand Logo" className="brand-logo m-0" />
//         </div>
//         <VideoConference
//           chatMessageFormatter={formatChatMessageLinks}
//           // SettingsComponent={SHOW_SETTINGS_MENU ? SettingsMenu : undefined}
//           SettingsComponent={props.user.role === 'TEACHER' ? SettingsMenu : undefined}
//         />
//         <DebugMode />
//         <RecordingIndicator />
//       </LiveKitRoom>
//     </>
//   );
// }


//------------------------------------------------12/07 10:41 new from the demo 
'use client';

import { decodePassphrase } from '@/lib/client-utils';
import { DebugMode } from '@/lib/Debug';
import { RecordingIndicator } from '@/lib/RecordingIndicator';
import { SettingsMenu } from '@/lib/SettingsMenu';
import { ConnectionDetails } from '@/lib/types';
import { useAuth } from "@/lib/auth";
import { Course } from '@prisma/client';
import {
  formatChatMessageLinks,
  LiveKitRoom,
  LocalUserChoices,
  PreJoin,
  VideoConference,
} from '@livekit/components-react';
import {
  ExternalE2EEKeyProvider,
  RoomOptions,
  VideoCodec,
  VideoPresets,
  Room,
  DeviceUnsupportedError,
  RoomConnectOptions,
} from 'livekit-client';
import { useRouter } from 'next/navigation';
import React from 'react';

const CONN_DETAILS_ENDPOINT =
  process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? '/api/connection-details';
const SHOW_SETTINGS_MENU = process.env.NEXT_PUBLIC_SHOW_SETTINGS_MENU == 'true';

export function PageClientImpl(props: {
  roomName: string;
  region?: string;
  hq: boolean;
  codec: VideoCodec;
}) {
  const user = useAuth()!;
  const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(
    undefined,
  );
  const preJoinDefaults = React.useMemo(() => {
    const username = user?.username;
    return {
      username: username,
      videoEnabled: true,
      audioEnabled: true,
    };
  }, []);
  const [connectionDetails, setConnectionDetails] = React.useState<ConnectionDetails | undefined>(
    undefined,
  );

  const handlePreJoinSubmit = React.useCallback(async (values: LocalUserChoices) => {
    setPreJoinChoices(values);
    const url = new URL(CONN_DETAILS_ENDPOINT, window.location.origin);
    url.searchParams.append('roomName', props.roomName);
    url.searchParams.append('participantName', user.username);
    url.searchParams.append('role', user.role);
    if (props.region) {
      url.searchParams.append('region', props.region);
    }
    const connectionDetailsResp = await fetch(url.toString());
    const connectionDetailsData = await connectionDetailsResp.json();
    setConnectionDetails(connectionDetailsData);
  }, []);
  const handlePreJoinError = React.useCallback((e: any) => console.error(e), []);

  return (
    <main data-lk-theme="default" style={{ height: '100%' }}>
      {connectionDetails === undefined || preJoinChoices === undefined ? (
        <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
          <PreJoin
            defaults={preJoinDefaults}
            onSubmit={handlePreJoinSubmit}
            onError={handlePreJoinError}
          />
        </div>
      ) : (
        <VideoConferenceComponent
          user={user}
          connectionDetails={connectionDetails}
          userChoices={preJoinChoices}
          options={{ codec: props.codec, hq: props.hq }}
        />
      )}
    </main>
  );
}

function VideoConferenceComponent(props: {
  user: any;
  userChoices: LocalUserChoices;
  connectionDetails: ConnectionDetails;
  options: {
    hq: boolean;
    codec: VideoCodec;
  };
}) {
  const e2eePassphrase =
    typeof window !== 'undefined' && decodePassphrase(location.hash.substring(1));

  const worker =
    typeof window !== 'undefined' &&
    e2eePassphrase &&
    new Worker(new URL('livekit-client/e2ee-worker', import.meta.url));
  const e2eeEnabled = !!(e2eePassphrase && worker);
  const keyProvider = new ExternalE2EEKeyProvider();
  const [e2eeSetupComplete, setE2eeSetupComplete] = React.useState(false);

  const roomOptions = React.useMemo((): RoomOptions => {
    let videoCodec: VideoCodec | undefined = props.options.codec ? props.options.codec : 'vp9';
    if (e2eeEnabled && (videoCodec === 'av1' || videoCodec === 'vp9')) {
      videoCodec = undefined;
    }
    return {
      videoCaptureDefaults: {
        deviceId: props.userChoices.videoDeviceId ?? undefined,
        resolution: props.options.hq ? VideoPresets.h2160 : VideoPresets.h720,
      },
      publishDefaults: {
        dtx: false,
        videoSimulcastLayers: props.options.hq
          ? [VideoPresets.h1080, VideoPresets.h720]
          : [VideoPresets.h540, VideoPresets.h216],
        red: !e2eeEnabled,
        videoCodec,
      },
      audioCaptureDefaults: {
        deviceId: props.userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: 'screen' },
      dynacast: true,
      e2ee: e2eeEnabled
        ? {
          keyProvider,
          worker,
        }
        : undefined,
    };
  }, [props.userChoices, props.options.hq, props.options.codec]);

  const room = React.useMemo(() => new Room(roomOptions), []);

  const user = useAuth()!
  React.useEffect(() => {
    if (user.role == 'TEACHER') {
      const startCall = async () => {
        try {
          const roomName = props.connectionDetails.roomName;

          const response = await fetch(`/api/courses/${roomName}/live`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              isLive: true,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to update the course isLive status');
          }

          console.log('Course is now live');
        } catch (error) {
          console.error('Error starting call:', error);
        }
      };

      room.on('connected', startCall);

      return () => {
        room.off('connected', startCall);
      };
    }
  }, [room, props.connectionDetails, user.role]);

  React.useEffect(() => {
    if (e2eeEnabled) {
      keyProvider
        .setKey(decodePassphrase(e2eePassphrase))
        .then(() => {
          room.setE2EEEnabled(true).catch((e) => {
            if (e instanceof DeviceUnsupportedError) {
              alert(
                `You're trying to join an encrypted meeting, but your browser does not support it. Please update it to the latest version and try again.`,
              );
              console.error(e);
            } else {
              throw e;
            }
          });
        })
        .then(() => setE2eeSetupComplete(true));
    } else {
      setE2eeSetupComplete(true);
    }
  }, [e2eeEnabled, room, e2eePassphrase]);

  const connectOptions = React.useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);

  const router = useRouter();
  // const handleOnLeave = React.useCallback(() => router.push('/'), [router]);
  const handleOnLeave = React.useCallback(async () => {
    if (user.role == 'TEACHER') {

      try {
        const roomName = props.connectionDetails.roomName;

        // Send a request to update the course status back to false (not live)
        const response = await fetch(`/api/courses/${roomName}/live`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            isLive: false,  // Set the course status back to false
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update course status to not live');
        }

        console.log('Course is no longer live');
        // const region = props.region; // Assuming you have a region in your connection details
        const deleteResponse = await fetch(`${window.location.origin}/api/connection-details?roomName=${props.connectionDetails.roomName}`, {
          method: 'DELETE',
        });
      } catch (error) {
        console.error('Error updating course status:', error);
      }
    }


    // After updating the status, navigate back to the home page
    router.push('/');
  }, [router, props.connectionDetails.roomName, user]);

  const handleError = React.useCallback((error: Error) => {
    console.error(error);
    alert(`Encountered an unexpected error, check the console logs for details: ${error.message}`);
  }, []);
  const handleEncryptionError = React.useCallback((error: Error) => {
    console.error(error);
    alert(
      `Encountered an unexpected encryption error, check the console logs for details: ${error.message}`,
    );
  }, []);

  return (
    <>
      <LiveKitRoom
        connect={e2eeSetupComplete}
        room={room}
        token={props.connectionDetails.participantToken}
        serverUrl={props.connectionDetails.serverUrl}
        connectOptions={connectOptions}
        video={props.userChoices.videoEnabled}
        audio={props.userChoices.audioEnabled}
        onDisconnected={handleOnLeave}
        onEncryptionError={handleEncryptionError}
        onError={handleError}
      >
        <VideoConference
          chatMessageFormatter={formatChatMessageLinks}
          SettingsComponent={user.role == 'TEACHER' ? SettingsMenu : undefined}
        />
        <DebugMode />
        <RecordingIndicator />
      </LiveKitRoom>
    </>
  );
}