"use client";

import { Button } from "./ui/button";
import React from "react";
import { useAuth } from "~/contexts/AuthContext";

function ClientButton() {
  const {} = useAuth();
  return (
    <div>
      <Button></Button>
    </div>
  );
}

export default ClientButton;
