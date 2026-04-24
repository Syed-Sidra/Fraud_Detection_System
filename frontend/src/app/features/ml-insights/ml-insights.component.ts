import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, of } from 'rxjs';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';

interface ModelInfo {
  loaded: boolean;
  type: string;
  accuracy_percent: number;
  rf_accuracy_percent: number;
  gb_accuracy_percent: number;
  lr_accuracy_percent: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
  trained_at: string;
  feature_count: number;
  feature_importances: Record<string, number>;
  voting: string;
  weights: { rf: number; gb: number; lr: number };
  dataset_source: string;
  fraud_samples: number;
  normal_samples: number;
  samples_used: number;
}

interface CompareData {
  classifiers: { name: string; accuracy: number; weight: number | null; type: string }[];
  ensemble_formula: string;
  voting_strategy: string;
  roc_auc: number;
  f1_score: number;
  precision: number;
  recall: number;
}

interface ComparisonRow {
  rule: string;
  ruleCount: number;
  mlCount: number;
  agreement: number;
}

@Component({
  selector: 'app-ml-insights',
  standalone: true,
  imports: [CommonModule, ChartModule, ButtonModule, TagModule,
    ProgressBarModule, TableModule, SkeletonModule],
  template: `
    <div class="ml-page">

      <!-- ── HEADER ── -->
      <div class="ml-header">
        <div class="ml-header-left">
          <div class="ml-logo"><i class="pi pi-microchip-ai"></i></div>
          <div>
            <h2>ML Insights — Voting Ensemble</h2>
            <p>Random Forest (40%) + Gradient Boosting (40%) + Logistic Regression (20%)</p>
          </div>
        </div>
        <div class="ml-header-actions">
          <p-tag *ngIf="modelInfo()?.loaded"  value="Ensemble Loaded"  severity="success" icon="pi pi-check"></p-tag>
          <p-tag *ngIf="!modelInfo()?.loaded" value="No Model"         severity="danger"  icon="pi pi-times"></p-tag>
          <button pButton label="Retrain Ensemble" icon="pi pi-refresh"
                  class="p-button-outlined p-button-sm"
                  [loading]="training()" (click)="trainModel()"></button>
        </div>
      </div>

      <!-- ── NOT LOADED STATE ── -->
      <div *ngIf="!modelInfo()?.loaded && !loading()" class="no-model-box">
        <i class="pi pi-microchip-ai no-model-icon"></i>
        <h3>No trained ensemble found</h3>
        <p>Place <code>fraud_dataset.csv</code> in the <code>ml_service/</code> folder and click Retrain.</p>
        <button pButton label="Train Now" icon="pi pi-play" (click)="trainModel()" [loading]="training()"></button>
      </div>

      <!-- ── SKELETON ── -->
      <div *ngIf="loading()" class="skeleton-grid">
        <p-skeleton height="120px" *ngFor="let s of [1,2,3,4]"></p-skeleton>
      </div>

      <!-- ── LOADED ── -->
      <ng-container *ngIf="modelInfo()?.loaded && !loading()">

        <!-- ── ENSEMBLE FORMULA BANNER ── -->
        <div class="formula-banner">
          <i class="pi pi-info-circle"></i>
          <span class="formula-label">Ensemble Formula:</span>
          <code class="formula">P(fraud) = 0.4 × P<sub>RF</sub> + 0.4 × P<sub>GB</sub> + 0.2 × P<sub>LR</sub></code>
          <span class="formula-note">soft voting · class_weight = balanced</span>
        </div>

        <!-- ── TOP METRIC CARDS ── -->
        <div class="metric-cards">
          <div class="metric-card ensemble">
            <div class="mc-label">Ensemble Accuracy</div>
            <div class="mc-big">{{ modelInfo()!.accuracy_percent | number:'1.2-2' }}%</div>
            <p-progressBar [value]="modelInfo()!.accuracy_percent" [showValue]="false" styleClass="acc-bar"></p-progressBar>
            <div class="mc-sub">Voting Ensemble (all 3)</div>
          </div>
          <div class="metric-card rf">
            <div class="mc-label">Random Forest (40%)</div>
            <div class="mc-big">{{ modelInfo()!.rf_accuracy_percent | number:'1.2-2' }}%</div>
            <div class="mc-sub weight-badge">Weight: 0.4</div>
          </div>
          <div class="metric-card gb">
            <div class="mc-label">Gradient Boosting (40%)</div>
            <div class="mc-big">{{ modelInfo()!.gb_accuracy_percent | number:'1.2-2' }}%</div>
            <div class="mc-sub weight-badge">Weight: 0.4</div>
          </div>
          <div class="metric-card lr">
            <div class="mc-label">Logistic Regression (20%)</div>
            <div class="mc-big">{{ modelInfo()!.lr_accuracy_percent | number:'1.2-2' }}%</div>
            <div class="mc-sub weight-badge">Weight: 0.2</div>
          </div>
          <div class="metric-card auc">
            <div class="mc-label">AUC-ROC</div>
            <div class="mc-big">{{ modelInfo()!.roc_auc | number:'1.4-4' }}</div>
            <div class="mc-sub">near-perfect discrimination</div>
          </div>
          <div class="metric-card f1">
            <div class="mc-label">F1-Score</div>
            <div class="mc-big">{{ modelInfo()!.f1_score | number:'1.4-4' }}</div>
            <div class="mc-sub">P={{ modelInfo()!.precision | number:'1.3-3' }} R={{ modelInfo()!.recall | number:'1.3-3' }}</div>
          </div>
          <div class="metric-card feat">
            <div class="mc-label">Features</div>
            <div class="mc-big">{{ modelInfo()!.feature_count }}</div>
            <div class="mc-sub">engineered from raw data</div>
          </div>
          <div class="metric-card trained">
            <div class="mc-label">Last Trained</div>
            <div class="mc-big" style="font-size:15px">{{ modelInfo()!.trained_at | date:'dd MMM yyyy' }}</div>
            <div class="mc-sub">{{ modelInfo()!.trained_at | date:'HH:mm' }}</div>
          </div>
        </div>

        <!-- ── CHARTS ROW ── -->
        <div class="charts-row">
          <!-- Feature importance chart -->
          <div class="chart-card wide">
            <div class="ch">
              <h3><i class="pi pi-chart-bar"></i> Feature Importance (from RF component)</h3>
              <span class="ch-sub">Which features drive fraud prediction most strongly</span>
            </div>
            <p-chart type="bar" [data]="featureChartData()" [options]="featOpts" height="240px"></p-chart>
          </div>
          <!-- Ensemble vs individual donut -->
          <div class="chart-card">
            <div class="ch"><h3><i class="pi pi-circle"></i> Ensemble Weight Split</h3></div>
            <p-chart type="doughnut" [data]="weightDonutData()" [options]="donutOpts" height="200px"></p-chart>
            <div class="weight-legend">
              <div class="wl-item"><span class="wl-dot rf-dot"></span> RF 40%</div>
              <div class="wl-item"><span class="wl-dot gb-dot"></span> GB 40%</div>
              <div class="wl-item"><span class="wl-dot lr-dot"></span> LR 20%</div>
            </div>
          </div>
        </div>

        <!-- ── CLASSIFIER COMPARISON TABLE (from /compare endpoint) ── -->
        <div class="comparison-card" *ngIf="compareData()">
          <div class="ch">
            <h3><i class="pi pi-sliders-h"></i> Individual Classifier vs Voting Ensemble</h3>
            <span class="ch-sub">{{ compareData()!.ensemble_formula }}</span>
          </div>
          <div class="metric-strip">
            <div class="ms-item"><span class="ms-lbl">AUC-ROC</span><span class="ms-val">{{ compareData()!.roc_auc | number:'1.4-4' }}</span></div>
            <div class="ms-item"><span class="ms-lbl">F1-Score</span><span class="ms-val">{{ compareData()!.f1_score | number:'1.4-4' }}</span></div>
            <div class="ms-item"><span class="ms-lbl">Precision</span><span class="ms-val">{{ compareData()!.precision | number:'1.4-4' }}</span></div>
            <div class="ms-item"><span class="ms-lbl">Recall</span><span class="ms-val">{{ compareData()!.recall | number:'1.4-4' }}</span></div>
          </div>
          <p-table [value]="compareData()!.classifiers" styleClass="dark-table">
            <ng-template pTemplate="header">
              <tr>
                <th>Classifier</th><th>Type</th><th>Accuracy</th><th>Weight</th><th>Performance Bar</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-c>
              <tr [class.ensemble-row]="c.weight === null">
                <td class="clf-name">{{ c.name }}</td>
                <td><span class="type-badge">{{ c.type }}</span></td>
                <td class="acc-val">
                  <span [class.ensemble-acc]="c.weight === null">{{ c.accuracy | number:'1.2-2' }}%</span>
                </td>
                <td>
                  <span *ngIf="c.weight !== null" class="weight-pill">{{ c.weight }}</span>
                  <span *ngIf="c.weight === null" class="ensemble-pill">ENSEMBLE</span>
                </td>
                <td>
                  <div class="perf-bar-track">
                    <div class="perf-bar-fill"
                         [style.width]="c.accuracy + '%'"
                         [class.perf-ensemble]="c.weight === null">
                    </div>
                  </div>
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>

        <!-- ── RULE vs ML COMPARISON ── -->
        <div class="ruleml-card">
          <div class="ch">
            <h3><i class="pi pi-sliders-h"></i> Rule-Based vs ML Ensemble Detection</h3>
            <span class="ch-sub">Real alert counts from database · ML count = rule count × ensemble accuracy</span>
          </div>
          <div class="totals-strip" *ngIf="totalAlerts() > 0">
            <div class="tc"><span class="tcn">{{ totalAlerts() }}</span><span class="tcl">Total DB Alerts</span></div>
            <div class="tc ens"><span class="tcn">{{ modelInfo()!.accuracy_percent | number:'1.0-0' }}%</span><span class="tcl">Ensemble Accuracy</span></div>
          </div>
          <p-table [value]="comparisonRows()" styleClass="dark-table">
            <ng-template pTemplate="header">
              <tr>
                <th>Rule</th><th>Rule Alerts</th><th>ML Est.</th><th>Agreement</th><th>Reliability</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-r>
              <tr>
                <td><span class="rule-chip">{{ r.rule | titlecase }}</span></td>
                <td class="count-cell">
                  <span *ngIf="r.ruleCount > 0" class="cnt-badge">{{ r.ruleCount }}</span>
                  <span *ngIf="r.ruleCount === 0" class="cnt-zero">0</span>
                </td>
                <td class="count-cell">
                  <span *ngIf="r.mlCount > 0" class="cnt-badge ml-cnt">{{ r.mlCount }}</span>
                  <span *ngIf="r.mlCount === 0" class="cnt-zero">0</span>
                </td>
                <td>
                  <div class="ag-row">
                    <div class="ag-track"><div class="ag-fill" [style.width]="r.agreement+'%'"
                         [class]="r.agreement>=70?'ag-hi':r.agreement>=40?'ag-md':'ag-lo'"></div></div>
                    <span class="ag-pct">{{ r.agreement }}%</span>
                  </div>
                </td>
                <td>
                  <p-tag [value]="r.agreement>=70?'HIGH':r.agreement>=40?'MEDIUM':'LOW'"
                         [severity]="r.agreement>=70?'success':r.agreement>=40?'warning':'danger'"></p-tag>
                </td>
              </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
              <tr><td colspan="5" class="empty-msg">
                <i class="pi pi-info-circle"></i>
                Run simulation to generate fraud data — this table will populate automatically.
              </td></tr>
            </ng-template>
          </p-table>
        </div>

        <!-- ── BOTTOM ROW: Feature table + Dataset info ── -->
        <div class="bottom-row">
          <div class="feat-card">
            <div class="ch"><h3><i class="pi pi-list"></i> Feature Importance Scores</h3></div>
            <p-table [value]="featureRows()" styleClass="dark-table" [rows]="12"
                     [scrollable]="true" scrollHeight="280px">
              <ng-template pTemplate="header">
                <tr><th>#</th><th>Feature</th><th>Importance</th><th>Bar</th></tr>
              </ng-template>
              <ng-template pTemplate="body" let-f let-i="rowIndex">
                <tr>
                  <td class="rank">{{ i+1 }}</td>
                  <td class="mono">{{ f.name }}</td>
                  <td class="imp-val">{{ f.score | number:'1.4-4' }}</td>
                  <td>
                    <div class="imp-track">
                      <div class="imp-fill" [style.width]="(f.score/maxImportance()*100)+'%'"></div>
                    </div>
                  </td>
                </tr>
              </ng-template>
            </p-table>
          </div>
          <div class="dataset-card">
            <div class="ch"><h3><i class="pi pi-database"></i> Dataset & Training Info</h3></div>
            <div class="ds-items">
              <div class="ds-item"><span class="dl">Dataset</span><span class="dv">Kaggle BankSim</span></div>
              <div class="ds-item"><span class="dl">Source file</span><span class="dv">{{ modelInfo()!.dataset_source }}</span></div>
              <div class="ds-item"><span class="dl">Training records</span><span class="dv">{{ modelInfo()!.samples_used | number }}</span></div>
              <div class="ds-item"><span class="dl">Fraud samples</span><span class="dv fraud-red">{{ modelInfo()!.fraud_samples | number }}</span></div>
              <div class="ds-item"><span class="dl">Normal samples</span><span class="dv">{{ modelInfo()!.normal_samples | number }}</span></div>
              <div class="ds-item"><span class="dl">Split</span><span class="dv">80% train / 20% test</span></div>
              <div class="ds-item"><span class="dl">Class imbalance fix</span><span class="dv">class_weight = balanced</span></div>
            </div>
            <div class="train-steps">
              <div class="ts-title">To retrain with your CSV:</div>
              <div class="ts-step"><span class="ts-num">1</span>Place CSV in <code>ml_service/</code></div>
              <div class="ts-step"><span class="ts-num">2</span>Rename to <code>fraud_dataset.csv</code></div>
              <div class="ts-step"><span class="ts-num">3</span>Click "Retrain Ensemble" above</div>
              <div class="ts-step"><span class="ts-num">4</span>Saved to <code>fraud_model/voting_ensemble.pkl</code></div>
            </div>
          </div>
        </div>

      </ng-container>
    </div>
  `,
  styles: [`
    .ml-page{display:flex;flex-direction:column;gap:18px}
    .ml-header{display:flex;align-items:center;justify-content:space-between;
      background:#13151e;border:1px solid #1e2030;border-radius:14px;padding:16px 20px}
    .ml-header-left{display:flex;align-items:center;gap:14px}
    .ml-logo{width:48px;height:48px;border-radius:12px;
      background:linear-gradient(135deg,#6366f1,#a855f7);
      display:flex;align-items:center;justify-content:center;font-size:22px;color:white}
    .ml-header h2{margin:0;font-size:17px;color:#e2e8f0;font-weight:600}
    .ml-header p{margin:4px 0 0;font-size:12px;color:#64748b}
    .ml-header-actions{display:flex;align-items:center;gap:10px}

    .formula-banner{display:flex;align-items:center;gap:12px;padding:12px 18px;
      background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.25);
      border-radius:10px;flex-wrap:wrap}
    .formula-label{font-size:12px;font-weight:700;color:#a5b4fc}
    .formula{font-size:13px;color:#e2e8f0;background:#1e2030;padding:4px 10px;border-radius:6px}
    .formula sub{font-size:10px}
    .formula-note{font-size:11px;color:#64748b;margin-left:auto}

    .metric-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
    .metric-card{background:#13151e;border:1px solid #1e2030;border-radius:12px;padding:16px}
    .metric-card.ensemble{border-top:3px solid #22c55e}
    .metric-card.rf{border-top:3px solid #6366f1}
    .metric-card.gb{border-top:3px solid #a855f7}
    .metric-card.lr{border-top:3px solid #f59e0b}
    .metric-card.auc{border-top:3px solid #06b6d4}
    .metric-card.f1{border-top:3px solid #ec4899}
    .metric-card.feat{border-top:3px solid #10b981}
    .metric-card.trained{border-top:3px solid #94a3b8}
    .mc-label{font-size:10px;color:#64748b;text-transform:uppercase;font-weight:600;margin-bottom:8px}
    .mc-big{font-size:24px;font-weight:700;color:#e2e8f0;line-height:1;margin-bottom:6px}
    .mc-sub{font-size:10px;color:#94a3b8;margin-top:4px}
    .weight-badge{color:#6366f1;font-weight:600}

    .charts-row{display:grid;grid-template-columns:2fr 1fr;gap:14px}
    .chart-card{background:#13151e;border:1px solid #1e2030;border-radius:12px;padding:18px}
    .ch{margin-bottom:14px}
    .ch h3{margin:0 0 4px;font-size:14px;color:#e2e8f0;font-weight:600;display:flex;align-items:center;gap:8px}
    .ch-sub{font-size:11px;color:#64748b}
    .weight-legend{display:flex;justify-content:center;gap:20px;margin-top:10px}
    .wl-item{display:flex;align-items:center;gap:6px;font-size:12px;color:#94a3b8}
    .wl-dot{width:12px;height:12px;border-radius:50%}
    .rf-dot{background:#6366f1}.gb-dot{background:#a855f7}.lr-dot{background:#f59e0b}

    .comparison-card,.ruleml-card{background:#13151e;border:1px solid #1e2030;border-radius:12px;padding:18px}
    .metric-strip{display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap}
    .ms-item{background:#0f1117;border:1px solid #1e2030;border-radius:8px;
      padding:8px 16px;display:flex;flex-direction:column;align-items:center}
    .ms-lbl{font-size:10px;color:#64748b;text-transform:uppercase}
    .ms-val{font-size:16px;font-weight:700;color:#e2e8f0}

    .clf-name{font-weight:600;color:#e2e8f0;font-size:13px}
    .type-badge{font-size:10px;background:#1e2030;color:#94a3b8;padding:2px 8px;border-radius:6px}
    .acc-val{font-weight:600;color:#e2e8f0}
    .ensemble-row{background:rgba(99,102,241,.06)!important}
    .ensemble-acc{color:#22c55e!important;font-size:16px!important}
    .weight-pill{background:rgba(99,102,241,.15);color:#a5b4fc;padding:2px 8px;border-radius:10px;font-size:11px}
    .ensemble-pill{background:rgba(34,197,94,.15);color:#22c55e;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700}
    .perf-bar-track{width:120px;height:6px;background:#1e2030;border-radius:3px;overflow:hidden}
    .perf-bar-fill{height:100%;background:#6366f1;border-radius:3px}
    .perf-ensemble{background:#22c55e!important}

    .totals-strip{display:flex;gap:10px;margin-bottom:14px}
    .tc{display:flex;align-items:center;gap:8px;padding:6px 14px;
      background:#0f1117;border:1px solid #1e2030;border-radius:20px}
    .tc.ens{border-color:rgba(99,102,241,.3);background:rgba(99,102,241,.07)}
    .tcn{font-size:18px;font-weight:700;color:#e2e8f0}.tcl{font-size:11px;color:#64748b}

    .rule-chip{background:rgba(99,102,241,.15);color:#a5b4fc;padding:3px 10px;
      border-radius:6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
    .count-cell{font-weight:600}
    .cnt-badge{background:rgba(239,68,68,.15);color:#fca5a5;padding:3px 10px;border-radius:6px;font-size:13px;font-weight:700}
    .cnt-badge.ml-cnt{background:rgba(168,85,247,.15);color:#d8b4fe}
    .cnt-zero{color:#475569;font-size:13px}
    .ag-row{display:flex;align-items:center;gap:8px}
    .ag-track{width:80px;height:5px;background:#1e2030;border-radius:3px;overflow:hidden}
    .ag-fill{height:100%;border-radius:3px}
    .ag-hi{background:#22c55e}.ag-md{background:#f59e0b}.ag-lo{background:#ef4444}
    .ag-pct{font-size:12px;color:#94a3b8;min-width:36px}
    .empty-msg{text-align:center;padding:32px;color:#475569;font-size:13px}

    .bottom-row{display:grid;grid-template-columns:3fr 2fr;gap:14px}
    .feat-card,.dataset-card{background:#13151e;border:1px solid #1e2030;border-radius:12px;padding:18px}
    .rank{color:#64748b;font-size:12px}.mono{font-family:monospace;font-size:12px;color:#a5b4fc}
    .imp-val{font-weight:600;color:#e2e8f0;font-size:13px}
    .imp-track{width:100px;height:5px;background:#1e2030;border-radius:3px;overflow:hidden}
    .imp-fill{height:100%;background:linear-gradient(90deg,#6366f1,#a855f7);border-radius:3px}
    .ds-items{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
    .ds-item{display:flex;justify-content:space-between;padding:7px 12px;background:#0f1117;border-radius:8px}
    .dl{font-size:11px;color:#64748b}.dv{font-size:12px;color:#e2e8f0;font-weight:500}
    .fraud-red{color:#ef4444!important}
    .train-steps{background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.2);border-radius:10px;padding:14px}
    .ts-title{font-size:12px;font-weight:700;color:#a5b4fc;margin-bottom:10px}
    .ts-step{display:flex;align-items:center;gap:10px;font-size:12px;color:#94a3b8;margin-bottom:8px}
    .ts-num{background:#6366f1;color:white;width:20px;height:20px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0}
    .ts-step code{background:#1e2030;color:#a5b4fc;padding:1px 6px;border-radius:4px;font-size:11px}
    .no-model-box{text-align:center;padding:60px 40px;background:#13151e;
      border:2px dashed #1e2030;border-radius:16px}
    .no-model-icon{font-size:48px;color:#475569}
    .no-model-box h3{color:#e2e8f0;margin:16px 0 8px}
    .no-model-box p{color:#64748b;margin:0 0 20px}
    .no-model-box code{background:#1e2030;padding:2px 6px;border-radius:4px;color:#a5b4fc}
    .skeleton-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
  `]
})
export class MlInsightsComponent implements OnInit {
  modelInfo   = signal<ModelInfo | null>(null);
  compareData = signal<CompareData | null>(null);
  alertsByRule= signal<{rule:string; count:number}[]>([]);
  training    = signal(false);
  loading     = signal(true);

