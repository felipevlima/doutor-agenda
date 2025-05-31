import { eq } from "drizzle-orm";
import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageHeaderTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddPatientButton } from "./_components/add-patient-button";
import { columns } from "./_components/table-columns";

export default async function PatientsPage() {
  const headers = await nextHeaders();
  const session = await auth.api.getSession({
    headers,
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session?.user.clinic) {
    redirect("/clinic-form");
  }

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, session.user.clinic.id),
    orderBy: (patient, { desc }) => [desc(patient.createdAt)],
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Pacientes</PageHeaderTitle>
          <PageDescription>Nenhum paciente cadastrado ainda.</PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddPatientButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <div className="rounded-lg border border-zinc-100 bg-white p-4">
          <DataTable columns={columns} data={patients} />
        </div>
      </PageContent>
    </PageContainer>
  );
}
