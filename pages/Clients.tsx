import React, { useEffect, useRef, useState, memo } from 'react';
import * as d3 from 'd3';
import { CLIENT_REGIONS } from '../constants';
import { ClientRegion } from '../types';
import ScrollReveal from '../components/ScrollReveal';

const ISLAND_PATHS = [
  { 
    id: 'sumatra', 
    d: "M45,45 L75,35 L120,85 L185,175 L165,215 L145,245 L105,215 L45,115 Z", 
    label: "Sumatra" 
  }, 
  { 
    id: 'kalimantan', 
    d: "M285,65 C325,45 385,55 425,75 L445,135 L405,215 L325,235 L265,175 L255,105 Z", 
    label: "Kalimantan" 
  },
  { 
    id: 'java', 
    d: "M175,285 L265,275 L385,285 L485,295 L475,335 L345,325 L165,315 Z", 
    label: "Java" 
  },
  { 
    id: 'sulawesi', 
    d: "M475,105 L545,85 L545,135 L495,155 L565,195 L525,245 L465,215 L485,175 Z", 
    label: "Sulawesi" 
  },
  { 
    id: 'papua', 
    d: "M605,125 C645,105 725,115 765,135 L775,205 L665,235 L615,195 Z", 
    label: "Papua" 
  }
];

const ClientMap = memo(({ onHover, hoveredId }: { onHover: (region: ClientRegion | null) => void, hoveredId: string | null }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!svgRef.current || initialized) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");
    
    const nodeGradient = defs.append("radialGradient")
      .attr("id", "nodeGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    nodeGradient.append("stop").attr("offset", "0%").attr("stop-color", "#22c55e");
    nodeGradient.append("stop").attr("offset", "100%").attr("stop-color", "#15803d");

    const islandsGroup = svg.append("g").attr("class", "islands");
    
    islandsGroup.selectAll("path")
       .data(ISLAND_PATHS)
       .enter()
       .append("path")
       .attr("d", d => d.d)
       .attr("fill", "#f8fafc") 
       .attr("stroke", "#e2e8f0")
       .attr("stroke-width", 2)
       .attr("class", "transition-all duration-700")
       .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.02))");

    const rawNodes = [
      { id: 'ns', x: 85, y: 85, color: '#15803d' },
      { id: 'lam', x: 155, y: 225, color: '#16a34a' },
      { id: 'ban', x: 195, y: 295, color: '#22c55e' },
      { id: 'jkt', x: 235, y: 285, color: '#15803d' },
      { id: 'ej', x: 425, y: 300, color: '#166534' },
    ];

    const nodes = rawNodes.map(rn => {
      const regionData = CLIENT_REGIONS.find(c => c.id === rn.id);
      return regionData ? { ...regionData, ...rn } : null;
    }).filter(n => n !== null) as (ClientRegion & { x: number, y: number, color: string })[];

    const links = [
      { sourceId: 'ns', targetId: 'lam' },
      { sourceId: 'lam', targetId: 'ban' },
      { sourceId: 'ban', targetId: 'jkt' },
      { sourceId: 'jkt', targetId: 'ej' },
    ].map(l => {
      const source = nodes.find(n => n.id === l.sourceId);
      const target = nodes.find(n => n.id === l.targetId);
      return (source && target) ? { source, target } : null;
    }).filter(l => l !== null) as { source: any, target: any }[];

    svg.append("g")
       .attr("class", "links")
       .selectAll("path")
       .data(links)
       .enter()
       .append("path")
       .attr("d", d => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;
          return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
       })
       .attr("fill", "none")
       .attr("stroke", "#15803d")
       .attr("stroke-width", 1.5)
       .attr("stroke-dasharray", "4,4")
       .attr("opacity", 0.2);

    const nodeGroups = svg.selectAll("g.node")
       .data(nodes)
       .enter()
       .append("g")
       .attr("class", "node group transition-all duration-300")
       .attr("id", d => `node-${d.id}`)
       .attr("transform", d => `translate(${d.x},${d.y})`)
       .style("cursor", "pointer");

    nodeGroups.append("circle")
       .attr("class", "node-halo")
       .attr("r", d => 22 + d.count)
       .attr("fill", d => d.color)
       .attr("opacity", 0.1);

    nodeGroups.append("circle")
       .attr("class", "main-circle transition-all duration-300")
       .attr("r", d => 16 + (d.count / 2))
       .attr("fill", "url(#nodeGradient)")
       .attr("stroke", "#fff")
       .attr("stroke-width", 3)
       .style("filter", "drop-shadow(0 8px 16px rgba(0,0,0,0.15))");

    nodeGroups.append("text")
       .text(d => d.count)
       .attr("text-anchor", "middle")
       .attr("dy", ".35em")
       .attr("fill", "white")
       .attr("font-weight", "900")
       .attr("font-size", "13px")
       .attr("pointer-events", "none");

    nodeGroups.append("text")
       .attr("class", "node-label transition-all duration-300")
       .text(d => d.region.split(' (')[0])
       .attr("text-anchor", "middle")
       .attr("dy", d => (d.id === 'ban' ? 52 : 44) + (d.count / 2))
       .attr("fill", "#0f172a")
       .attr("font-size", "12px")
       .attr("font-weight", "800")
       .attr("stroke", "#fff")
       .attr("stroke-width", 5)
       .attr("paint-order", "stroke");

    nodeGroups
       .on("mouseenter", (event, d) => onHover(d))
       .on("mouseleave", () => onHover(null))
       .on("click", (event, d) => {
           event.stopPropagation();
           onHover(d);
       });

    setInitialized(true);
  }, [onHover]);

  useEffect(() => {
    if (!svgRef.current || !initialized) return;
    const svg = d3.select(svgRef.current);
    
    svg.selectAll(".main-circle")
       .transition()
       .duration(400)
       .attr("stroke", "#fff")
       .attr("stroke-width", 3)
       .attr("transform", "scale(1)");

    svg.selectAll(".node-halo")
       .transition()
       .duration(400)
       .attr("opacity", 0.1)
       .attr("transform", "scale(1)");

    if (hoveredId) {
        const group = svg.select(`#node-${hoveredId}`);
        if (!group.empty()) {
            group.select(".main-circle")
                 .transition()
                 .duration(400)
                 .attr("stroke", "#0288d1")
                 .attr("stroke-width", 5)
                 .attr("transform", "scale(1.25)");
            
            group.select(".node-halo")
                 .transition()
                 .duration(400)
                 .attr("opacity", 0.3)
                 .attr("transform", "scale(1.4)");
                 
            group.raise();
        }
    }
  }, [hoveredId, initialized]);

  return (
    <div className="w-full aspect-[2/1] relative bg-white rounded-[2.5rem] p-6 lg:p-12 flex items-center justify-center overflow-visible">
      <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full max-w-5xl" style={{ overflow: 'visible' }} />
    </div>
  );
});

