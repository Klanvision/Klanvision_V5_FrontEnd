import React from 'react';

export default function TrustedPartners() {
  // Enterprise tech, consulting, and cloud companies with real official vector logos from Simple Icons CDN
  const companies = [
    { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecloud.svg', color: '#4285F4' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg', color: '#FF9900' },
    { name: 'Microsoft', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg', color: '#00A4EF' },
    { name: 'Salesforce', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/salesforce.svg', color: '#00A1E0' },
    { name: 'IBM', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ibm.svg', color: '#1F70C1' },
    { name: 'Oracle', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg', color: '#F80000' },
    { name: 'SAP', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sap.svg', color: '#0FAFFF' },
    { name: 'Cisco', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg', color: '#1BA0D7' },
    { name: 'Accenture', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/accenture.svg', color: '#A100FF' },
    { name: 'Infosys', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/infosys.svg', color: '#007CC3' },
    { name: 'Atlassian', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/atlassian.svg', color: '#0052CC' },
    { name: 'NVIDIA', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nvidia.svg', color: '#76B900' },
    { name: 'Intel', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/intel.svg', color: '#0068B5' },
    { name: 'Snowflake', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/snowflake.svg', color: '#29B5E8' },
    { name: 'Databricks', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/databricks.svg', color: '#FF3621' },
    { name: 'Palo Alto Networks', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/paloaltonetworks.svg', color: '#FA582D' },
    { name: 'Stripe', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg', color: '#635BFF' },
    { name: 'Zoom', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zoom.svg', color: '#2D8CFF' },
    { name: 'Slack', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg', color: '#ECB22E' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg', color: '#2496ED' },
    { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kubernetes.svg', color: '#326CE5' },
    { name: 'Red Hat', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/redhat.svg', color: '#EE0000' },
    { name: 'GitLab', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gitlab.svg', color: '#FC6D26' },
    { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg', color: '#FFFFFF' }
  ];

  // Double the array for seamless infinite scrolling
  const marqueeItems = [...companies, ...companies];

  return (
    <div className="relative py-8 bg-transparent z-10">
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-left {
            display: flex;
            width: max-content;
            animation: scroll-left 70s linear infinite;
          }
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Widened Container to show more companies */}
      <div className="w-full max-w-[1536px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Clean, Professional Container Wrapper */}
        <div className="relative w-full shadow-[0_10px_50px_rgba(0,0,0,0.2)]">
          
          {/* Main Card Background */}
          <div className="relative bg-[#0B1021] border border-white/5 rounded-[24px] p-6 lg:py-6 lg:px-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 overflow-hidden">
            
            {/* Subtle inner background glow */}
            <div className="absolute top-1/2 left-[20%] w-[400px] h-[150px] bg-blue-600/10 blur-[90px] -translate-y-1/2" />

            {/* LEFT SIDE TEXT */}
            <div className="w-full lg:w-[320px] flex-shrink-0 text-center lg:text-left relative z-30">
              <h3 className="text-[17px] font-[800] italic text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 uppercase tracking-[0.25em] leading-[1.8] border-l-0 lg:border-l-[6px] lg:border-purple-500/50 lg:pl-8 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                Trusted By Leading Companies Worldwide
              </h3>
            </div>

            {/* RIGHT SIDE SCROLLING MARQUEE */}
            <div className="flex-1 w-full relative overflow-hidden flex items-center 
                            before:absolute before:left-0 before:w-[60px] before:h-full before:bg-gradient-to-r before:from-[#0B1021] before:to-transparent before:z-20 
                            after:absolute after:right-0 after:w-[60px] after:h-full after:bg-gradient-to-l after:from-[#0B1021] after:to-transparent after:z-20">
              <div className="animate-scroll-left flex items-center gap-10 px-4">
                {marqueeItems.map((company, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-300 cursor-pointer group hover:bg-white/[0.06] border border-transparent hover:border-white/10"
                  >
                    <div className="w-7 h-7 flex items-center justify-center relative flex-shrink-0">
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`}
                        className="w-6 h-6 object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 transition-all duration-300"
                        style={{
                          filter: 'brightness(0) invert(1) drop-shadow(0 0 6px rgba(255,255,255,0.3))'
                        }}
                      />
                    </div>
                    <span 
                      className="text-[15.5px] font-[800] tracking-wide text-slate-200 group-hover:text-white transition-colors duration-300 whitespace-nowrap"
                    >
                      {company.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
