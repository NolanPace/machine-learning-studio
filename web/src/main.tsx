import React,{useMemo,useState} from 'react';import{createRoot}from'react-dom/client';import './style.css';
type Point={x:number,y:number};type Model={w:number,b:number,losses:number[]};
function fit(points:Point[],rate:number,epochs:number):Model{
 let w=0,b=0;const losses:number[]=[];
 for(let i=0;i<epochs;i++){
  let dw=0,db=0;
  for(const p of points){const e=w*p.x+b-p.y;dw+=e*p.x;db+=e}
  w-=rate*2*dw/points.length;b-=rate*2*db/points.length;
  if(i%10===0||i===epochs-1)losses.push(points.reduce((s,p)=>s+(w*p.x+b-p.y)**2,0)/points.length);
  if(!Number.isFinite(w)||!Number.isFinite(b))break;
 }
 return{w,b,losses};
}
const original:Array<Point>=Array.from({length:21},(_,i)=>({x:i-10,y:1.75*(i-10)+3+2*Math.sin(i*1.8)}));
function Chart({points,model}:{points:Point[],model:Model|null}){
 const sx=(x:number)=>35+(x+11)/22*570;const sy=(y:number)=>270-(y+25)/50*240;
 return <svg viewBox="0 0 640 320" role="img" aria-label="Scatter chart and regression line"><rect x="0" y="0" width="640" height="320" rx="14" fill="#0d192a"/>
 <line x1="30" y1={sy(0)} x2="610" y2={sy(0)} stroke="#49627b"/><line x1={sx(0)} y1="25" x2={sx(0)} y2="280" stroke="#49627b"/>
 {points.map((p,i)=><circle key={i} cx={sx(p.x)} cy={sy(p.y)} r="5" fill="#8cceff"/>)}
 {model&&Number.isFinite(model.w)&&<line x1={sx(-10)} y1={sy(model.w*-10+model.b)} x2={sx(10)} y2={sy(model.w*10+model.b)} stroke="#fbbe77" strokeWidth="3"/>}
 <text x="30" y="307" fill="#9aafc9">-10</text><text x="585" y="307" fill="#9aafc9">+10</text></svg>
}
function Loss({losses}:{losses:number[]}){
 const mx=Math.max(1,...losses);const pts=losses.map((v,i)=>`${20+i/Math.max(losses.length-1,1)*590},${240-Math.min(v/mx,1)*210}`).join(' ');
 return <svg viewBox="0 0 630 255" role="img" aria-label="Training loss curve"><rect width="630" height="255" rx="12" fill="#0d192a"/><polyline points={pts} fill="none" stroke="#64e1ab" strokeWidth="3"/></svg>;
}
function App(){
 const[rate,setRate]=useState(.005),[epochs,setEpochs]=useState(1500),[noise,setNoise]=useState(2),[model,setModel]=useState<Model|null>(null);
 const points=useMemo(()=>original.map((p,i)=>({...p,y:1.75*p.x+3+noise*Math.sin(i*1.8)})),[noise]);
 const loss=model?.losses.at(-1);
 return <main><header><div className="overline">C++ / TYPESCRIPT / MACHINE LEARNING</div><h1>Gradient Descent <em>Studio</em></h1><p>Experiment with regression, learning rates, and convergence.</p></header>
 <div className="layout"><aside><h2>Hyperparameters</h2><label>Learning rate <strong>{rate}</strong><input type="range" min=".0001" max=".03" step=".0001" value={rate} onChange={e=>setRate(+e.target.value)}/></label><label>Epochs <strong>{epochs}</strong><input type="range" min="100" max="6000" step="100" value={epochs} onChange={e=>setEpochs(+e.target.value)}/></label><label>Noise <strong>{noise}</strong><input type="range" min="0" max="6" step=".5" value={noise} onChange={e=>{setNoise(+e.target.value);setModel(null)}}/></label><button onClick={()=>setModel(fit(points,rate,epochs))}>Train model</button><button className="outline" onClick={()=>setModel(null)}>Reset</button></aside>
 <section><div className="panel"><div className="top"><h2>Regression fit</h2><span>{model?'TRAINED':'READY'}</span></div><Chart points={points} model={model}/><div className="metrics"><div>Slope <strong>{model?model.w.toFixed(3):'—'}</strong></div><div>Intercept <strong>{model?model.b.toFixed(3):'—'}</strong></div><div>Mean squared error <strong>{loss!==undefined?loss.toFixed(3):'—'}</strong></div></div></div>{model&&<div className="panel"><h2>Training loss</h2><Loss losses={model.losses}/></div>}</section></div></main>
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);