import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CLIENT_REGIONS } from '../constants';
import { ClientRegion } from '../types';

// Simplified SVG paths for Indonesia Islands visual context
const ISLAND_PATHS = [
  { id: 'sumatra', d: "M100,50 C140,40 190,80 210,140 C220,190 200,260 160,280 C120,290 70,200 100,50 Z" }, 
  { id: 'kalimantan', d: "M280,120 C310,80 390,80 420,120 C440,140 430,200 390,210 C340,220 270,200 280,120 Z" },
  { id: 'java', d: "M190,290 C250,280 450,290 470,310 C460,340 220,340 180,320 C170,300 180,295 190,290 Z" },
  { id: 'sulawesi', d: "M480,140 C500,120 530,120 520,150 C540,150 560,170 530,190 C510,220 480,200 490,170 C470,160 480,140 480,140 Z" },
  { id: 'papua', d: "M600,160 C630,150 720,150 750,180 C740,220 650,220 610,190 C600,170 600,160 600,160 Z" }
];

// Memoized Map Component to prevent full re-renders
const ClientMap = React.memo(({ onHover, hoveredId }: { onHover: (region: ClientRegion | null) => void, hoveredId: string | null }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [initialized, setInitialized] = useState(false);

  // 1. Initialize Map Structure (Run Once)
  useEffect(() => {
    if (!svgRef.current || initialized) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear cleanup

    // Background click to clear selection
    svg.on("click", () => {
        onHover(null);
    });

    // Draw Background Islands
    svg.append("g")
       .attr("class", "islands")
       .selectAll("path")
       .data(ISLAND_PATHS)
       .enter()
       .append("path")
       .attr("d", d => d.d)
       .attr("fill", "#e2e8f0") // slate-200
       .attr("stroke", "#cbd5e1") // slate-300
       .attr("stroke-width", 1);

    // Define Nodes
    const nodes = [
      { ...CLIENT_REGIONS.find(c => c.id === 'ns'), x: 160, y: 150, color: '#10B981' }, // North Sumatra
      { ...CLIENT_REGIONS.find(c => c.id === 'lam'), x: 190, y: 260, color: '#6EE7B7' }, // Lampung
      { ...CLIENT_REGIONS.find(c => c.id === 'ban'), x: 210, y: 300, color: '#34D399' }, // Banten
      { ...CLIENT_REGIONS.find(c => c.id === 'jkt'), x: 240, y: 300, color: '#065F46' }, // Jakarta
      { ...CLIENT_REGIONS.find(c => c.id === 'ej'), x: 400, y: 310, color: '#047857' }, // East Java
    ].filter(n => n.id) as (ClientRegion & { x: number, y: number, color: string })[];

    // Draw Links
    const links = [
      { source: nodes[0], target: nodes[1] },
      { source: nodes[1], target: nodes[2] },
      { source: nodes[2], target: nodes[3] },
      { source: nodes[3], target: nodes[4] },
    ];

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
       .attr("stroke", "#94a3b8")
       .attr("stroke-width", 2)
       .attr("stroke-dasharray", "5,5")
       .attr("opacity", 0.6);

    // Draw Nodes Group
    const nodeGroups = svg.selectAll("g.node")
       .data(nodes)
       .enter()
       .append("g")
       .attr("class", "node")
       .attr("id", d => `node-${d.id}`) // Add ID for selection
       .attr("transform", d => `translate(${d.x},${d.y})`)
       .style("cursor", "pointer");

    // Ripple Animation
    nodeGroups.append("circle")
       .attr("r", d => 15 + d.count)
       .attr("fill", d => d.color)
       .attr("opacity", 0.2)
       .append("animate")
       .attr("attributeName", "r")
       .attr("from", d => 15 + d.count)
       .attr("to", d => 25 + d.count)
       .attr("dur", "1.5s")
       .attr("repeatCount", "indefinite");
    
    nodeGroups.select("circle")
        .append("animate")
       .attr("attributeName", "opacity")
       .attr("values", "0.2;0;0.2")
       .attr("dur", "1.5s")
       .attr("repeatCount", "indefinite");

    // Main Circle
    nodeGroups.append("circle")
       .attr("class", "main-circle")
       .attr("r", d => 15 + d.count)
       .attr("fill", d => d.color)
       .attr("stroke", "#fff")
       .attr("stroke-width", 2);

    // Count
    nodeGroups.append("text")
       .text(d => d.count)
       .attr("text-anchor", "middle")
       .attr("dy", ".35em")
       .attr("fill", "white")
       .attr("font-weight", "bold")
       .attr("font-size", "14px")
       .attr("pointer-events", "none");

    // Label with halo for readability
    nodeGroups.append("text")
       .attr("class", "node-label")
       .text(d => d.region.replace(" (HQ Focus)", "").replace(" (Focus)", ""))
       .attr("text-anchor", "middle")
       .attr("dy", d => 35 + d.count)
       .attr("fill", "#0f172a") // Slate-900 for high contrast
       .attr("font-size", "12px")
       .attr("font-weight", "600")
       .attr("stroke", "white")
       .attr("stroke-width", 3)
       .attr("paint-order", "stroke");

    // Attach Event Listeners
    // Added click for mobile support
    nodeGroups
       .on("mouseenter", (event, d) => {
          onHover(d);
       })
       .on("mouseleave", (event, d) => {
           // We don't automatically clear on mouse leave on touch devices usually,
           // but keeping consistent logic here. The user can tap background to clear.
          onHover(null);
       })
       .on("click", (event, d) => {
           event.stopPropagation(); // Prevent background click
           onHover(d);
       });

    setInitialized(true);
  }, []); 

  // 2. Handle Highlight Updates (Run on prop change)
  useEffect(() => {
    if (!svgRef.current || !initialized) return;
    
    const svg = d3.select(svgRef.current);

    // Reset All Styles
    svg.selectAll(".main-circle")
       .transition().duration(200)
       .attr("stroke", "#fff")
       .attr("stroke-width", 2);

    svg.selectAll(".node-label")
       .transition().duration(200)
       .attr("fill", "#0f172a") // Slate-900
       .attr("font-weight", "600")
       .attr("font-size", "12px");

    // Highlight Selected
    if (hoveredId) {
        const group = svg.select(`#node-${hoveredId}`);
        if (!group.empty()) {
            group.select(".main-circle")
                 .transition().duration(200)
                 .attr("stroke", "#facc15") // Yellow highlight
                 .attr("stroke-width", 4);

            group.select(".node-label")
                 .transition().duration(200)
                 .attr("fill", "#059669")
                 .attr("font-weight", "800")
                 .attr("font-size", "14px");
            
            group.raise(); // Bring to front
        }
    }
  }, [hoveredId, initialized]);

  return (
    <svg 
      ref={svgRef} 
      viewBox="0 0 800 400" 
      className="w-full h-full max-h-[500px]"
      style={{ filter: 'drop-shadow(0 4px 6px rgb(0 0 0 / 0.05))' }}
    />
  );
});

