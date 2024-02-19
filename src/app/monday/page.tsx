"use client";

import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAllWorkspaces, fetchEvents, fetchLocations } from "./actions";

function MondayPage() {
  const [locations, setLocations] = useState();
  const [events, setEvents] = useState();
  useEffect(() => {
    // Call fetchData only if the user is authenticated
    const loadData = async () => {
      try {
        const fetchedLocations = await fetchLocations();
        const fetchedEvents = await fetchEvents();
        setLocations(fetchedLocations?.data.boards[0].items);
        setEvents(fetchedEvents?.data.boards[0].items);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle error or set data to null/empty state
      }
    };

    void loadData();
  }, []);
  return (
    <div className="space-y-3">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Locations</SelectLabel>
            {locations?.map((item, index) => (
              // Render each item. Ensure you have a unique key for each child.
              <SelectItem key={index} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a event" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Events</SelectLabel>
            {events?.map((item, index) => (
              // Render each item. Ensure you have a unique key for each child.
              <SelectItem key={index} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default MondayPage;
