"use server";

export async function blogSubmitAction(formData: FormData) {
  console.log("Function triggered");

  const content = formData.get("content") as string;
  const name = formData.get("name") as string;
}
