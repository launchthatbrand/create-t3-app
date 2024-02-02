import { Payment, columns } from "../orders/columns";

import { DataTable } from "../orders/data-table";
import InventoryForm from "~/app/_components/InventoryFormTest";
import OrderShowcase from "~/app/_components/OrderShowcase";
import React from "react";

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
    <div className="container w-[500px] space-y-10 py-10">
      <InventoryForm />
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default InventoryFormPage;
