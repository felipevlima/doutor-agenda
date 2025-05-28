import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import FormComponent from "./components/form";

const ClinicForm = () => {
  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar clinica</DialogTitle>
          <DialogDescription>
            Adicione uma clínica para continuar
          </DialogDescription>
        </DialogHeader>
        <FormComponent />
      </DialogContent>
    </Dialog>
  );
};

export default ClinicForm;
