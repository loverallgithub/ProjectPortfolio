import React, { useState, useEffect, createContext, useContext } from 'react';

// ============================================================================
// LYNN OVERALL - PROJECT PORTFOLIO
// A comprehensive showcase of enterprise technology achievements
// ============================================================================

// ----------------------------------------------------------------------------
// THEME CONFIGURATION - Enhanced for Light Mode Readability
// ----------------------------------------------------------------------------

const themes = {
  light: {
    name: 'light',
    bg: '#f8fafc',
    bgSecondary: '#f1f5f9',
    bgCard: '#ffffff',
    bgCardHover: '#ffffff',
    bgNav: 'rgba(248, 250, 252, 0.98)',
    text: '#0f172a',
    textSecondary: '#1e293b',
    textMuted: '#334155',
    border: 'rgba(0, 0, 0, 0.12)',
    borderLight: 'rgba(0, 0, 0, 0.06)',
    gradient: 'linear-gradient(180deg, rgba(59, 130, 246, 0.03) 0%, transparent 50%, rgba(234, 179, 8, 0.02) 100%)',
    shadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05)',
    shadowHover: '0 8px 30px rgba(0, 0, 0, 0.12)'
  },
  dark: {
    name: 'dark',
    bg: '#0a0a0f',
    bgSecondary: '#111118',
    bgCard: 'rgba(30, 30, 40, 0.5)',
    bgCardHover: 'rgba(40, 40, 55, 0.6)',
    bgNav: 'rgba(10, 10, 15, 0.95)',
    text: '#f1f5f9',
    textSecondary: '#e2e8f0',
    textMuted: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.1)',
    borderLight: 'rgba(255, 255, 255, 0.05)',
    gradient: 'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, transparent 50%, rgba(234, 179, 8, 0.05) 100%)',
    shadow: 'none',
    shadowHover: '0 20px 40px rgba(0, 0, 0, 0.3)'
  }
};

const ThemeContext = createContext();
const LanguageContext = createContext();

const useTheme = () => useContext(ThemeContext);
const useLanguage = () => useContext(LanguageContext);

// Helper function for theme-aware colors in content
const getContentColors = (theme) => ({
  heading: theme?.text || '#f1f5f9',
  body: theme?.textSecondary || '#e2e8f0',
  muted: theme?.textMuted || '#94a3b8',
  sectionBg: theme?.name === 'light' ? 'rgba(0, 0, 0, 0.02)' : 'rgba(30, 30, 40, 0.5)',
  sectionBorder: theme?.name === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.05)',
  yellow: theme?.name === 'light' ? '#b45309' : '#fcd34d',
  green: theme?.name === 'light' ? '#15803d' : '#22c55e',
  red: theme?.name === 'light' ? '#b91c1c' : '#fca5a5',
  blue: theme?.name === 'light' ? '#1d4ed8' : '#60a5fa',
  purple: theme?.name === 'light' ? '#7c3aed' : '#a78bfa',
  orange: theme?.name === 'light' ? '#c2410c' : '#fb923c'
});

// ----------------------------------------------------------------------------
// TRANSLATIONS
// ----------------------------------------------------------------------------

const translations = {
  en: {
    title: 'Lynn Overall',
    subtitle: 'Principal Technology Strategist',
    tagline: '35+ years leading by doing. From rewriting Unix kernel code to recovering $3 trillion in data that IBM said was unrecoverable. Enterprise transformation at Fortune 500 scale.',
    dataGovernance: 'Data Governance',
    enterpriseArchitecture: 'Enterprise Architecture',
    aiStrategy: 'AI Strategy',
    cloudPlatforms: 'Cloud Platforms',
    featuredProjects: 'Featured Projects',
    allProjects: 'All Projects',
    moreProjectsSoon: 'More projects coming soon...',
    showing: 'Showing',
    projects: 'projects',
    project: 'project',
    viewMethodology: 'View Technical Methodology',
    dark: 'Dark',
    light: 'Light',
    footerQuote: '"I treat every role as someone giving me the keys to my own franchise."',
    location: 'Den Haag, Netherlands',
    firstPublicRetrospective: 'First public retrospective of achievements from confidential GSE operations',
    all: 'All',
    backToProjects: '← Back to Projects'
  },
  nl: {
    title: 'Lynn Overall',
    subtitle: 'Principal Technology Strateeg',
    tagline: '35+ jaar leiden door te doen. Van het herschrijven van Unix kernel code tot het herstellen van $3 biljoen aan data die IBM onherstelbaar noemde. Enterprise transformatie op Fortune 500 schaal.',
    dataGovernance: 'Data Governance',
    enterpriseArchitecture: 'Enterprise Architectuur',
    aiStrategy: 'AI Strategie',
    cloudPlatforms: 'Cloud Platforms',
    featuredProjects: 'Uitgelichte Projecten',
    allProjects: 'Alle Projecten',
    moreProjectsSoon: 'Meer projecten binnenkort...',
    showing: 'Toont',
    projects: 'projecten',
    project: 'project',
    viewMethodology: 'Bekijk Technische Methodologie',
    dark: 'Donker',
    light: 'Licht',
    footerQuote: '"Ik behandel elke rol als iemand die me de sleutels geeft van mijn eigen franchise."',
    location: 'Den Haag, Nederland',
    firstPublicRetrospective: 'Eerste publieke terugblik op prestaties uit vertrouwelijke GSE operaties',
    all: 'Alle',
    backToProjects: '← Terug naar Projecten'
  }
};

const projectTranslations = {
  en: {
    consas: { title: 'The CONSAS Project', subtitle: 'Consolidated SAS Architecture', tagline: 'Freddie Mac needed to eliminate $17M in annual licensing costs without disrupting critical analytics operations. By consolidating 86 systems into one through kernel-level optimization, the organization preserved full processing capacity while leadership secured the executive recognition their cost-saving vision deserved.', quote: '"The only formal recognition was the offer of a permanent role."' },
    recovery: { title: 'The $3 Trillion Recovery', subtitle: 'Unprecedented Database Reconstruction', tagline: 'When a catastrophic failure threatened $3 trillion in mortgage data, Freddie Mac faced potential regulatory disaster. Through methodical memory-segment reconstruction over seven continuous days, the organization recovered 99.97% of critical data — giving leadership the peace of mind that their financial foundation remained intact.', quote: '"Title doesn\'t mean you\'re above the work."' },
    restatement: { title: 'The 7-Year Earnings Restatement', subtitle: 'Enterprise-Wide Financial Reconstruction', tagline: 'Freddie Mac faced a $5B regulatory restatement spanning 86 departments — the largest in GSE history. By scaling infrastructure to support 300 consultants within 90 days while maintaining daily operations, executives gained the confidence that critical deadlines would be met without business disruption.', quote: '"Resourcefulness is the intersection of preparation and knowledge."' },
    setclear: { title: 'SetClear Global Settlement', subtitle: 'Bloomberg/Calyon Joint Venture', tagline: 'Bloomberg and Calyon needed a global settlement platform to process billions in daily transactions — but multiple teams had stalled. When a focused delivery approach finally broke through the gridlock, Bloomberg gained a viable acquisition target and both organizations saw what execution over committee consensus could achieve.', quote: '"We were the only ones who delivered."' },
    homedepot: { title: 'Home Depot Enterprise BI', subtitle: 'Microsoft\'s First Enterprise BI Accelerator', tagline: 'Home Depot\'s 2,000 stores needed faster access to business intelligence, but 500 fragmented reports slowed decision-making. By consolidating to 200 focused reports through Microsoft\'s first enterprise BI deployment, store managers gained insights 40% faster — proving that strategic technology bets deliver measurable operational value.', quote: '"When Microsoft\'s CEO hand-delivers your beta code, you know you\'re building something that matters."' },
    tokiomarine: { title: 'Tokio Marine HCC Lakehouse', subtitle: 'First Medallion Architecture on Snowflake', tagline: 'Tokio Marine HCC needed to modernize their data platform without vendor lock-in or runaway costs. By implementing a medallion architecture early — before it became the industry standard — the organization cut platform costs by 40% while maintaining complete analytical flexibility for future growth.', quote: '"Being an early adopter can drive significant improvements."' },
    merkle: { title: 'Merkle Customer Data Platform', subtitle: 'Predictive Analytics & Customer Segmentation', tagline: 'Retail marketing teams needed to move beyond gut-feel campaigns to data-driven precision. Through predictive modeling and deep platform expertise, clients achieved 25% campaign lift and 3x ROI improvement — finally seeing exactly which customer segments responded and why.', quote: '"Deep platform expertise transforms good campaigns into great ones."' },
    globaldata: { title: 'Strategic Alliance Architecture', subtitle: 'Building the Bridge Between Partners & Customers', tagline: 'Dun & Bradstreet\'s partner alliances needed technical depth to close complex deals without bottlenecking on scarce resources. By bridging the gap between partners and customers, $240M in quarterly revenue now flows through enabled alliances — with sales teams gaining a trusted advisor who simplifies complexity.', quote: '"I treat every role as someone giving me the keys to my own franchise."' },
    ipg: { title: 'Healthcare Claims Analytics Platform', subtitle: 'Transforming Insurance Carrier Intelligence', tagline: 'Healthcare insurance carriers needed competitive claims intelligence without building costly in-house platforms. By transforming a prototype into production-ready analytics, all five major carriers and 26 Blue Cross companies became paying subscribers within two months — gaining insights that drove smarter coverage decisions.', quote: '"When I arrived, the entire platform was a facade. Two months later, every carrier had subscribed."' }
  },
  nl: {
    consas: { title: 'Het CONSAS Project', subtitle: 'Geconsolideerde SAS Architectuur', tagline: 'Freddie Mac moest $17M aan jaarlijkse licentiekosten elimineren zonder kritische analytics operaties te verstoren. Door 86 systemen te consolideren tot één via kernel-niveau optimalisatie, behield de organisatie volledige verwerkingscapaciteit terwijl het leiderschap de erkenning kreeg die hun kostenbesparende visie verdiende.', quote: '"De enige formele erkenning was het aanbod voor een vaste rol."' },
    recovery: { title: 'Het $3 Biljoen Herstel', subtitle: 'Ongekende Database Reconstructie', tagline: 'Toen een catastrofale storing $3 biljoen aan hypotheekdata bedreigde, stond Freddie Mac voor een potentiële regelgevende ramp. Door methodische geheugen-segment reconstructie gedurende zeven doorlopende dagen, herstelde de organisatie 99,97% van kritische data — waardoor het leiderschap gemoedsrust kreeg dat hun financiële fundament intact bleef.', quote: '"Titel betekent niet dat je boven het werk staat."' },
    restatement: { title: 'De 7-Jarige Herformulering', subtitle: 'Bedrijfsbrede Financiële Reconstructie', tagline: 'Freddie Mac stond voor een $5B regelgevende herformulering over 86 afdelingen — de grootste in GSE-geschiedenis. Door infrastructuur te schalen om 300 consultants te ondersteunen binnen 90 dagen terwijl dagelijkse operaties doorgingen, kregen executives het vertrouwen dat kritische deadlines gehaald zouden worden zonder bedrijfsonderbreking.', quote: '"Vindingrijkheid is het kruispunt van voorbereiding en kennis."' },
    setclear: { title: 'SetClear Wereldwijde Afwikkeling', subtitle: 'Bloomberg/Calyon Joint Venture', tagline: 'Bloomberg en Calyon hadden een wereldwijd afwikkelingsplatform nodig om miljarden aan dagelijkse transacties te verwerken — maar meerdere teams waren vastgelopen. Toen een gerichte leveringsaanpak eindelijk door de impasse brak, kreeg Bloomberg een levensvatbaar acquisitiedoel en zagen beide organisaties wat executie boven consensus kon bereiken.', quote: '"Wij waren de enigen die leverden."' },
    homedepot: { title: 'Home Depot Enterprise BI', subtitle: 'Microsoft\'s Eerste Enterprise BI Accelerator', tagline: 'De 2.000 winkels van Home Depot hadden snellere toegang tot business intelligence nodig, maar 500 gefragmenteerde rapporten vertraagden besluitvorming. Door te consolideren naar 200 gerichte rapporten via Microsoft\'s eerste enterprise BI-implementatie, kregen winkelmanagers 40% sneller inzichten — bewijzend dat strategische technologiekeuzes meetbare operationele waarde leveren.', quote: '"Als Microsoft\'s CEO je beta code aflevert, weet je dat je iets belangrijks bouwt."' },
    tokiomarine: { title: 'Tokio Marine HCC Lakehouse', subtitle: 'Eerste Medallion Architectuur op Snowflake', tagline: 'Tokio Marine HCC moest hun dataplatform moderniseren zonder vendor lock-in of onbeheersbare kosten. Door vroeg een medallion architectuur te implementeren — voordat het de industriestandaard werd — verlaagde de organisatie platformkosten met 40% terwijl volledige analytische flexibiliteit voor toekomstige groei behouden bleef.', quote: '"Een early adopter zijn kan significante verbeteringen opleveren."' },
    merkle: { title: 'Merkle Customer Data Platform', subtitle: 'Predictieve Analytics & Klant Segmentatie', tagline: 'Retail marketingteams moesten verder gaan dan onderbuikgevoel-campagnes naar datagedreven precisie. Door predictive modeling en diepe platform expertise, behaalden klanten 25% campagne-lift en 3x ROI-verbetering — eindelijk precies ziend welke klantsegmenten reageerden en waarom.', quote: '"Diepe platform expertise transformeert goede campagnes in geweldige."' },
    globaldata: { title: 'Strategische Alliantie Architectuur', subtitle: 'De Brug Bouwen Tussen Partners & Klanten', tagline: 'De partnerallianties van Dun & Bradstreet hadden technische diepgang nodig om complexe deals te sluiten zonder vast te lopen op schaarse resources. Door de kloof tussen partners en klanten te overbruggen, stroomt nu $240M aan kwartaalomzet door enabled alliances — met verkoopteams die een vertrouwde adviseur krijgen die complexiteit vereenvoudigt.', quote: '"Ik behandel elke rol als iemand die me de sleutels geeft van mijn eigen franchise."' },
    ipg: { title: 'Zorgclaims Analytics Platform', subtitle: 'Transformatie van Verzekeraar Intelligentie', tagline: 'Zorgverzekeraars hadden competitieve claims-intelligentie nodig zonder kostbare interne platforms te bouwen. Door een prototype te transformeren naar productie-klare analytics, werden alle vijf grote verzekeraars en 26 Blue Cross bedrijven binnen twee maanden betalende abonnees — met inzichten die slimmere dekkingsbeslissingen stuurden.', quote: '"Toen ik aankwam was het hele platform een façade. Twee maanden later had elke verzekeraar zich geabonneerd."' }
  }
};

