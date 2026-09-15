"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── All icons inline ──────────────────────────────────────────────────────
const IC = {
  Anchor: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></svg>,
  Plus: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Refresh: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  Logout: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  X: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Copy: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Trash: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Edit: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Calendar: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Clock: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  List: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  Pen: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  Phone: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.67 3.45a2 2 0 0 1 1.95-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.1a16 16 0 0 0 6 6l1.27-.73a2 2 0 0 1 2.11.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Lock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Eye: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Shield: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Alert: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Truck: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  Package: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
  ChevDown: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>,
  Key: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
};

// ─── Types ─────────────────────────────────────────────────────────────────
type ShipmentStatus =
  | "Order Placed" | "Picked Up" | "In Transit"
  | "On Hold" | "Customs Hold" | "Pending Customs Clearance"
  | "Customs Documentation Required" | "Duty Payment Required"
  | "Customs Cleared" | "Released from Customs" | "Seized by Customs"
  | "Out for Delivery" | "Delivered" | "Exception";

interface TrackingEvent {
  status: ShipmentStatus;
  location: string;
  description: string;
  eventDate: string;
  eventTime: string;
}

interface Shipment {
  trackingNumber: string;
  senderName: string; senderPhone: string; senderAddress: string;
  receiverName: string; receiverPhone: string; receiverAddress: string;
  packageDescription: string; weight: string;
  estimatedDelivery: string; estimatedDeliveryTime: string;
  currentStatus: ShipmentStatus;
  events: TrackingEvent[];
  createdAt: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────
// Admin password is stored (hashed) in Redis via /api/admin-setup and
// /api/admin-login. No password is stored in code or .env anymore.

const STATUS_GROUPS = [
  { label: "Standard Flow",  options: ["Order Placed","Picked Up","In Transit"] },
  { label: "Hold & Customs", options: ["On Hold","Customs Hold","Pending Customs Clearance","Customs Documentation Required","Duty Payment Required","Customs Cleared","Released from Customs","Seized by Customs"] },
  { label: "Final States",   options: ["Out for Delivery","Delivered","Exception"] },
];

const SC: Record<string,{bg:string;fg:string;bd:string}> = {
  "Order Placed":                   {bg:"#EFF6FF",fg:"#1D4ED8",bd:"#BFDBFE"},
  "Picked Up":                      {bg:"#FEFCE8",fg:"#92400E",bd:"#FDE68A"},
  "In Transit":                     {bg:"#FFF7ED",fg:"#C2410C",bd:"#FED7AA"},
  "Out for Delivery":               {bg:"#F5F3FF",fg:"#6D28D9",bd:"#DDD6FE"},
  "Delivered":                      {bg:"#F0FDF4",fg:"#15803D",bd:"#BBF7D0"},
  "Exception":                      {bg:"#FEF2F2",fg:"#B91C1C",bd:"#FECACA"},
  "On Hold":                        {bg:"#FFF7ED",fg:"#9A3412",bd:"#FDBA74"},
  "Customs Hold":                   {bg:"#FEF2F2",fg:"#991B1B",bd:"#FCA5A5"},
  "Pending Customs Clearance":      {bg:"#FFFBEB",fg:"#92400E",bd:"#FCD34D"},
  "Customs Documentation Required": {bg:"#FFF1F2",fg:"#9F1239",bd:"#FECDD3"},
  "Duty Payment Required":          {bg:"#FFF7ED",fg:"#7C2D12",bd:"#FDBA74"},
  "Customs Cleared":                {bg:"#ECFDF5",fg:"#065F46",bd:"#6EE7B7"},
  "Released from Customs":          {bg:"#F0FDFA",fg:"#0F766E",bd:"#99F6E4"},
  "Seized by Customs":              {bg:"#FEF2F2",fg:"#7F1D1D",bd:"#F87171"},
};

const CUSTOMS = new Set(["On Hold","Customs Hold","Pending Customs Clearance","Customs Documentation Required","Duty Payment Required","Seized by Customs"]);

const today = () => new Date().toISOString().slice(0,10);
const nowT  = () => new Date().toTimeString().slice(0,5);

function fmtDate(d:string){
  if(!d) return "—";
  return new Date(d+"T00:00:00").toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
}
function fmtTime(t:string){
  if(!t) return "";
  const [h,m]=t.split(":").map(Number);
  return `${h%12||12}:${String(m).padStart(2,"0")} ${h>=12?"PM":"AM"}`;
}

// ─── Spinner ───────────────────────────────────────────────────────────────
function Spin({s=16,c="#fff"}:{s?:number;c?:string}){
  return <span style={{width:s,height:s,border:`2px solid rgba(255,255,255,0.2)`,borderTop:`2px solid ${c}`,borderRadius:"50%",display:"inline-block",animation:"sp .75s linear infinite",flexShrink:0}}/>;
}

// ─── Badge ─────────────────────────────────────────────────────────────────
function Badge({status}:{status:string}){
  const c=SC[status]??{bg:"#F3F4F6",fg:"#374151",bd:"#E5E7EB"};
  return(
    <span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 9px",borderRadius:999,fontSize:11,fontWeight:700,backgroundColor:c.bg,color:c.fg,border:`1px solid ${c.bd}`,whiteSpace:"nowrap"}}>
      {CUSTOMS.has(status)&&<span style={{width:5,height:5,borderRadius:"50%",backgroundColor:c.fg,animation:"pu 2s infinite"}}/>}
      {status}
    </span>
  );
}

// ─── Error banner ──────────────────────────────────────────────────────────
function ErrBanner({msg}:{msg:string}){
  if(!msg) return null;
  return(
    <div style={{backgroundColor:"#FEF2F2",border:"1px solid #FECACA",borderRadius:8,padding:"10px 13px",display:"flex",alignItems:"flex-start",gap:8}}>
      <span style={{color:"#DC2626",flexShrink:0,marginTop:1}}><IC.Alert/></span>
      <p style={{fontSize:12,color:"#B91C1C",fontWeight:600,lineHeight:1.5,wordBreak:"break-word"}}>{msg}</p>
    </div>
  );
}

// ─── Success banner ────────────────────────────────────────────────────────
function OkBanner({msg}:{msg:string}){
  if(!msg) return null;
  return(
    <div style={{backgroundColor:"#F0FDF4",border:"1px solid #BBF7D0",borderRadius:8,padding:"10px 13px",display:"flex",alignItems:"flex-start",gap:8}}>
      <span style={{color:"#15803D",flexShrink:0,marginTop:1}}><IC.Check/></span>
      <p style={{fontSize:12,color:"#15803D",fontWeight:600,lineHeight:1.5}}>{msg}</p>
    </div>
  );
}

// ─── Input field ───────────────────────────────────────────────────────────
function F({label,req,type="text",val,set,ph,pre}:{
  label:string;req?:boolean;type?:string;val:string;
  set:(v:string)=>void;ph?:string;pre?:React.ReactNode;
}){
  const [focus,setFocus]=useState(false);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      <label style={{fontSize:12,fontWeight:700,color:"#374151"}}>
        {label}{req&&<span style={{color:"#EF4444"}}> *</span>}
      </label>
      <div style={{position:"relative"}}>
        {pre&&<span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF",display:"flex",pointerEvents:"none"}}>{pre}</span>}
        <input type={type} required={req} value={val} onChange={e=>set(e.target.value)} placeholder={ph}
          onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
          style={{width:"100%",boxSizing:"border-box",padding:pre?"9px 11px 9px 30px":"9px 11px",border:`1.5px solid ${focus?"#2D6A4F":"#E5E7EB"}`,borderRadius:7,fontSize:13,outline:"none",color:"#111827",backgroundColor:"#fff",fontFamily:"inherit",transition:"border-color .15s"}}
        />
      </div>
    </div>
  );
}

// ─── Password field (with show/hide) ────────────────────────────────────────
function PwField({label,req,val,set,ph}:{
  label:string;req?:boolean;val:string;set:(v:string)=>void;ph?:string;
}){
  const [show,setShow]=useState(false);
  const [focus,setFocus]=useState(false);
  return(
    <div style={{display:"flex",flexDirection:"column",gap:5}}>
      <label style={{fontSize:12,fontWeight:700,color:"#374151"}}>
        {label}{req&&<span style={{color:"#EF4444"}}> *</span>}
      </label>
      <div style={{position:"relative"}}>
        <input type={show?"text":"password"} required={req} value={val} onChange={e=>set(e.target.value)} placeholder={ph}
          onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
          style={{width:"100%",boxSizing:"border-box",padding:"9px 38px 9px 11px",border:`1.5px solid ${focus?"#2D6A4F":"#E5E7EB"}`,borderRadius:7,fontSize:13,outline:"none",color:"#111827",backgroundColor:"#fff",fontFamily:"inherit",transition:"border-color .15s"}}
        />
        <button type="button" onClick={()=>setShow(!show)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",display:"flex"}}>
          {show?<IC.EyeOff/>:<IC.Eye/>}
        </button>
      </div>
    </div>
  );
}

// ─── Status select ─────────────────────────────────────────────────────────
function SSel({val,set}:{val:ShipmentStatus;set:(v:ShipmentStatus)=>void}){
  const [focus,setFocus]=useState(false);
  return(
    <div style={{position:"relative"}}>
      <select value={val} onChange={e=>set(e.target.value as ShipmentStatus)}
        onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
        style={{width:"100%",boxSizing:"border-box",padding:"9px 32px 9px 11px",border:`1.5px solid ${focus?"#2D6A4F":"#E5E7EB"}`,borderRadius:7,fontSize:13,outline:"none",color:"#111827",backgroundColor:"#fff",appearance:"none",cursor:"pointer",fontFamily:"inherit"}}>
        {STATUS_GROUPS.map(g=>(
          <optgroup key={g.label} label={g.label}>
            {g.options.map(o=><option key={o} value={o}>{o}</option>)}
          </optgroup>
        ))}
      </select>
      <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"#9CA3AF",display:"flex"}}><IC.ChevDown/></span>
    </div>
  );
}