const Clients: React.FC = () => {
  const [hoveredRegion, setHoveredRegion] = useState<ClientRegion | null>(null);

  // Stable callback for D3
  const handleHover = React.useCallback((region: ClientRegion | null) => {
    setHoveredRegion(region);
  }, []);

  return (
    <div className="bg-background min-h-screen">
       {/* Hero Section with Image */}
       <div className="relative bg-primary text-white py-16 md:py-24 overflow-hidden text-center">
         <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2070" 
                alt="Business Partnership in Agriculture" 
                className="w-full h-full object-cover"
                fetchPriority="high"
                loading="eager"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 to-green-800/80"></div>
         </div>
         <div className="relative z-10 max-w-4xl mx-auto px-4">
             <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 drop-shadow-md">Our National Footprint</h1>
             <p className="text-green-50 text-base md:text-xl max-w-2xl mx-auto font-medium">
               Connecting agro-industry leaders across the Indonesian archipelago with reliable regulatory solutions.
             </p>
         </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col lg:flex-row gap-8 -mt-10 relative z-20">
          {/* Map Visualization */}
          <div className="flex-[2] bg-white rounded-2xl shadow-xl p-2 md:p-4 flex items-center justify-center relative min-h-[400px] lg:h-[500px] overflow-visible">
             <div className="absolute top-4 left-4 z-10 bg-white/90 p-2 rounded shadow text-xs text-slate-500 backdrop-blur-sm border border-slate-100 hidden md:block">
                <span className="font-bold text-primary">Interactive Map</span> • Hover over nodes or list to see details
             </div>
             <div className="absolute top-4 left-4 z-10 bg-white/90 p-2 rounded shadow text-xs text-slate-500 backdrop-blur-sm border border-slate-100 block md:hidden">
                <span className="font-bold text-primary">Tap Map</span> • Tap nodes to see details
             </div>
             
             <ClientMap onHover={handleHover} hoveredId={hoveredRegion?.id || null} />
             
             {/* Hover Tooltip (Styled as absolute overlay) */}
             {hoveredRegion && (
               <div className="absolute top-full lg:top-1/2 lg:left-1/2 left-0 right-0 lg:right-auto transform lg:-translate-x-1/2 lg:-translate-y-1/2 -mt-12 lg:mt-16 mx-4 lg:mx-0 bg-white p-5 rounded-xl shadow-2xl border-t-4 border-secondary animate-fadeIn z-30 lg:w-72 pointer-events-none mb-4 lg:mb-0">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-slate-900 text-xl">{hoveredRegion.region}</h4>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">{hoveredRegion.count} Clients</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 italic">{hoveredRegion.description}</p>
                  <div className="bg-slate-50 rounded-lg p-3">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Key Partners</span>
                     <div className="flex flex-wrap gap-2">
                        {hoveredRegion.clients.map(c => (
                           <span key={c} className="text-xs bg-white border border-slate-200 text-slate-700 px-2 py-1 rounded-md shadow-sm font-medium">{c}</span>
                        ))}
                     </div>
                  </div>
               </div>
             )}
          </div>

          {/* List View */}
          <div className="flex-1 space-y-4">
             <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-4">Regional Breakdown</h3>
                <div className="space-y-3">
                  {CLIENT_REGIONS.sort((a,b) => b.count - a.count).map(region => (
                      <div 
                        key={region.id} 
                        className={`p-4 rounded-lg transition-all cursor-pointer border-l-4 ${hoveredRegion?.id === region.id ? 'bg-green-50 border-primary shadow-md scale-[1.02]' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                        onClick={() => setHoveredRegion(region)}
                        onMouseEnter={() => setHoveredRegion(region)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      >
                        <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-slate-800">{region.region}</h4>
                            <span className="text-sm font-bold text-primary">{region.count}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1">{region.description}</p>
                      </div>
                  ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Clients;