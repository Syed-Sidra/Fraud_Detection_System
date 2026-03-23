import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { FraudService } from '../../core/services/fraud.service';
import {
  FraudStatus,
  FraudTransaction,
  TransactionChannel,
  TransactionPayload,
  TransactionType
} from '../../shared/models/models';

interface SelectOption<T extends string> {
  label: string;
  value: T;
}

interface TransactionPreset {
  label: string;
  icon: string;
  patch: Partial<TransactionPayload> & { createdAt?: string };
}

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, InputNumberModule, InputTextModule, ButtonModule, ToastModule, TagModule],
  providers: [MessageService],
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly ipPattern = /^((25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(25[0-5]|2[0-4]\d|1?\d?\d)$/;

  readonly loading = signal(false);
  readonly result = signal<FraudTransaction | null>(null);

  readonly typeOptions: SelectOption<TransactionType>[] = [
    { label: 'Debit', value: 'DEBIT' },
    { label: 'Credit', value: 'CREDIT' }
  ];

  readonly channelOptions: SelectOption<TransactionChannel>[] = [
    { label: 'Online', value: 'ONLINE' },
    { label: 'ATM', value: 'ATM' },
    { label: 'UPI', value: 'UPI' },
    { label: 'POS', value: 'POS' }
  ];

  readonly presets: TransactionPreset[] = [
    {
      label: 'Normal Purchase',
      icon: 'fas fa-cart-shopping',
      patch: {
        senderName: 'Rahul Sharma',
        senderAccount: 'ACC1025',
        receiverName: 'QuickPay Merchant',
        receiverAccount: 'ACC5099',
        transactionType: 'DEBIT',
        amount: 1250,
        channel: 'POS',
        location: 'Mumbai',
        deviceId: 'DEV-1140',
        ipAddress: '192.168.1.18',
        failedAttempts: 0
      }
    },
    {
      label: 'Odd Hour',
      icon: 'fas fa-moon',
      patch: {
        senderName: 'Nisha Kapoor',
        senderAccount: 'ACC2048',
        receiverName: 'Night Transfer',
        receiverAccount: 'ACC8801',
        transactionType: 'DEBIT',
        amount: 68000,
        channel: 'ONLINE',
        location: 'Delhi',
        deviceId: 'DEV-2209',
        ipAddress: '10.0.2.15',
        failedAttempts: 2,
        createdAt: '2026-03-19T02:15'
      }
    },
    {
      label: 'High Value',
      icon: 'fas fa-sack-dollar',
      patch: {
        senderName: 'Arjun Mehta',
        senderAccount: 'ACC7788',
        receiverName: 'Enterprise Vendor',
        receiverAccount: 'ACC9922',
        transactionType: 'DEBIT',
        amount: 1500000,
        channel: 'ONLINE',
        location: 'Bengaluru',
        deviceId: 'DEV-9901',
        ipAddress: '172.16.0.12',
        failedAttempts: 4
      }
    }
  ];

  readonly form = this.fb.nonNullable.group({
    transactionId: [''],
    senderName: ['Rahul Sharma', [Validators.required, Validators.maxLength(80)]],
    senderAccount: ['ACC1025', [Validators.required, Validators.minLength(6)]],
    receiverName: ['QuickPay Merchant', [Validators.required, Validators.maxLength(80)]],
    receiverAccount: ['ACC5099', [Validators.required, Validators.minLength(6)]],
    transactionType: ['DEBIT' as TransactionType, Validators.required],
    amount: [1250, [Validators.required, Validators.min(1)]],
    channel: ['POS' as TransactionChannel, Validators.required],
    location: ['Mumbai', [Validators.required, Validators.maxLength(60)]],
    deviceId: ['DEV-1140', [Validators.required, Validators.maxLength(60)]],
    ipAddress: ['192.168.1.18', [Validators.required, Validators.pattern(this.ipPattern)]],
    failedAttempts: [0, [Validators.required, Validators.min(0), Validators.max(20)]],
    createdAt: ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly fraudService: FraudService,
    private readonly messageService: MessageService
  ) {}

  applyPreset(preset: TransactionPreset): void {
    this.form.patchValue({
      transactionId: '',
      senderName: preset.patch.senderName ?? this.form.controls.senderName.value,
      senderAccount: preset.patch.senderAccount ?? this.form.controls.senderAccount.value,
      receiverName: preset.patch.receiverName ?? this.form.controls.receiverName.value,
      receiverAccount: preset.patch.receiverAccount ?? this.form.controls.receiverAccount.value,
      transactionType: preset.patch.transactionType ?? this.form.controls.transactionType.value,
      amount: preset.patch.amount ?? this.form.controls.amount.value,
      channel: preset.patch.channel ?? this.form.controls.channel.value,
      location: preset.patch.location ?? this.form.controls.location.value,
      deviceId: preset.patch.deviceId ?? this.form.controls.deviceId.value,
      ipAddress: preset.patch.ipAddress ?? this.form.controls.ipAddress.value,
      failedAttempts: preset.patch.failedAttempts ?? this.form.controls.failedAttempts.value,
      createdAt: preset.patch.createdAt ?? ''
    });
    this.result.set(null);
  }

  runFraudCheck(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Check the form',
        detail: 'Fill the required transaction fields before submitting.'
      });
      return;
    }

    this.loading.set(true);

    this.fraudService
      .checkFraud(this.buildPayload())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (transaction) => {
          this.result.set(transaction);
          this.loading.set(false);
          this.messageService.add({
            severity: transaction.status === 'FRAUD' ? 'error' : transaction.status === 'SUSPICIOUS' ? 'warn' : 'success',
            summary: `Status: ${transaction.status}`,
            detail: `${transaction.transactionId} returned risk score ${transaction.riskScore}.`
          });
        },
        error: (error) => {
          this.loading.set(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Fraud check failed',
            detail: error instanceof Error ? error.message : 'Backend request failed.'
          });
        }
      });
  }

  getStatusSeverity(status: FraudStatus | null | undefined): 'success' | 'secondary' | 'info' | 'warning' | 'danger' | 'contrast' {
    switch (status) {
      case 'NORMAL':
        return 'success';
      case 'SUSPICIOUS':
        return 'warning';
      case 'FRAUD':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  scoreWidth(score: number): number {
    return Math.min(score, 150) / 150 * 100;
  }

  recommendation(transaction: FraudTransaction): string {
    if (transaction.status === 'FRAUD') {
      return 'Block the payment, raise an alert, and verify the sender before allowing any retry.';
    }

    if (transaction.status === 'SUSPICIOUS') {
      return 'Step up authentication and review recent activity on the sender account.';
    }

    return 'Transaction looks normal based on the current rule and model response.';
  }

  private buildPayload(): TransactionPayload {
    const value = this.form.getRawValue();

    return {
      transactionId: value.transactionId.trim() || undefined,
      senderName: value.senderName.trim(),
      senderAccount: value.senderAccount.trim(),
      receiverName: value.receiverName.trim(),
      receiverAccount: value.receiverAccount.trim(),
      transactionType: value.transactionType,
      amount: Number(value.amount),
      channel: value.channel,
      location: value.location.trim(),
      deviceId: value.deviceId.trim(),
      ipAddress: value.ipAddress.trim(),
      failedAttempts: Number(value.failedAttempts),
      createdAt: value.createdAt.trim() || undefined
    };
  }
}
