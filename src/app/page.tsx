/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import InventoryForm from "~/app/_components/InventoryFormTest";
import React from "react";
import { columns, type Payment } from "./order/columns";
import { DataTable } from "./order/data-table";
import {
  Category,
  fetchCategories,
  fetchEvents,
  fetchItems,
  fetchLocations,
} from "./monday/actions";

// eslint-disable-next-line @typescript-eslint/require-await
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "0018",
      totalItems: 100,
      status: "checked-out",
    },
    // ...
  ];
}

async function InventoryFormPage() {
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
      <InventoryForm
        categories={categories}
        items={items}
        events={events}
        locations={locations}
      />
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}

export default InventoryFormPage;
