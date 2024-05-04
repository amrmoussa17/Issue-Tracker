import { TextField, TextArea, Button } from "@radix-ui/themes";
import React from "react";

const NewIssuepage = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root placeholder="Title"></TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuepage;
