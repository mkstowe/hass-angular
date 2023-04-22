import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { HassService } from 'src/app/services/HassService';
import { Chart, ChartConfiguration } from 'chart.js';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StateOptions } from 'src/app/shared/core.models';
import 'chartjs-adapter-moment';
import { default as Annotation } from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-state-graph',
  templateUrl: './state-graph.component.html',
  styleUrls: ['./state-graph.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StateGraphComponent implements OnInit {
  public entity: any;
  public entityName: string;
  public stateOptions: StateOptions;

  public chartData: ChartConfiguration['data'];

  public chartOptions: ChartConfiguration['options'];

  constructor(
    private hassService: HassService,
    @Inject(MAT_DIALOG_DATA)
    data: { entity: any; entityName: string; stateOptions: StateOptions }
  ) {
    this.entity = data.entity;
    this.entityName = data.entityName;
    this.stateOptions = data.stateOptions;

    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.chartOptions = {
      parsing: false,
      scales: {
        x: {
          type: 'time',
          ticks: {
            source: 'auto',
            autoSkip: true,
          },
        },
        y: {
          position: 'left',
          title: {
            display: true,
            text: this.entity.attributes.unit_of_measurement,
            color: '#d8dae6',
            font: {
              size: 14,
            },
          },
        },
      },

      plugins: {
        legend: { display: false },
        decimation: {
          enabled: true,
          algorithm: 'lttb',
          samples: 100,
          threshold: 1,
        },
        annotation: {
          annotations: [
            {
              type: 'line',
              borderColor: '#d8dae6',
              borderDash: [6, 6],
              borderDashOffset: 0,
              borderWidth: 1,
              label: {
                display: true,
                backgroundColor: 'rgba(102,102,102,0.5)',
                content: () =>
                  'Average: ' + average(this.chartData)?.toFixed(2),
                position: 'end',
                yAdjust: -25,
              },
              scaleID: 'y',
              value: () => average(this.chartData) || 0,
            },
          ],
        },
      },
    };
    this.hassService
      .getEntityHistory(this.entity.entity_id)
      .subscribe((history) => {
        this.chartData = {
          datasets: [
            {
              data: (history as Array<any>)[0].map((s: any) => {
                return {
                  x: new Date(s.last_updated).getTime(),
                  y: this.stateOptions?.round ? Math.round(+s.state) : +s.state,
                };
              }),
              label: 'State',
              backgroundColor: '#252425',
              borderColor: '#678a9b',
              pointBackgroundColor: '#252425',
              pointBorderColor: '#678a9b',
              pointRadius: 3,
              pointHitRadius: 5,
              fill: 'origin',
              stepped: true,
              spanGaps: false,
            },
          ],
        };
      });
  }
}

function average(ctx: any) {
  if (!ctx) return;

  const values = ctx.datasets[0].data;
  let sum = 0;
  values.forEach((item: any) => (sum += item.y));

  return sum / values.length;
}