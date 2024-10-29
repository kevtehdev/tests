async function getCourses() {
  const response = await fetch('http://localhost:3000/api/courses', {
    next: { revalidate: 3600 },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) throw new Error('Failed to fetch courses');
  return response.json();
}

export default async function Home() {
  const courses = await getCourses();
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
    </div>
  );
}