import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { ContactComponent } from './contact/contact.component';
import { LeadsComponent } from './leads/leads.component';





const routes: Routes = [
{path:'',component:DashboardComponent},
{path:'',redirectTo:'dashboard',pathMatch:'full'},
{path:'sales',component:SalesComponent},
{path:'orders',component:OrdersComponent},
{path:'customers',component:CustomersComponent},
{path:'products',component:ProductsComponent},
{path:'contact',component:ContactComponent},
{path:'leads',component:LeadsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
