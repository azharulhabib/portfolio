export const spotlightProjects = [
  {
    id: "phishaudit-ai",
    title: "PhishAudit AI",
    subtitle: "Forensic URL Intelligence & Zero-Day Phishing Defense",
    category: "Cybersecurity & Applied Machine Learning",
    description:
      "A real-time, zero-day phishing detection system running directly inside Chromium via a Manifest V3 extension. Audits navigation URLs using a 5-stage cascading ML pipeline extracting 37 lexical, structural, and information-theoretic features in under 2ms without requiring slow external DOM or DNS downloads.",
    metrics: [
      { label: "Latency", value: "< 2ms" },
      { label: "Features", value: "37" },
      { label: "Cascade", value: "5 Stages" },
    ],
    highlights: [
      "5-stage dynamic pipeline: Tier-1 bypass, Levenshtein typosquatting gate, combo-squatting HVT gate, keyword shifting, and cost-sensitive Random Forest.",
      "Dedicated regional threat modeling for Bangladesh Mobile Financial Services (bKash, Nagad, Rocket, BRAC Bank).",
      "Executive Security Operations console built with React 19 and Recharts for live telemetry and audit logging.",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "Chromium MV3",
      "Scikit-Learn",
      "React 19",
      "PostgreSQL",
      "Recharts",
    ],
    github: "https://github.com/azharulhabib/PhishAudit_AI",
    demo: null,
  },
  {
    id: "tcga-biomarker",
    title: "TCGA Colorectal Cancer Biomarker Pipeline",
    subtitle: "High-Dimensional RNA-Seq Transcriptomic Feature Discovery",
    category: "Bioinformatics & Machine Learning",
    description:
      "An end-to-end bioinformatics and machine learning framework for tumor vs. normal solid tissue classification using TCGA-COAD RNA-seq data. Implements Differential Expression Analysis, strict partition isolation to eliminate data leakage, SMOTE class balancing, and custom Boruta feature selection.",
    metrics: [
      { label: "Dim. Reduction", value: "99.8%" },
      { label: "Biomarkers", value: "142 / 60k" },
      { label: "Classifier AUC", value: "1.000" },
    ],
    highlights: [
      "Distilled 60,660 initial Ensembl transcriptomic features down to 142 robust, biologically validated biomarkers.",
      "Recovered confirmed clinical literature markers (SCARA5, VEGFA, PKIB, CWH43) and novel transcriptional regulators (CEMIP, ETV4).",
      "Rigorous 10-fold cross-validation across 7 machine learning models with zero data leakage into the held-out test cohort.",
    ],
    techStack: [
      "Python",
      "Bioinformatics",
      "RNA-Seq",
      "Boruta Algorithm",
      "Scikit-Learn",
      "SMOTE",
      "Pandas",
    ],
    github: "https://github.com/azharulhabib/tcga-coad-crc-biomarker-pipeline",
    demo: null,
  },
  {
    id: "music-gnn-bert",
    title: "Multimodal Music Context Understanding",
    subtitle: "Graph Neural Networks & Transformer Cross-Attention",
    category: "Deep Learning & Multimodal AI",
    description:
      "A hybrid multimodal architecture that bridges the acoustic-semantic disconnect in music analysis. Constructs temporal-topological graphs from 128-band Mel-spectrograms and chromagrams, processes acoustic structure with GraphSAGE and GAT layers, and fuses embeddings with fine-tuned BERT representations via cross-attention.",
    metrics: [
      { label: "Acoustic Bands", value: "128 Mel" },
      { label: "Segment Window", value: "5 sec" },
      { label: "Fusion", value: "Cross-Attn" },
    ],
    highlights: [
      "Temporal and spectral-similarity edge construction modeling dynamic song motifs and chord progressions as graphs.",
      "Graph Attention Networks (GAT) dynamically weighting structural transitions and chorus repetitions.",
      "Cross-attention fusion dynamically conditioning acoustic graph vectors on linguistic song tags and captions.",
    ],
    techStack: [
      "PyTorch",
      "PyTorch Geometric",
      "BERT",
      "Hugging Face",
      "Librosa",
      "Graph Neural Networks",
    ],
    github: "https://github.com/azharulhabib/music-context-gnn-bert",
    demo: null,
  },
  {
    id: "pet-unet",
    title: "Multi-Task Attention U-Net",
    subtitle: "Joint Pet Semantic Segmentation & 37-Breed Classification",
    category: "Computer Vision & Deep Learning",
    description:
      "A unified multi-task deep learning framework on the Oxford-IIIT Pet Dataset. Couples a shared convolutional encoder with dual task-specific heads: an attention-gated decoder for pixel-level boundary segmentation and a dense classifier for 37 fine-grained cat and dog breeds.",
    metrics: [
      { label: "Target Classes", value: "37 Breeds" },
      { label: "Inference Latency", value: "~50% Cut" },
      { label: "Task Heads", value: "Dual" },
    ],
    highlights: [
      "Replaces decoupled dual-network setups with a single backbone, halving VRAM consumption and inference time.",
      "Attention Gate filtering suppresses background clutter and shadow artifacts in U-Net skip connections.",
      "Joint optimization with composite loss: Binary Cross-Entropy + Sparse Categorical Cross-Entropy.",
    ],
    techStack: [
      "TensorFlow",
      "Keras",
      "Attention Gates",
      "U-Net",
      "Computer Vision",
      "Python",
    ],
    github: "https://github.com/azharulhabib/pet-multitask-attention-unet",
    demo: null,
  },
];

