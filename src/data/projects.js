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
      { src: "/projects/queensec-1.png", caption: "Admin dashboard overview" },
      { src: "/projects/queensec-2.png", caption: "Transaction logging interface" }, 
    ],
    tech: ["React", "Laravel", "Flutter", "REST API"],
    client: "Queensec Global Resources Limited",
    hostCompany: "Nâcham Technology",
    liveUrl: "https://queensec.netlify.app/",
    timeline: "2024 – 2025",
    heroImage: "/projects/queensec-hero.jpg",
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
    screenshots: [
      { src: "/projects/workings-1.png", caption: "Projects Page" },
      { src: "/projects/workings-2.png", caption: "Materials List Page" },
    ],
    tech: ["Flutter", "React", "Node.js", "Algorithms"],
    client: "Leads Glazing",
    hostCompany: "Nâcham Technology",
    liveUrl: null,
    timeline: "2025 – 2026",
    heroImage: "/projects/workings-hero.png",
  },
  {
    id: "tusnny-job-board",
    title: "Tusnny Job Board",
    tagline: "Custom WordPress job board plugin",
    status: "Production",
    overview: "A full-featured job board built as a custom WordPress plugin (Nacham Job Board). Provides job listings, employer and applicant flows, applications, optional subscriptions, and email notifications—without depending on WP Job Manager or other third-party plugins. Built for the Tusnny brand.",
    problem: "The client needed a self-contained job board with employer and job seeker flows, role-based dashboards, application tracking, and optional subscription gating. Off-the-shelf solutions either lacked flexibility or introduced unwanted dependencies.",
    solution: "Architected a custom WordPress plugin with custom post types (job listings, applications, applicant profiles), taxonomies (job type, category), employer and applicant roles, and shortcode-driven pages. Includes role-aware navigation, optional subscription gating with demo payment, scheduled email notifications for expiring jobs, and an RSS feed. Pluggable branding allows reuse under different names.",
    myRole: ["Plugin architecture", "Custom CPTs and taxonomies", "Shortcode development", "Subscription and billing flow", "Security and validation"],
    screenshots: [
      { src: "/projects/tusnny-hero.png", caption: "Landing page" },
      { src: "/projects/tusnny-3-jobs.png", caption: "Job listings with search and filters" },
      { src: "/projects/tusnny-2-employer.png", caption: "Employer dashboard" },
      { src: "/projects/tusnny-1-wp-plugin.png", caption: "Plugin settingss" }, 
    ],
    tech: ["WordPress", "PHP", "Custom Post Types", "Shortcodes", "ACF"],
    client: "Tusnny",
    hostCompany: "Nâcham Technology",
    liveUrl: "https://tusnny.com",
    timeline: "2025",
    heroImage: "/projects/tusnny-hero.png",
  },
  {
    id: "immersive-real-estate",
    title: "SkyFrame XR",
    tagline: "Step inside your future home before it's built",
    status: "Live",
    overview: "SkyFrame XR lets clients see their future property right where it will be—no more imagination needed. A walk-through on real terrain: on-site AR with ARO/VRO glasses, 1:1 scale virtual walkthroughs, estate masterplan projection, and instant customization of wall colors, tiles, and kitchen styles in AR.",
    problem: "Real estate was selling ideas and promises. Clients had to imagine what they were buying. Off-plan sales, diaspora engagement, and skeptical buyers needed to experience the property—to stand on the actual plot and see the estate built before their eyes—before committing.",
    solution: "Built an immersive platform with four core capabilities: (1) On-site AR walkthrough with ARO/VRO glasses so clients see buildings overlaid on bare land as they move; (2) 1:1 scale virtual walkthrough for true-to-size room exploration and layout evaluation; (3) Estate masterplan projection—entire layouts block by block with streets, houses, green areas; (4) Customization and visualization—clients personalize designs and see changes instantly in AR before a single block is laid.",
    myRole: ["Lead visualization specialist", "UE5 development", "AR/VR integration", "1:1 scale walkthrough design"],
    screenshots: [
      { src: "/projects/skyframe-1.png", caption: "On-site AR walkthrough with ARO/VRO glasses" },
      { src: "/projects/skyframe-2.png", caption: "1:1 scale virtual walkthrough" },
      { src: "/projects/skyframe-3.png", caption: "Estate masterplan projection" },
      { src: "/projects/skyframe-4.png", caption: "Customization and visualization in AR" },
    ],
    tech: ["Unreal Engine 5", "ARO/VRO", "ARCore", "C#", "Blender", "SketchUp Pro", "Meta Quest"],
    client: null,
    hostCompany: "VGIS (3DVGIS)",
    liveUrl: "https://skyframexr.3dvgis.com/",
    timeline: "2025 – Present",
    heroImage: "/projects/skyframe-hero.png",
  },
];

export function getProjectById(id) {
  return projects.find((p) => p.id === id) ?? null;
}
