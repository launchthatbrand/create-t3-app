import React from "react";
import mondaySdk from "monday-sdk-js";
import { type APIOptions } from "monday-sdk-js/types/client-api.interface";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../_components/ui/button";

const monday = mondaySdk();

const query = "{ workspaces (limit:100) {name id description} }";

interface Workspace {
  name: string;
  id: string;
  description: string;
}

interface MondayApiResponse {
  data: {
    workspaces: Workspace[];
    account_id: number;
  };
}

const options: APIOptions = {
  token: process.env.MONDAY_TOKEN,
};

async function page() {
  const {
    data: { workspaces },
  } = (await monday.api(query, options)) as MondayApiResponse;
  console.log("monday_response", JSON.stringify(workspaces));

  return (
    <div className="m-5 w-full rounded-md bg-[#2f324d] shadow-md">
      <Table className="text-white">
        <TableHeader>
          <TableRow className="!border-[#4b4e69]">
            <TableHead className="w-[200px] text-white">
              Workspace Name
            </TableHead>
            <TableHead className="text-white">Workspace Division</TableHead>
            <TableHead className="text-white">Workspace ID</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Workspace Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaces.map((workspace) => (
            <TableRow key={workspace.id} className="!border-[#4b4e69]">
              <TableCell>{workspace.name}</TableCell>
              <TableCell>**Division ID**</TableCell>
              <TableCell>{workspace.id}</TableCell>
              <TableCell>
                {workspace.description ?? "**Workspace Description"}
              </TableCell>
              <TableCell>
                <Button>Go To Workspace</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default page;