export const noteworthyProjects = [
  {
    id: "easystay",
    title: "EasyStay (E_Booking)",
    category: "Full-Stack System",
    description:
      "Full-stack property rental platform built with Next.js 15 (React 19) and Django REST Framework. Features verification-first moderation (utility bill vetting), role-based workflows for Customers, Owners, and Admins, and secure HTTP-only cookie JWT auth.",
    techStack: ["Next.js 15", "React 19", "Django 5.1", "DRF", "JWT", "Tailwind CSS"],
    github: "https://github.com/azharulhabib/EasyStay",
    demo: null,
  },
  {
    id: "circle-of-fury",
    title: "Circle of Fury: 3D Boss Arena",
    category: "3D Graphics & Game Engine",
    description:
      "Real-time squad combat simulation built purely from scratch using Python and PyOpenGL (GLUT/GLU). Features procedural 3D hierarchical modeling, dual-mode spherical orbit/FPS camera math, FSM boss attack cycles, and rotational cleaver hitboxes.",
    techStack: ["Python", "PyOpenGL", "GLUT / GLU", "3D Math", "Game AI (FSM)"],
    github: "https://github.com/azharulhabib/circle-of-fury-game",
    demo: null,
  },
  {
    id: "turfnation",
    title: "TurfNation Frontend",
    category: "Modern Web Application",
    description:
      "Sports turf booking and venue management web application. Features interactive time-slot booking with dynamic pricing, downloadable QR code entry passes, weather forecasts, turf owner revenue tracking, and platform analytics.",
    techStack: ["React 18", "TypeScript", "Vite 6", "Tailwind CSS", "shadcn/ui", "Recharts"],
    github: "https://github.com/azharulhabib/turf-nation-frontend",
    demo: null,
  },
];

export const skillsData = [
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript (ES6+)", "C++", "SQL", "HTML5 / CSS3"],
  },
  {
    category: "AI, ML & Deep Learning",
    skills: [
      "PyTorch",
      "TensorFlow / Keras",
      "Graph Neural Networks (PyG)",
      "Transformers & BERT",
      "Scikit-Learn",
      "Computer Vision (Attention U-Net)",
      "Bioinformatics & RNA-Seq",
      "SMOTE & Boruta",
    ],
  },
  {
    category: "Backend & Systems",
    skills: [
      "FastAPI",
      "Django & Django REST Framework",
      "PostgreSQL",
      "SQLite",
      "RESTful APIs & Swagger/OpenAPI",
      "JWT & Secure Cookie Auth",
      "Chromium Extensions (Manifest V3)",
      "PyOpenGL Graphics",
    ],
  },
  {
    category: "Frontend & Tools",
    skills: [
      "React 19 / 18",
      "Next.js 15 (Server Actions)",
      "Vite",
      "Tailwind CSS v4",
      "Git & GitHub",
      "Recharts Data Viz",
      "Cloudflare Pages",
    ],
  },
];
