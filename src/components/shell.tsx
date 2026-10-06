'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useSession } from './session';
export function Shell({children}:{children:ReactNode}){
  const {user,logout,loading}=useSession();const path=usePathname();const router=useRouter();const [error,setError]=useState('');
  const nav=[['/courses','Explore courses'],...(user?[['/dashboard','My learning'],['/purchases','Purchases'],...(user.role==='instructor'||user.role==='admin'?[['/instructor/dashboard','Teaching']]:[['/become-teacher','Become a teacher']]),...(user.role==='admin'?[['/admin','Administration']]:[]),['/profile','Profile']]:[])];
  return <><header className="site-header"><Link href="/" className="logo"><span className="logo-mark">g.</span>genesys<span className="logo-sub">LEARN. BUILD. GROW.</span></Link><nav aria-label="Main navigation">{nav.map(([href,label])=><Link key={href} className={path===href?'active':''} href={href}>{label}</Link>)}</nav><div className="account">{user?<><span>{user.first_name}</span><button className="secondary small" onClick={async()=>{try{await logout();router.push('/');}catch(e:any){setError(e.message);}}}>Sign out</button></>:!loading&&<Link className="button small" href="/login">Sign in ↗</Link>}</div></header>{error&&<p className="notice error">{error}</p>}<main id="main">{children}</main><footer><Link className="logo" href="/">genesys.</Link><p>A little progress. Every day.</p><span>© {new Date().getFullYear()} Genesys</span></footer></>;
}
