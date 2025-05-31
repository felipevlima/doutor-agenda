"use client";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { patientsTable } from "@/db/schema";

import TableActions from "./table-actions";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<typeof patientsTable.$inferSelect>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: ({ row }) => {
      const phoneNumber = row.getValue("phoneNumber") as string;
      if (!phoneNumber) return "";

      const cleaned = phoneNumber.replace(/\D/g, "");
      const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
      if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
      return phoneNumber;
    },
  },
  {
    accessorKey: "sex",
    header: "Sexo",
    cell: (params) => {
      const patient = params.row.original;

      return patient.sex === "male" ? (
        <Badge variant={"outline"}>Masculino</Badge>
      ) : (
        <Badge variant={"outline"}>Feminino</Badge>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <TableActions patient={row.original} />;
    },
  },
];
