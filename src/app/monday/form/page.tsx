/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import InventoryForm from "~/app/_components/InventoryFormTest";
import React from "react";
import {
  type Category,
  fetchCategories,
  fetchItems,
  fetchEvents,
  fetchLocations,
} from "../actions";
import { DefaultForm } from "~/app/_components/DefaultForm";

async function page() {
  const fetchedEvents = await fetchEvents();
  const events = fetchedEvents;
  const fetchedLocations = await fetchLocations();
  const locations = fetchedLocations?.data.boards[0].items_page.items;
  console.log("locations", locations);
  const fetchedCategories = await fetchCategories();
  const categories = fetchedCategories?.data.boards[0].groups as Category[];
  // console.log("fetchedCategories", categories);
  const fetchedItems = await fetchItems();
  const items = fetchedItems?.data?.boards[0].items_page.items;
  // console.log("fetchedItems", fetchedItems?.data.boards[0].items_page.items);

  return (
    <div className="container flex flex-col items-center space-y-10">
      {/* <InventoryForm
        categories={categories}
        items={items}
        events={events}
        locations={locations}
      /> */}
      <DefaultForm />
    </div>
  );
}

export default page;
