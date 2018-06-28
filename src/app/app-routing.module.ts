import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { CurrencyChartComponent } from './currency-chart/currency-chart.component';

const routes: Routes = [
  {path: '', component: ExpenseListComponent},
  {path: 'currency_rates', component: CurrencyChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
