import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';

interface AppUser {
  id: number;
  username: string;
  email: string;
  role: 'ADMIN' | 'ANALYST';
  active: boolean;
  createdAt: string;
  lastLogin: string;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule,
    TooltipModule, AvatarModule, ConfirmDialogModule],
  template: `
    <div class="um-page">
      <p-confirmDialog></p-confirmDialog>

      <!-- HEADER -->
      <div class="um-header">
        <div class="um-header-left">
          <div class="um-icon"><i class="pi pi-users"></i></div>
          <div>
            <h2>User Management</h2>
            <p>Manage analyst and admin accounts — Admin access only</p>
          </div>
        </div>
        <div class="um-stats">
          <div class="stat-chip">
            <span class="sn">{{ totalUsers() }}</span>
            <span class="sl">Total Users</span>
          </div>
          <div class="stat-chip admin">
            <span class="sn">{{ adminCount() }}</span>
            <span class="sl">Admins</span>
          </div>
          <div class="stat-chip analyst">
            <span class="sn">{{ analystCount() }}</span>
            <span class="sl">Analysts</span>
          </div>
          <div class="stat-chip active">
            <span class="sn">{{ activeCount() }}</span>
            <span class="sl">Active</span>
          </div>
        </div>
      </div>

      <!-- TABLE -->
      <div class="table-card">
        <p-table [value]="users()" [loading]="loading()" styleClass="dark-table"
                 [scrollable]="true" scrollHeight="calc(100vh - 280px)">
          <ng-template pTemplate="header">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-u>
            <tr [class.inactive-row]="!u.active">
              <td>
                <div class="user-cell">
                  <p-avatar [label]="u.username[0].toUpperCase()"
                            shape="circle" size="normal"
                            [style]="{'background':u.role==='ADMIN'?'#ef4444':'#6366f1','color':'white'}">
                  </p-avatar>
                  <span class="username">{{ u.username }}</span>
                </div>
              </td>
              <td class="email-cell">{{ u.email }}</td>
              <td>
                <p-tag [value]="u.role"
                       [severity]="u.role === 'ADMIN' ? 'danger' : 'info'">
                </p-tag>
              </td>
              <td>
                <p-tag [value]="u.active ? 'Active' : 'Inactive'"
                       [severity]="u.active ? 'success' : 'secondary'">
                </p-tag>
              </td>
              <td class="date-cell">{{ u.createdAt | date:'dd MMM yyyy' }}</td>
              <td class="date-cell">
                <span *ngIf="u.lastLogin">{{ u.lastLogin | date:'dd MMM HH:mm' }}</span>
                <span *ngIf="!u.lastLogin" class="never">Never</span>
              </td>
              <td>
                <div class="action-btns">
                  <!-- Toggle active/inactive -->
                  <button pButton
                          [icon]="u.active ? 'pi pi-ban' : 'pi pi-check'"
                          [class]="u.active ? 'p-button-text p-button-warning p-button-sm' : 'p-button-text p-button-success p-button-sm'"
                          [pTooltip]="u.active ? 'Deactivate user' : 'Activate user'"
                          (click)="confirmToggle(u)">
                  </button>

                  <!-- Switch role -->
                  <button pButton
                          [icon]="u.role === 'ADMIN' ? 'pi pi-user' : 'pi pi-shield'"
                          class="p-button-text p-button-secondary p-button-sm"
                          [pTooltip]="'Switch to ' + (u.role === 'ADMIN' ? 'ANALYST' : 'ADMIN')"
                          (click)="confirmRoleChange(u)">
                  </button>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr><td colspan="7" class="empty-msg">No users found</td></tr>
          </ng-template>
        </p-table>
      </div>

      <!-- INFO BOX -->
      <div class="info-box">
        <i class="pi pi-info-circle"></i>
        <span>To add new users, use the Register page with an Admin account. Only Admins can create accounts.</span>
      </div>
    </div>
  `,
  styles: [`
    .um-page { display:flex; flex-direction:column; gap:16px; }

    .um-header { display:flex; align-items:center; justify-content:space-between;
      background:#13151e; border:1px solid #1e2030; border-radius:14px; padding:16px 20px; }
    .um-header-left { display:flex; align-items:center; gap:14px; }
    .um-icon { width:44px; height:44px; border-radius:12px;
      background:linear-gradient(135deg,#6366f1,#a855f7);
      display:flex; align-items:center; justify-content:center; font-size:20px; color:white; }
    .um-header h2 { margin:0; font-size:17px; color:#e2e8f0; font-weight:600; }
    .um-header p  { margin:4px 0 0; font-size:12px; color:#64748b; }

    .um-stats { display:flex; gap:10px; }
    .stat-chip { display:flex; flex-direction:column; align-items:center;
      padding:10px 16px; background:#0f1117; border:1px solid #1e2030; border-radius:10px; }
    .stat-chip.admin   { border-color:rgba(239,68,68,.3); }
    .stat-chip.analyst { border-color:rgba(99,102,241,.3); }
    .stat-chip.active  { border-color:rgba(34,197,94,.3); }
    .sn { font-size:20px; font-weight:700; color:#e2e8f0; line-height:1; }
    .sl { font-size:10px; color:#64748b; margin-top:4px; }

    .table-card { background:#13151e; border:1px solid #1e2030; border-radius:12px; overflow:hidden; }

    .user-cell { display:flex; align-items:center; gap:10px; }
    .username  { font-weight:600; color:#e2e8f0; font-size:13px; }
    .email-cell { font-size:12px; color:#94a3b8; }
    .date-cell  { font-size:12px; color:#64748b; }
    .never      { color:#475569; font-style:italic; }
    .action-btns { display:flex; gap:4px; }
    .inactive-row { opacity:.55; }
    .empty-msg { text-align:center; padding:40px; color:#475569; }

    .info-box { display:flex; align-items:center; gap:10px; padding:12px 16px;
      background:rgba(99,102,241,.06); border:1px solid rgba(99,102,241,.2);
      border-radius:10px; font-size:12px; color:#94a3b8; }
    .info-box i { color:#6366f1; font-size:16px; flex-shrink:0; }
  `]
})
export class UserManagementComponent implements OnInit {
  users    = signal<AppUser[]>([]);
  loading  = signal(true);

