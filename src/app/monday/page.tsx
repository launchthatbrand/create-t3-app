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
    <div className="m-5 w-[700px] rounded-md bg-slate-50 p-5 shadow-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Workspace Name</TableHead>
            <TableHead>Workspace ID</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workspaces.map((workspace) => (
            <TableRow key={workspace.id}>
              <TableCell className="font-medium">{workspace.name}</TableCell>
              <TableCell>{workspace.id}</TableCell>
              <TableCell>{workspace.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default page;
