"use client";
import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

type TableActions = {
  data: typeof patientsTable.$inferSelect;
};

const TableActions: React.FC<TableActions> = ({ data }) => {
  const [showEditPatient, setShowEditPatient] = useState(false);
  return (
    <Dialog open={showEditPatient} onOpenChange={setShowEditPatient}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex w-full justify-end">
            <Button variant={"ghost"} size={"icon"}>
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowEditPatient(true)}>
            <EditIcon />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon />
            Remover
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpsertPatientForm
        isOpen={showEditPatient}
        patient={data}
        onSuccess={() => setShowEditPatient(false)}
      />
    </Dialog>
  );
};

export default TableActions;
