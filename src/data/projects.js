/**
 * Project / Product data for portfolio case studies.
 * Add hero images and screenshots to /public/projects/ and reference as /projects/filename.ext
 */

export const projects = [
  {
    id: "mining-tax",
    title: "Mining Transport Tax Application",
    tagline: "Secure revenue collection for mining logistics",
    status: "Live",
    overview: "A secure revenue collection system for the mining logistics sector. Features a responsive dashboard for tax administrators and robust API for transaction logging. Significantly reduced revenue leakage.",
    problem: "The mining sector struggled with revenue leakage and manual tracking of transport-related taxes. Multiple stakeholders needed a transparent, auditable system that could handle high transaction volumes.",
    solution: "We built an integrated platform with a React-based admin dashboard for real-time oversight and a REST API for transaction logging. The system connects tax administrators, logistics operators, and auditors in a single workflow with role-based access and audit trails.",
    myRole: ["System architecture", "Backend API design", "Frontend dashboard development"],
    screenshots: [
      { src: "/projects/mining-tax-1.png", caption: "Admin dashboard overview" },
      { src: "/projects/mining-tax-2.png", caption: "Transaction logging interface" },
      { src: "/projects/mining-tax-3.png", caption: "Reports and analytics" },
    ],
    tech: ["React", "Laravel", ".NET", "REST API"],
    client: null,
    hostCompany: null,
    liveUrl: "https://queensec.netlify.app/",
    timeline: "2023 – 2024",
    heroImage: "/projects/mining-tax-hero.png",
  },
  {
    id: "glazing-calculator",
    title: "Glazing Calculator App",
    tagline: "Construction estimation for the glass industry",
    status: "Confidential",
    overview: "(NDA Protected) A proprietary construction estimation tool for the glass industry. Engineered a Direct Manipulation interface using Flutter where users drag-and-drop components to automate estimation.",
    problem: "Manual glass estimation was error-prone and time-consuming. Clients needed a mobile-friendly tool that could handle complex component configurations and produce accurate quotes on-site.",
    solution: "Developed a Flutter app with a drag-and-drop interface that lets users compose glazing layouts visually. The system auto-calculates materials, labor, and margins while maintaining a library of standard components.",
    myRole: ["Lead developer", "Flutter architecture", "Algorithm design"],
    screenshots: [],
    tech: ["Flutter", "React", "Node.js", "Algorithms"],
    client: null,
    hostCompany: null,
    liveUrl: null,
    timeline: "2023 – 2024",
    heroImage: "/projects/glazing-hero.png",
  },
  {
    id: "immersive-real-estate",
    title: "Immersive Real Estate Suite",
    tagline: "AR/VR visualization for architectural tours",
    status: "Experimental",
    overview: "An AR/VR visualization tool allowing users to tour architectural 3D models. Features touchless UI for VR and AR integration for visualizing furniture layouts in physical spaces.",
    problem: "Real estate stakeholders needed a way to showcase properties beyond static images. Buyers and investors wanted to experience spaces before construction, while designers needed to test layout options in context.",
    solution: "Built an Unreal Engine 5–based suite with VR walkthroughs and AR overlays. Users can tour 3D models in-headset or use mobile AR to visualize furniture and finishes in physical rooms.",
    myRole: ["Lead visualization specialist", "UE5 development", "AR integration"],
    screenshots: [
      { src: "/projects/immersive-1.png", caption: "VR walkthrough interface" },
      { src: "/projects/immersive-2.png", caption: "AR furniture overlay" },
    ],
    tech: ["Unreal Engine 5", "ARCore", "C#", "Blender"],
    client: null,
    hostCompany: "VGIS",
    liveUrl: null,
    timeline: "2022 – Present",
    heroImage: "/projects/immersive-hero.png",
  },
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id) ?? null;
}
