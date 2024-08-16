import * as Ably from "ably";

// Connect to Ably using the AblyProvider component and your API key
const client = new Ably.Realtime({
  key: process.env.NEXT_PUBLIC_API_KEY_ABLY,
  clientId: "web-client",
});

export { client };
