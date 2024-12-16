import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomeRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Home.tsx sayfasına yönlendir
    router.push('/home');
  }, [router]);

  return <div>Yönlendiriliyorsunuz...</div>;
};

export default HomeRedirect;