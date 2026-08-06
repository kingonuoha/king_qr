import type { FormState } from "@/lib/qr/types";

export interface FormProps<T extends FormState = FormState> {
  value: T;
  onChange: (next: T) => void;
}
