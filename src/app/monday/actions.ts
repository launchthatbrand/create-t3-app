/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
"use server";

import { type APIOptions } from "monday-sdk-js/types/client-api.interface";
import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();
monday.setApiVersion("2023-10");

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

export async function fetchItems() {
  try {
    const query =
      "{ boards (ids: 5980735158) { items_page (limit: 500) { items { id name assets { id public_url }} } } }";
    const result = await monday.api(query, options);
    console.log("fetchItems", result);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function createItem() {
  try {
    // const mutation =
    //   'mutation { create_item (board_id: 5980720965, group_id: "topics", item_name: "Checkout Order") { id } }';
    const mutation = `mutation { create_item (board_id: 5980720965, item_name: \"Checkout Order\", column_values: \"{ \\\"text0\\\": \\\"Pickup Location 1\\\",\\\"text1\\\": \\\"Event 1\\\", \\\"text\\\": \\\"Volunteer 1\\\" }\") { id board { id } } }`;
    const result = await monday.api(mutation, options);
    console.log("createItem", result);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function createSubitem(data: unknown, newItemId: string) {
  try {
    // console.log("createSubitem", data);
    const { name, id, quantity } = data;
    console.log("name", name);
    const mutation = `mutation { create_subitem (parent_item_id: ${newItemId}, item_name: \"${name}\", column_values: \"{ \\\"numbers\\\": \\\"${quantity}\\\",\\\"text_1\\\": \\\"${id}\\\" }\") { id board { id } } }`;
    const result = await monday.api(mutation, options);
    console.log("createSubitem", result);
    // return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function fetchLocations() {
  try {
    const query =
      "{ boards (ids: 5987199810) { items_page (limit: 500) { items { id name } } } }";
    const result = await monday.api(query, options);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function fetchEvents() {
  try {
    const query =
      "{ boards (ids: 6080281301) { items_page (limit: 500) { items { id name } } } }";
    const result = await monday.api(query, options);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function fetchVolunteers() {
  try {
    const query =
      "{ boards (ids: 6091907921) { items_page (limit: 500) { items { id name } } } }";
    const result = await monday.api(query, options);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function createCheckoutOrder(data: unknown) {
  try {
    console.log("createCheckoutOrder", data);
    const newItemId = await createItem();
    console.log("result1", newItemId?.data.create_item.id);
    const result2 = await Promise.all(
      data.items.map(async (item) => {
        const response = await createSubitem(
          item,
          newItemId?.data.create_item.id,
        );
        // return response.json();
      }),
    );
    // const query = "query { boards (ids: 6080281301) {items {id name}}}";
    // const result = await monday.api(query, options);
    // return result;
  } catch (error) {
    console.log("error", error);
  }
}
