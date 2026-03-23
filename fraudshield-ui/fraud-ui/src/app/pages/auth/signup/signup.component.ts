import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, PasswordModule, ToastModule],
  providers: [MessageService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private msg: MessageService) {}

  ngOnInit() {
    this.form = this.fb.group({
      fullName:        ['', Validators.required],
      email:           ['', [Validators.required, Validators.email]],
      organization:    ['', Validators.required],
      password:        ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      agree:           [false, Validators.requiredTrue]
    }, { validators: this.matchPasswords });
  }

  matchPasswords(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.msg.add({ severity: 'success', summary: 'Account created!', detail: 'Welcome to FraudShield.' });
      setTimeout(() => this.router.navigate(['/app/dashboard']), 900);
    }, 1200);
  }
}
