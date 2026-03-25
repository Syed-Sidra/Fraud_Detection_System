import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-simulation',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, DropdownModule,
    InputNumberModule, TagModule, ToggleButtonModule],
  template: `
    <div class="sim-page">

      <!-- STATUS HEADER -->
      <div class="sim-status-bar" [class.running]="status().running">
        <div class="sim-indicator">
          <div class="indicator-dot" [class.active]="status().running"></div>
          <span class="indicator-text">
            Simulation {{ status().running ? 'RUNNING' : 'STOPPED' }}
          </span>
        </div>
        <div class="sim-scenario" *ngIf="status().running">
          <i class="pi pi-play-circle"></i>
          Scenario: <strong>{{ status().scenario }}</strong>
        </div>
      </div>

      <div class="sim-layout">

        <!-- LEFT: CONTROL PANEL -->
        <div class="sim-controls">
          <div class="ctrl-card">
            <h3><i class="pi pi-sliders-h"></i> Simulation Control</h3>

            <div class="ctrl-group">
              <label>Fraud Scenario</label>
              <p-dropdown [(ngModel)]="selectedScenario" [options]="scenarios"
                          styleClass="w-full" placeholder="Select scenario"></p-dropdown>
              <p class="scenario-desc">{{ scenarioDescriptions[selectedScenario] }}</p>
            </div>

            <div class="ctrl-actions">
              <button pButton label="Start Simulation" icon="pi pi-play"
                      class="p-button-success w-full ctrl-btn"
                      [disabled]="status().running"
                      (click)="start()"></button>
              <button pButton label="Stop Simulation" icon="pi pi-stop"
                      class="p-button-danger w-full ctrl-btn"
                      [disabled]="!status().running"
                      (click)="stop()"></button>
            </div>
          </div>

          <!-- BULK GENERATE -->
          <div class="ctrl-card">
            <h3><i class="pi pi-database"></i> Bulk Generate</h3>
            <div class="ctrl-group">
              <label>Number of Transactions</label>
              <p-inputNumber [(ngModel)]="bulkCount" [min]="1" [max]="500"
                             styleClass="w-full" placeholder="10"></p-inputNumber>
            </div>
            <div class="ctrl-group">
              <label>Scenario</label>
              <p-dropdown [(ngModel)]="bulkScenario" [options]="scenarios"
                          styleClass="w-full"></p-dropdown>
            </div>
            <button pButton label="Generate Now" icon="pi pi-bolt"
                    class="w-full ctrl-btn" [loading]="bulkLoading()"
                    (click)="generateBulk()"></button>
          </div>
        </div>

        <!-- RIGHT: SCENARIO CARDS -->
        <div class="scenario-grid">
          <h3 class="grid-title">Available Fraud Scenarios</h3>
          <div class="scenarios">
            <div *ngFor="let s of scenarioCards" class="scenario-card"
                 [class.selected]="selectedScenario === s.value"
                 (click)="selectedScenario = s.value">
              <div class="sc-icon" [style.background]="s.color + '20'"
                   [style.color]="s.color">
                <i [class]="'pi ' + s.icon"></i>
              </div>
              <div class="sc-body">
                <div class="sc-name">{{ s.label }}</div>
                <div class="sc-desc">{{ s.description }}</div>
                <div class="sc-tags">
                  <span *ngFor="let t of s.tags" class="sc-tag">{{ t }}</span>
                </div>
              </div>
              <div class="sc-risk" [style.color]="s.color">{{ s.risk }}</div>
            </div>
          </div>

          <!-- EXPECTED BEHAVIOR -->
          <div class="behavior-box" *ngIf="selectedScenario">
            <div class="beh-title">🎯 Expected Behavior</div>
            <ul class="beh-list">
              <li *ngFor="let b of scenarioBehaviors[selectedScenario]">{{ b }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sim-page { display:flex; flex-direction:column; gap:20px; }

    .sim-status-bar {
      display:flex; align-items:center; justify-content:space-between;
      padding:16px 20px; border-radius:12px; border:1px solid #1e2030;
      background:#13151e; transition:all .3s;
    }
    .sim-status-bar.running { background:rgba(34,197,94,.06); border-color:rgba(34,197,94,.3); }
    .sim-indicator { display:flex; align-items:center; gap:12px; }
    .indicator-dot { width:12px; height:12px; border-radius:50%; background:#475569; transition:all .3s; }
    .indicator-dot.active { background:#22c55e; box-shadow:0 0 12px #22c55e; animation:pulse 1.5s infinite; }
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    .indicator-text { font-size:16px; font-weight:700; color:#e2e8f0; }
    .sim-scenario { color:#22c55e; font-size:14px; display:flex; align-items:center; gap:8px; }

    .sim-layout { display:grid; grid-template-columns:320px 1fr; gap:20px; }

    .sim-controls { display:flex; flex-direction:column; gap:16px; }
    .ctrl-card { background:#13151e; border:1px solid #1e2030; border-radius:14px; padding:20px; }
    .ctrl-card h3 { margin:0 0 16px; color:#e2e8f0; font-size:15px; display:flex; align-items:center; gap:8px; }
    .ctrl-group { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
    label { color:#94a3b8; font-size:12px; font-weight:600; text-transform:uppercase; }
    .scenario-desc { font-size:12px; color:#64748b; margin:4px 0 0; font-style:italic; }
    .ctrl-actions { display:flex; flex-direction:column; gap:10px; }
    .ctrl-btn { height:42px; font-weight:600; }

    .scenario-grid { display:flex; flex-direction:column; gap:14px; }
    .grid-title { margin:0; color:#e2e8f0; font-size:15px; font-weight:600; }
    .scenarios { display:flex; flex-direction:column; gap:10px; }
    .scenario-card {
      display:flex; align-items:flex-start; gap:14px; padding:14px 16px;
      background:#13151e; border:1px solid #1e2030; border-radius:12px;
      cursor:pointer; transition:all .2s;
    }
    .scenario-card:hover { border-color:#6366f1; }
    .scenario-card.selected { border-color:#6366f1; background:rgba(99,102,241,.06); }
    .sc-icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
    .sc-body { flex:1; }
    .sc-name { font-size:14px; font-weight:600; color:#e2e8f0; margin-bottom:3px; }
    .sc-desc { font-size:12px; color:#64748b; margin-bottom:6px; }
    .sc-tags { display:flex; gap:6px; flex-wrap:wrap; }
    .sc-tag { background:#1e2030; color:#94a3b8; font-size:10px; padding:2px 8px; border-radius:4px; }
    .sc-risk { font-size:11px; font-weight:700; flex-shrink:0; }

    .behavior-box { background:rgba(99,102,241,.08); border:1px solid rgba(99,102,241,.2); border-radius:10px; padding:14px 16px; }
    .beh-title { color:#a5b4fc; font-size:13px; font-weight:700; margin-bottom:10px; }
    .beh-list { margin:0; padding-left:18px; }
    .beh-list li { color:#94a3b8; font-size:12px; margin-bottom:6px; line-height:1.5; }
  `]
})
export class SimulationComponent implements OnInit {
  status = signal({ running: false, scenario: 'MIXED' });
  bulkLoading = signal(false);
  selectedScenario = 'MIXED';
  bulkScenario = 'MIXED';
  bulkCount = 10;

