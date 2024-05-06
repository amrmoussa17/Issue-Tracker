"use client";
import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuepage = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root placeholder="Title"></TextField.Root>
      <SimpleMDE />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuepage;
