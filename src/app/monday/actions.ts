"use server";

import { type APIOptions } from "monday-sdk-js/types/client-api.interface";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();

export interface Workspace {
  name: string;
  id: string;
  description: string;
}

interface MondayWorkspacesApiResponse {
  data: {
    workspaces: Workspace[];
    account_id: number;
  };
}

const options: APIOptions = {
  token: process.env.MONDAY_TOKEN,
};

export async function fetchAllWorkspaces() {
  try {
    const query = "{ workspaces (limit:100) {name id description} }";
    const result = (await monday.api(
      query,
      options,
    )) as MondayWorkspacesApiResponse;
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function fetchLocations() {
  try {
    const query = "query { boards (ids: 5987199810) {items {id name}}}";
    const result = await monday.api(query, options);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function fetchEvents() {
  try {
    const query = "query { boards (ids: 6080281301) {items {id name}}}";
    const result = await monday.api(query, options);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}
