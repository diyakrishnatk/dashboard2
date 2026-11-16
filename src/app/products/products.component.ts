
import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  searchText = '';
  selectedCategory = 'All';
  showForm = false;
  isEditMode = false;

  productForm: Product = this.emptyProduct();

  categories: string[] = [
    'Electronics',
    'Clothing',
    'Accessories',
    'Home Appliances',
    'Other'
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadProducts();
  }

  emptyProduct(): Product {
    return {
      id: 0,
      name: '',
      category: 'Electronics',
      price: 0,
      stock: 0,
      description: '',
      image: ''
    };
  }

  loadProducts(): void {
    const savedProducts = localStorage.getItem('products');

    if (savedProducts) {
      try {
        this.products = JSON.parse(savedProducts);
      } catch {
        this.products = [];
      }
    } else {
      this.products = [
        {
          id: 1001,
          name: 'Laptop',
          category: 'Electronics',
          price: 55000,
          stock: 15,
          description: 'High performance laptop',
          image: ''
        },
        {
          id: 1002,
          name: 'Smartphone',
          category: 'Electronics',
          price: 25000,
          stock: 8,
          description: 'Latest smartphone',
          image: ''
        },
        {
          id: 1003,
          name: 'Headphones',
          category: 'Accessories',
          price: 2500,
          stock: 0,
          description: 'Wireless headphones',
          image: ''
        },
        {
          id: 1004,
          name: 'T-Shirt',
          category: 'Clothing',
          price: 799,
          stock: 25,
          description: 'Cotton casual t-shirt',
          image: ''
        }
      ];

      this.saveProducts();
    }
  }

  saveProducts(): void {
    try {
      localStorage.setItem('products', JSON.stringify(this.products));
    } catch {
      alert('Storage is full. Please use smaller product images.');
    }
  }

  get filteredProducts(): Product[] {
    const search = this.searchText.toLowerCase().trim();

    return this.products.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.id.toString().includes(search);

      const matchesCategory =
        this.selectedCategory === 'All' ||
        product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  openAddForm(): void {
    this.isEditMode = false;
    this.productForm = this.emptyProduct();

    this.productForm.id = this.products.length
      ? Math.max(...this.products.map(p => p.id)) + 1
      : 1001;

    this.showForm = true;
  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.productForm = { ...product };
    this.showForm = true;
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image.');
      input.value = '';
      return;
    }

    if (file.size > 1024 * 1024) {
      alert('Please select an image smaller than 1 MB.');
      input.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.productForm.image = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  saveProduct(): void {
    if (
      !this.productForm.name.trim() ||
      this.productForm.price <= 0 ||
      this.productForm.stock < 0
    ) {
      alert('Please enter valid product details.');
      return;
    }

    if (this.isEditMode) {
      const index = this.products.findIndex(
        product => product.id === this.productForm.id
      );

      if (index !== -1) {
        this.products[index] = { ...this.productForm };
      }
    } else {
      this.products.push({ ...this.productForm });
    }

    this.saveProducts();
    this.cancelForm();
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products = this.products.filter(
        product => product.id !== id
      );

      this.saveProducts();
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.productForm = this.emptyProduct();
  }

  get totalProducts(): number {
    return this.products.length;
  }

  get totalStock(): number {
    return this.products.reduce(
      (total, product) => total + Number(product.stock), 0
    );
  }

  get lowStockProducts(): number {
    return this.products.filter(
      product => product.stock > 0 && product.stock <= 10
    ).length;
  }

  get outOfStockProducts(): number {
    return this.products.filter(
      product => product.stock === 0
    ).length;
  }

  getStockStatus(stock: number): string {
    if (stock === 0) {
      return 'Out of Stock';
    }

    if (stock <= 10) {
      return 'Low Stock';
    }

    return 'In Stock';
  }

  getStockClass(stock: number): string {
    if (stock === 0) {
      return 'out-of-stock';
    }

    if (stock <= 10) {
      return 'low-stock';
    }

    return 'in-stock';
  }
}
