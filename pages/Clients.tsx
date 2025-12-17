
import React, { useEffect, useRef, useState, memo } from 'react';
import * as d3 from 'd3';
import { CLIENT_REGIONS } from '../constants';
import { ClientRegion } from '../types';
import ScrollReveal from '../components/ScrollReveal';

// Improved SVG paths for Indonesia Islands - better balance of abstraction and recognition
const ISLAND_PATHS = [
  { id: 'sumatra', d: "M60,60 L180,180 L140,240 L40,120 Z", label: "Sumatra" }, 
  { id: 'kalimantan', d: "M260,80 L380,80 L400,160 L360,220 L240,200 Z", label: "Kalimantan" },
  { id: 'java', d: "M180,270 L460,280 L450,310 L170,300 Z", label: "Java" },
  { id: 'sulawesi', d: "M450,120 L510,100 L530,150 L480,180 L520,220 L440,200 Z", label: "Sulawesi" },
  { id: 'papua', d: "M580,140 L740,140 L750,220 L620,240 L580,180 Z", label: "Papua" }
];

// Memoized Map Component for performance and stability
const ClientMap = memo(({ onHover, hoveredId }: { onHover: (region: ClientRegion | null) => void, hoveredId: string | null }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!svgRef.current || initialized) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Background Islands
    const islandsGroup = svg.append("g").attr("class", "islands");
    
    islandsGroup.selectAll("path")
       .data(ISLAND_PATHS)
       .enter()
       .append("path")
       .attr("d", d => d.d)
       .attr("fill", "#f1f5f9") 
       .attr("stroke", "#cbd5e1")
       .attr("stroke-width", 1.5)
       .attr("class", "transition-colors duration-500")
       .style("opacity", 0.6);

    // Geographic data nodes for client regions
    const rawNodes = [
      { id: 'ns', x: 100, y: 110, color: '#15803d' },      // North Sumatra
      { id: 'lam', x: 175, y: 260, color: '#16a34a' },     // Lampung
      { id: 'ban', x: 205, y: 310, color: '#22c55e' },     // Banten (slight offset from Jkt)
      { id: 'jkt', x: 245, y: 290, color: '#15803d' },     // Jakarta
      { id: 'ej', x: 410, y: 295, color: '#166534' },      // East Java
    ];

    const nodes = rawNodes.map(rn => {
      const regionData = CLIENT_REGIONS.find(c => c.id === rn.id);
      return regionData ? { ...regionData, ...rn } : null;
    }).filter(n => n !== null) as (ClientRegion & { x: number, y: number, color: string })[];

    // Network lines to imply "Connectivity"
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
       .selectAll("line")
       .data(links)
       .enter()
       .append("line")
       .attr("x1", d => d.source.x)
       .attr("y1", d => d.source.y)
       .attr("x2", d => d.target.x)
       .attr("y2", d => d.target.y)
       .attr("stroke", "#15803d")
       .attr("stroke-width", 1.5)
       .attr("stroke-dasharray", "4,4")
       .attr("opacity", 0.3);

    const nodeGroups = svg.selectAll("g.node")
       .data(nodes)
       .enter()
       .append("g")
       .attr("class", "node group transition-all duration-300")
       .attr("id", d => `node-${d.id}`)
       .attr("transform", d => `translate(${d.x},${d.y})`)
       .style("cursor", "pointer");

    // Ripple Glow Effect
    nodeGroups.append("circle")
       .attr("class", "ripple-outer")
       .attr("r", d => 18 + d.count)
       .attr("fill", d => d.color)
       .attr("opacity", 0.15);

    // Main Circle
    nodeGroups.append("circle")
       .attr("class", "main-circle transition-all duration-300")
       .attr("r", d => 14 + d.count)
       .attr("fill", d => d.color)
       .attr("stroke", "#fff")
       .attr("stroke-width", 2)
       .style("filter", "drop-shadow(0 4px 6px rgba(0,0,0,0.1))");

    // Count Text
    nodeGroups.append("text")
       .text(d => d.count)
       .attr("text-anchor", "middle")
       .attr("dy", ".35em")
       .attr("fill", "white")
       .attr("font-weight", "800")
       .attr("font-size", "14px")
       .attr("pointer-events", "none");

    // Dynamic Label Positioning to avoid overlaps
    nodeGroups.append("text")
       .attr("class", "node-label transition-all duration-300")
       .text(d => d.region.split(' (')[0])
       .attr("text-anchor", "middle")
       .attr("dy", d => (d.id === 'ban' ? 45 : 35) + d.count) // Special offset for Banten
       .attr("fill", "#1e293b")
       .attr("font-size", "11px")
       .attr("font-weight", "700")
       .attr("stroke", "white")
       .attr("stroke-width", 4)
       .attr("paint-order", "stroke")
       .style("letter-spacing", "0.025em");

    nodeGroups
       .on("mouseenter", (event, d) => onHover(d))
       .on("mouseleave", () => onHover(null))
       .on("click", (event, d) => {
           event.stopPropagation();
           onHover(d);
       });

    setInitialized(true);
  }, [onHover]);

  // Update visual state when external hover changes
  useEffect(() => {
    if (!svgRef.current || !initialized) return;
    const svg = d3.select(svgRef.current);
    
    svg.selectAll(".main-circle")
       .transition()
       .duration(300)
       .attr("stroke", "#fff")
       .attr("stroke-width", 2)
       .attr("transform", "scale(1)");

    if (hoveredId) {
        const group = svg.select(`#node-${hoveredId}`);
        if (!group.empty()) {
            group.select(".main-circle")
                 .transition()
                 .duration(300)
                 .attr("stroke", "#0288d1")
                 .attr("stroke-width", 4)
                 .attr("transform", "scale(1.2)");
            group.raise();
        }
    }
  }, [hoveredId, initialized]);

  return (
    <div className="w-full aspect-[2/1] relative bg-slate-50/50 rounded-[2rem] p-4 lg:p-8 flex items-center justify-center overflow-hidden border border-slate-100/80">
      <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-full max-w-4xl" style={{ overflow: 'visible' }} />
    </div>
  );
});

const Clients: React.FC = () => {
  const [hoveredRegion, setHoveredRegion] = useState<ClientRegion | null>(null);

  return (
    <div className="bg-background min-h-screen">
       {/* Hero Section */}
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

       {/* Map and Region Details */}
       <div className="max-w-7xl mx-auto px-4 pb-24 -mt-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Interactive Map */}
            <ScrollReveal animation="scale-in" className="lg:col-span-2">
               <div className="bg-white rounded-[2.5rem] shadow-2xl p-4 lg:p-10 border border-slate-100 flex items-center justify-center relative min-h-[450px]">
                  <ClientMap onHover={setHoveredRegion} hoveredId={hoveredRegion?.id || null} />
                  
                  {/* Floating Tooltip */}
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

            {/* Regional List */}
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

               {/* Growth Stat Card */}
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
