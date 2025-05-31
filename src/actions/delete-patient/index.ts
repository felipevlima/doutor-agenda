"use server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { actionClient } from "@/lib/next-safe-action";

const deletePatientSchema = z.object({
  id: z.string().uuid(),
});

export const deletePatient = actionClient
  .schema(deletePatientSchema)
  .action(async ({ parsedInput }) => {
    await db.delete(patientsTable).where(eq(patientsTable.id, parsedInput.id));
    revalidatePath("/patients");
  }); 