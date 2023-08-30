import { getUserByUsername } from "@/server/userActions/getUser";
import { formatImage } from "@/utils/imageHelpers";
import { ImageResponse } from "next/server";

// export const runtime = "edge";

export async function GET(req, res) {
  const { u } = req.query; // Access query parameter
  const user = await getUserByUsername(u);
  const image = formatImage(user.img);
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
        <img
          style={{
            height: 200,
            width: 300,
            borderRadius: 50
          }}
          src={image}
        />
        {user.full_name} on Quilly
      </div>
    ),
    {
      width: 1000,
      height: 600
    }
  );
}
