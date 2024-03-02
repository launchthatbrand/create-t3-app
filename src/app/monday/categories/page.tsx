/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import React from "react";
import { fetchCategories } from "../actions";

async function page() {
  const fetchedCategories = await fetchCategories();
  console.log("fetchedCategories", fetchedCategories?.data.boards[0].groups);
  const prettyPrintedJSON = JSON.stringify(
    fetchedCategories?.data.boards[0].groups,
    null,
    2,
  );
  return <pre>{prettyPrintedJSON}</pre>;
}

export default page;
