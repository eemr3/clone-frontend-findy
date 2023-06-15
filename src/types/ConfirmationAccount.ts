interface ConfirmationAccountError {
  message?: string;
  statusCode?: number;
}

interface ConfirmationAccountSuccess extends ConfirmationAccountError {
  message?: string;
  status?: number;
}

export interface ResonseConfirmationAccount extends ConfirmationAccountSuccess {}
