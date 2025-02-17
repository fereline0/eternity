"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { TAction } from "@/types/actions";
import { redirect } from "next/navigation";
import { createMaterial } from "@/actions/material";
import { TMaterial } from "@/types/material";
import { Form } from "@heroui/form";
import { Alert } from "@heroui/alert";

const initialState: TAction<TMaterial> = {};

export default function CreateMaterial() {
  const [state, formAction, pending] = useActionState(
    createMaterial,
    initialState,
  );

  useEffect(() => {
    if (state.data && !state.message && !state.validationErrors) {
      redirect("/materials");
    }
  }, [state]);

  return (
    <Card>
      <CardBody>
        <div className="space-y-2">
          {state.message && <Alert color="danger" title={state.message} />}
          <Form action={formAction}>
            <Input
              errorMessage={state.validationErrors?.name}
              isInvalid={!!state.validationErrors?.name}
              isDisabled={pending}
              name="name"
              label="Имя"
            />
            <Input
              errorMessage={state.validationErrors?.unit}
              isInvalid={!!state.validationErrors?.unit}
              name="unit"
              isDisabled={pending}
              label="Единица"
            />
            <Input
              errorMessage={state.validationErrors?.cost}
              isInvalid={!!state.validationErrors?.cost}
              isDisabled={pending}
              name="cost"
              label="Цена за единицу"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">₽</span>
                </div>
              }
              type="number"
            />
            <Input
              errorMessage={state.validationErrors?.quantityInStock}
              isInvalid={!!state.validationErrors?.quantityInStock}
              isDisabled={pending}
              name="quantityInStock"
              label="Количество на складе"
              type="number"
            />
            <Button isLoading={pending} color="primary" type="submit">
              Создать
            </Button>
          </Form>
        </div>
      </CardBody>
    </Card>
  );
}
