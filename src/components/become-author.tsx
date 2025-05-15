"use client";

import { useRef, useState } from "react";
import type React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";

export default function BecomeAuthor() {
  const [formState, setFormState] = useState<{
    loading: boolean;
    error: string | null;
  }>({ loading: false, error: null });
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState({ loading: true, error: null });

    const formData = new FormData(e.currentTarget);
    const jsonBody = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      twitterLink: formData.get("twitterLink"),
      instagramLink: formData.get("instagramLink"),
      linkedinLink: formData.get("linkedinLink"),
    };

    try {
      const res = await fetch("/api/become-author", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data?.error || "Something went wrong");
      }

      toast.success("You're now an author ✍️");
      setFormState({ loading: false, error: null }); // 👈 Add this
      formRef.current?.reset();
      router.refresh();
      closeRef.current?.click(); // Manually close the sheet
    } catch (error) {
      console.error("❌ Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast.error(errorMessage || "Something went wrong");
      setFormState({ loading: false, error: errorMessage });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="text-sm">
          Become an Author
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Apply to Become an Author</SheetTitle>
          <SheetDescription>
            Fill out this short form to join as an author on our blog.
          </SheetDescription>
        </SheetHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 px-5">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="e.g. Teniola Dev"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Short Bio</Label>
            <Input
              id="bio"
              name="bio"
              placeholder="I write about frontend magic ✨"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitterLink">Twitter</Label>
            <Input
              id="twitterLink"
              name="twitterLink"
              placeholder="https://twitter.com/yourhandle"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagramLink">Instagram</Label>
            <Input
              id="instagramLink"
              name="instagramLink"
              placeholder="https://instagram.com/yourhandle"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedinLink">LinkedIn</Label>
            <Input
              id="linkedinLink"
              name="linkedinLink"
              placeholder="https://linkedin.com/in/yourhandle"
            />
          </div>

          {formState.error && (
            <p className="text-sm text-red-500">{formState.error}</p>
          )}

          <SheetFooter>
            <Button type="submit" disabled={formState.loading}>
              {formState.loading ? "Submitting..." : "Submit Application"}
            </Button>

            <SheetClose asChild>
              {/* Hidden button to close sheet manually after success */}
              {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
              <button type="button" className="hidden" ref={closeRef}></button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