const Clients: React.FC = () => {
  const [hoveredRegion, setHoveredRegion] = useState<ClientRegion | null>(null);

  return (
    <div className="bg-background min-h-screen">
       <div className="relative bg-primary text-white py-24 lg:py-36 overflow-hidden">
         <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&q=80&w=2000" 
               alt="Global Agriculture Partnership" 
               className="w-full h-full object-cover opacity-20" 
             />
             <div className="absolute inset-0 bg-gradient-to-b from-green-950/90 to-green-900/80"></div>
         </div>
         <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <ScrollReveal animation="fade-in">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-xs font-bold mb-6 tracking-widest uppercase">Trusted Partner Network</span>
                <h1 className="text-4xl md:text-7xl font-heading font-bold mb-6 drop-shadow-md tracking-tight">National Footprint</h1>
                <p className="text-green-50 text-lg md:text-2xl max-w-2xl mx-auto font-medium opacity-90">
                    Empowering agricultural leaders across the Indonesian archipelago through regulatory excellence.
                </p>
            </ScrollReveal>
         </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 pb-24 -mt-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ScrollReveal animation="scale-in" className="lg:col-span-2">
               <div className="bg-white rounded-[2.5rem] shadow-2xl p-4 lg:p-10 border border-slate-100 flex items-center justify-center relative min-h-[450px]">
                  <ClientMap onHover={setHoveredRegion} hoveredId={hoveredRegion?.id || null} />
                  
                  {hoveredRegion && (
                    <div className="absolute bottom-10 left-10 right-10 lg:left-auto lg:right-10 lg:bottom-10 lg:w-80 bg-slate-900/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/10 animate-fadeIn z-30 transform hover:-translate-y-2 transition-transform">
                       <h4 className="font-bold text-white text-2xl mb-1">{hoveredRegion.region}</h4>
                       <p className="text-sm text-slate-400 mb-6 italic leading-relaxed">{hoveredRegion.description}</p>
                       <div className="space-y-3">
                          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] block mb-2">Key Portfolio</span>
                          <div className="flex flex-wrap gap-2">
                             {hoveredRegion.clients.map(c => (
                               <span key={c} className="text-xs bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/10 font-bold transition-colors hover:bg-primary">
                                 {c}
                               </span>
                             ))}
                          </div>
                       </div>
                    </div>
                  )}
               </div>
            </ScrollReveal>

            <div className="flex flex-col gap-6">
               <ScrollReveal animation="slide-right">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
                     <h3 className="text-2xl font-heading font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">Market Presence</h3>
                     <div className="space-y-5">
                       {[...CLIENT_REGIONS].sort((a,b) => b.count - a.count).map(region => (
                           <div 
                             key={region.id} 
                             className={`group p-6 rounded-[1.5rem] transition-all cursor-pointer border-2 ${hoveredRegion?.id === region.id ? 'bg-green-50 border-primary shadow-xl scale-[1.03] -translate-x-2' : 'bg-white border-slate-50 hover:border-slate-200 hover:bg-slate-50/50'}`}
                             onClick={() => setHoveredRegion(region)}
                             onMouseEnter={() => setHoveredRegion(region)}
                             onMouseLeave={() => setHoveredRegion(null)}
                           >
                             <div className="flex justify-between items-center mb-2">
                                 <h4 className="font-bold text-slate-800 text-lg group-hover:text-primary transition-colors">{region.region}</h4>
                                 <div className="text-sm font-black text-primary bg-primary/10 px-4 py-1 rounded-full shadow-inner ring-1 ring-primary/20">
                                   {region.count}
                                 </div>
                             </div>
                             <p className="text-xs text-slate-500 font-medium group-hover:text-slate-700">{region.description}</p>
                           </div>
                       ))}
                     </div>
                  </div>
               </ScrollReveal>

               <ScrollReveal animation="slide-right" delay={200}>
                  <div className="bg-gradient-to-br from-secondary to-blue-700 p-10 rounded-[2.5rem] text-white shadow-2xl">
                     <h4 className="text-xl font-bold mb-4">Regional Growth</h4>
                     <p className="text-blue-50 text-sm opacity-90 leading-relaxed mb-6">Expanding our footprint to ensure every agricultural hub in Indonesia has access to world-class regulatory standards.</p>
                     <div className="flex items-end justify-between">
                        <div className="text-4xl font-black">40+</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-blue-200">Total Partners</div>
                     </div>
                  </div>
               </ScrollReveal>
            </div>
          </div>
       </div>
    </div>
  );
};

export default Clients;