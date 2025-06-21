import { useState } from "react";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import { BanknoteArrowUpIcon } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Text } from "@/components/ui/text";
import { useForm } from "react-hook-form";
import {
  payDebtDto,
  type PayDebtDto,
} from "@/modules/clients/application/models/pay-debt.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/form/form-input";
import { useMutatePayments } from "@/modules/clients/application/hooks/use.mutate-payments";

interface Props {
  clientId: string;
}

export function PayDebt({ clientId }: Props) {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const { create } = useMutatePayments();
  const form = useForm<PayDebtDto>({
    resolver: zodResolver(payDebtDto),
    defaultValues: {
      amount: 0,
      type: "pay_debt",
      clientId,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    create.mutate(data, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (value === false) {
          form.reset();
        }
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <Button className="flex-1 rounded-sm flex-row gap-x-1 items-center">
          <BanknoteArrowUpIcon />
          <Text>Abonar</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-sm mx-auto" style={{ width: width }}>
        <DialogHeader>
          <DialogTitle>Abonar</DialogTitle>
          <DialogDescription>¿Cuánto desea abonar?</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <FormInput
            control={form.control}
            name="amount"
            placeholder="Cantidad a abonar"
            keyboardType="numeric"
            required
          />
        </Form>

        <DialogFooter className="flex-row gap-x-2">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">
              <Text>Cancelar</Text>
            </Button>
          </DialogClose>
          <Button
            className="flex-1 flex-row gap-x-1.5"
            onPress={onSubmit}
            disabled={create.isPending}
          >
            {create.isPending && <ActivityIndicator />}
            <Text>Continuar</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