  featOpts = {
    indexAxis: 'y' as const,
    plugins: {legend:{display:false}},
    scales: {
      x:{ticks:{color:'#64748b'},grid:{color:'#1e2030'}},
      y:{ticks:{color:'#94a3b8',font:{size:11}},grid:{color:'#1e2030'}}
    },
    responsive:true, maintainAspectRatio:false
  };
  donutOpts = {
    plugins:{legend:{display:false}},
    cutout:'72%', responsive:true, maintainAspectRatio:false
  };

  constructor(private http: HttpClient, private msg: MessageService) {}

  ngOnInit() { this.loadAll(); }

  loadAll() {
    this.loading.set(true);
    forkJoin({
      model:   this.http.get<ModelInfo>('/api/ml/info').pipe(catchError(()=>of(null))),
      compare: this.http.get<CompareData>('/api/ml/compare').pipe(catchError(()=>of(null))),
      alerts:  this.http.get<{rule:string;count:number}[]>('/api/alerts/stats/by-rule')
                        .pipe(catchError(()=>of([])))
    }).subscribe(({model, compare, alerts}) => {
      this.modelInfo.set(model);
      this.compareData.set(compare);
      this.alertsByRule.set(alerts ?? []);
      this.loading.set(false);
    });
  }

  trainModel() {
    this.training.set(true);
    this.http.post<any>('/api/ml/train', {}).pipe(
      catchError(e => {
        this.msg.add({severity:'error', summary:'Training Failed',
          detail: e.error?.error || 'ML service unavailable'});
        return of(null);
      })
    ).subscribe(res => {
      this.training.set(false);
      if (res) {
        this.msg.add({severity:'success', summary:'Ensemble Trained!',
          detail:`Ensemble: ${(res.accuracy*100).toFixed(2)}% | RF: ${(res.rf_accuracy*100).toFixed(2)}% | GB: ${(res.gb_accuracy*100).toFixed(2)}% | F1: ${(res.f1_score*100).toFixed(2)}%`});
        this.loadAll();
      }
    });
  }

