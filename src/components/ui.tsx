'use client';
import Link from 'next/link';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { api, money } from '@/lib/api';
export function useData<T = any>(path:string|null){
  const [data,setData]=useState<T|null>(null),[error,setError]=useState(''),[loading,setLoading]=useState(true);
  const [version,setVersion]=useState(0);
  const reload=useCallback(()=>setVersion(v=>v+1),[]);
  useEffect(()=>{let live=true;if(!path){setLoading(false);return;}setLoading(true);setError('');api<T>(path).then(d=>{if(live)setData(d);}).catch(e=>{if(live)setError(e.message);}).finally(()=>{if(live)setLoading(false);});return()=>{live=false;};},[path,version]);
  return {data,error,loading,reload};
}
export function State({loading,error,retry}:{loading:boolean;error:string;retry?:()=>void}){return loading?<div className="notice" role="status">Loading…</div>:error?<div className="notice error" role="alert">{error} {retry&&<button className="secondary" onClick={retry}>Try again</button>}</div>:null;}
export function Heading({eyebrow,title,description,action}:{eyebrow?:string;title:string;description?:string;action?:ReactNode}){return <div className="page-heading"><div>{eyebrow&&<p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{description&&<p className="muted">{description}</p>}</div>{action}</div>;}
export function Empty({children}:{children:ReactNode}){return <div className="empty">{children}</div>;}
export function Badge({children}:{children:ReactNode}){return <span className="badge">{children}</span>;}
export function CourseCard({course}:{course:any}){return <Link href={`/courses/${course.slug}`} className="course-card"><div className="course-art"><span>{course.category_name||'GENESYS CLASSROOM'}</span><strong>{course.title}</strong><span>↗</span></div><div className="course-body"><div className="row"><Badge>{course.level}</Badge><span className="muted">{course.total_lessons} lessons</span></div><h3>{course.title}</h3><p className="muted">{course.instructor_name}</p><div className="row"><strong>{Number(course.discount_price??course.price)===0?'Free':money(course.discount_price??course.price,course.currency)}</strong><span className="muted">{Number(course.avg_rating)>0?`★ ${course.avg_rating}`:'New course'}</span></div></div></Link>;}
export function Notice({message,error}:{message?:string;error?:string}){return <>{message&&<p className="notice success" role="status">{message}</p>}{error&&<p className="notice error" role="alert">{error}</p>}</>;}
