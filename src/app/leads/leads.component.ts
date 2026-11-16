
import { Component, OnInit } from '@angular/core';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  assignedTo: string;
  followUpDate: string;
  status: string;
  notes: string;
}

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  leads: Lead[] = [];

  searchText = '';
  selectedStatus = 'All';
  showForm = false;
  isEditMode = false;

  leadForm: Lead = this.emptyLead();

  sources: string[] = [
    'Website',
    'Social Media',
    'Referral',
    'Advertisement',
    'Email',
    'Other'
  ];

  statuses: string[] = [
    'New',
    'Contacted',
    'Qualified',
    'Converted',
    'Lost'
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadLeads();
  }

  emptyLead(): Lead {
    return {
      id: 0,
      name: '',
      email: '',
      phone: '',
      source: 'Website',
      assignedTo: '',
      followUpDate: new Date().toISOString().split('T')[0],
      status: 'New',
      notes: ''
    };
  }

  loadLeads(): void {
    const savedLeads = localStorage.getItem('leads');

    if (savedLeads) {
      try {
        this.leads = JSON.parse(savedLeads);
      } catch {
        this.leads = [];
      }
    } else {
      this.leads = [
        {
          id: 1001,
          name: 'Rahul Menon',
          email: 'rahul@gmail.com',
          phone: '9876543210',
          source: 'Website',
          assignedTo: 'Sales Team',
          followUpDate: '2026-11-18',
          status: 'New',
          notes: 'Interested in purchasing products.'
        },
        {
          id: 1002,
          name: 'Meera Nair',
          email: 'meera@gmail.com',
          phone: '9876543211',
          source: 'Social Media',
          assignedTo: 'Sales Team',
          followUpDate: '2026-11-19',
          status: 'Contacted',
          notes: 'Customer contacted through Instagram.'
        },
        {
          id: 1003,
          name: 'Vishnu Kumar',
          email: 'vishnu@gmail.com',
          phone: '9876543212',
          source: 'Referral',
          assignedTo: 'Admin',
          followUpDate: '2026-11-20',
          status: 'Qualified',
          notes: 'Interested customer with confirmed requirements.'
        },
        {
          id: 1004,
          name: 'Anitha Raj',
          email: 'anitha@gmail.com',
          phone: '9876543213',
          source: 'Advertisement',
          assignedTo: 'Sales Team',
          followUpDate: '2026-11-15',
          status: 'Converted',
          notes: 'Successfully converted into a customer.'
        },
        {
          id: 1005,
          name: 'Arun Das',
          email: 'arun@gmail.com',
          phone: '9876543214',
          source: 'Email',
          assignedTo: 'Admin',
          followUpDate: '2026-11-16',
          status: 'Lost',
          notes: 'Customer is not interested currently.'
        }
      ];

      this.saveLeads();
    }
  }

  saveLeads(): void {
    localStorage.setItem('leads', JSON.stringify(this.leads));
  }

  get filteredLeads(): Lead[] {
    const search = this.searchText.toLowerCase().trim();

    return this.leads.filter(lead => {

      const matchesSearch =
        lead.name.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search) ||
        lead.phone.includes(search) ||
        lead.source.toLowerCase().includes(search) ||
        lead.assignedTo.toLowerCase().includes(search) ||
        lead.id.toString().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        lead.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  openAddForm(): void {
    this.isEditMode = false;
    this.leadForm = this.emptyLead();

    this.leadForm.id = this.leads.length
      ? Math.max(...this.leads.map(l => l.id)) + 1
      : 1001;

    this.showForm = true;
  }

  editLead(lead: Lead): void {
    this.isEditMode = true;
    this.leadForm = { ...lead };
    this.showForm = true;
  }

  saveLead(): void {
    if (
      !this.leadForm.name.trim() ||
      !this.leadForm.email.trim() ||
      !this.leadForm.phone.trim()
    ) {
      alert('Please fill all required fields.');
      return;
    }

    if (this.isEditMode) {
      const index = this.leads.findIndex(
        lead => lead.id === this.leadForm.id
      );

      if (index !== -1) {
        this.leads[index] = { ...this.leadForm };
      }
    } else {
      this.leads.push({ ...this.leadForm });
    }

    this.saveLeads();
    this.cancelForm();
  }

  deleteLead(id: number): void {
    if (confirm('Are you sure you want to delete this lead?')) {
      this.leads = this.leads.filter(lead => lead.id !== id);
      this.saveLeads();
    }
  }

  updateLeadStatus(id: number, status: string): void {
    const lead = this.leads.find(l => l.id === id);

    if (lead) {
      lead.status = status;
      this.saveLeads();
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.leadForm = this.emptyLead();
  }

  get totalLeads(): number {
    return this.leads.length;
  }

  get newLeads(): number {
    return this.leads.filter(l => l.status === 'New').length;
  }

  get qualifiedLeads(): number {
    return this.leads.filter(l => l.status === 'Qualified').length;
  }

  get convertedLeads(): number {
    return this.leads.filter(l => l.status === 'Converted').length;
  }

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }
}