// Methodology links
const methodologyLinks = {
  consas: '/documents/consas-project-technical-methodology.md',
  recovery: '/documents/recovery-project-technical-methodology.md',
  restatement: '/documents/restatement-project-technical-methodology.md',
  setclear: '/documents/setclear-project-technical-methodology.md',
  homedepot: '/documents/homedepot-project-technical-methodology.md',
  ipg: '/documents/ipg-project-technical-methodology.md',
  tokiomarine: '/documents/tokiomarine-project-technical-methodology.md',
  merkle: '/documents/merkle-project-technical-methodology.md',
  globaldata: '/documents/globaldata-project-technical-methodology.md'
};

// Company website links - verified spellings and URLs
const companyLinks = {
  'IBM': 'https://www.ibm.com',
  'Microsoft': 'https://www.microsoft.com',
  'Sun Microsystems': 'https://www.oracle.com/sun/',
  'Oracle': 'https://www.oracle.com',
  'SAS Institute': 'https://www.sas.com',
  'SAS': 'https://www.sas.com',
  'MicroStrategy': 'https://www.microstrategy.com',
  'Snowflake': 'https://www.snowflake.com',
  'Databricks': 'https://www.databricks.com',
  'AWS': 'https://aws.amazon.com',
  'Salesforce': 'https://www.salesforce.com',
  'MuleSoft': 'https://www.mulesoft.com',
  'Attunity': 'https://www.qlik.com/us/products/attunity',
  'Informatica': 'https://www.informatica.com',
  'EMC': 'https://www.dell.com/en-us/dt/storage/emc.htm',
  'Freddie Mac': 'https://www.freddiemac.com',
  'Bloomberg': 'https://www.bloomberg.com',
  'Calyon': 'https://www.ca-cib.com',
  'Citibank': 'https://www.citigroup.com',
  'Fidelity Investments': 'https://www.fidelity.com',
  'Tokio Marine HCC': 'https://www.tokiomarinehcc.com',
  'Tokio Marine': 'https://www.tokiomarinehcc.com',
  'The Home Depot': 'https://www.homedepot.com',
  'Home Depot': 'https://www.homedepot.com',
  'Coca-Cola': 'https://www.coca-colacompany.com',
  'Merkle': 'https://www.merkle.com',
  'Dun & Bradstreet': 'https://www.dnb.com',
  'D&B': 'https://www.dnb.com',
  'Cap Gemini': 'https://www.capgemini.com',
  'Capgemini': 'https://www.capgemini.com',
  'OFHEO': 'https://www.fhfa.gov',
  'FHFA': 'https://www.fhfa.gov',
  'SEC': 'https://www.sec.gov',
  // Healthcare Insurance Carriers
  'BlueCross BlueShield': 'https://www.bcbs.com',
  'BCBS': 'https://www.bcbs.com',
  'Aetna': 'https://www.aetna.com',
  'UnitedHealth': 'https://www.unitedhealthgroup.com',
  'UnitedHealthcare': 'https://www.uhc.com',
  'Cigna': 'https://www.cigna.com',
  'Humana': 'https://www.humana.com',
  // Healthcare Organizations
  'Implantable Products Group': 'https://www.linkedin.com/company/implantable-provider-group',
  'IPG': 'https://www.linkedin.com/company/implantable-provider-group'
};

// ----------------------------------------------------------------------------
// SHARED COMPONENTS
// ----------------------------------------------------------------------------

const fadeInKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

// Company Link Component
const CompanyLink = ({ name }) => {
  const theme = useTheme();
  const url = companyLinks[name];
  if (!url) return <span>{name}</span>;
  const linkColor = theme?.name === 'light' ? '#1d4ed8' : '#60a5fa';
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: linkColor, textDecoration: 'none', borderBottom: `1px solid ${linkColor}40` }}>
      {name}
    </a>
  );
};

// Theme Toggle
const ThemeToggle = ({ theme, setTheme, t }) => (
  <button
    onClick={() => setTheme(theme.name === 'light' ? 'dark' : 'light')}
    style={{
      position: 'fixed', top: '20px', right: '20px', zIndex: 1000,
      padding: '12px 16px', backgroundColor: theme.name === 'light' ? '#1e293b' : '#ffffff',
      color: theme.name === 'light' ? '#ffffff' : '#1e293b', border: 'none', borderRadius: '12px',
      cursor: 'pointer', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', transition: 'all 0.3s ease'
    }}
  >
    {theme.name === 'light' ? '🌙' : '☀️'}
    {theme.name === 'light' ? t.dark : t.light}
  </button>
);

// Language Toggle
const LanguageToggle = ({ language, setLanguage, theme }) => (
  <button
    onClick={() => setLanguage(language === 'en' ? 'nl' : 'en')}
    style={{
      position: 'fixed', top: '20px', right: '120px', zIndex: 1000,
      padding: '12px 16px', backgroundColor: theme.name === 'light' ? '#f1f5f9' : 'rgba(255, 255, 255, 0.1)',
      color: theme.text, border: `1px solid ${theme.border}`, borderRadius: '12px',
      cursor: 'pointer', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px',
      boxShadow: theme.shadow, transition: 'all 0.3s ease'
    }}
  >
    {language === 'en' ? '🇳🇱' : '🇬🇧'}
    {language === 'en' ? 'Nederlands' : 'English'}
  </button>
);

