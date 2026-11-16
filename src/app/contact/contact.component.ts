
import { Component, OnInit } from '@angular/core';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contacts: Contact[] = [];

  searchText = '';
  selectedStatus = 'All';
  showForm = false;
  showMessage = false;
  isEditMode = false;

  selectedContact: Contact | null = null;

  contactForm: Contact = this.emptyContact();

  constructor() {}

  ngOnInit(): void {
    this.loadContacts();
  }

  emptyContact(): Contact {
    return {
      id: 0,
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
  }

  loadContacts(): void {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      try {
        this.contacts = JSON.parse(savedContacts);
      } catch {
        this.contacts = [];
      }
    } else {
      this.contacts = [
        {
          id: 1001,
          name: 'John Mathew',
          email: 'john@gmail.com',
          phone: '9876543210',
          subject: 'Product Enquiry',
          message: 'I would like to know more about your available products and pricing.',
          date: '2026-11-10',
          status: 'New'
        },
        {
          id: 1002,
          name: 'Anjali Krishna',
          email: 'anjali@gmail.com',
          phone: '9876543211',
          subject: 'Order Support',
          message: 'I need an update about my recent order.',
          date: '2026-11-12',
          status: 'Read'
        },
        {
          id: 1003,
          name: 'Arun Kumar',
          email: 'arun@gmail.com',
          phone: '9876543212',
          subject: 'Payment Issue',
          message: 'My payment was completed but I have not received confirmation.',
          date: '2026-11-14',
          status: 'Replied'
        }
      ];

      this.saveContacts();
    }
  }

  saveContacts(): void {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }

  get filteredContacts(): Contact[] {
    const search = this.searchText.toLowerCase().trim();

    return this.contacts.filter(contact => {
      const matchesSearch =
        contact.name.toLowerCase().includes(search) ||
        contact.email.toLowerCase().includes(search) ||
        contact.subject.toLowerCase().includes(search) ||
        contact.phone.includes(search) ||
        contact.id.toString().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        contact.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  openAddForm(): void {
    this.isEditMode = false;
    this.contactForm = this.emptyContact();

    this.contactForm.id = this.contacts.length
      ? Math.max(...this.contacts.map(c => c.id)) + 1
      : 1001;

    this.showForm = true;
  }

  editContact(contact: Contact): void {
    this.isEditMode = true;
    this.contactForm = { ...contact };
    this.showForm = true;
  }

  saveContact(): void {
    if (
      !this.contactForm.name.trim() ||
      !this.contactForm.email.trim() ||
      !this.contactForm.subject.trim() ||
      !this.contactForm.message.trim()
    ) {
      alert('Please fill all required fields.');
      return;
    }

    if (this.isEditMode) {
      const index = this.contacts.findIndex(
        contact => contact.id === this.contactForm.id
      );

      if (index !== -1) {
        this.contacts[index] = { ...this.contactForm };
      }
    } else {
      this.contacts.push({ ...this.contactForm });
    }

    this.saveContacts();
    this.cancelForm();
  }

  viewMessage(contact: Contact): void {
    this.selectedContact = { ...contact };
    this.showMessage = true;

    if (contact.status === 'New') {
      this.updateStatus(contact.id, 'Read');
      this.selectedContact.status = 'Read';
    }
  }

  closeMessage(): void {
    this.showMessage = false;
    this.selectedContact = null;
  }

  updateStatus(id: number, status: string): void {
    const contact = this.contacts.find(c => c.id === id);

    if (contact) {
      contact.status = status;
      this.saveContacts();

      if (this.selectedContact?.id === id) {
        this.selectedContact.status = status;
      }
    }
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this message?')) {
      this.contacts = this.contacts.filter(
        contact => contact.id !== id
      );

      this.saveContacts();

      if (this.selectedContact?.id === id) {
        this.closeMessage();
      }
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.contactForm = this.emptyContact();
  }

  get totalContacts(): number {
    return this.contacts.length;
  }

  get newMessages(): number {
    return this.contacts.filter(c => c.status === 'New').length;
  }

  get readMessages(): number {
    return this.contacts.filter(c => c.status === 'Read').length;
  }

  get repliedMessages(): number {
    return this.contacts.filter(c => c.status === 'Replied').length;
  }
}
