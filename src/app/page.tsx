import InventoryForm from "~/app/_components/InventoryForm";
import React from "react";
import { columns, type Payment } from "./order/columns";
import { DataTable } from "./order/data-table";

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
  const data = await getData();
  return (
    <div className="container flex flex-col items-center space-y-10">
      <InventoryForm />
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}

export default InventoryFormPage;