// Methodology Link
const MethodologyLink = ({ projectId, theme, accentColor, t }) => {
  const link = methodologyLinks[projectId];
  if (!link) return null;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px',
      backgroundColor: theme.name === 'light' ? `${accentColor}10` : `${accentColor}20`,
      border: `1px solid ${accentColor}40`, borderRadius: '8px', color: accentColor,
      fontSize: '14px', fontWeight: '500', textDecoration: 'none', transition: 'all 0.2s ease'
    }}>
      📄 {t.viewMethodology}
    </a>
  );
};

// Section Nav
const SectionNav = ({ sections, activeSection, setActiveSection, accentColor, theme }) => (
  <nav style={{
    position: 'sticky', top: 0, zIndex: 100, backgroundColor: theme.bgNav, backdropFilter: 'blur(10px)',
    borderBottom: `1px solid ${accentColor}20`, padding: '0 40px'
  }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '8px', overflowX: 'auto', padding: '16px 0' }}>
      {sections.map((section) => (
        <button key={section.id} onClick={() => setActiveSection(section.id)} style={{
          padding: '10px 20px',
          backgroundColor: activeSection === section.id ? `${accentColor}${theme.name === 'light' ? '15' : '30'}` : 'transparent',
          border: activeSection === section.id ? `1px solid ${accentColor}60` : '1px solid transparent',
          borderRadius: '6px', color: activeSection === section.id ? accentColor : theme.textMuted,
          fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: 'nowrap'
        }}>
          {section.label}
        </button>
      ))}
    </div>
  </nav>
);

// Stat Card
const StatCard = ({ value, label, icon, accentColor }) => {
  const theme = useTheme();
  return (
    <div style={{
      backgroundColor: theme?.name === 'light' ? theme.bgCard : 'rgba(30, 30, 40, 0.5)',
      border: `1px solid ${theme?.border || 'rgba(255, 255, 255, 0.05)'}`,
      borderRadius: '12px', padding: '24px', textAlign: 'center'
    }}>
      {icon && <div style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</div>}
      <div style={{ fontSize: '32px', fontWeight: '700', color: accentColor, marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '13px', color: theme?.textMuted || '#71717a', fontWeight: '500' }}>{label}</div>
    </div>
  );
};

// Timeline Item
const TimelineItem = ({ phase, duration, description, technical, color, isExpanded, onToggle, index }) => {
  const theme = useTheme();
  return (
    <div onClick={onToggle} style={{ position: 'relative', paddingLeft: '40px', paddingBottom: '32px', cursor: 'pointer', animation: `fadeIn 0.5s ease ${index * 0.1}s both` }}>
      <div style={{ position: 'absolute', left: '0', top: '0', width: '20px', height: '20px', backgroundColor: isExpanded ? color : 'transparent', border: `3px solid ${color}`, borderRadius: '50%', transition: 'all 0.3s ease' }} />
      <div style={{ position: 'absolute', left: '9px', top: '24px', bottom: '0', width: '2px', backgroundColor: `${color}30` }} />
      <div style={{
        backgroundColor: theme?.name === 'light' ? (isExpanded ? 'rgba(0, 0, 0, 0.02)' : 'transparent') : (isExpanded ? 'rgba(30, 30, 40, 0.5)' : 'transparent'),
        border: `1px solid ${isExpanded ? color : theme?.border || 'rgba(255, 255, 255, 0.05)'}40`,
        borderRadius: '12px', padding: '20px', transition: 'all 0.3s ease'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: '600', color: theme?.text || '#ffffff', margin: 0 }}>{phase}</h4>
          <span style={{ fontSize: '12px', color: color, fontWeight: '600', padding: '4px 10px', backgroundColor: `${color}20`, borderRadius: '4px' }}>{duration}</span>
        </div>
        <p style={{ fontSize: '14px', color: theme?.textSecondary || '#a1a1aa', lineHeight: '1.6', margin: 0 }}>{description}</p>
        {isExpanded && technical && (
          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: theme?.name === 'light' ? 'rgba(0, 0, 0, 0.03)' : 'rgba(0, 0, 0, 0.3)', borderRadius: '8px', borderLeft: `3px solid ${color}` }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: color, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Technical Details</div>
            <p style={{ fontSize: '13px', color: theme?.textMuted || '#71717a', lineHeight: '1.6', margin: 0, fontFamily: 'monospace' }}>{technical}</p>
          </div>
        )}
      </div>
    </div>
  );
};


// ----------------------------------------------------------------------------
// PROJECT DATA
// ----------------------------------------------------------------------------

const projectsData = {
  consas: {
    id: 'consas', title: 'The CONSAS Project', subtitle: 'Consolidated SAS Architecture',
    tagline: 'Freddie Mac needed to eliminate $17M in annual licensing costs without disrupting critical analytics operations. By consolidating 86 systems into one through kernel-level optimization, the organization preserved full processing capacity while leadership secured the executive recognition their cost-saving vision deserved.',
    year: '1999-2000', company: 'Freddie Mac', role: 'Director of Infrastructure', featured: true,
    category: 'Infrastructure', tags: ['Kernel Code', 'Freddie Mac Era'], accentColor: '#eab308',
    stats: [{ value: '$17M', label: 'Annual Savings' }, { value: '86→1', label: 'Systems Consolidated' }, { value: '25+', label: 'Years Running' }, { value: '80%', label: 'Performance Gain' }],
    sections: [{ id: 'overview', label: 'Overview' }, { id: 'architecture', label: 'Architecture' }, { id: 'implementation', label: 'Implementation' }, { id: 'kernel', label: 'Kernel Solution' }, { id: 'results', label: 'Results' }, { id: 'legacy', label: 'Legacy' }],
    quote: '"The only formal recognition was the offer of a permanent role. That\'s how you know you\'ve built something good."'
  },
  recovery: {
    id: 'recovery', title: 'The $3 Trillion Recovery', subtitle: 'Unprecedented Database Reconstruction',
    tagline: 'When a catastrophic failure threatened $3 trillion in mortgage data, Freddie Mac faced potential regulatory disaster. Through methodical memory-segment reconstruction over seven continuous days, the organization recovered 99.97% of critical data — giving leadership the peace of mind that their financial foundation remained intact.',
    year: '2000', company: 'Freddie Mac', role: 'Director of Infrastructure', featured: true,
    category: 'Infrastructure', tags: ['Recovery', 'Freddie Mac Era'], accentColor: '#3b82f6',
    stats: [{ value: '$3T', label: 'Data Recovered' }, { value: '7', label: 'Days Non-Stop' }, { value: '99.97%', label: 'Recovery Rate' }, { value: '1', label: 'Month Gap Closed' }],
    sections: [{ id: 'overview', label: 'Overview' }, { id: 'timeline', label: 'Timeline' }, { id: 'methodology', label: 'Methodology' }, { id: 'architecture', label: 'Architecture' }, { id: 'results', label: 'Results' }, { id: 'legacy', label: 'Legacy' }],
    quote: '"Title doesn\'t mean you\'re above the work."'
  },
  restatement: {
    id: 'restatement', title: 'The 7-Year Earnings Restatement', subtitle: 'Enterprise-Wide Financial Reconstruction',
    tagline: 'Freddie Mac faced a $5B regulatory restatement spanning 86 departments — the largest in GSE history. By scaling infrastructure to support 300 consultants within 90 days while maintaining daily operations, executives gained the confidence that critical deadlines would be met without business disruption.',
    year: '2000-2004', company: 'Freddie Mac', role: 'Director of Infrastructure', featured: true,
    category: 'Leadership', tags: ['Leadership', 'Freddie Mac Era'], accentColor: '#10b981',
    stats: [{ value: '$5B', label: 'Restatement Value' }, { value: '300', label: 'Consultants Onboarded' }, { value: '86', label: 'Departments' }, { value: '7', label: 'Years Lookback' }],
    sections: [{ id: 'overview', label: 'Overview' }, { id: 'timeline', label: 'Timeline' }, { id: 'scale', label: 'Scale' }, { id: 'approach', label: 'Approach' }, { id: 'results', label: 'Results' }, { id: 'legacy', label: 'Legacy' }],
    quote: '"Resourcefulness is the intersection of preparation and knowledge."'
  },
  setclear: {
    id: 'setclear', title: 'SetClear Global Settlement', subtitle: 'Bloomberg/Calyon Joint Venture',
    tagline: 'Bloomberg and Calyon needed a global settlement platform to process billions in daily transactions — but multiple teams had stalled. When a focused delivery approach finally broke through the gridlock, Bloomberg gained a viable acquisition target and both organizations saw what execution over committee consensus could achieve.',
    year: '2007-2009', company: 'Calyon/Bloomberg JV', role: 'Lead Architect', featured: true,
    category: 'Data & Analytics', tags: ['Data & Analytics', 'Post-Freddie Mac'], accentColor: '#f97316',
    stats: [{ value: '1', label: 'Team Delivered' }, { value: '$B+', label: 'Daily Settlements' }, { value: '40%', label: 'Efficiency Gain' }, { value: '2009', label: 'Bloomberg Acquired' }],
    sections: [{ id: 'overview', label: 'Overview' }, { id: 'challenge', label: 'Challenge' }, { id: 'architecture', label: 'Architecture' }, { id: 'delivery', label: 'Delivery' }, { id: 'results', label: 'Results' }, { id: 'legacy', label: 'Legacy' }],
    quote: '"There were several teams working on that joint venture. We were the only ones who delivered."'
  },
  homedepot: {
    id: 'homedepot', title: 'Home Depot Enterprise BI', subtitle: 'Microsoft\'s First Enterprise BI Accelerator',
    tagline: 'Home Depot\'s 2,000 stores needed faster access to business intelligence, but 500 fragmented reports slowed decision-making. By consolidating to 200 focused reports through Microsoft\'s first enterprise BI deployment, store managers gained insights 40% faster — proving that strategic technology bets deliver measurable operational value.',
    year: '2004-2006', company: 'The Home Depot', role: 'Business Intelligence Architect', featured: false,
    category: 'Data & Analytics', tags: ['Microsoft First', 'Post-Freddie Mac'], accentColor: '#f97316',
    stats: [{ value: '2000', label: 'Stores Worldwide' }, { value: '500→200', label: 'Reports Reduced' }, { value: '40%', label: 'Faster Generation' }, { value: '1st', label: 'Enterprise Deploy' }],
    sections: [{ id: 'overview', label: 'Overview' }, { id: 'challenge', label: 'The Challenge' }, { id: 'architecture', label: 'Architecture' }, { id: 'microsoft', label: 'Microsoft Partnership' }, { id: 'results', label: 'Results' }, { id: 'legacy', label: 'Legacy' }],
    quote: '"When Microsoft\'s CEO hand-delivers your beta code, you know you\'re building something that matters."'
  },
  tokiomarine: {
    id: 'tokiomarine', title: 'Tokio Marine HCC Lakehouse', subtitle: 'First Medallion Architecture on Snowflake',
    tagline: 'Tokio Marine HCC needed to modernize their data platform without vendor lock-in or runaway costs. By implementing a medallion architecture early — before it became the industry standard — the organization cut platform costs by 40% while maintaining complete analytical flexibility for future growth.',
    year: '2018-2022', company: 'Tokio Marine HCC', role: 'Director of Data Strategy', featured: false,
    category: 'Data & Analytics', tags: ['Snowflake First', 'Current'], accentColor: '#06b6d4',
    stats: [{ value: '$15M', label: 'Annual Budget' }, { value: '40%', label: 'Cost Reduction' }, { value: '3', label: 'Medallion Layers' }, { value: '1st', label: 'On Snowflake' }],
    sections: [{ id: 'overview', label: 'Overview' }, { id: 'challenge', label: 'The Challenge' }, { id: 'architecture', label: 'Architecture' }, { id: 'implementation', label: 'Implementation' }, { id: 'results', label: 'Results' }, { id: 'legacy', label: 'Legacy' }],
    quote: '"Being an early adopter and using common sense engineering can drive significant improvements."'
  },
  merkle: {
    id: 'merkle', title: 'Merkle Customer Data Platform', subtitle: 'Predictive Analytics & Customer Segmentation',
    tagline: 'Retail marketing teams needed to move beyond gut-feel campaigns to data-driven precision. Through predictive modeling and deep platform expertise, clients achieved 25% campaign lift and 3x ROI improvement — finally seeing exactly which customer segments responded and why.',
    year: '2013', company: 'Merkle', role: 'Director of Solution Management', featured: false,
    category: 'Data & Analytics', tags: ['Data & Analytics', 'Post-Freddie Mac'], accentColor: '#8b5cf6',
    stats: [{ value: '25%', label: 'Campaign Lift' }, { value: '40%', label: 'Better Targeting' }, { value: '3x', label: 'ROI Improvement' }, { value: 'R', label: 'Predictive Models' }],
    sections: [{ id: 'overview', label: 'Overview' }, { id: 'challenge', label: 'The Challenge' }, { id: 'architecture', label: 'Architecture' }, { id: 'predictive', label: 'Predictive Models' }, { id: 'results', label: 'Results' }, { id: 'legacy', label: 'Legacy' }],
    quote: '"Deep platform expertise transforms good campaigns into great ones."'
  },
  globaldata: {
    id: 'globaldata', title: 'Strategic Alliance Architecture', subtitle: 'Building the Bridge Between Partners & Customers',
    tagline: 'Dun & Bradstreet\'s partner alliances needed technical depth to close complex deals without bottlenecking on scarce resources. By bridging the gap between partners and customers, $240M in quarterly revenue now flows through enabled alliances — with sales teams gaining a trusted advisor who simplifies complexity.',
    year: '2022-Present', company: 'Dun & Bradstreet', role: 'Principal Technology Strategist', featured: false,
    category: 'Leadership', tags: ['Leadership', 'Current'], accentColor: '#3b82f6',
    stats: [{ value: '$240M', label: 'Quarterly Revenue' }, { value: '15+', label: 'Partner Alliances' }, { value: '50+', label: 'Resources Trained' }, { value: '85%', label: 'Satisfaction Rate' }],
    sections: [{ id: 'overview', label: 'Overview' }, { id: 'partners', label: 'Partner Ecosystem' }, { id: 'gtm', label: 'Go-to-Market' }, { id: 'ai', label: 'AI Integrations' }, { id: 'customers', label: 'Customer Engagement' }, { id: 'results', label: 'Results' }, { id: 'approach', label: 'The Approach' }, { id: 'legacy', label: 'Legacy' }],
    quote: '"I treat every role as someone giving me the keys to my own franchise."'
  },
  ipg: {
    id: 'ipg', title: 'Healthcare Claims Analytics Platform', subtitle: 'Transforming Insurance Carrier Intelligence',
    tagline: 'Healthcare insurance carriers needed competitive claims intelligence without building costly in-house platforms. By transforming a prototype into production-ready analytics, all five major carriers and 26 Blue Cross companies became paying subscribers within two months — gaining insights that drove smarter coverage decisions.',
    year: '2011-2013', company: 'Implantable Products Group', role: 'VP of Product Development', featured: false,
    category: 'Data & Analytics', tags: ['Healthcare', 'Post-Freddie Mac'], accentColor: '#14b8a6',
    stats: [{ value: '5', label: 'Major Carriers' }, { value: '26', label: 'BCBS Companies' }, { value: '2', label: 'Months to Relaunch' }, { value: '2013', label: 'TAG Award Finalist' }],
    sections: [{ id: 'overview', label: 'Overview' }, { id: 'challenge', label: 'The Challenge' }, { id: 'architecture', label: 'Architecture' }, { id: 'analytics', label: 'Analytics' }, { id: 'turnaround', label: 'The Turnaround' }, { id: 'results', label: 'Results' }, { id: 'legacy', label: 'Legacy' }],
    quote: '"When I arrived, the entire platform was a facade. Two months later, every carrier had subscribed."'
  }
};

