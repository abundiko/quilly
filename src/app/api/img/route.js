import { ImageResponse } from "next/server";

export const runtime = "edge";

export default async function handler(req, res) {
  const { queryParam } = req.query; // Access query parameter

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "pink",
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {/* <img src={} /> */}
        Hello world!
      </div>
    ),
    {
      width: 1000,
      height: 600
    }
  );
}
