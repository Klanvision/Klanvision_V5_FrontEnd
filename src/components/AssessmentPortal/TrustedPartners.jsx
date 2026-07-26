import React from 'react';

export default function TrustedPartners() {
  // Enterprise tech, consulting, and cloud companies with real official vector logos from Simple Icons CDN
  const companies = [
    { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecloud.svg', color: '#4285F4', rgb: '66, 133, 244' },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg', color: '#FF9900', rgb: '255, 153, 0' },
    { name: 'Microsoft', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoft.svg', color: '#00A4EF', rgb: '0, 164, 239' },
    { name: 'Salesforce', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/salesforce.svg', color: '#00A1E0', rgb: '0, 161, 224' },
    { name: 'IBM', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ibm.svg', color: '#1F70C1', rgb: '31, 112, 193' },
    { name: 'Oracle', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg', color: '#F80000', rgb: '248, 0, 0' },
    { name: 'SAP', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sap.svg', color: '#0FAFFF', rgb: '15, 175, 255' },
    { name: 'Cisco', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cisco.svg', color: '#1BA0D7', rgb: '27, 160, 215' },
    { name: 'Accenture', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/accenture.svg', color: '#A100FF', rgb: '161, 0, 255' },
    { name: 'Infosys', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/infosys.svg', color: '#007CC3', rgb: '0, 124, 195' },
    { name: 'Atlassian', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/atlassian.svg', color: '#0052CC', rgb: '0, 82, 204' },
    { name: 'NVIDIA', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nvidia.svg', color: '#76B900', rgb: '118, 185, 0' },
    { name: 'Intel', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/intel.svg', color: '#0068B5', rgb: '0, 104, 181' },
    { name: 'Snowflake', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/snowflake.svg', color: '#29B5E8', rgb: '41, 181, 232' },
    { name: 'Databricks', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/databricks.svg', color: '#FF3621', rgb: '255, 54, 33', extraSpace: true },
    { name: 'Palo Alto Networks', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/paloaltonetworks.svg', color: '#FA582D', rgb: '250, 88, 45', extraSpace: true },
    { name: 'Stripe', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/stripe.svg', color: '#635BFF', rgb: '99, 91, 255' },
    { name: 'Zoom', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zoom.svg', color: '#2D8CFF', rgb: '45, 140, 255' },
    { name: 'Slack', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg', color: '#ECB22E', rgb: '236, 178, 46' },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/docker.svg', color: '#2496ED', rgb: '36, 150, 237' },
    { name: 'Kubernetes', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kubernetes.svg', color: '#326CE5', rgb: '50, 108, 229' },
    { name: 'Red Hat', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/redhat.svg', color: '#EE0000', rgb: '238, 0, 0' },
    { name: 'GitLab', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/gitlab.svg', color: '#FC6D26', rgb: '252, 109, 38' },
    { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg', color: '#FFFFFF', rgb: '255, 255, 255' },
    { name: 'Adobe', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobe.svg', color: '#FF0000', rgb: '255, 0, 0' },
    { name: 'Meta', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/meta.svg', color: '#0668E1', rgb: '6, 104, 225' },
    { name: 'Figma', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/figma.svg', color: '#F24E1E', rgb: '242, 78, 30' },
    { name: 'Shopify', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/shopify.svg', color: '#96BF48', rgb: '150, 191, 72' },
    { name: 'Spotify', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/spotify.svg', color: '#1ED760', rgb: '30, 215, 96' },
    { name: 'Cloudflare', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cloudflare.svg', color: '#F38020', rgb: '243, 128, 32' },
    { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongodb.svg', color: '#47A248', rgb: '71, 162, 72' },
    { name: 'Vercel', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg', color: '#FFFFFF', rgb: '255, 255, 255' },
    { name: 'Android', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/android.svg', color: '#3DDC84', rgb: '61, 220, 132' },
    { name: 'OpenAI', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg', color: '#00A67E', rgb: '0, 166, 126' }
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
          .marquee-viewport {
            container-type: inline-size;
          }
          .company-card {
            border: none;
            background: transparent;
            backdrop-filter: none;
            transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            /* Default small mobile: 2 items visible due to larger sizes */
            width: calc((100cqw - 24px) / 2);
          }
          /* Tablet & Desktop (>= 768px): exactly 5 items visible */
          @container (min-width: 768px) {
            .company-card {
              width: calc((100cqw - 96px) / 5);
            }
          }
          .company-card:hover {
            transform: translateY(-3px) scale(1.06);
          }
          .company-logo-mask {
            transition: transform 0.4s ease;
          }
          .company-card:hover .company-logo-mask {
            transform: scale(1.15);
          }
        `}
      </style>

      {/* Widened Container to show more companies */}
      <div className="w-full max-w-[1536px] mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Clean, Professional Container Wrapper */}
        <div className="relative w-full">
          
          {/* Ambient Glow Effects Behind the Card */}
          <div className="absolute -left-10 -top-10 w-72 h-72 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
          
          {/* Main Card Background with Premium Gradient, Sleek Borders, and Neon Glow Shadow */}
          <div className="relative bg-gradient-to-r from-[#0d1527] via-[#080d1a] to-[#0d1527] border border-white/10 rounded-[28px] p-6 lg:py-10 lg:px-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65),_inset_0_1px_1px_rgba(255,255,255,0.1),_0_0_40px_rgba(139,92,246,0.12)]">
            
            {/* Subtle inner background glow */}
            <div className="absolute top-1/2 left-[20%] w-[450px] h-[180px] bg-indigo-600/10 blur-[100px] -translate-y-1/2 pointer-events-none" />

            {/* LEFT SIDE TEXT */}
            <div className="w-full lg:w-[320px] flex-shrink-0 text-center lg:text-left relative z-30">
              <h3 className="text-[17px] font-[800] italic text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 uppercase tracking-[0.25em] leading-[1.8] border-l-0 lg:border-l-[6px] lg:border-purple-500/50 lg:pl-8 drop-shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                Trusted By Leading Companies Worldwide
              </h3>
            </div>

            {/* RIGHT SIDE SCROLLING MARQUEE */}
            <div className="marquee-viewport flex-1 w-full relative overflow-hidden flex items-center 
                            before:absolute before:left-0 before:w-[60px] before:h-full before:bg-gradient-to-r before:from-[#0d1527] before:to-transparent before:z-20 
                            after:absolute after:right-0 after:w-[60px] after:h-full after:bg-gradient-to-l after:from-[#0d1527] after:to-transparent after:z-20">
              <div className="animate-scroll-left flex items-center gap-6 px-4">
                {marqueeItems.map((company, index) => (
                  <div 
                    key={index} 
                    className={`company-card flex items-center gap-4.5 py-3 cursor-pointer group ${
                      company.extraSpace ? 'px-8 mx-4' : 'px-2'
                    }`}
                    style={{
                      '--brand-rgb': company.rgb,
                      '--brand-color': company.color
                    }}
                  >
                    <div className="w-11 h-11 flex items-center justify-center relative flex-shrink-0">
                      {/* Using CSS Mask to render the monochrome Simple Icon SVG colored with the brand color */}
                      <div 
                        className="company-logo-mask w-10 h-10"
                        style={{
                          backgroundColor: company.color,
                          WebkitMask: `url(${company.logo}) no-repeat center / contain`,
                          mask: `url(${company.logo}) no-repeat center / contain`,
                          filter: `drop-shadow(0 0 6px rgba(${company.rgb}, 0.6))`
                        }}
                      />
                    </div>
                    <span 
                      className="text-[20.5px] font-[800] tracking-wide transition-colors duration-300 whitespace-nowrap text-slate-200 group-hover:text-white"
                      style={{
                        color: 'var(--brand-color)'
                      }}
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

