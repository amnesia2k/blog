import { Inngest } from "inngest";
import { prisma } from "~@/server/db";

export const inngest = new Inngest({ id: "metablog-client" });

type ClerkUserEventData = {
  id: string;
  first_name?: string;
  last_name?: string;
  email_addresses?: { email_address: string }[];
  image_url?: string | null;
};

// helper function to handle user data sync
async function syncUserData(eventData: ClerkUserEventData) {
  const { id, first_name, last_name, email_addresses, image_url } = eventData;

  const email = email_addresses?.[0]?.email_address ?? null;

  if (!email) {
    console.warn("No email found for user:", id);
    return;
  }

  const userData = {
    clerkId: id,
    email,
    name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
    imageUrl: image_url ?? null,
  };

  await prisma.user.upsert({
    where: { clerkId: id },
    update: {
      name: userData.name,
      email: userData.email,
      imageUrl: userData.imageUrl,
    },
    create: {
      clerkId: userData.clerkId,
      name: userData.name,
      email: userData.email,
      imageUrl: userData.imageUrl,
    },
  });
}

// handles user creation
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id } = event.data;
    try {
      await syncUserData(event.data);
    } catch (error) {
      console.error("Error syncing user creation:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
);

// handles user update
export const syncUserUpdate = inngest.createFunction(
  {
    id: "sync-user-update-from-clerk",
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    try {
      await syncUserData(event.data);
    } catch (error) {
      console.error("Error syncing user update:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
);

// handles user deletion
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id } = event.data;

    try {
      await prisma.user.delete({
        where: { clerkId: id },
      });
      console.log(`User with clerkId ${id} deleted from DB`);
    } catch (error) {
      console.error(`Error deleting user with clerkId ${id}:`, error);
    } finally {
      await prisma.$disconnect();
    }
  }
);
