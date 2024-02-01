"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { type Workspace, fetchAllWorkspaces } from "./action";

import { useAuth } from "~/app/_components/ClientProvider";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";

function MondayServer() {
  const { isAuthenticated } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (isAuthenticated) {
      // Call fetchData only if the user is authenticated
      const loadData = async () => {
        try {
          const fetchedData = await fetchAllWorkspaces();
          console.log("fetchedData", fetchedData?.data.workspaces);
          setWorkspaces(fetchedData?.data.workspaces);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          // Handle error or set data to null/empty state
        }
      };

      void loadData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return <p>User is not authenticated</p>;
  return (
    <div className="w-full text-white">
      {workspaces ? (
        <div className="m-5 w-full rounded-md bg-[#2f324d] shadow-md">
          <Table>
            <TableHeader>
              <TableRow className="!border-[#4b4e69]">
                <TableHead className="w-[200px] text-white">
                  Workspace Name
                </TableHead>
                <TableHead className="text-white">Workspace Division</TableHead>
                <TableHead className="text-white">Workspace ID</TableHead>
                <TableHead className="text-white">Description</TableHead>
                <TableHead className="text-white">Display Options</TableHead>
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
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Display Options" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Show To All Staff</SelectItem>
                        <SelectItem value="dark">Admin View Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button asChild>
                      <Link
                        target="_blank"
                        href={`https://qcausa.monday.com/workspaces/${workspace.id}`}
                      >
                        Go To Workspace
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          )
        </div>
      ) : (
        <p>Loading workspaces...</p>
      )}
    </div>
  );
}

export default MondayServer;
