import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, PasswordModule, CheckboxModule, ToastModule, ProgressSpinnerModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private msg: MessageService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email:    ['admin@fraudshield.com', [Validators.required, Validators.email]],
      password: ['password123', Validators.required],
      remember: [true]
    });
  }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    // Dummy auth — any credentials work
    setTimeout(() => {
      this.loading = false;
      this.msg.add({ severity: 'success', summary: 'Welcome back!', detail: 'Redirecting to dashboard...' });
      setTimeout(() => this.router.navigate(['/app/dashboard']), 800);
    }, 1200);
  }
}
