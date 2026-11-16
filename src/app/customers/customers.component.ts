
import { Component, OnInit } from '@angular/core';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedDate: string;
  status: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[] = [];

  searchText = '';
  showForm = false;
  isEditMode = false;

  customerForm: Customer = this.emptyCustomer();

  constructor() {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  emptyCustomer(): Customer {
    return {
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
  }

  loadCustomers(): void {
    const savedCustomers = localStorage.getItem('customers');

    if (savedCustomers) {
      try {
        this.customers = JSON.parse(savedCustomers);
      } catch {
        this.customers = [];
      }
    } else {
      this.customers = [
        {
          id: 1001,
          name: 'John Mathew',
          email: 'john@gmail.com',
          phone: '9876543210',
          address: 'Kochi, Kerala',
          joinedDate: '2026-10-10',
          status: 'Active'
        },
        {
          id: 1002,
          name: 'Anjali Krishna',
          email: 'anjali@gmail.com',
          phone: '9876543211',
          address: 'Calicut, Kerala',
          joinedDate: '2026-10-15',
          status: 'Active'
        },
        {
          id: 1003,
          name: 'Arun Kumar',
          email: 'arun@gmail.com',
          phone: '9876543212',
          address: 'Kannur, Kerala',
          joinedDate: '2026-10-20',
          status: 'Inactive'
        },
        {
          id: 1004,
          name: 'Sneha Raj',
          email: 'sneha@gmail.com',
          phone: '9876543213',
          address: 'Thrissur, Kerala',
          joinedDate: '2026-11-01',
          status: 'Active'
        }
      ];

      this.saveCustomers();
    }
  }

  saveCustomers(): void {
    localStorage.setItem(
      'customers',
      JSON.stringify(this.customers)
    );
  }

  get filteredCustomers(): Customer[] {
    const search = this.searchText.toLowerCase().trim();

    return this.customers.filter(customer =>
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.phone.includes(search) ||
      customer.address.toLowerCase().includes(search) ||
      customer.id.toString().includes(search)
    );
  }

  openAddForm(): void {
    this.isEditMode = false;
    this.customerForm = this.emptyCustomer();

    this.customerForm.id = this.customers.length
      ? Math.max(...this.customers.map(c => c.id)) + 1
      : 1001;

    this.showForm = true;
  }

  editCustomer(customer: Customer): void {
    this.isEditMode = true;
    this.customerForm = { ...customer };
    this.showForm = true;
  }

  saveCustomer(): void {
    if (
      !this.customerForm.name.trim() ||
      !this.customerForm.email.trim() ||
      !this.customerForm.phone.trim()
    ) {
      alert('Please fill all required fields.');
      return;
    }

    if (this.isEditMode) {
      const index = this.customers.findIndex(
        customer => customer.id === this.customerForm.id
      );

      if (index !== -1) {
        this.customers[index] = { ...this.customerForm };
      }
    } else {
      this.customers.push({ ...this.customerForm });
    }

    this.saveCustomers();
    this.cancelForm();
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customers = this.customers.filter(
        customer => customer.id !== id
      );

      this.saveCustomers();
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.customerForm = this.emptyCustomer();
  }

  get totalCustomers(): number {
    return this.customers.length;
  }

  get activeCustomers(): number {
    return this.customers.filter(
      customer => customer.status === 'Active'
    ).length;
  }

  get inactiveCustomers(): number {
    return this.customers.filter(
      customer => customer.status === 'Inactive'
    ).length;
  }

  get newCustomers(): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return this.customers.filter(customer => {
      const date = new Date(customer.joinedDate);

      return date.getMonth() === currentMonth &&
             date.getFullYear() === currentYear;
    }).length;
  }
}