// ─── Blue box ──────────────────────────────────────────────────────────────
function Box({title,sub,bg="#EFF6FF",bd="#BFDBFE",fg="#1D4ED8",children}:{
  title:string;sub?:string;bg?:string;bd?:string;fg?:string;children:React.ReactNode;
}){
  return(
    <div style={{backgroundColor:bg,border:`1px solid ${bd}`,borderRadius:9,padding:13}}>
      <p style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:"1px",color:fg,marginBottom:sub?3:10}}>{title}</p>
      {sub&&<p style={{fontSize:11,color:fg,opacity:.8,marginBottom:10}}>{sub}</p>}
      {children}
    </div>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────
function SL({children}:{children:React.ReactNode}){
  return <p style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:"1.2px",color:"#9CA3AF",marginBottom:10}}>{children}</p>;
}

// ─── Modal ─────────────────────────────────────────────────────────────────
function Modal({title,icon,onClose,children,wide=false}:{
  title:string;icon?:React.ReactNode;onClose:()=>void;
  children:React.ReactNode;wide?:boolean;
}){
  return(
    <div style={{position:"fixed",inset:0,zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backgroundColor:"rgba(0,0,0,.6)"}}>
      <motion.div initial={{opacity:0,scale:.96,y:10}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96,y:10}} transition={{duration:.18}}
        style={{backgroundColor:"#fff",borderRadius:16,boxShadow:"0 32px 80px rgba(0,0,0,.3)",width:"100%",maxWidth:wide?620:470,maxHeight:"92vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {/* header */}
        <div style={{padding:"16px 20px",borderBottom:"1px solid #F3F4F6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:15,fontWeight:800,color:"#111827"}}>{icon}{title}</div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",display:"flex",padding:4}}><IC.X/></button>
        </div>
        {/* body */}
        <div style={{overflowY:"auto",flex:1,padding:20}}>{children}</div>
      </motion.div>
    </div>
  );
}

// ─── Events manager ────────────────────────────────────────────────────────
function EventsMgr({ship,onClose,onSaved}:{ship:Shipment;onClose:()=>void;onSaved:(s:Shipment)=>void}){
  const [local,setLocal]=useState(ship);
  const [editIdx,setEditIdx]=useState<number|null>(null);
  const [ef,setEf]=useState({status:"In Transit" as ShipmentStatus,location:"",description:"",eventDate:today(),eventTime:nowT()});
  const [saving,setSaving]=useState(false);
  const [delIdx,setDelIdx]=useState<number|null>(null);
  const [err,setErr]=useState("");

  useEffect(()=>setLocal(ship),[ship]);

  const startEdit=(i:number,ev:TrackingEvent)=>{
    setErr("");setEditIdx(i);
    setEf({status:ev.status,location:ev.location,description:ev.description,eventDate:ev.eventDate||today(),eventTime:ev.eventTime||nowT()});
  };
  const saveEdit=async(e:React.FormEvent)=>{
    e.preventDefault();if(editIdx===null)return;
    setSaving(true);setErr("");
    try{
      const r=await fetch(`/api/shipments/${local.trackingNumber}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({mode:"edit-event",eventIndex:editIdx,...ef})});
      const d=await r.json();
      if(!r.ok){setErr(d.error||`Failed (status ${r.status}).`);return;}
      setLocal(d.shipment);setEditIdx(null);onSaved(d.shipment);
    }catch(e){setErr(e instanceof Error?e.message:"Network error.");}
    finally{setSaving(false);}
  };
  const delEv=async(i:number)=>{
    if(!confirm(`Delete event #${i+1}?`))return;
    setDelIdx(i);setErr("");
    try{
      const r=await fetch(`/api/shipments/${local.trackingNumber}/events`,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({eventIndex:i})});
      const d=await r.json();
      if(!r.ok){setErr(d.error||`Failed (status ${r.status}).`);return;}
      setLocal(d.shipment);if(editIdx===i)setEditIdx(null);onSaved(d.shipment);
    }catch(e){setErr(e instanceof Error?e.message:"Network error.");}
    finally{setDelIdx(null);}
  };

  return(
    <div style={{position:"fixed",inset:0,zIndex:99999,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backgroundColor:"rgba(0,0,0,.6)"}}>
      <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.96}}
        style={{backgroundColor:"#fff",borderRadius:16,boxShadow:"0 32px 80px rgba(0,0,0,.3)",width:"100%",maxWidth:660,maxHeight:"92vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"16px 20px",borderBottom:"1px solid #F3F4F6",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,fontSize:15,fontWeight:800,color:"#111827"}}>
              <span style={{color:"#7C3AED"}}><IC.List/></span> Manage Events
            </div>
            <p style={{fontSize:11,color:"#9CA3AF",fontFamily:"monospace",marginTop:2}}>{local.trackingNumber} — {local.events.length} event(s)</p>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",display:"flex"}}><IC.X/></button>
        </div>
        <div style={{overflowY:"auto",flex:1,padding:16,display:"flex",flexDirection:"column",gap:10}}>
          {local.events.length===0&&<p style={{textAlign:"center",color:"#9CA3AF",fontSize:13,padding:"32px 0"}}>No events yet.</p>}
          {local.events.map((ev,i)=>(
            <div key={i} style={{border:`1px solid ${editIdx===i?"#93C5FD":"#E5E7EB"}`,borderRadius:10,padding:13,backgroundColor:editIdx===i?"#EFF6FF":"#F9FAFB"}}>
              {editIdx===i?(
                <form onSubmit={saveEdit} style={{display:"flex",flexDirection:"column",gap:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:10,fontWeight:800,color:"#2563EB",textTransform:"uppercase",letterSpacing:"1px"}}>Editing #{i+1}</span>
                    <button type="button" onClick={()=>{setEditIdx(null);setErr("");}} style={{background:"none",border:"none",cursor:"pointer",fontSize:11,color:"#9CA3AF",textDecoration:"underline"}}>Cancel</button>
                  </div>
                  {err&&<ErrBanner msg={err}/>}
                  <div><label style={{display:"block",fontSize:12,fontWeight:700,color:"#374151",marginBottom:5}}>Status *</label><SSel val={ef.status} set={v=>setEf(p=>({...p,status:v}))}/></div>
                  <F label="Location" req val={ef.location} set={v=>setEf(p=>({...p,location:v}))} ph="e.g. Rotterdam Port"/>
                  <F label="Description" req val={ef.description} set={v=>setEf(p=>({...p,description:v}))} ph="e.g. Package arrived at facility"/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <F label="Date" req type="date" val={ef.eventDate} set={v=>setEf(p=>({...p,eventDate:v}))}/>
                    <F label="Time" req type="time" val={ef.eventTime} set={v=>setEf(p=>({...p,eventTime:v}))}/>
                  </div>
                  <button type="submit" disabled={saving} style={{backgroundColor:saving?"#93C5FD":"#2563EB",color:"#fff",border:"none",borderRadius:7,padding:"9px",fontSize:13,fontWeight:700,cursor:saving?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:6,fontFamily:"inherit"}}>
                    {saving?<><Spin s={13}/>Saving...</>:<><IC.Check/>Save Changes</>}
                  </button>
                </form>
              ):(
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap",marginBottom:5}}>
                      <span style={{fontSize:10,fontWeight:700,color:"#6B7280",backgroundColor:"#E5E7EB",borderRadius:4,padding:"1px 6px"}}>#{i+1}</span>
                      <Badge status={ev.status}/>
                    </div>
                    <p style={{fontSize:12,fontWeight:600,color:"#1F2937",marginBottom:4}}>{ev.description}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
                      <span style={{fontSize:11,color:"#6B7280"}}>📍 {ev.location}</span>
                      <span style={{fontSize:11,color:"#6B7280"}}>📅 {fmtDate(ev.eventDate)}</span>
                      <span style={{fontSize:11,color:"#6B7280"}}>🕐 {fmtTime(ev.eventTime)||"—"}</span>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:5,flexShrink:0}}>
                    <button onClick={()=>startEdit(i,ev)} style={{display:"flex",alignItems:"center",gap:4,backgroundColor:"#EFF6FF",color:"#2563EB",border:"none",borderRadius:6,padding:"5px 9px",fontSize:11,fontWeight:600,cursor:"pointer"}}>
                      <IC.Pen/>Edit
                    </button>
                    <button onClick={()=>delEv(i)} disabled={delIdx===i} style={{display:"flex",alignItems:"center",gap:4,backgroundColor:"#FEF2F2",color:"#DC2626",border:"none",borderRadius:6,padding:"5px 9px",fontSize:11,fontWeight:600,cursor:delIdx===i?"not-allowed":"pointer",opacity:delIdx===i?.6:1}}>
                      {delIdx===i?<Spin s={11} c="#DC2626"/>:<IC.Trash/>}Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════════
export default function AdminPage(){
  // auth
  const [authed,setAuthed]=useState(false);
  const [checking,setChecking]=useState(true);
  const [needsSetup,setNeedsSetup]=useState(false);

  // login
  const [pw,setPw]=useState("");
  const [showPw,setShowPw]=useState(false);
  const [loginErr,setLoginErr]=useState("");
  const [loginLoad,setLoginLoad]=useState(false);
  const [pwFocus,setPwFocus]=useState(false);

  // setup (first-time password creation)
  const [setupPw,setSetupPw]=useState("");
  const [setupConfirm,setSetupConfirm]=useState("");
  const [setupErr,setSetupErr]=useState("");
  const [settingUp,setSettingUp]=useState(false);

  // change password (from dashboard)
  const [showChangePw,setShowChangePw]=useState(false);
  const [cpCurrent,setCpCurrent]=useState("");
  const [cpNew,setCpNew]=useState("");
  const [cpConfirm,setCpConfirm]=useState("");
  const [cpErr,setCpErr]=useState("");
  const [cpOk,setCpOk]=useState("");
  const [cpSaving,setCpSaving]=useState(false);

  // data
  const [ships,setShips]=useState<Shipment[]>([]);
  const [dataLoad,setDataLoad]=useState(true);
  const [search,setSearch]=useState("");
  const [loadErr,setLoadErr]=useState("");

  // which modal is open
  const [modal,setModal]=useState<null|"create"|"update"|"delivery"|"events">(null);

  // create
  const blank={senderName:"",senderPhone:"",senderAddress:"",receiverName:"",receiverPhone:"",receiverAddress:"",packageDescription:"",weight:"",estimatedDelivery:"",estimatedDeliveryTime:"",orderDate:today(),orderTime:nowT()};
  const [cf,setCf]=useState({...blank});
  const [creating,setCreating]=useState(false);
  const [newTN,setNewTN]=useState("");
  const [copied,setCopied]=useState(false);
  const [createErr,setCreateErr]=useState("");

  // update
  const [updTarget,setUpdTarget]=useState<Shipment|null>(null);
  const [uf,setUf]=useState({status:"In Transit" as ShipmentStatus,location:"",description:"",eventDate:today(),eventTime:nowT()});
  const [updating,setUpdating]=useState(false);
  const [updateErr,setUpdateErr]=useState("");

  // delivery
  const [delTarget,setDelTarget]=useState<Shipment|null>(null);
  const [df,setDf]=useState({date:"",time:""});
  const [savingDel,setSavingDel]=useState(false);
  const [delErr,setDelErr]=useState("");

  // events
  const [evTarget,setEvTarget]=useState<Shipment|null>(null);

  // row delete
  const [deletingId,setDeletingId]=useState<string|null>(null);
  const [deleteErr,setDeleteErr]=useState("");

  // ── auth check + setup check ────────────────────────────────────────────
  useEffect(()=>{
    const init=async()=>{
      if(sessionStorage.getItem("gc_admin")==="1"){
        setAuthed(true);
        setChecking(false);
        return;
      }
      try{
        const r=await fetch("/api/admin-setup");
        const d=await r.json();
        setNeedsSetup(!d.isSetup);
      }catch{
        setNeedsSetup(false);
      }
      setChecking(false);
    };
    init();
  },[]);

  // ── fetch shipments ──────────────────────────────────────────────────────
  const load=useCallback(async()=>{
    setDataLoad(true);setLoadErr("");
    try{
      const r=await fetch("/api/shipments");
      const d=await r.json();
      if(!r.ok){setLoadErr(d.error||`Failed to load (status ${r.status}).`);setShips([]);return;}
      setShips(d.shipments??[]);
    }
    catch(e){setLoadErr(e instanceof Error?e.message:"Network error while loading shipments.");}
    finally{setDataLoad(false);}
  },[]);
  useEffect(()=>{if(authed)load();},[authed,load]);

  // ── first-time setup: create password ───────────────────────────────────
  const doSetup=async(e:React.FormEvent)=>{
    e.preventDefault();
    setSetupErr("");
    if(setupPw.length<8){setSetupErr("Password must be at least 8 characters.");return;}
    if(setupPw!==setupConfirm){setSetupErr("Passwords do not match.");return;}
    setSettingUp(true);
    try{
      const r=await fetch("/api/admin-setup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({password:setupPw,confirmPassword:setupConfirm}),
      });
      const d=await r.json();
      if(r.ok&&d.success){
        sessionStorage.setItem("gc_admin","1");
        setAuthed(true);
      }else{
        setSetupErr(d.error||"Failed to set password.");
      }
    }catch(err){
      setSetupErr(err instanceof Error?`Network error: ${err.message}`:"Network error.");
    }finally{
      setSettingUp(false);
    }
  };

  // ── login ──────────────────────────────────────────────────────────────
  const doLogin=async(e:React.FormEvent)=>{
    e.preventDefault();
    setLoginLoad(true);
    setLoginErr("");
    try{
      const r=await fetch("/api/admin-login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({password:pw}),
      });
      const d=await r.json();
      if(r.ok&&d.success){
        sessionStorage.setItem("gc_admin","1");
        setAuthed(true);
      }else{
        setLoginErr(d.error||"Incorrect password.");
      }
    }catch(err){
      setLoginErr(err instanceof Error?`Network error: ${err.message}`:"Network error.");
    }finally{
      setLoginLoad(false);
    }
  };

  // ── change password (from dashboard) ────────────────────────────────────
  const doChangePw=async(e:React.FormEvent)=>{
    e.preventDefault();
    setCpErr("");setCpOk("");
    if(cpNew.length<8){setCpErr("New password must be at least 8 characters.");return;}
    if(cpNew!==cpConfirm){setCpErr("New passwords do not match.");return;}
    setCpSaving(true);
    try{
      const r=await fetch("/api/admin-change-password",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({currentPassword:cpCurrent,newPassword:cpNew,confirmNewPassword:cpConfirm}),
      });
      const d=await r.json();
      if(r.ok&&d.success){
        setCpOk("Password changed successfully!");
        setCpCurrent("");setCpNew("");setCpConfirm("");
        setTimeout(()=>{setShowChangePw(false);setCpOk("");},1500);
      }else{
        setCpErr(d.error||"Failed to change password.");
      }
    }catch(err){
      setCpErr(err instanceof Error?`Network error: ${err.message}`:"Network error.");
    }finally{
      setCpSaving(false);
    }
  };

  // ── create ─────────────────────────────────────────────────────────────
  const doCreate=async(e:React.FormEvent)=>{
    e.preventDefault();setCreating(true);setCreateErr("");
    try{
      const r=await fetch("/api/shipments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(cf)});
      const d=await r.json();
      if(r.ok){
        setNewTN(d.trackingNumber);
        load();
      } else {
        setCreateErr(d.error || `Failed to create shipment (status ${r.status}). Check that your database is configured correctly.`);
      }
    }catch(err){
      setCreateErr(err instanceof Error ? `Network error: ${err.message}` : "Network error — could not reach the server.");
    }finally{
      setCreating(false);
    }
  };

  // ── add event ──────────────────────────────────────────────────────────
  const doUpdate=async(e:React.FormEvent)=>{
    e.preventDefault();if(!updTarget)return;
    setUpdating(true);setUpdateErr("");
    try{
      const r=await fetch(`/api/shipments/${updTarget.trackingNumber}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(uf)});
      const d=await r.json();
      if(r.ok){
        setModal(null);setUpdTarget(null);load();
      } else {
        setUpdateErr(d.error||`Failed to add event (status ${r.status}).`);
      }
    }catch(err){
      setUpdateErr(err instanceof Error?`Network error: ${err.message}`:"Network error.");
    }finally{
      setUpdating(false);
    }
  };

  // ── edit delivery ──────────────────────────────────────────────────────
  const doDelivery=async(e:React.FormEvent)=>{
    e.preventDefault();if(!delTarget||!df.date){setDelErr("Please select a date.");return;}
    setSavingDel(true);setDelErr("");
    try{
      const r=await fetch(`/api/shipments/${delTarget.trackingNumber}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({mode:"edit-delivery",estimatedDelivery:df.date,estimatedDeliveryTime:df.time})});
      const d=await r.json();
      if(!r.ok){setDelErr(d.error||`Failed (status ${r.status}).`);return;}
      setShips(p=>p.map(s=>s.trackingNumber===d.shipment.trackingNumber?d.shipment:s));
      setModal(null);setDelTarget(null);
    }catch(e){setDelErr(e instanceof Error?e.message:"Network error.");}
    finally{setSavingDel(false);}
  };

  // ── delete ─────────────────────────────────────────────────────────────
  const doDelete=async(tn:string)=>{
    if(!confirm("Delete this shipment?"))return;
    setDeletingId(tn);setDeleteErr("");
    try{
      const r=await fetch(`/api/shipments/${tn}`,{method:"DELETE"});
      if(!r.ok){
        const d=await r.json().catch(()=>({}));
        setDeleteErr(d.error||`Failed to delete (status ${r.status}).`);
        return;
      }
      load();
    }
    catch(e){setDeleteErr(e instanceof Error?e.message:"Network error while deleting.");}
    finally{setDeletingId(null);}
  };

  const evSaved=useCallback((u:Shipment)=>{
    setShips(p=>p.map(s=>s.trackingNumber===u.trackingNumber?u:s));
    setEvTarget(u);
  },[]);

  const copy=(t:string)=>{navigator.clipboard.writeText(t);setCopied(true);setTimeout(()=>setCopied(false),2000);};

  const filtered=ships.filter(s=>
    s.trackingNumber.toLowerCase().includes(search.toLowerCase())||
    s.receiverName.toLowerCase().includes(search.toLowerCase())||
    s.senderName.toLowerCase().includes(search.toLowerCase())
  );

  const stats={
    total:ships.length,
    transit:ships.filter(s=>s.currentStatus==="In Transit").length,
    delivered:ships.filter(s=>s.currentStatus==="Delivered").length,
    customs:ships.filter(s=>CUSTOMS.has(s.currentStatus)).length,
    exception:ships.filter(s=>s.currentStatus==="Exception").length,
  };

  // ── global styles ──────────────────────────────────────────────────────
  const GS=()=>(
    <style>{`
      @keyframes sp{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
      @keyframes pu{0%,100%{opacity:1}50%{opacity:.3}}
      *{box-sizing:border-box;margin:0;padding:0}
      body{margin:0;padding:0;font-family:Inter,system-ui,sans-serif}
      input,select,button,textarea{font-family:Inter,system-ui,sans-serif}
      input[type=date]::-webkit-calendar-picker-indicator,
      input[type=time]::-webkit-calendar-picker-indicator{cursor:pointer;opacity:.6}
    `}</style>
  );

  // ══════════ CHECKING ══════════
  if(checking) return(
    <div style={{minHeight:"100vh",backgroundColor:"#1B3A6B",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <GS/><Spin s={36}/>
    </div>
  );

  // ══════════ FIRST-TIME SETUP SCREEN ══════════
  if(!authed && needsSetup) return(
    <div style={{minHeight:"100vh",backgroundColor:"#1B3A6B",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <GS/>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{width:"100%",maxWidth:410}}>
        {/* logo */}
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:10}}>
            <div style={{width:42,height:42,backgroundColor:"#2D6A4F",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
              <IC.Anchor/>
            </div>
            <div style={{textAlign:"left"}}>
              <p style={{color:"#fff",fontWeight:800,fontSize:17,letterSpacing:1,lineHeight:1}}>HECKSHER</p>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:10,letterSpacing:2}}>ADMIN PORTAL</p>
            </div>
          </div>
        </div>
        {/* card */}
        <div style={{backgroundColor:"#fff",borderRadius:16,padding:"30px 26px",boxShadow:"0 24px 60px rgba(0,0,0,.35)"}}>
          <div style={{width:48,height:48,backgroundColor:"#F0FDF4",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:"#15803D"}}>
            <IC.Key/>
          </div>
          <h2 style={{fontSize:18,fontWeight:800,color:"#111827",textAlign:"center",marginBottom:4}}>Set Up Admin Access</h2>
          <p style={{fontSize:12,color:"#9CA3AF",textAlign:"center",marginBottom:22,lineHeight:1.6}}>
            No admin password exists yet. Create one now — it will be securely stored and required for future logins.
          </p>
          <form onSubmit={doSetup} style={{display:"flex",flexDirection:"column",gap:14}}>
            {setupErr&&<ErrBanner msg={setupErr}/>}
            <PwField label="New Password" req val={setupPw} set={v=>{setSetupPw(v);setSetupErr("");}} ph="At least 8 characters"/>
            <PwField label="Confirm Password" req val={setupConfirm} set={v=>{setSetupConfirm(v);setSetupErr("");}} ph="Re-enter your password"/>
            <button type="submit" disabled={settingUp||!setupPw||!setupConfirm} style={{backgroundColor:settingUp||!setupPw||!setupConfirm?"#9CA3AF":"#2D6A4F",color:"#fff",border:"none",borderRadius:8,padding:"12px",fontSize:14,fontWeight:700,cursor:settingUp||!setupPw||!setupConfirm?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {settingUp?<><Spin s={15}/>Setting up...</>:<><IC.Key/>Create Admin Password</>}
            </button>
          </form>
        </div>
        <p style={{textAlign:"center",color:"rgba(255,255,255,.3)",fontSize:11,marginTop:14}}>© Green Carrier 2026</p>
      </motion.div>
    </div>
  );

  // ══════════ LOGIN ══════════
  if(!authed) return(
    <div style={{minHeight:"100vh",backgroundColor:"#1B3A6B",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <GS/>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} style={{width:"100%",maxWidth:390}}>
        {/* logo */}
        <div style={{textAlign:"center",marginBottom:26}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:10}}>
            <div style={{width:42,height:42,backgroundColor:"#2D6A4F",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
              <IC.Anchor/>
            </div>
            <div style={{textAlign:"left"}}>
              <p style={{color:"#fff",fontWeight:800,fontSize:17,letterSpacing:1,lineHeight:1}}>HECKSHER</p>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:10,letterSpacing:2}}>ADMIN PORTAL</p>
            </div>
          </div>
        </div>
        {/* card */}
        <div style={{backgroundColor:"#fff",borderRadius:16,padding:"30px 26px",boxShadow:"0 24px 60px rgba(0,0,0,.35)"}}>
          <div style={{width:48,height:48,backgroundColor:"#EFF6FF",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",color:"#1B3A6B"}}>
            <IC.Lock/>
          </div>
          <h2 style={{fontSize:18,fontWeight:800,color:"#111827",textAlign:"center",marginBottom:4}}>Admin Login</h2>
          <p style={{fontSize:12,color:"#9CA3AF",textAlign:"center",marginBottom:22}}>Enter your password to continue</p>
          <form onSubmit={doLogin} style={{display:"flex",flexDirection:"column",gap:14}}>
            <div>
              <label style={{display:"block",fontSize:12,fontWeight:700,color:"#374151",marginBottom:5}}>Password</label>
              <div style={{position:"relative"}}>
                <input type={showPw?"text":"password"} value={pw} onChange={e=>{setPw(e.target.value);setLoginErr("");}}
                  placeholder="Enter admin password" autoFocus
                  onFocus={()=>setPwFocus(true)} onBlur={()=>setPwFocus(false)}
                  style={{width:"100%",boxSizing:"border-box",padding:"11px 40px 11px 13px",border:`1.5px solid ${pwFocus?"#2D6A4F":loginErr?"#EF4444":"#E5E7EB"}`,borderRadius:8,fontSize:14,outline:"none"}}
                />
                <button type="button" onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",display:"flex"}}>
                  {showPw?<IC.EyeOff/>:<IC.Eye/>}
                </button>
              </div>
              {loginErr&&<p style={{fontSize:11,color:"#EF4444",marginTop:5}}>⚠ {loginErr}</p>}
            </div>
            <button type="submit" disabled={loginLoad||!pw} style={{backgroundColor:loginLoad||!pw?"#9CA3AF":"#1B3A6B",color:"#fff",border:"none",borderRadius:8,padding:"12px",fontSize:14,fontWeight:700,cursor:loginLoad||!pw?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {loginLoad?<><Spin s={15}/>Verifying...</>:<><IC.Lock/>Access Dashboard</>}
            </button>
          </form>
        </div>
        <p style={{textAlign:"center",color:"rgba(255,255,255,.3)",fontSize:11,marginTop:14}}>© Green Carrier 2026</p>
      </motion.div>
    </div>
  );

  // ══════════ DASHBOARD ══════════
  return(
    <div style={{minHeight:"100vh",backgroundColor:"#F3F4F6"}}>
      <GS/>

      {/* ─── NAV ─── */}
      <div style={{backgroundColor:"#1B3A6B",position:"sticky",top:0,zIndex:200,boxShadow:"0 2px 8px rgba(0,0,0,.2)"}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:"0 20px",height:58,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          {/* logo */}
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,backgroundColor:"#2D6A4F",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
              <IC.Anchor/>
            </div>
            <div>
              <p style={{color:"#fff",fontWeight:800,fontSize:14,letterSpacing:1,lineHeight:1}}>HECKSHER</p>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:9,letterSpacing:2}}>SHIPMENT MANAGEMENT</p>
            </div>
          </div>
          {/* buttons */}
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={load} style={{display:"flex",alignItems:"center",gap:6,backgroundColor:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.85)",border:"1px solid rgba(255,255,255,.15)",borderRadius:7,padding:"7px 13px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
              <IC.Refresh/>Refresh
            </button>

            {/* ★ NEW SHIPMENT ★ */}
            <button
              onClick={()=>{setCf({...blank,orderDate:today(),orderTime:nowT()});setNewTN("");setCreateErr("");setModal("create");}}
              style={{display:"flex",alignItems:"center",gap:7,backgroundColor:"#2D6A4F",color:"#fff",border:"none",borderRadius:7,padding:"8px 18px",fontSize:13,fontWeight:800,cursor:"pointer",boxShadow:"0 2px 8px rgba(45,106,79,.4)"}}>
              <IC.Plus/>New Shipment
            </button>

            <button onClick={()=>{setCpCurrent("");setCpNew("");setCpConfirm("");setCpErr("");setCpOk("");setShowChangePw(true);}} style={{display:"flex",alignItems:"center",gap:6,backgroundColor:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.85)",border:"1px solid rgba(255,255,255,.15)",borderRadius:7,padding:"7px 13px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
              <IC.Key/>Change Password
            </button>

            <button onClick={()=>{sessionStorage.removeItem("gc_admin");setAuthed(false);}} style={{display:"flex",alignItems:"center",gap:6,backgroundColor:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)",border:"1px solid rgba(255,255,255,.15)",borderRadius:7,padding:"7px 13px",fontSize:12,fontWeight:600,cursor:"pointer"}}>
              <IC.Logout/>Logout
            </button>
          </div>
        </div>
      </div>

      {/* ─── BODY ─── */}
      <div style={{maxWidth:1400,margin:"0 auto",padding:"24px 20px"}}>

        {/* global error banners */}
        {loadErr&&<div style={{marginBottom:16}}><ErrBanner msg={`Could not load shipments: ${loadErr}`}/></div>}
        {deleteErr&&<div style={{marginBottom:16}}><ErrBanner msg={`Delete failed: ${deleteErr}`}/></div>}

        {/* stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
          {[
            {label:"Total",     val:stats.total,     Icon:IC.Package, fg:"#1B3A6B",bg:"#EFF6FF"},
            {label:"In Transit",val:stats.transit,   Icon:IC.Truck,   fg:"#C2410C",bg:"#FFF7ED"},
            {label:"Delivered", val:stats.delivered, Icon:IC.Check,   fg:"#15803D",bg:"#F0FDF4"},
            {label:"Customs",   val:stats.customs,   Icon:IC.Shield,  fg:"#92400E",bg:"#FFFBEB"},
            {label:"Exception", val:stats.exception, Icon:IC.Alert,   fg:"#B91C1C",bg:"#FEF2F2"},
          ].map(({label,val,Icon,fg,bg})=>(
            <div key={label} style={{backgroundColor:"#fff",borderRadius:10,padding:"14px 16px",border:"1px solid #F3F4F6",boxShadow:"0 1px 3px rgba(0,0,0,.05)"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
                <p style={{fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:".5px"}}>{label}</p>
                <div style={{width:28,height:28,backgroundColor:bg,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",color:fg}}><Icon/></div>
              </div>
              <p style={{fontSize:28,fontWeight:900,color:fg,lineHeight:1}}>{val}</p>
            </div>
          ))}
        </div>

        {/* table card */}
        <div style={{backgroundColor:"#fff",borderRadius:12,border:"1px solid #F3F4F6",boxShadow:"0 1px 3px rgba(0,0,0,.05)",overflow:"hidden"}}>
          {/* toolbar */}
          <div style={{padding:"12px 18px",borderBottom:"1px solid #F3F4F6",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
            <p style={{fontSize:14,fontWeight:800,color:"#111827"}}>All Shipments</p>
            <div style={{position:"relative"}}>
              <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#9CA3AF",display:"flex"}}><IC.Search/></span>
              <input type="text" placeholder="Search tracking, name…" value={search} onChange={e=>setSearch(e.target.value)}
                style={{paddingLeft:32,paddingRight:11,paddingTop:7,paddingBottom:7,border:"1px solid #E5E7EB",borderRadius:7,fontSize:12,outline:"none",width:230,color:"#111827"}}/>
            </div>
          </div>

          {/* content */}
          {dataLoad?(
            <div style={{padding:60,textAlign:"center"}}>
              <Spin s={32} c="#2D6A4F"/><p style={{color:"#9CA3AF",fontSize:13,marginTop:12}}>Loading…</p>
            </div>
          ):filtered.length===0?(
            <div style={{padding:60,textAlign:"center"}}>
              <div style={{fontSize:44,marginBottom:10}}>📦</div>
              <p style={{color:"#374151",fontWeight:700,fontSize:14}}>{search?"No results found":"No shipments yet"}</p>
              {!search&&(
                <>
                  <p style={{color:"#9CA3AF",fontSize:12,marginTop:4,marginBottom:20}}>Create your first shipment using the button below</p>
                  <button
                    onClick={()=>{setCf({...blank,orderDate:today(),orderTime:nowT()});setNewTN("");setCreateErr("");setModal("create");}}
                    style={{display:"inline-flex",alignItems:"center",gap:7,backgroundColor:"#2D6A4F",color:"#fff",border:"none",borderRadius:8,padding:"11px 22px",fontSize:13,fontWeight:800,cursor:"pointer"}}>
                    <IC.Plus/>Create New Shipment
                  </button>
                </>
              )}
            </div>
          ):(
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",fontSize:12,borderCollapse:"collapse"}}>
                <thead>
                  <tr style={{backgroundColor:"#F9FAFB",borderBottom:"1px solid #F3F4F6"}}>
                    {["Tracking #","Sender","Receiver","Description","Status","Est. Delivery","Actions"].map(h=>(
                      <th key={h} style={{textAlign:"left",padding:"9px 13px",fontSize:10,fontWeight:800,color:"#6B7280",textTransform:"uppercase",letterSpacing:".5px",whiteSpace:"nowrap"}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s,i)=>(
                    <tr key={s.trackingNumber} style={{borderBottom:i<filtered.length-1?"1px solid #F9FAFB":"none"}}
                      onMouseEnter={e=>e.currentTarget.style.backgroundColor="#FAFAFA"}
                      onMouseLeave={e=>e.currentTarget.style.backgroundColor="transparent"}>
                      {/* tracking */}
                      <td style={{padding:"11px 13px",whiteSpace:"nowrap"}}>
                        <div style={{display:"flex",alignItems:"center",gap:5}}>
                          <span style={{fontFamily:"monospace",fontSize:11,fontWeight:700,color:"#1B3A6B"}}>{s.trackingNumber}</span>
                          <button onClick={()=>copy(s.trackingNumber)} style={{background:"none",border:"none",cursor:"pointer",color:"#9CA3AF",display:"flex"}}><IC.Copy/></button>
                        </div>
                      </td>
                      {/* sender */}
                      <td style={{padding:"11px 13px"}}>
                        <p style={{fontWeight:600,color:"#111827"}}>{s.senderName}</p>
                        {s.senderPhone&&<p style={{fontSize:10,color:"#6B7280",display:"flex",alignItems:"center",gap:3,marginTop:2}}><IC.Phone/>{s.senderPhone}</p>}
                        <p style={{fontSize:10,color:"#9CA3AF",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:1}}>{s.senderAddress}</p>
                      </td>
                      {/* receiver */}
                      <td style={{padding:"11px 13px"}}>
                        <p style={{fontWeight:600,color:"#111827"}}>{s.receiverName}</p>
                        {s.receiverPhone&&<p style={{fontSize:10,color:"#6B7280",display:"flex",alignItems:"center",gap:3,marginTop:2}}><IC.Phone/>{s.receiverPhone}</p>}
                        <p style={{fontSize:10,color:"#9CA3AF",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:1}}>{s.receiverAddress}</p>
                      </td>
                      {/* desc */}
                      <td style={{padding:"11px 13px"}}>
                        <p style={{color:"#374151",maxWidth:120,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{s.packageDescription}</p>
                        {s.weight&&<p style={{fontSize:10,color:"#9CA3AF",marginTop:1}}>{s.weight}</p>}
                      </td>
                      {/* status */}
                      <td style={{padding:"11px 13px"}}><Badge status={s.currentStatus}/></td>
                      {/* delivery */}
                      <td style={{padding:"11px 13px",whiteSpace:"nowrap"}}>
                        <p style={{fontSize:11,fontWeight:600,color:"#374151"}}>{fmtDate(s.estimatedDelivery)}</p>
                        {s.estimatedDeliveryTime&&<p style={{fontSize:10,color:"#6B7280",display:"flex",alignItems:"center",gap:3,marginTop:2}}><IC.Clock/>{fmtTime(s.estimatedDeliveryTime)}</p>}
                      </td>
                      {/* actions */}
                      <td style={{padding:"11px 13px"}}>
                        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                          <button onClick={()=>{setUpdTarget(s);setUf({status:s.currentStatus,location:"",description:"",eventDate:today(),eventTime:nowT()});setUpdateErr("");setModal("update");}}
                            style={{display:"flex",alignItems:"center",gap:3,backgroundColor:"#EFF6FF",color:"#2563EB",border:"none",borderRadius:5,padding:"5px 8px",fontSize:10,fontWeight:700,cursor:"pointer"}}>
                            <IC.Edit/>Update
                          </button>
                          <button onClick={()=>{setDelTarget(s);setDf({date:s.estimatedDelivery??"",time:s.estimatedDeliveryTime??""});setDelErr("");setModal("delivery");}}
                            style={{display:"flex",alignItems:"center",gap:3,backgroundColor:"#F0FDF4",color:"#15803D",border:"none",borderRadius:5,padding:"5px 8px",fontSize:10,fontWeight:700,cursor:"pointer"}}>
                            <IC.Calendar/>Delivery
                          </button>
                          <button onClick={()=>{setEvTarget(s);setModal("events");}}
                            style={{display:"flex",alignItems:"center",gap:3,backgroundColor:"#F5F3FF",color:"#6D28D9",border:"none",borderRadius:5,padding:"5px 8px",fontSize:10,fontWeight:700,cursor:"pointer"}}>
                            <IC.List/>Events
                          </button>
                          <button onClick={()=>doDelete(s.trackingNumber)} disabled={deletingId===s.trackingNumber}
                            style={{display:"flex",alignItems:"center",gap:3,backgroundColor:"#FEF2F2",color:"#DC2626",border:"none",borderRadius:5,padding:"5px 8px",fontSize:10,fontWeight:700,cursor:deletingId===s.trackingNumber?"not-allowed":"pointer",opacity:deletingId===s.trackingNumber?.6:1}}>
                            {deletingId===s.trackingNumber?<Spin s={10} c="#DC2626"/>:<IC.Trash/>}Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ════════ CREATE MODAL ════════ */}
      <AnimatePresence>
        {modal==="create"&&(
          <Modal title="Create New Shipment" icon={<span style={{color:"#2D6A4F"}}><IC.Plus/></span>} onClose={()=>{setModal(null);setNewTN("");setCreateErr("");}} wide>
            {newTN?(
              <motion.div initial={{opacity:0}} animate={{opacity:1}} style={{textAlign:"center",padding:"12px 0"}}>
                <div style={{width:60,height:60,backgroundColor:"#F0FDF4",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",fontSize:28,color:"#15803D"}}>✓</div>
                <h3 style={{fontSize:18,fontWeight:800,color:"#111827",marginBottom:6}}>Shipment Created!</h3>
                <p style={{fontSize:12,color:"#6B7280",marginBottom:18}}>Share this tracking number with your customer:</p>
                <div style={{backgroundColor:"#F9FAFB",borderRadius:10,padding:"13px 17px",display:"flex",alignItems:"center",justifyContent:"space-between",border:"2px dashed #E5E7EB",marginBottom:18}}>
                  <span style={{fontFamily:"monospace",fontWeight:800,fontSize:20,color:"#1B3A6B"}}>{newTN}</span>
                  <button onClick={()=>copy(newTN)} style={{display:"flex",alignItems:"center",gap:6,backgroundColor:"#1B3A6B",color:"#fff",border:"none",borderRadius:6,padding:"8px 13px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
                    {copied?<IC.Check/>:<IC.Copy/>}{copied?"Copied!":"Copy"}
                  </button>
                </div>
                <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                  <button onClick={()=>{setNewTN("");setCreateErr("");setCf({...blank,orderDate:today(),orderTime:nowT()});}} style={{backgroundColor:"#2D6A4F",color:"#fff",border:"none",borderRadius:7,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Create Another</button>
                  <button onClick={()=>{setModal(null);setNewTN("");}} style={{backgroundColor:"#F3F4F6",color:"#374151",border:"none",borderRadius:7,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Close</button>
                </div>
              </motion.div>
            ):(
              <form onSubmit={doCreate} style={{display:"flex",flexDirection:"column",gap:16}}>
                {createErr && <ErrBanner msg={createErr}/>}
                {/* sender */}
                <div><SL>Sender Details</SL>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                    <F label="Sender Name" req val={cf.senderName} set={v=>setCf(p=>({...p,senderName:v}))} ph="John Doe"/>
                    <F label="Sender Phone" req type="tel" val={cf.senderPhone} set={v=>setCf(p=>({...p,senderPhone:v}))} ph="+1 555 0100" pre={<IC.Phone/>}/>
                  </div>
                  <F label="Sender Address" req val={cf.senderAddress} set={v=>setCf(p=>({...p,senderAddress:v}))} ph="123 Main St, Lagos, Nigeria"/>
                </div>
                {/* receiver */}
                <div><SL>Recipient Details</SL>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                    <F label="Receiver Name" req val={cf.receiverName} set={v=>setCf(p=>({...p,receiverName:v}))} ph="Jane Smith"/>
                    <F label="Receiver Phone" req type="tel" val={cf.receiverPhone} set={v=>setCf(p=>({...p,receiverPhone:v}))} ph="+44 20 7946 0958" pre={<IC.Phone/>}/>
                  </div>
                  <F label="Receiver Address" req val={cf.receiverAddress} set={v=>setCf(p=>({...p,receiverAddress:v}))} ph="456 Oak Ave, New York, USA"/>
                </div>
                {/* package */}
                <div><SL>Package Details</SL>
                  <div style={{display:"flex",flexDirection:"column",gap:10}}>
                    <F label="Package Description" req val={cf.packageDescription} set={v=>setCf(p=>({...p,packageDescription:v}))} ph="Electronics — Laptop"/>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      <F label="Weight" req val={cf.weight} set={v=>setCf(p=>({...p,weight:v}))} ph="e.g. 2.5 kg"/>
                      <F label="Est. Delivery Date" req type="date" val={cf.estimatedDelivery} set={v=>setCf(p=>({...p,estimatedDelivery:v}))}/>
                    </div>
                    <F label="Est. Delivery Time (optional)" type="time" val={cf.estimatedDeliveryTime} set={v=>setCf(p=>({...p,estimatedDeliveryTime:v}))}/>
                  </div>
                </div>
                {/* order date */}
                <Box title='"Order Placed" Event — Date & Time' sub="Set when this shipment was placed. You can backdate this.">
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <F label="Order Date" req type="date" val={cf.orderDate} set={v=>setCf(p=>({...p,orderDate:v}))}/>
                    <F label="Order Time" req type="time" val={cf.orderTime} set={v=>setCf(p=>({...p,orderTime:v}))}/>
                  </div>
                </Box>
                {/* submit */}
                <div style={{display:"flex",gap:10}}>
                  <button type="submit" disabled={creating} style={{flex:1,backgroundColor:creating?"#9CA3AF":"#2D6A4F",color:"#fff",border:"none",borderRadius:8,padding:"11px",fontSize:14,fontWeight:700,cursor:creating?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                    {creating?<><Spin s={15}/>Creating...</>:<><IC.Plus/>Create Shipment</>}
                  </button>
                  <button type="button" onClick={()=>setModal(null)} style={{padding:"11px 18px",border:"1.5px solid #E5E7EB",color:"#374151",backgroundColor:"#fff",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancel</button>
                </div>
              </form>
            )}
          </Modal>
        )}
      </AnimatePresence>

      {/* ════════ UPDATE MODAL ════════ */}
      <AnimatePresence>
        {modal==="update"&&updTarget&&(
          <Modal title="Add Tracking Event" icon={<span style={{color:"#2563EB"}}><IC.Edit/></span>} onClose={()=>{setModal(null);setUpdTarget(null);setUpdateErr("");}}>
            <p style={{fontSize:11,color:"#6B7280",backgroundColor:"#F9FAFB",padding:"7px 11px",borderRadius:6,fontFamily:"monospace",marginBottom:16}}>{updTarget.trackingNumber}</p>
            <form onSubmit={doUpdate} style={{display:"flex",flexDirection:"column",gap:14}}>
              {updateErr && <ErrBanner msg={updateErr}/>}
              <div>
                <label style={{display:"block",fontSize:12,fontWeight:700,color:"#374151",marginBottom:5}}>New Status <span style={{color:"#EF4444"}}>*</span></label>
                <SSel val={uf.status} set={v=>setUf(p=>({...p,status:v}))}/>
                <div style={{marginTop:7,display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontSize:11,color:"#9CA3AF"}}>Preview:</span><Badge status={uf.status}/>
                </div>
                {CUSTOMS.has(uf.status)&&(
                  <div style={{marginTop:9,backgroundColor:"#FFFBEB",border:"1px solid #FCD34D",borderRadius:7,padding:"8px 11px"}}>
                    <p style={{fontSize:11,color:"#92400E",fontWeight:600}}>⚠ Customs/Hold — ensure description explains what action is needed.</p>
                  </div>
                )}
              </div>
              <F label="Current Location" req val={uf.location} set={v=>setUf(p=>({...p,location:v}))} ph="e.g. Rotterdam Port, Netherlands"/>
              <F label="Status Description" req val={uf.description} set={v=>setUf(p=>({...p,description:v}))} ph={CUSTOMS.has(uf.status)?"e.g. Package held — documents required":"e.g. Package arrived at sorting facility"}/>
              <Box title="Event Date & Time" sub="You can backdate this entry.">
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <F label="Date" req type="date" val={uf.eventDate} set={v=>setUf(p=>({...p,eventDate:v}))}/>
                  <F label="Time" req type="time" val={uf.eventTime} set={v=>setUf(p=>({...p,eventTime:v}))}/>
                </div>
              </Box>
              <div style={{display:"flex",gap:10}}>
                <button type="submit" disabled={updating} style={{flex:1,backgroundColor:updating?"#93C5FD":"#2563EB",color:"#fff",border:"none",borderRadius:8,padding:"11px",fontSize:13,fontWeight:700,cursor:updating?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                  {updating?<><Spin s={14}/>Adding...</>:<><IC.Plus/>Add Event</>}
                </button>
                <button type="button" onClick={()=>{setModal(null);setUpdTarget(null);setUpdateErr("");}} style={{padding:"11px 16px",border:"1.5px solid #E5E7EB",color:"#374151",backgroundColor:"#fff",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancel</button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* ════════ DELIVERY MODAL ════════ */}
      <AnimatePresence>
        {modal==="delivery"&&delTarget&&(
          <Modal title="Edit Estimated Delivery" icon={<span style={{color:"#15803D"}}><IC.Calendar/></span>} onClose={()=>{setModal(null);setDelTarget(null);}}>
            <p style={{fontSize:11,color:"#6B7280",backgroundColor:"#F9FAFB",padding:"7px 11px",borderRadius:6,fontFamily:"monospace",marginBottom:13}}>{delTarget.trackingNumber}</p>
            <div style={{display:"flex",alignItems:"center",gap:10,backgroundColor:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:8,padding:"10px 12px",marginBottom:14}}>
              <span style={{color:"#9CA3AF",display:"flex"}}><IC.Clock/></span>
              <div>
                <p style={{fontSize:10,color:"#9CA3AF",fontWeight:600}}>Current estimated delivery</p>
                <p style={{fontSize:13,fontWeight:700,color:"#374151"}}>{delTarget.estimatedDelivery?fmtDate(delTarget.estimatedDelivery):"—"}{delTarget.estimatedDeliveryTime?` at ${fmtTime(delTarget.estimatedDeliveryTime)}`:""}</p>
              </div>
            </div>
            {delErr&&<div style={{marginBottom:13}}><ErrBanner msg={delErr}/></div>}
            <form onSubmit={doDelivery} style={{display:"flex",flexDirection:"column",gap:14}}>
              <Box title="New Delivery Date & Time" bg="#F0FDF4" bd="#BBF7D0" fg="#15803D">
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <F label="Delivery Date" req type="date" val={df.date} set={v=>setDf(p=>({...p,date:v}))}/>
                  <F label="Delivery Time (optional)" type="time" val={df.time} set={v=>setDf(p=>({...p,time:v}))}/>
                </div>
              </Box>
              <div style={{display:"flex",gap:10}}>
                <button type="button" onClick={()=>{setModal(null);setDelTarget(null);}} style={{flex:1,padding:"11px",border:"1.5px solid #E5E7EB",color:"#374151",backgroundColor:"#fff",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancel</button>
                <button type="submit" disabled={savingDel||!df.date} style={{flex:1,backgroundColor:savingDel||!df.date?"#9CA3AF":"#15803D",color:"#fff",border:"none",borderRadius:8,padding:"11px",fontSize:13,fontWeight:700,cursor:savingDel||!df.date?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                  {savingDel?<><Spin s={14}/>Saving...</>:<><IC.Check/>Save Changes</>}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* ════════ EVENTS MODAL ════════ */}
      <AnimatePresence>
        {modal==="events"&&evTarget&&(
          <EventsMgr ship={evTarget} onClose={()=>{setModal(null);setEvTarget(null);}} onSaved={evSaved}/>
        )}
      </AnimatePresence>

      {/* ════════ CHANGE PASSWORD MODAL ════════ */}
      <AnimatePresence>
        {showChangePw&&(
          <Modal title="Change Admin Password" icon={<span style={{color:"#7C3AED"}}><IC.Key/></span>} onClose={()=>setShowChangePw(false)}>
            <form onSubmit={doChangePw} style={{display:"flex",flexDirection:"column",gap:14}}>
              {cpErr&&<ErrBanner msg={cpErr}/>}
              {cpOk&&<OkBanner msg={cpOk}/>}
              <PwField label="Current Password" req val={cpCurrent} set={v=>{setCpCurrent(v);setCpErr("");}} ph="Enter current password"/>
              <PwField label="New Password" req val={cpNew} set={v=>{setCpNew(v);setCpErr("");}} ph="At least 8 characters"/>
              <PwField label="Confirm New Password" req val={cpConfirm} set={v=>{setCpConfirm(v);setCpErr("");}} ph="Re-enter new password"/>
              <div style={{display:"flex",gap:10}}>
                <button type="button" onClick={()=>setShowChangePw(false)} style={{flex:1,padding:"11px",border:"1.5px solid #E5E7EB",color:"#374151",backgroundColor:"#fff",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancel</button>
                <button type="submit" disabled={cpSaving} style={{flex:1,backgroundColor:cpSaving?"#9CA3AF":"#7C3AED",color:"#fff",border:"none",borderRadius:8,padding:"11px",fontSize:13,fontWeight:700,cursor:cpSaving?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:7}}>
                  {cpSaving?<><Spin s={14}/>Saving...</>:<><IC.Check/>Update Password</>}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}