import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Search, Image as ImageIcon } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { useAdmin } from '../contexts/AdminContext';
import { Product } from '../types';
import ProductCard from './ProductCard';
import ProductEditor from './ProductEditor';
import ParallaxManager from './ParallaxManager';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { products, deleteProduct, updateProduct, refreshProducts, loading } = useProducts();
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showParallaxManager, setShowParallaxManager] = useState(false);

  const categories = ['All', 'Electronics', 'Men', 'Women', 'Watches'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpdateProduct = useCallback(async (product: Product) => {
    try {
      await updateProduct(product);
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Failed to update product');
      throw error;
    }
  }, [updateProduct]);

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  // Rest of the component remains the same...
}