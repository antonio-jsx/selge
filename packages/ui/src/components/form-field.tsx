import {
  FieldError,
  FieldLabel,
  Field,
} from '@selge/ui/components/field';
import { cn } from '@selge/ui/lib/utils';
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

type FieldWithId<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = ControllerRenderProps<TFieldValues, TName> & {
  id: string;
};

interface FieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  className?: string;
  render: (field: FieldWithId<TFieldValues, TName>) => React.ReactNode;
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  render,
  className,
}: FieldProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field className={cn(className)} data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

          {render({
            ...field,
            id: field.name,
          })}

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
