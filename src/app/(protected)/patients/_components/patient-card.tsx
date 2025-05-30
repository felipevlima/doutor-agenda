"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { patientsTable } from "@/db/schema";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

export function PatientCard({ patient }: PatientCardProps) {
  const patientInitials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{patientInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">{patient.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="text-sm">Telefone: {patient.phoneNumber}</div>
        <div className="text-sm">Sexo: {patient.sex === "male" ? "Masculino" : "Feminino"}</div>
      </CardContent>
    </Card>
  );
} 