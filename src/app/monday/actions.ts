/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { unstable_noStore as noStore } from "next/cache";

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

// Define the type for a single category
export interface Category {
  id: string;
  name: string;
}

export async function fetchCategories() {
  try {
    const query = "query { boards (ids: 5798486455) { groups { title id }} }";
    const result = await monday.api(query, options);
    // console.log("fetchCategories", result);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function fetchItems() {
  try {
    const query =
      '{ boards (ids: 5798486455) { items_page (limit: 500 , query_params: {order_by:[{column_id:"name"}]}) { items { id name group { title id } assets { id public_url }} } } }';
    const result = await monday.api(query, options);
    // console.log("fetchItems", result);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function fetchItemsByCategory() {
  try {
    const query =
      '{ boards (ids: 5980735158) { groups ( group_id: "topics" ) { items_page (limit: 500) { items { id name assets { id public_url }} } } } }';
    const result = await monday.api(query, options);
    console.log("fetchItems", result);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function createCheckoutOrder(data: unknown) {
  try {
    console.log("createCheckoutOrder", data);
    const newItemId = await createItem(data);
    console.log("result1", newItemId?.data.change_multiple_column_values.id);
    const result2 = await Promise.all(
      data.items.map(async (item) => {
        const response = await createSubitem(
          item,
          newItemId?.data.change_multiple_column_values.id,
        );
        // return response.json();
      }),
    );
    const query = "query { boards (ids: 6080281301) {items {id name}}}";
    const result = await monday.api(query, options);
    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function createItem(data) {
  console.log("createItem_data", data);
  const item_name =
    data.type === "checkout" ? "Check-out Order" : "Check-in Order";
  const groupId = data.type === "checkout" ? "topics" : "group_title";
  try {
    // const mutation =
    //   'mutation { create_item (board_id: 5980720965, group_id: "topics", item_name: "Checkout Order") { id } }';
    const mutation1 = `mutation { create_item (board_id: 5980720965, group_id: \"${groupId}\", item_name: \"${item_name}\", column_values: \"{ \\\"email\\\": \\\"${data.volunteer.email} ${data.volunteer.email}\\\", \\\"text0\\\": \\\"${data.location.name}\\\",\\\"text1\\\": \\\"${data.event.name}\\\", \\\"text\\\": \\\"${data.volunteer.name}\\\" }\") { id board { id } } }`;
    const result1 = await monday.api(mutation1, options);
    console.log("createItem_result1", result1);
    const item_id = result1.data.create_item.id;
    console.log("createItem_itemID", item_id);
    const mutation2 = `mutation { change_multiple_column_values (board_id: 5980720965, item_id: \"${item_id}\", column_values: \"{ \\\"name\\\": \\\"${item_name} : ${item_id}\\\" }\") { id board { id } } }`;
    const result2 = await monday.api(mutation2, options);
    console.log("createItem_result2", result2);
    return result2;
  } catch (error) {
    console.log("error", error);
  }
}

export async function createSubitem(data: unknown, newItemId: string) {
  try {
    // console.log("createSubitem", data);
    const { name, id, quantity } = data;
    console.log("name", name);
    console.log("id", id);
    console.log("quantity", quantity);
    const mutation = `mutation { create_subitem (parent_item_id: ${newItemId}, item_name: \"${name}\", column_values: \"{ \\\"numbers\\\": \\\"${quantity}\\\",\\\"text_1\\\": \\\"${id}\\\" }\") { id board { id } } }`;
    const result = await monday.api(mutation, options);
    console.log("createSubitem", result);
    // return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function fetchEvents() {
  try {
    const query =
      'query { items_page_by_column_values ( limit:50 , board_id: 5385787000 , columns: [{ column_id: "dropdown4", column_values: ["Yes"] }]) {items {id name group {id title} column_values(ids: "text7") { ... on DateValue { time date} }} }}';
    const result1 = await monday.api(query, options);
    // console.log("result1", result1);
    const result2 = result1.data.items_page_by_column_values.items;
    const result3 = result2[0];
    console.log("result3", result3);

    const groupedData = result2.reduce((acc, item) => {
      // Use the group id as the key for each group
      const { id, title } = item.group;

      // If the group hasn't been added to the accumulator, add it
      if (!acc[id]) {
        acc[id] = {
          groupId: id,
          title,
          items: [],
        };
      }

      // Add the current item to the group's items array
      acc[id].items.push({
        id: item.id,
        name: item.name,
        column_values: item.column_values,
      });

      return acc;
    }, {});

    return groupedData;
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
