import { redirect } from 'next/navigation';

export default function HomeRedirect() {
  redirect('/home');
  return null; 
}