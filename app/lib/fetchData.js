"use server";

import axios from "axios";

export async function fetchData({ path, fields }) {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}${path}`,
    fields,
    {
      headers: {
        Accept: "application/json",
        "Client-ID": process.env.CLIENT_ID,
        Authorization: "Bearer 3joyszz0tictaqy8z7kvudwk2nceex",
      },
    }
  );

  return data;
}