  scenarios = [
    { label: 'Mixed (Random)', value: 'MIXED' },
    { label: 'Normal Only', value: 'NORMAL' },
    { label: 'High Value', value: 'HIGH_VALUE' },
    { label: 'Rapid Transactions', value: 'RAPID' },
    { label: 'Odd Hours', value: 'ODD_HOURS' },
    { label: 'Suspicious Merchant', value: 'SUSPICIOUS_MERCHANT' },
    { label: 'Location Mismatch', value: 'LOCATION_MISMATCH' },
  ];

  scenarioDescriptions: any = {
    MIXED: 'Mix of 70% normal and 30% fraudulent transactions',
    NORMAL: 'Only normal legitimate transactions — baseline testing',
    HIGH_VALUE: 'All transactions exceed ₹50,000 threshold',
    RAPID: 'Multiple transactions from same account in short time',
    ODD_HOURS: 'Transactions at 1-5 AM — unusual hours',
    SUSPICIOUS_MERCHANT: 'Transactions at gambling/crypto merchants',
    LOCATION_MISMATCH: 'Transactions from international locations',
  };

  scenarioCards = [
    { label: 'Mixed', value: 'MIXED', icon: 'pi-sliders-h', color: '#6366f1', risk: 'MEDIUM', description: 'Realistic mix for general testing', tags: ['30% fraud', 'random', 'default'] },
    { label: 'High Value', value: 'HIGH_VALUE', icon: 'pi-dollar', color: '#ef4444', risk: 'HIGH', description: 'Large amount transactions trigger amount rules', tags: ['₹10k+', 'amount rule'] },
    { label: 'Rapid Transactions', value: 'RAPID', icon: 'pi-bolt', color: '#f97316', risk: 'HIGH', description: '3+ transactions from same account in 5 minutes', tags: ['velocity', 'same account'] },
    { label: 'Odd Hours', value: 'ODD_HOURS', icon: 'pi-clock', color: '#f59e0b', risk: 'MEDIUM', description: 'Transactions at 1AM–5AM trigger odd-hours rule', tags: ['nighttime', 'timing'] },
    { label: 'Suspicious Merchant', value: 'SUSPICIOUS_MERCHANT', icon: 'pi-shop', color: '#a855f7', risk: 'CRITICAL', description: 'Casino, crypto, gambling merchant transactions', tags: ['merchant', 'high-risk'] },
    { label: 'Location Mismatch', value: 'LOCATION_MISMATCH', icon: 'pi-map-marker', color: '#06b6d4', risk: 'HIGH', description: 'Location changed to international — geo anomaly', tags: ['geo', 'IP', 'international'] },
    { label: 'Normal Only', value: 'NORMAL', icon: 'pi-check-circle', color: '#22c55e', risk: 'LOW', description: 'Clean legitimate transactions for baseline', tags: ['baseline', 'no fraud'] },
  ];

