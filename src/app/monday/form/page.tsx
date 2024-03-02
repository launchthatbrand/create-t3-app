/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import InventoryForm from "~/app/_components/InventoryFormTest";
import React from "react";
import {
  type Category,
  fetchCategories,
  fetchItems,
  fetchEvents,
} from "../actions";

async function page() {
  const fetchedEvents = await fetchEvents();
  // console.log(
  //   "fetchedLocations",
  //   fetchedLocations?.data.items_page_by_column_values,
  // );
  const events = fetchedEvents;
  // console.log("fetchedLocations", locations);
  const fetchedCategories = await fetchCategories();
  const categories = fetchedCategories?.data.boards[0].groups as Category[];
  // console.log("fetchedCategories", categories);
  const fetchedItems = await fetchItems();
  const items = fetchedItems?.data.boards[0].items_page.items;
  // console.log("fetchedItems", fetchedItems?.data.boards[0].items_page.items);

  return (
    <div className="container flex flex-col items-center space-y-10">
      <InventoryForm categories={categories} items={items} events={events} />
    </div>
  );
}

export default page;
