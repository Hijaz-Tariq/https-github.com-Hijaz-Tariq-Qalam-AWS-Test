// import { randomString } from '@/lib/client-utils';
// import { ConnectionDetails } from '@/lib/types';
// import { AccessToken, AccessTokenOptions, VideoGrant } from 'livekit-server-sdk';
// import { NextRequest, NextResponse } from 'next/server';

// const API_KEY = process.env.LIVEKIT_API_KEY;
// const API_SECRET = process.env.LIVEKIT_API_SECRET;
// const LIVEKIT_URL = process.env.LIVEKIT_URL;

// export async function GET(request: NextRequest) {
//   try {
//     // Parse query parameters
//     const roomName = request.nextUrl.searchParams.get('roomName');
//     const participantName = request.nextUrl.searchParams.get('participantName');
//     const metadata = request.nextUrl.searchParams.get('metadata') ?? '';
//     const region = request.nextUrl.searchParams.get('region');
//     const livekitServerUrl = region ? getLiveKitURL(region) : LIVEKIT_URL;
//     if (livekitServerUrl === undefined) {
//       throw new Error('Invalid region');
//     }

//     if (typeof roomName !== 'string') {
//       return new NextResponse('Missing required query parameter: roomName', { status: 400 });
//     }
//     if (participantName === null) {
//       return new NextResponse('Missing required query parameter: participantName', { status: 400 });
//     }

//     // Generate participant token
//     const participantToken = await createParticipantToken(
//       {
//         identity: `${participantName}__${randomString(4)}`,
//         name: participantName,
//         metadata,
//       },
//       roomName,
//     );
// console.log(participantToken)
//     // Return connection details
//     const data: ConnectionDetails = {
//       serverUrl: livekitServerUrl,
//       roomName: roomName,
//       participantToken: participantToken,
//       participantName: participantName,
//     };
//     return NextResponse.json(data);
//   } catch (error) {
//     if (error instanceof Error) {
//       return new NextResponse(error.message, { status: 500 });
//     }
//   }
// }

// function createParticipantToken(userInfo: AccessTokenOptions, roomName: string) {
//   const at = new AccessToken(API_KEY, API_SECRET, userInfo);
//   at.ttl = '5m';
//   const grant: VideoGrant = {
//     room: roomName,
//     roomJoin: true,
//     canPublish: true,
//     canPublishData: true,
//     canSubscribe: true,
//   };
//   at.addGrant(grant);
//   return at.toJwt();
// }

// /**
//  * Get the LiveKit server URL for the given region.
//  */
// function getLiveKitURL(region: string | null): string {
//   let targetKey = 'LIVEKIT_URL';
//   if (region) {
//     targetKey = `LIVEKIT_URL_${region}`.toUpperCase();
//   }
//   const url = process.env[targetKey];
//   if (!url) {
//     throw new Error(`${targetKey} is not defined`);
//   }
//   return url;
// }

//////----------------------------------------------------------------12/03 10:27am

import { randomString } from "@/lib/client-utils";
import { ConnectionDetails } from "@/lib/types";
import { UserRole } from "@prisma/client";
import {
  AccessToken,
  AccessTokenOptions,
  VideoGrant,
  RoomServiceClient,
} from "livekit-server-sdk";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

export async function GET(request: NextRequest) {
  try {
    // Parse query parameters
    const roomName = request.nextUrl.searchParams.get("roomName");
    const participantName = request.nextUrl.searchParams.get("participantName");
    const metadata = request.nextUrl.searchParams.get("metadata") ?? "";
    const region = request.nextUrl.searchParams.get("region");
    const livekitServerUrl = region ? getLiveKitURL(region) : LIVEKIT_URL;
    const role = request.nextUrl.searchParams.get("role") ?? "USER"; // Default to 'USER' if no role is provided
    console.log("Role:", role);
    // Check if the LiveKit server URL is valid
    if (livekitServerUrl === undefined) {
      throw new Error("Invalid region");
    }

    // Check if required parameters are provided
    if (typeof roomName !== "string") {
      return new NextResponse("Missing required query parameter: roomName", {
        status: 400,
      });
    }
    if (participantName === null) {
      return new NextResponse(
        "Missing required query parameter: participantName",
        { status: 400 }
      );
    }

    // Generate participant token
    const participantToken = await createParticipantToken(
      {
        identity: `${participantName}__${randomString(4)}`,
        name: participantName,
        metadata,
        role, // Pass role as part of userInfo
      },
      roomName
    );

    // Return connection details
    const data: ConnectionDetails = {
      serverUrl: livekitServerUrl,
      roomName: roomName,
      participantToken: participantToken,
      participantName: participantName,
    };
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
  }
}

// export async function DELETE(request: NextRequest) {
//   try {
//     // Parse query parameter for room name
//     const roomName = request.nextUrl.searchParams.get('roomName');
//     if (typeof roomName !== 'string') {
//       return new NextResponse('Missing required query parameter: roomName', { status: 400 });
//     }

//     const region = request.nextUrl.searchParams.get('region');
//     const livekitServerUrl = region ? getLiveKitURL(region) : LIVEKIT_URL;
//     if (livekitServerUrl === undefined) {
//       throw new Error('Invalid region');
//     }

//     // Initialize RoomServiceClient
//     const roomService = new RoomServiceClient(livekitServerUrl, API_KEY, API_SECRET);

//     // Delete the room
//     await roomService.deleteRoom(roomName);
//     return new NextResponse(`Room ${roomName} deleted successfully`, { status: 200 });
//   } catch (error) {
//     if (error instanceof Error) {
//       return new NextResponse(error.message, { status: 500 });
//     }
//   }
// }

export async function DELETE(request: NextRequest) {
  try {
    const roomName = request.nextUrl.searchParams.get("roomName");
    const region = request.nextUrl.searchParams.get("region");
    const livekitServerUrl = region ? getLiveKitURL(region) : LIVEKIT_URL;
    const roomService = new RoomServiceClient(
      livekitServerUrl!,
      API_KEY,
      API_SECRET
    );
    roomService.deleteRoom(roomName!).then(() => {
      console.log("room deleted");
    });
    return new NextResponse(`Room ${roomName} deleted successfully`, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
  }
}

// Create participant token based on userInfo and role
function createParticipantToken(
  userInfo: AccessTokenOptions & { role: string },
  roomName: string
) {
  const roomAdmin = userInfo.role === UserRole.TEACHER; // Check if role is 'TEACHER'
  const at = new AccessToken(API_KEY, API_SECRET, userInfo);
  at.ttl = "5m";

  // Grant permissions based on role
  const grant: VideoGrant = {
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
    roomAdmin: roomAdmin, // Grant roomAdmin based on role
  };

  console.log(roomAdmin);
  at.addGrant(grant);
  return at.toJwt(); // Return the generated JWT token
}
/**
 * Get the LiveKit server URL for the given region.
 */
function getLiveKitURL(region: string | null): string {
  let targetKey = "LIVEKIT_URL";
  if (region) {
    targetKey = `LIVEKIT_URL_${region}`.toUpperCase();
  }
  const url = process.env[targetKey];
  if (!url) {
    throw new Error(`${targetKey} is not defined`);
  }
  return url;
}