const allProjects = [
  { ...projectsData.consas, order: 1 },
  { ...projectsData.recovery, order: 2 },
  { ...projectsData.restatement, order: 3 },
  { ...projectsData.setclear, order: 4 },
  { ...projectsData.homedepot, order: 5 },
  { ...projectsData.ipg, order: 6 },
  { ...projectsData.tokiomarine, order: 7 },
  { ...projectsData.merkle, order: 8 },
  { ...projectsData.globaldata, order: 9 },
];


// ----------------------------------------------------------------------------
// CONTENT COMPONENTS
// ----------------------------------------------------------------------------

const CONSASContent = ({ activeSection }) => {
  const theme = useTheme();
  const colors = getContentColors(theme);
  const [expandedPhase, setExpandedPhase] = useState(null);
  
  const phases = [
    { phase: 'Discovery & Negotiation', duration: 'Months 1-2', description: 'Individual negotiations with 86 business unit owners to identify benefits, savings, and cutover dates.', technical: 'Created detailed inventory of all SAS installations, versions, job schedules, and dependencies.', color: colors.orange },
    { phase: 'Architecture Design', duration: 'Months 2-3', description: 'Designed two-node highly available architecture with geographic diversity.', technical: 'Nodes on separate networks for zone diversity. Failover designed for immediate recovery.', color: colors.yellow },
    { phase: 'Infrastructure Build', duration: 'Months 3-5', description: 'Procured and configured Sun Microsystems 64-processor servers.', technical: 'Configured NAS storage arrays, network infrastructure, and failover triggers.', color: colors.green },
    { phase: 'The ioctl Crisis', duration: 'Month 5', description: 'Discovered critical file locking bug preventing failover operation.', technical: 'Deadlocks caused by ioctl implementation in SunOS not properly releasing file handles.', color: colors.red },
    { phase: 'Kernel Code Development', duration: 'Months 5-6', description: 'Researched Unix internals, developed and tested replacement file locking mechanism.', technical: 'Rewrote ioctl code. Sun incorporated fix into emergency patch release.', color: colors.purple },
    { phase: 'Parallel Runs & Migration', duration: 'Months 6-9', description: 'Executed parallel runs with each of 86 business units.', technical: 'Each business unit ran jobs on both legacy and CONSAS environments.', color: colors.blue }
  ];

  const metrics = [
    { metric: 'SAS Environments', before: '86', after: '1', improvement: '99% Consolidation' },
    { metric: 'Annual Licensing', before: '$20M', after: '$3M', improvement: '$17M Saved' },
    { metric: 'Processing Time', before: 'Baseline', after: '-80%', improvement: '5x Faster' },
    { metric: 'High Availability', before: 'None', after: 'Geographic HA', improvement: 'Continuous' }
  ];

  return (
    <>
      {activeSection === 'overview' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
	  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '60px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>The Chaos of 86 Systems</h2>
              <div style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>
                <p style={{ marginBottom: '16px' }}>When I arrived at <CompanyLink name="Freddie Mac" /> in early 1999 as a Principal Systems Architect, the <CompanyLink name="SAS" /> environment was a mess: <strong style={{ color: colors.yellow }}>86 separate departmental installations</strong>, many running on <CompanyLink name="Sun Microsystems" /> mini servers literally sitting on desktops.</p>
                <p style={{ marginBottom: '16px' }}>Different versions, inconsistent maintenance, no centralized support. Licensing costs had ballooned to <strong style={{ color: colors.yellow }}>$20 million annually</strong>.</p>
                <p>The CIO, the VP of IT, and the Director of Infrastructure sponsored me specifically to solve this problem. What they didn't know was that solving it would require rewriting Unix kernel code.</p>
              </div>
            </div>
            <div style={{ backgroundColor: theme?.name === 'light' ? 'rgba(180, 83, 9, 0.06)' : 'rgba(234, 179, 8, 0.08)', border: theme?.name === 'light' ? '1px solid rgba(180, 83, 9, 0.2)' : '1px solid rgba(234, 179, 8, 0.2)', borderRadius: '12px', padding: '32px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: colors.yellow, marginBottom: '20px' }}>The Problem Landscape</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                {['86 separate SAS environments across departments', 'Desktop-located mini servers with no redundancy', 'Multiple SAS versions causing compatibility issues', '$20M annual licensing costs (distributed)', 'No high availability or failover capability'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.body }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: colors.yellow, borderRadius: '50%', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'architecture' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Two-Node High Availability Architecture</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px', marginBottom: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>The architecture I designed centered on two 64-processor <CompanyLink name="Sun Microsystems" /> servers with NAS storage, geographic diversity, and automatic failover. The goal was enterprise-grade reliability with centralized management.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[{ label: 'Primary Node', value: '64-proc Sun', color: colors.blue }, { label: 'Secondary Node', value: '64-proc Sun', color: colors.green }, { label: 'Storage', value: 'NAS Array', color: colors.purple }, { label: 'Failover', value: 'Automatic', color: colors.yellow }].map((item, i) => (
                <div key={i} style={{ padding: '20px', backgroundColor: `${item.color}10`, borderRadius: '8px', border: `1px solid ${item.color}30` }}>
                  <div style={{ fontSize: '12px', color: colors.muted, marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'implementation' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Implementation Timeline</h2>
          <div style={{ maxWidth: '800px' }}>
            {phases.map((item, index) => (
              <TimelineItem key={index} {...item} isExpanded={expandedPhase === index} onToggle={() => setExpandedPhase(expandedPhase === index ? null : index)} index={index} />
            ))}
          </div>
        </section>
      )}

      {activeSection === 'kernel' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>The Kernel Solution</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: colors.red }}>The Problem</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>File locking deadlocks caused by ioctl implementation in SunOS. SAS processes would hang during multiplexed operations, and only a full server restart would clear the locks.</p>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: colors.green }}>The Solution</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>I researched other Unix implementations, rewrote the ioctl code step-by-step on a test server, capturing input and output comparisons. <CompanyLink name="Sun Microsystems" /> <strong style={{ color: colors.green }}>incorporated my code into an emergency patch release</strong>.</p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}><CompanyLink name="SAS Institute" /> also modified their platform based on my findings, creating <strong style={{ color: colors.blue }}>"Enterprise SAS Highly Available"</strong>.</p>
          </div>
        </section>
      )}

      {activeSection === 'results' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Results & Impact</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '32px', marginBottom: '40px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.sectionBorder}` }}>
                  <th style={{ textAlign: 'left', padding: '12px', color: colors.muted, fontWeight: '500' }}>Metric</th>
                  <th style={{ textAlign: 'center', padding: '12px', color: colors.red, fontWeight: '500' }}>Before</th>
                  <th style={{ textAlign: 'center', padding: '12px', color: colors.green, fontWeight: '500' }}>After</th>
                  <th style={{ textAlign: 'right', padding: '12px', color: colors.yellow, fontWeight: '500' }}>Improvement</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${colors.sectionBorder}` }}>
                    <td style={{ padding: '16px 12px', color: colors.body }}>{row.metric}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: colors.red }}>{row.before}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'center', color: colors.green }}>{row.after}</td>
                    <td style={{ padding: '16px 12px', textAlign: 'right', color: colors.yellow, fontWeight: '600' }}>{row.improvement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeSection === 'legacy' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Legacy & Recognition</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>The CONSAS environment I built in 1999 was <strong style={{ color: colors.green }}>still running in 2013</strong> — 14 years later and likely beyond. The only formal recognition I received was the offer of a permanent role at <CompanyLink name="Freddie Mac" />.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {[{ value: '14+', label: 'Years Running', color: colors.blue }, { value: '2', label: 'Vendor Adoptions', color: colors.purple }, { value: '$17M', label: 'Annual Savings', color: colors.green }].map((item, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '24px', backgroundColor: `${item.color}10`, borderRadius: '8px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: '14px', color: colors.muted }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};


const RecoveryContent = ({ activeSection }) => {
  const theme = useTheme();
  const colors = getContentColors(theme);
  const [expandedDay, setExpandedDay] = useState(null);

  const timeline = [
    { day: 'Hour 0', title: 'Catastrophic Discovery', description: 'A team member deletes critical filesystem structures. The petabyte-scale DB2 database goes offline.', technical: 'EMC partition structures and AIX JFS segment links severed from parent database.', color: colors.red },
    { day: 'Hours 1-4', title: 'Assessment & Mobilization', description: 'Using military 5-paragraph order methodology, we assess the situation. IBM says: "No documented recovery path exists."', technical: 'Inventory: OS logs, network traffic logs, application logs, one-month-old backup.', color: colors.orange },
    { day: 'Hours 5-12', title: 'CEO Escalation & IBM Engagement', description: 'CEO engages IBM CEO. Team of IBM architects dispatched.', technical: 'IBM confirms no standard recovery procedure exists for this scenario.', color: colors.yellow },
    { day: 'Days 1-3', title: 'Filesystem Analysis', description: 'Deep analysis of AIX JFS structures, EMC partition metadata.', technical: 'Mapping inode tables, extent records, and allocation bitmaps to reconstruct segment boundaries.', color: colors.green },
    { day: 'Days 4-6', title: 'Reconstruction', description: 'Segment-by-segment database reconstruction using filesystem metadata.', technical: 'Custom scripts to parse JFS structures and rebuild DB2 tablespace mappings.', color: colors.blue },
    { day: 'Day 7', title: 'Validation & Recovery', description: '$3 trillion in mortgage data recovered. 99.97% recovery rate achieved.', technical: 'All mortgage loans validated against backup records. ~4 days of microfiche recovery required.', color: colors.purple }
  ];

  return (
    <>
      {activeSection === 'overview' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '60px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>When the Impossible Happened</h2>
              <div style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>
                <p style={{ marginBottom: '16px' }}>In 2000, a team member attempting to free up "useless space" deleted critical filesystem structures. The petabyte-scale <CompanyLink name="IBM" /> DB2 database that processed <strong style={{ color: colors.yellow }}>$1.5 trillion in monthly mortgage operations</strong> went offline.</p>
                <p style={{ marginBottom: '16px' }}><CompanyLink name="IBM" />'s top database architects assessed the situation and delivered their verdict: <strong style={{ color: colors.red }}>"There is no documented recovery path for this scenario."</strong></p>
                <p>Seven days later, we had recovered <strong style={{ color: colors.green }}>$3 trillion in mortgage loans</strong> — 99.97% of all data — using an approach no one had ever attempted.</p>
              </div>
            </div>
            <div style={{ backgroundColor: theme?.name === 'light' ? 'rgba(29, 78, 216, 0.06)' : 'rgba(59, 130, 246, 0.08)', border: theme?.name === 'light' ? '1px solid rgba(29, 78, 216, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', padding: '32px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: colors.blue, marginBottom: '20px' }}>The Stakes</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                {['$3 trillion in mortgage loans at risk', '$1.5 trillion monthly operations halted', 'One-month-old backup was only fallback', 'IBM declared recovery impossible', 'Federal regulators watching'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.body }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: colors.blue, borderRadius: '50%', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'timeline' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Seven Days of Recovery</h2>
          <div style={{ maxWidth: '800px' }}>
            {timeline.map((item, index) => (
              <TimelineItem key={index} phase={item.title} duration={item.day} description={item.description} technical={item.technical} color={item.color} isExpanded={expandedDay === index} onToggle={() => setExpandedDay(expandedDay === index ? null : index)} index={index} />
            ))}
          </div>
        </section>
      )}

      {activeSection === 'methodology' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>The Unprecedented Approach</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>Rather than attempting traditional database recovery, we went <strong style={{ color: colors.purple }}>below the database layer</strong> to the filesystem itself. By analyzing AIX JFS structures, <CompanyLink name="EMC" /> partition metadata, and network traffic logs, we reconstructed the database one segment at a time.</p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>This approach had never been documented for DB2 recovery. We were writing the playbook as we executed it.</p>
          </div>
        </section>
      )}

      {activeSection === 'architecture' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Recovery Architecture</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>The key insight was that while DB2 transaction logs were unavailable, <strong style={{ color: colors.green }}>the filesystem still contained metadata about segment boundaries</strong>. Combined with application-level audit logs and network traffic timestamps, we could reconstruct the sequence of transactions.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
              {[{ layer: 'Application', status: 'Audit logs available', color: colors.blue }, { layer: 'Database', status: 'Transaction logs LOST', color: colors.red }, { layer: 'Filesystem', status: 'JFS metadata intact', color: colors.green }, { layer: 'Storage', status: 'EMC partition metadata', color: colors.yellow }].map((item, i) => (
                <div key={i} style={{ padding: '16px', backgroundColor: `${item.color}10`, borderRadius: '8px', border: `1px solid ${item.color}30` }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: item.color, marginBottom: '4px' }}>{item.layer}</div>
                  <div style={{ fontSize: '13px', color: colors.body }}>{item.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'results' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Results</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {[{ value: '$3T', label: 'Data Recovered', color: colors.green }, { value: '99.97%', label: 'Recovery Rate', color: colors.blue }, { value: '7', label: 'Days Total', color: colors.yellow }, { value: '~4', label: 'Days Manual Recovery', color: colors.orange }].map((item, i) => (
              <StatCard key={i} value={item.value} label={item.label} accentColor={item.color} />
            ))}
          </div>
        </section>
      )}

      {activeSection === 'legacy' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Legacy</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>This recovery methodology was subsequently adopted by other organizations facing similar catastrophic failures. The approach of going below the database layer to filesystem-level reconstruction became a template for "last resort" recovery scenarios.</p>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: colors.body }}><strong style={{ color: colors.purple }}>"Title doesn't mean you're above the work."</strong> — I was managing a $250M budget, but when the database was gone, I sat with the team and helped rebuild it segment by segment.</p>
          </div>
        </section>
      )}
    </>
  );
};


const RestatementContent = ({ activeSection }) => {
  const theme = useTheme();
  const colors = getContentColors(theme);

  return (
    <>
      {activeSection === 'overview' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>The Largest Financial Restatement in GSE History</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>In 2000, <CompanyLink name="Freddie Mac" /> faced a regulatory crisis requiring a <strong style={{ color: colors.green }}>7-year lookback to 1993</strong>. All 86 business departments had to be restated. The challenge: legacy systems from 1993 ran on incompatible operating systems and hardware.</p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>I led the infrastructure planning, designed methodology using <strong style={{ color: colors.green }}>200+ parallel platforms</strong> with period-appropriate operating systems, and coordinated the largest single hiring event in Northern Virginia history — <strong style={{ color: colors.yellow }}>300 consultants onboarded in 90 days</strong>.</p>
          </div>
        </section>
      )}
      {['timeline', 'scale', 'approach', 'results', 'legacy'].map(section => activeSection === section && (
        <section key={section} style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>
              {section === 'timeline' && 'From internal investigation in 2000 through restatement release in November 2003, spanning executive departures, regulatory scrutiny, and ultimately successful completion.'}
              {section === 'scale' && '86 departmental restatements, 300 consultants, 200+ legacy systems, 80+ simultaneous projects, 7-year lookback period. $5 billion cumulative adjustment.'}
              {section === 'approach' && 'I designed a methodology using parallel platforms with period-appropriate operating systems. Restore backups to compatible environments, extract data, transform into consistent formats, validate with MicroStrategy.'}
              {section === 'results' && 'All 86 departments successfully restated. Company survived. $125M OFHEO fine in December 2003. The infrastructure I built made it possible.'}
              {section === 'legacy' && '"Failure was NOT an option. Success was measured by the company still existing and not being taken over by the federal government."'}
            </p>
          </div>
        </section>
      ))}
    </>
  );
};

const SetClearContent = ({ activeSection }) => {
  const theme = useTheme();
  const colors = getContentColors(theme);

  return (
    <>
      {activeSection === 'overview' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>The Only Team to Deliver</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>SetClear was a joint venture between <CompanyLink name="Bloomberg" /> and <CompanyLink name="Calyon" /> to create a global settlement platform. Multiple teams were assigned to various components. <strong style={{ color: colors.orange }}>My team was the only one to complete their work</strong>.</p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>This success enabled the joint venture to continue and ultimately be acquired by <CompanyLink name="Bloomberg" /> in 2009.</p>
          </div>
        </section>
      )}
      {['challenge', 'architecture', 'delivery', 'results', 'legacy'].map(section => activeSection === section && (
        <section key={section} style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>
              {section === 'challenge' && 'Global settlement required capturing SYN transactions from Citibank for real-time analysis of settlement and trade efficiencies. Multiple teams, complex integration, tight deadlines.'}
              {section === 'architecture' && 'Microsoft stack: MSMQ for SYN transaction capture, SQL Server for storage, SSIS for ETL, SSAS for analytics cubes, BizTalk for messaging. Later migrated to Business Objects.'}
              {section === 'delivery' && 'Phase 1 (Dec 2007 - Sep 2008): Foundation. Phase 2 (Sep 2008 - Jun 2009): Enhancement. Our team delivered both phases while others failed.'}
              {section === 'results' && 'Billions in daily settlements processed. 40% efficiency improvement. Platform acquisition by Bloomberg in 2009.'}
              {section === 'legacy' && '"There were several teams working on that joint venture. We were the only ones who delivered. When Bloomberg acquired the platform, it was because it actually worked."'}
            </p>
          </div>
        </section>
      ))}
    </>
  );
};

const HomeDepotContent = ({ activeSection }) => {
  const theme = useTheme();
  const colors = getContentColors(theme);

  return (
    <>
      {activeSection === 'overview' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>When Steve Ballmer Delivered the Code</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>In 2004, <CompanyLink name="The Home Depot" /> was selected as <CompanyLink name="Microsoft" />'s first enterprise-scale deployment of their new BI platform. The stakes were high — <strong style={{ color: colors.orange }}>2,000 stores worldwide</strong>, over 500 discrete reports.</p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>When the beta code was ready, <strong style={{ color: colors.orange }}>Steve Ballmer personally flew to Atlanta to deliver it</strong>. That's when you know you're building something that matters.</p>
          </div>
        </section>
      )}
      {['challenge', 'architecture', 'microsoft', 'results', 'legacy'].map(section => activeSection === section && (
        <section key={section} style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>{section === 'microsoft' ? 'Microsoft Partnership' : section.charAt(0).toUpperCase() + section.slice(1)}</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>
              {section === 'challenge' && '2,000 stores, 500+ discrete reports, multiple BI tools (Cognos, Business Objects, Crystal). Need for consolidation and standardization on a single platform.'}
              {section === 'architecture' && 'SQL Server Analysis Services cubes, SQL Server Integration Services ETL, SQL Server Reporting Services delivery. Kimball methodology data warehouse design.'}
              {section === 'microsoft' && 'First enterprise deployment of Microsoft BI stack. Direct partnership with Microsoft product team. Steve Ballmer personally delivered beta code. Our feedback shaped the platform.'}
              {section === 'results' && 'Reduced reports from 500 to <200. 40% faster report generation. 25% accuracy improvement. Platform became Microsoft\'s reference architecture.'}
              {section === 'legacy' && 'The implementation became Microsoft\'s case study for enterprise BI adoption. The architecture patterns we established influenced their product roadmap.'}
            </p>
          </div>
        </section>
      ))}
    </>
  );
};

const TokioMarineContent = ({ activeSection }) => {
  const theme = useTheme();
  const colors = getContentColors(theme);

  return (
    <>
      {activeSection === 'overview' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Pioneering Lakehouse Before the Term Existed</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>At <CompanyLink name="Tokio Marine HCC" />, I built what we now call a "medallion architecture" on <CompanyLink name="Snowflake" /> — Bronze, Silver, Gold layers — before <CompanyLink name="Databricks" /> popularized the term. <CompanyLink name="Snowflake" /> consultants initially opposed the approach.</p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>Today, it's considered best practice. <strong style={{ color: colors.green }}>Being an early adopter and using common sense engineering can drive significant improvements.</strong></p>
          </div>
        </section>
      )}
      {['challenge', 'architecture', 'implementation', 'results', 'legacy'].map(section => activeSection === section && (
        <section key={section} style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>
              {section === 'challenge' && 'Legacy on-premises data warehouse, siloed analytics, inconsistent data definitions. Need for cloud migration with improved governance.'}
              {section === 'architecture' && 'Bronze (raw), Silver (cleansed), Gold (aggregated) layers on Snowflake. MicroStrategy for BI, Attunity for CDC, AWS for infrastructure.'}
              {section === 'implementation' && '$15M annual budget. Migration from on-premises to AWS/Snowflake. Data governance policies and organizational data literacy programs.'}
              {section === 'results' && '40% cost reduction. GDPR compliance frameworks. Data stewardship programs across business units.'}
              {section === 'legacy' && 'The medallion pattern we implemented became industry standard. Snowflake now recommends this approach to all enterprise customers.'}
            </p>
          </div>
        </section>
      ))}
    </>
  );
};

const MerkleContent = ({ activeSection }) => {
  const theme = useTheme();
  const colors = getContentColors(theme);

  return (
    <>
      {activeSection === 'overview' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Deep Platform Expertise Transforms Campaigns</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>At <CompanyLink name="Merkle" />, I leveraged deep <CompanyLink name="MicroStrategy" /> expertise and R-based predictive modeling to drive campaign lift and conversion for major retail CDP customers including Carter's and OshKosh.</p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>Integration with <CompanyLink name="Salesforce" /> Marketing Cloud, Commerce Cloud, and Service Cloud created a unified view of customer engagement.</p>
          </div>
        </section>
      )}
      {['challenge', 'architecture', 'predictive', 'results', 'legacy'].map(section => activeSection === section && (
        <section key={section} style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>{section === 'predictive' ? 'Predictive Models' : section.charAt(0).toUpperCase() + section.slice(1)}</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>
              {section === 'challenge' && 'Fragmented customer data, limited segmentation capabilities, campaign targeting based on rules rather than predictions.'}
              {section === 'architecture' && 'MicroStrategy for BI and analytics, Informatica/MuleSoft for integration, Salesforce ecosystem for customer engagement, R for predictive modeling.'}
              {section === 'predictive' && 'R-based models for customer lifetime value, churn prediction, next-best-offer. Integration with MicroStrategy for operational deployment.'}
              {section === 'results' && '25% campaign lift, 40% better targeting accuracy, 3x ROI improvement on marketing spend.'}
              {section === 'legacy' && '"Deep platform expertise transforms good campaigns into great ones." The predictive models and integration patterns established best practices for CDP implementations.'}
            </p>
          </div>
        </section>
      ))}
    </>
  );
};

const GlobalDataContent = ({ activeSection }) => {
  const theme = useTheme();
  const colors = getContentColors(theme);

  return (
    <>
      {activeSection === 'overview' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Carving Out My Own Role</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>At <CompanyLink name="Dun & Bradstreet" />, I became the go-to technical strategist for <strong style={{ color: colors.blue }}>$240M in quarterly partner-influenced revenue</strong>. I manage strategic partnerships with <CompanyLink name="AWS" />, <CompanyLink name="Snowflake" />, <CompanyLink name="Databricks" />, and 15+ other technology vendors.</p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>"I treat every role as someone giving me the keys to my own franchise."</p>
          </div>
        </section>
      )}
      {['partners', 'gtm', 'ai', 'customers', 'results', 'approach', 'legacy'].map(section => activeSection === section && (
        <section key={section} style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>{
            section === 'partners' ? 'Partner Ecosystem' : 
            section === 'gtm' ? 'Go-to-Market' :
            section === 'ai' ? 'AI Integrations' :
            section.charAt(0).toUpperCase() + section.slice(1)
          }</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>
              {section === 'partners' && '15+ strategic alliances: AWS, Google Cloud, Snowflake, Databricks, SAP, Informatica, Reltio, Profisee, Syndigo, and more.'}
              {section === 'gtm' && 'Joint go-to-market strategies, solution development initiatives, technical training curriculum adopted across partner ecosystem.'}
              {section === 'ai' && 'Training 50+ senior technical resources on AI implementation. Coaching enterprise customers on AI automation. 85% satisfaction rating.'}
              {section === 'customers' && 'Fortune 500 clients: Lloyd\'s of London, SAP AG, Ford, AIG, Walmart, Amazon, Google. End-to-end customer implementations generating millions in net new business.'}
              {section === 'results' && '$240M quarterly partner-influenced revenue. 15+ strategic alliances. 50+ resources trained. 85% customer satisfaction.'}
              {section === 'approach' && 'I treat every role as someone giving me the keys to my own franchise. Build relationships, deliver value, create opportunities.'}
              {section === 'legacy' && 'Established D&B as a strategic partner for modern data platforms. Created technical standards adopted across the partner ecosystem.'}
            </p>
          </div>
        </section>
      ))}
    </>
  );
};

const IPGContent = ({ activeSection }) => {
  const theme = useTheme();
  const colors = getContentColors(theme);

  const carriers = [
    { name: 'BlueCross BlueShield', detail: '26 Independent Companies', color: colors.blue },
    { name: 'Aetna', detail: 'National Carrier', color: colors.purple },
    { name: 'UnitedHealth', detail: 'Largest US Insurer', color: colors.blue },
    { name: 'Cigna', detail: 'Global Health Services', color: colors.orange },
    { name: 'Humana', detail: 'Medicare Specialist', color: colors.green }
  ];

  const analyticsCapabilities = [
    { metric: 'Incidence Recurrence', description: 'Track repeat surgical procedures by implant type, manufacturer, and patient demographics', icon: '📊' },
    { metric: 'Implant Effectiveness', description: 'Correlate outcomes with specific implant manufacturers and product lines', icon: '🔬' },
    { metric: 'Provider Proficiency', description: 'Analyze surgeon and facility performance by procedure type and volume', icon: '👨‍⚕️' },
    { metric: 'Supplier Analytics', description: 'Compare implant costs, outcomes, and delivery efficiency across manufacturers', icon: '📦' }
  ];

  return (
    <>
      {activeSection === 'overview' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px', marginBottom: '60px' }}>
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Rescuing a Failing Platform</h2>
              <div style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body }}>
                <p style={{ marginBottom: '16px' }}>When I arrived at <CompanyLink name="Implantable Products Group" /> as VP of Product Development, I discovered something alarming: the entire analytics platform was <strong style={{ color: colors.red }}>hardcoded</strong>. The dashboards and reports weren't reflecting actual carrier data — they were static facades.</p>
                <p style={{ marginBottom: '16px' }}>The previous VP of Product and the platform's original creator had resigned, leaving behind consultants who had built a Potemkin village of analytics. The five major insurance carriers — <CompanyLink name="BlueCross BlueShield" />, <CompanyLink name="Aetna" />, <CompanyLink name="UnitedHealth" />, <CompanyLink name="Cigna" />, and <CompanyLink name="Humana" /> — were receiving reports that looked impressive but contained no real insights.</p>
                <p><strong style={{ color: colors.green }}>Within 2 months of our complete rewrite, every carrier had subscribed to the platform.</strong></p>
              </div>
            </div>
            <div style={{ backgroundColor: theme?.name === 'light' ? 'rgba(20, 184, 166, 0.06)' : 'rgba(20, 184, 166, 0.08)', border: theme?.name === 'light' ? '1px solid rgba(20, 184, 166, 0.2)' : '1px solid rgba(20, 184, 166, 0.2)', borderRadius: '12px', padding: '32px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '2px', color: colors.green, marginBottom: '20px' }}>Platform Scope</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
                {['5 major insurance carriers', '26 independent BCBS companies', 'CMS-1500 and other standard claim forms', 'ICD-9 codes (preparing for ICD-10)', 'CPT procedure codes', 'Medical implant tracking'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: colors.body }}>
                    <span style={{ width: '6px', height: '6px', backgroundColor: colors.green, borderRadius: '50%', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'challenge' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>The Challenge: A Platform Built on Lies</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px', marginBottom: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>The platform I inherited had a critical flaw: <strong style={{ color: colors.red }}>nothing was real</strong>. The <CompanyLink name="MicroStrategy" /> dashboards displayed hardcoded values that looked like analytics but were actually static numbers. When carriers sent transaction data, it was ingested but never actually processed or analyzed.</p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>The previous team had created an elaborate illusion — reports that appeared to show insights about surgical costs, implant effectiveness, and provider performance, but were entirely disconnected from the actual claims data.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
              {[{ label: 'Data Integration', status: 'Broken', color: colors.red }, { label: 'Analytics', status: 'Hardcoded', color: colors.red }, { label: 'Reports', status: 'Static Facades', color: colors.red }, { label: 'Carrier Trust', status: 'At Risk', color: colors.orange }].map((item, i) => (
                <div key={i} style={{ padding: '16px', backgroundColor: `${item.color}10`, borderRadius: '8px', border: `1px solid ${item.color}30` }}>
                  <div style={{ fontSize: '12px', color: colors.muted, marginBottom: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: item.color }}>{item.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'architecture' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Platform Architecture</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px', marginBottom: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>The Claims Analytics and Optimization Platform was built on <CompanyLink name="MicroStrategy" />, processing healthcare claims data from the five major carriers. We ingested standard insurance forms including the <strong style={{ color: colors.blue }}>CMS-1500</strong> (formerly HCFA-1500) and other claim formats used during this period.</p>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: colors.heading }}>Data Processing Pipeline</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {[{ stage: 'Ingestion', detail: 'CMS-1500, UB-04, and other standard forms', color: colors.blue }, { stage: 'Parsing', detail: 'ICD-9 diagnosis & CPT procedure codes', color: colors.purple }, { stage: 'Enrichment', detail: 'Implant manufacturer & supplier data', color: colors.green }, { stage: 'Analytics', detail: 'MicroStrategy BI & statistical modeling', color: colors.orange }].map((item, i) => (
                <div key={i} style={{ padding: '20px', backgroundColor: `${item.color}10`, borderRadius: '8px', border: `1px solid ${item.color}30` }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: item.color, marginBottom: '8px' }}>{item.stage}</div>
                  <div style={{ fontSize: '13px', color: colors.body }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'analytics' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Analytics Capabilities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {analyticsCapabilities.map((cap, i) => (
              <div key={i} style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '24px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{cap.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.heading, marginBottom: '8px' }}>{cap.metric}</h3>
                <p style={{ fontSize: '14px', color: colors.body, lineHeight: '1.6' }}>{cap.description}</p>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: colors.heading }}>Business Objectives</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '15px', lineHeight: '2' }}>
              {['Reduce overall cost of surgeries based on setting and implant selection', 'Improve efficiency of implant delivery and supply chain', 'Improve surgical outcomes through provider performance insights', 'Optimize implant manufacturer selection based on outcomes data', 'Enable carriers to negotiate better rates with providers and suppliers'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: colors.body, marginBottom: '8px' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: colors.green, borderRadius: '50%', flexShrink: 0, marginTop: '8px' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {activeSection === 'turnaround' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>The Turnaround</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px', marginBottom: '40px' }}>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>My first priority was assembling the right team. I <strong style={{ color: colors.red }}>transitioned out the consultants</strong> who had built the hardcoded platform and brought in experts who understood both healthcare data and proper analytics engineering.</p>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>We then <strong style={{ color: colors.green }}>re-engineered the entire platform</strong> to process actual live data from the carriers. Every dashboard, every report, every metric was rebuilt to reflect real claims data, real procedure codes, and real outcomes.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
              {[{ phase: 'Week 1-2', action: 'Platform Assessment', color: colors.blue }, { phase: 'Week 3-4', action: 'Team Restructuring', color: colors.purple }, { phase: 'Week 5-6', action: 'Architecture Rebuild', color: colors.orange }, { phase: 'Week 7-8', action: 'Carrier Relaunch', color: colors.green }].map((item, i) => (
                <div key={i} style={{ padding: '16px', backgroundColor: `${item.color}10`, borderRadius: '8px', border: `1px solid ${item.color}30` }}>
                  <div style={{ fontSize: '12px', color: colors.muted, marginBottom: '4px' }}>{item.phase}</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: item.color }}>{item.action}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'results' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Results</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px', marginBottom: '40px' }}>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}><strong style={{ color: colors.green }}>Within 2 months of the rewrite, every one of our insurance carriers subscribed to the platform.</strong> The value was now real and demonstrable.</p>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: colors.heading }}>Carrier Adoption</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {carriers.map((carrier, i) => (
                <div key={i} style={{ padding: '20px', backgroundColor: `${carrier.color}10`, borderRadius: '8px', border: `1px solid ${carrier.color}30`, textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: carrier.color, marginBottom: '4px' }}>{carrier.name}</div>
                  <div style={{ fontSize: '12px', color: colors.muted }}>{carrier.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'legacy' && (
        <section style={{ animation: 'fadeIn 0.5s ease' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px', color: colors.heading }}>Legacy & Recognition</h2>
          <div style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.sectionBorder}`, borderRadius: '12px', padding: '40px' }}>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: colors.body, marginBottom: '24px' }}>The platform we rebuilt was recognized as a <strong style={{ color: colors.green }}>TAG Intel Healthcare IT Innovation Award Finalist in 2013</strong>. This recognition validated not just the technology, but the approach: identifying a broken system, assembling the right team, and delivering real value in a compressed timeframe.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '24px' }}>
              {[{ value: '2013', label: 'TAG Award Finalist', color: colors.green }, { value: '2', label: 'Months to Relaunch', color: colors.blue }, { value: '5', label: 'Major Carriers', color: colors.purple }, { value: '100%', label: 'Carrier Adoption', color: colors.orange }].map((item, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '24px', backgroundColor: `${item.color}10`, borderRadius: '8px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700', color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: '14px', color: colors.muted }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};


// ----------------------------------------------------------------------------
// MAIN PORTFOLIO COMPONENT
// ----------------------------------------------------------------------------

const LynnOverallPortfolio = () => {
  const [themeName, setThemeName] = useState('light');
  const [language, setLanguage] = useState('en');
  const [currentView, setCurrentView] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTag, setActiveTag] = useState('All');

  const theme = themes[themeName];
  const t = translations[language];
  const pt = projectTranslations[language];

  useEffect(() => {
    setActiveSection('overview');
  }, [selectedProject]);

  const categories = ['All', 'Infrastructure', 'Data & Analytics', 'Leadership'];
  const tags = ['All', 'Freddie Mac Era', 'Post-Freddie Mac', 'Current', 'Healthcare', 'Kernel Code', 'Recovery', 'Microsoft First', 'Snowflake First'];

  const filteredProjects = allProjects.filter(project => {
    const categoryMatch = activeCategory === 'All' || project.category === activeCategory;
    const tagMatch = activeTag === 'All' || project.tags.includes(activeTag);
    return categoryMatch && tagMatch;
  });

  const renderProjectContent = () => {
    if (!selectedProject) return null;
    const ContentComponent = {
      consas: CONSASContent,
      recovery: RecoveryContent,
      restatement: RestatementContent,
      setclear: SetClearContent,
      homedepot: HomeDepotContent,
      ipg: IPGContent,
      tokiomarine: TokioMarineContent,
      merkle: MerkleContent,
      globaldata: GlobalDataContent
    }[selectedProject.id];
    return ContentComponent ? <ContentComponent activeSection={activeSection} setActiveSection={setActiveSection} /> : null;
  };

  const projectText = selectedProject ? pt[selectedProject.id] : null;

  return (
    <ThemeContext.Provider value={theme}>
      <LanguageContext.Provider value={{ language, t, pt }}>
        <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', transition: 'all 0.3s ease' }}>
          <style>{fadeInKeyframes}</style>
          <ThemeToggle theme={theme} setTheme={setThemeName} t={t} />
          <LanguageToggle language={language} setLanguage={setLanguage} theme={theme} />

          {currentView === 'home' && (
            <>
              {/* Hero Section */}
              <header style={{ padding: '120px 40px 80px', background: theme.gradient }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '3px' }}>Portfolio</span>
                  </div>
                  <h1 style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: '700', marginBottom: '16px', background: theme.name === 'light' ? 'linear-gradient(135deg, #0f172a 0%, #334155 100%)' : 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {t.title}
                  </h1>
                  <p style={{ fontSize: '24px', color: theme.textSecondary, marginBottom: '32px' }}>{t.subtitle}</p>
                  <p style={{ fontSize: '18px', color: theme.textMuted, maxWidth: '800px', lineHeight: '1.7', marginBottom: '40px' }}>{t.tagline}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {[{ label: t.dataGovernance, color: theme.name === 'light' ? '#1d4ed8' : '#3b82f6' }, { label: t.enterpriseArchitecture, color: theme.name === 'light' ? '#b45309' : '#ca8a04' }, { label: t.aiStrategy, color: theme.name === 'light' ? '#7c3aed' : '#7c3aed' }, { label: t.cloudPlatforms, color: theme.name === 'light' ? '#15803d' : '#16a34a' }].map((skill, i) => (
                      <span key={i} style={{ padding: '8px 16px', backgroundColor: `${skill.color}15`, border: `1px solid ${skill.color}40`, borderRadius: '20px', fontSize: '14px', color: skill.color, fontWeight: '500' }}>{skill.label}</span>
                    ))}
                  </div>
                </div>
              </header>

              {/* Projects Section */}
              <section style={{ padding: '80px 40px', backgroundColor: theme.bgSecondary }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
                    <div>
                      <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '8px', color: theme.text }}>{t.featuredProjects}</h2>
                      <p style={{ color: theme.textMuted }}>{t.firstPublicRetrospective}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {categories.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 16px', backgroundColor: activeCategory === cat ? (theme.name === 'light' ? '#1d4ed820' : '#3b82f630') : 'transparent', border: `1px solid ${activeCategory === cat ? (theme.name === 'light' ? '#1d4ed8' : '#3b82f6') : theme.border}`, borderRadius: '6px', color: activeCategory === cat ? (theme.name === 'light' ? '#1d4ed8' : '#3b82f6') : theme.textMuted, fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
                          {cat === 'All' ? t.all : cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tag Filters */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
                    {tags.map(tag => (
                      <button key={tag} onClick={() => setActiveTag(tag)} style={{ padding: '6px 12px', backgroundColor: activeTag === tag ? (theme.name === 'light' ? '#7c3aed20' : '#7c3aed30') : 'transparent', border: `1px solid ${activeTag === tag ? '#7c3aed' : theme.borderLight}`, borderRadius: '4px', color: activeTag === tag ? '#7c3aed' : theme.textMuted, fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>
                          {tag === 'All' ? t.all : tag}
                      </button>
                    ))}
                  </div>

                  {/* Active Filter Indicator */}
                  {(activeCategory !== 'All' || activeTag !== 'All') && (
                    <div style={{ marginBottom: '24px', padding: '12px 16px', backgroundColor: theme.name === 'light' ? 'rgba(29, 78, 216, 0.05)' : 'rgba(59, 130, 246, 0.1)', border: `1px solid ${theme.name === 'light' ? 'rgba(29, 78, 216, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`, borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: theme.name === 'light' ? '#1d4ed8' : '#3b82f6', fontWeight: '500' }}>{t.showing} {filteredProjects.length} {filteredProjects.length === 1 ? t.project : t.projects}</span>
                      {activeCategory !== 'All' && <span style={{ padding: '4px 8px', backgroundColor: theme.name === 'light' ? '#1d4ed820' : '#3b82f630', borderRadius: '4px', fontSize: '12px', color: theme.name === 'light' ? '#1d4ed8' : '#3b82f6' }}>{activeCategory}</span>}
                      {activeTag !== 'All' && <span style={{ padding: '4px 8px', backgroundColor: '#7c3aed20', borderRadius: '4px', fontSize: '12px', color: '#7c3aed' }}>{activeTag}</span>}
                    </div>
                  )}

                  {/* Project Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
                    {filteredProjects.map((project, index) => {
                      const projText = pt[project.id];
                      return (
                        <div key={project.id} onClick={() => { setSelectedProject(project); setCurrentView('project'); }} style={{ backgroundColor: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '16px', padding: '32px', cursor: 'pointer', transition: 'all 0.3s ease', animation: `fadeIn 0.5s ease ${index * 0.1}s both`, boxShadow: theme.shadow }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = theme.shadowHover; e.currentTarget.style.borderColor = project.accentColor + '60'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = theme.shadow; e.currentTarget.style.borderColor = theme.border; }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: project.accentColor }}>{project.year}</span>
                            <span style={{ fontSize: '12px', color: theme.textMuted }}>{project.company}</span>
                          </div>
                          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px', color: theme.text }}>{projText?.title || project.title}</h3>
                          <p style={{ fontSize: '14px', color: project.accentColor, marginBottom: '16px' }}>{projText?.subtitle || project.subtitle}</p>
                          <p style={{ fontSize: '14px', color: theme.textSecondary, lineHeight: '1.6', marginBottom: '24px' }}>{projText?.tagline || project.tagline}</p>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                            {project.tags.map((tag, i) => (
                              <span key={i} style={{ padding: '4px 10px', backgroundColor: theme.name === 'light' ? 'rgba(0,0,0,0.04)' : `${project.accentColor}10`, borderRadius: '4px', fontSize: '11px', color: theme.textMuted }}>{tag}</span>
                            ))}
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                            {project.stats.slice(0, 4).map((stat, i) => (
                              <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '20px', fontWeight: '700', color: project.accentColor }}>{stat.value}</div>
                                <div style={{ fontSize: '10px', color: theme.textMuted, fontWeight: '500' }}>{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <p style={{ textAlign: 'center', color: theme.textMuted, marginTop: '60px', fontSize: '14px' }}>{t.moreProjectsSoon}</p>
                </div>
              </section>

              {/* Footer */}
              <footer style={{ padding: '60px 40px', borderTop: `1px solid ${theme.border}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                  <p style={{ fontSize: '18px', color: theme.textSecondary, fontStyle: 'italic', marginBottom: '16px' }}>{t.footerQuote}</p>
                  <p style={{ color: theme.textMuted }}>Lynn Overall • {t.location}</p>
                </div>
              </footer>
            </>
          )}

          {currentView === 'project' && selectedProject && (
            <>
              {/* Project Header */}
              <header style={{ padding: '100px 40px 60px', background: `linear-gradient(180deg, ${selectedProject.accentColor}08 0%, transparent 100%)` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  <button onClick={() => { setCurrentView('home'); setSelectedProject(null); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.textMuted, fontSize: '14px', marginBottom: '32px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    {t.backToProjects}
                  </button>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ padding: '6px 12px', backgroundColor: `${selectedProject.accentColor}20`, borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: selectedProject.accentColor }}>{selectedProject.year}</span>
                    <span style={{ padding: '6px 12px', backgroundColor: theme.name === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)', borderRadius: '6px', fontSize: '12px', color: theme.textMuted }}>{selectedProject.company}</span>
                  </div>
                  <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: '700', marginBottom: '16px', background: theme.name === 'light' ? `linear-gradient(135deg, #0f172a 0%, ${selectedProject.accentColor} 100%)` : `linear-gradient(135deg, #ffffff 0%, ${selectedProject.accentColor} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {projectText?.title || selectedProject.title}
                  </h1>
                  <p style={{ fontSize: '20px', color: selectedProject.accentColor, marginBottom: '24px' }}>{projectText?.subtitle || selectedProject.subtitle}</p>
                  <p style={{ fontSize: '18px', color: theme.textSecondary, maxWidth: '800px', lineHeight: '1.7', marginBottom: '32px' }}>{projectText?.tagline || selectedProject.tagline}</p>
                  <MethodologyLink projectId={selectedProject.id} theme={theme} accentColor={selectedProject.accentColor} t={t} />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', marginTop: '48px' }}>
                    {selectedProject.stats.map((stat, i) => (
                      <StatCard key={i} value={stat.value} label={stat.label} accentColor={selectedProject.accentColor} />
                    ))}
                  </div>
                </div>
              </header>

              {/* Section Navigation */}
              <SectionNav sections={selectedProject.sections} activeSection={activeSection} setActiveSection={setActiveSection} accentColor={selectedProject.accentColor} theme={theme} />

              {/* Content */}
              <main style={{ padding: '60px 40px', minHeight: '60vh' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  {renderProjectContent()}
                </div>
              </main>

              {/* Project Footer */}
              <footer style={{ padding: '60px 40px', borderTop: `1px solid ${theme.border}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                  <p style={{ fontSize: '18px', color: theme.textSecondary, fontStyle: 'italic', marginBottom: '16px' }}>{projectText?.quote || selectedProject.quote}</p>
                  <p style={{ color: theme.textMuted }}>Lynn Overall • {selectedProject.role} • {selectedProject.company}</p>
                </div>
              </footer>
            </>
          )}
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default LynnOverallPortfolio;