  totalUsers  = () => this.users().length;
  adminCount  = () => this.users().filter(u => u.role === 'ADMIN').length;
  analystCount= () => this.users().filter(u => u.role === 'ANALYST').length;
  activeCount = () => this.users().filter(u => u.active).length;

  constructor(
    private http: HttpClient,
    private confirmSvc: ConfirmationService,
    private msg: MessageService
  ) {}

  ngOnInit() { this.load(); }

  load() {
    this.loading.set(true);
    this.http.get<AppUser[]>('/api/admin/users')
      .pipe(catchError(() => of([])))
      .subscribe(users => { this.users.set(users); this.loading.set(false); });
  }

  confirmToggle(user: AppUser) {
    this.confirmSvc.confirm({
      message: `${user.active ? 'Deactivate' : 'Activate'} user <strong>${user.username}</strong>?`,
      header: `${user.active ? 'Deactivate' : 'Activate'} User`,
      icon: user.active ? 'pi pi-ban' : 'pi pi-check',
      accept: () => this.toggleStatus(user)
    });
  }

  toggleStatus(user: AppUser) {
    this.http.put<AppUser>(`/api/admin/users/${user.id}/toggle-status`, {})
      .pipe(catchError(e => {
        this.msg.add({ severity: 'error', summary: 'Error', detail: e.error?.error || 'Failed' });
        return of(null);
      }))
      .subscribe(updated => {
        if (updated) {
          this.users.update(list => list.map(u => u.id === updated.id ? updated : u));
          this.msg.add({ severity: 'success', summary: 'Done',
            detail: `${updated.username} is now ${updated.active ? 'active' : 'inactive'}` });
        }
      });
  }

  confirmRoleChange(user: AppUser) {
    const newRole = user.role === 'ADMIN' ? 'ANALYST' : 'ADMIN';
    this.confirmSvc.confirm({
      message: `Change <strong>${user.username}</strong>'s role to <strong>${newRole}</strong>?`,
      header: 'Change Role',
      icon: 'pi pi-user-edit',
      accept: () => this.changeRole(user, newRole)
    });
  }

  changeRole(user: AppUser, newRole: string) {
    this.http.put<AppUser>(`/api/admin/users/${user.id}/change-role`, { role: newRole })
      .pipe(catchError(() => of(null)))
      .subscribe(updated => {
        if (updated) {
          this.users.update(list => list.map(u => u.id === updated.id ? updated : u));
          this.msg.add({ severity: 'success', summary: 'Role Changed',
            detail: `${updated.username} is now ${updated.role}` });
        }
      });
  }
}
