"use server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const getDoctors = actionClient.action(async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.clinic?.id) {
    throw new Error("Clínica não encontrada");
  }
  const doctors = await db.query.doctorsTable.findMany({
    where: eq(doctorsTable.clinicId, session.user.clinic.id),
  });
  return doctors;
}); 