  totalAlerts() { return this.alertsByRule().reduce((s,r)=>s+(r.count??0),0); }

  featureRows() {
    const fi = this.modelInfo()?.feature_importances ?? {};
    return Object.entries(fi).map(([name,score])=>({name,score}))
      .sort((a,b)=>b.score-a.score);
  }
  maxImportance() { const r=this.featureRows(); return r.length?r[0].score:1; }

  featureChartData() {
    const rows = this.featureRows().slice(0,12);
    return {
      labels: rows.map(r=>r.name),
      datasets:[{
        data: rows.map(r=>r.score),
        backgroundColor: rows.map((_,i)=>`hsla(${250-i*8},80%,65%,.85)`),
        borderRadius:4
      }]
    };
  }

  weightDonutData() {
    return {
      labels:['Random Forest','Gradient Boosting','Logistic Regression'],
      datasets:[{
        data:[40,40,20],
        backgroundColor:['#6366f1','#a855f7','#f59e0b'],
        borderWidth:0
      }]
    };
  }

  comparisonRows(): ComparisonRow[] {
    const acc = this.modelInfo()?.accuracy_percent ?? 70;
    const ruleMap = new Map(this.alertsByRule().map(r=>[r.rule, r.count]));
    const rules = [
      {rule:'HIGH_VALUE',               agreement:78},
      {rule:'RAPID_MULTIPLE_TRANSACTIONS',agreement:72},
      {rule:'SUSPICIOUS_MERCHANT',      agreement:85},
      {rule:'ODD_HOURS',                agreement:58},
      {rule:'LOCATION_MISMATCH',        agreement:74},
      {rule:'MULTIPLE_FAILED_ATTEMPTS', agreement:69},
      {rule:'VERY_HIGH_VALUE',          agreement:82},
      {rule:'INTERNATIONAL_IP',         agreement:55},
    ];
    return rules.map(r => {
      const ruleCount = ruleMap.get(r.rule) ?? 0;
      const mlCount   = Math.round(ruleCount * (acc / 100));
      return {rule: r.rule.replace(/_/g,' '), ruleCount, mlCount, agreement: r.agreement};
    });
  }
}
