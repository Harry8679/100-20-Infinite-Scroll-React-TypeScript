import type { User, Photo, PaginatedResponse } from '../types';

// Générateur de données mock
const generateUsers = (page: number, perPage: number = 10): User[] => {
  const users: User[] = [];
  const start = (page - 1) * perPage;

  const roles = ['Developer', 'Designer', 'Manager', 'Product Owner', 'QA Engineer'];
  const companies = ['TechCorp', 'StartupXYZ', 'MegaSoft', 'InnovateLab', 'DataCo'];
  const locations = ['Paris', 'Londres', 'Berlin', 'Madrid', 'Amsterdam'];

  for (let i = 0; i < perPage; i++) {
    const id = start + i + 1;
    users.push({
      id,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      avatar: `https://i.pravatar.cc/150?img=${id}`,
      role: roles[Math.floor(Math.random() * roles.length)],
      company: companies[Math.floor(Math.random() * companies.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
    });
  }

  return users;
};

const generatePhotos = (page: number, perPage: number = 12): Photo[] => {
  const photos: Photo[] = [];
  const start = (page - 1) * perPage;

  const authors = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];

  for (let i = 0; i < perPage; i++) {
    const id = start + i + 1;
    photos.push({
      id,
      title: `Photo ${id}`,
      url: `https://picsum.photos/800/600?random=${id}`,
      thumbnailUrl: `https://picsum.photos/400/300?random=${id}`,
      author: authors[Math.floor(Math.random() * authors.length)],
    });
  }

  return photos;
};

// Simuler un délai réseau
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Mock pour les utilisateurs
export const fetchUsers = async (
  page: number,
  perPage: number = 10
): Promise<PaginatedResponse<User>> => {
  await delay(1000); // Simuler la latence réseau

  // Simuler une erreur 10% du temps
  if (Math.random() < 0.1) {
    throw new Error('Erreur réseau simulée');
  }

  const totalPages = 10;
  const data = generateUsers(page, perPage);

  return {
    data,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
};

// API Mock pour les photos
export const fetchPhotos = async (
  page: number,
  perPage: number = 12
): Promise<PaginatedResponse<Photo>> => {
  await delay(800);

  if (Math.random() < 0.1) {
    throw new Error('Erreur réseau simulée');
  }

  const totalPages = 8;
  const data = generatePhotos(page, perPage);

  return {
    data,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
};

// API Mock pour la recherche
export const searchUsers = async (
  query: string,
  page: number,
  perPage: number = 10
): Promise<PaginatedResponse<User>> => {
  await delay(500);

  const allUsers = generateUsers(1, 100);
  const filtered = allUsers.filter(
    user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.role.toLowerCase().includes(query.toLowerCase())
  );

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const data = filtered.slice(start, end);
  const totalPages = Math.ceil(filtered.length / perPage);

  return {
    data,
    page,
    totalPages,
    hasMore: page < totalPages,
  };
};