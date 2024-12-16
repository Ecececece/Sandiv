import { redirect } from 'next/navigation';

export default function HomeRedirect() {
  redirect('/Home');
  return null; 
}