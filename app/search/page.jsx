import React from "react";
import Search from "./Search";

export async function generateMetadata({ searchParams }) {
  const { query } = searchParams;

  return {
    title: query ? query : `Search`,
  };
}

export default function page() {
  return <Search />;
}
