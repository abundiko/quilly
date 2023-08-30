import { getUserByUsername } from "@/server/userActions/getUser";
import { formatImage } from "@/utils/imageHelpers";
import { URL } from "next/dist/compiled/@edge-runtime/primitives/url";
import { ImageResponse } from "next/server";

export const config = {
  unstable_includeFiles: [
    'node_modules/next/dist/compiled/@edge-runtime/primitives/**/*.+(js|json)',
  ],
}

// export const runtime = "edge";

export async function GET(req, res) {
  const url = new URL(req.url);
  const u = url.searchParams.get("u") ?? null;
  let image = ""
  if(u){
    const user = await getUserByUsername(u);
    image = formatImage(user.img);
  }else {
    image= "https://quilly-blog.vercel.app/img/user.png"
  }
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "pink",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
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
        Quilly
      </div>
    ),
    {
      width: 1000,
      height: 600
    }
  );
}
