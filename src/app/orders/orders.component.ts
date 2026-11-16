
import { Component, OnInit } from '@angular/core';

interface Order {
  id: number;
  customerName: string;
  product: string;
  orderDate: string;
  amount: number;
  paymentStatus: string;
  status: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];

  searchText = '';
  showForm = false;
  isEditMode = false;

  orderForm: Order = this.emptyOrder();

  constructor() {}

  ngOnInit(): void {
    this.loadOrders();
  }

  emptyOrder(): Order {
    return {
      id: 0,
      customerName: '',
      product: '',
      orderDate: new Date().toISOString().split('T')[0],
      amount: 0,
      paymentStatus: 'Pending',
      status: 'Processing'
    };
  }

  loadOrders(): void {
    const savedOrders = localStorage.getItem('orders');

    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    } else {
      this.orders = [
        {
          id: 1001,
          customerName: 'John Mathew',
          product: 'Laptop',
          orderDate: '2026-11-10',
          amount: 55000,
          paymentStatus: 'Paid',
          status: 'Delivered'
        },
        {
          id: 1002,
          customerName: 'Anjali Krishna',
          product: 'Mobile Phone',
          orderDate: '2026-11-12',
          amount: 25000,
          paymentStatus: 'Pending',
          status: 'Processing'
        },
        {
          id: 1003,
          customerName: 'Arun Kumar',
          product: 'Headphones',
          orderDate: '2026-11-14',
          amount: 2500,
          paymentStatus: 'Paid',
          status: 'Shipped'
        }
      ];

      this.saveOrders();
    }
  }

  saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  get filteredOrders(): Order[] {
    const search = this.searchText.toLowerCase();

    return this.orders.filter(order =>
      order.customerName.toLowerCase().includes(search) ||
      order.product.toLowerCase().includes(search) ||
      order.id.toString().includes(search) ||
      order.status.toLowerCase().includes(search)
    );
  }

  openAddForm(): void {
    this.isEditMode = false;
    this.orderForm = this.emptyOrder();
    this.orderForm.id = this.orders.length
      ? Math.max(...this.orders.map(o => o.id)) + 1
      : 1001;

    this.showForm = true;
  }

  editOrder(order: Order): void {
    this.isEditMode = true;
    this.orderForm = { ...order };
    this.showForm = true;
  }

  saveOrder(): void {
    if (
      !this.orderForm.customerName.trim() ||
      !this.orderForm.product.trim() ||
      this.orderForm.amount <= 0
    ) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (this.isEditMode) {
      const index = this.orders.findIndex(
        order => order.id === this.orderForm.id
      );

      if (index !== -1) {
        this.orders[index] = { ...this.orderForm };
      }
    } else {
      this.orders.push({ ...this.orderForm });
    }

    this.saveOrders();
    this.cancelForm();
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orders = this.orders.filter(order => order.id !== id);
      this.saveOrders();
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.orderForm = this.emptyOrder();
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  get totalRevenue(): number {
    return this.orders
      .filter(order => order.paymentStatus === 'Paid')
      .reduce((total, order) => total + Number(order.amount), 0);
  }

  get pendingOrders(): number {
    return this.orders.filter(
      order => order.status === 'Processing'
    ).length;
  }

  get deliveredOrders(): number {
    return this.orders.filter(
      order => order.status === 'Delivered'
    ).length;
  }
}