  scenarioBehaviors: any = {
    MIXED: ['~30% of transactions will be fraudulent', 'Various rules will be triggered randomly', 'Email alerts sent for HIGH/CRITICAL detections', 'Dashboard counters update every 15 seconds'],
    HIGH_VALUE: ['All amounts will be ₹50,000–₹1,00,000', 'HIGH_VALUE or VERY_HIGH_VALUE rule triggers', 'Risk score will be 20–40 points from amount alone', 'May combine with other rules for higher scores'],
    RAPID: ['Same account (ACC001) used for all transactions', '3+ in 5 minutes triggers RAPID_MULTIPLE rule', 'Risk score +30 for rapid velocity detection', 'Alerts marked MEDIUM to HIGH severity'],
    ODD_HOURS: ['Transaction hour set to 1AM–5AM', 'ODD_HOURS rule adds 15 risk points', 'Combined with amount rules → FRAUD detection', 'Common in account takeover scenarios'],
    SUSPICIOUS_MERCHANT: ['Casino Royal, CryptoExchange, GamblingHub merchants', 'SUSPICIOUS_MERCHANT rule adds 35 risk points', 'Most transactions will exceed FRAUD threshold', 'Immediate CRITICAL alerts generated'],
    LOCATION_MISMATCH: ['Previous location: Mumbai, Current: London', 'International IP addresses used', 'LOCATION_MISMATCH + INTERNATIONAL_IP = +45 points', 'High fraud rate expected'],
    NORMAL: ['Domestic locations only', 'Amounts ₹100–₹5,000', 'Private IP addresses', 'No fraud rules triggered — all NORMAL status'],
  };

  constructor(private api: ApiService, private msg: MessageService) {}

  ngOnInit() { this.refreshStatus(); }

  refreshStatus() {
    this.api.getSimulationStatus().subscribe(s => this.status.set(s));
  }

  start() {
    this.api.startSimulation(this.selectedScenario).subscribe({
      next: () => { this.refreshStatus(); this.msg.add({ severity: 'success', summary: 'Started', detail: `Simulation started: ${this.selectedScenario}` }); },
      error: () => this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to start simulation' })
    });
  }

  stop() {
    this.api.stopSimulation().subscribe({
      next: () => { this.refreshStatus(); this.msg.add({ severity: 'info', summary: 'Stopped', detail: 'Simulation has been stopped' }); },
      error: () => this.msg.add({ severity: 'error', summary: 'Error', detail: 'Failed to stop simulation' })
    });
  }

  generateBulk() {
    this.bulkLoading.set(true);
    this.api.generateBulk(this.bulkCount, this.bulkScenario).subscribe({
      next: (r) => {
        this.msg.add({ severity: 'success', summary: 'Generated', detail: `${r.generated} transactions created` });
        this.bulkLoading.set(false);
      },
      error: () => { this.msg.add({ severity: 'error', summary: 'Error', detail: 'Bulk generation failed' }); this.bulkLoading.set(false); }
    });
  }
}
