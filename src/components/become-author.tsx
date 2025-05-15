import React from "react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

export default function BecomeAuthor() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-sm">
          Become an Author
        </Button>
      </SheetTrigger>
    </Sheet>
  );
}
