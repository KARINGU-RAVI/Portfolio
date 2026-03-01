export const portfolioData = {
  personal: {
    name: "Ravi Karingu",
    title: "Associate Software Engineer at Syneriq Global",
    subtitle: "Full Stack Developer & AI Enthusiast",
    bio: "I'm always eager to connect with fellow tech enthusiasts, creators, and professionals who share my passion for technology, learning, and growth. I specialize in Python, React.js, Machine Learning, and Data Science to build intelligent systems that solve real-world problems and make a lasting impact.",
    location: "Hyderabad, Telangana, India",
    email: "karinguravi37@gmail.com",
    phone: "+91-9999999999",
    profileImage: "https://res.cloudinary.com/dumu7y8az/image/upload/v1740764167/My_Photo_optimized_ahbfx5.jpg",
    resumeLink: "https://drive.google.com/file/d/1sfHsTzi_OMtzj8_GBgeZkmiraeps472-/view?usp=sharing",
    github: "https://github.com/KARINGU-RAVI",
    linkedin: "https://www.linkedin.com/in/ravikaringu",
    twitter: "https://x.com/RAVIKaringu1",
    logo: "https://res.cloudinary.com/dumu7y8az/image/upload/v1689959301/ravikaringu_armwif.png"
  },
  
  experiences: [
    {
      id: "exp-01",
      title: "Associate Software Engineer",
      company: "Syneriq Global",
      location: "Hyderabad, Telangana, India",
      duration: "Jul 2025 - Present",
      type: "Full-time",
      description: "Working on exciting technologies including Machine Learning, AI Agents, and more. Building intelligent systems and solving real-world problems through code and innovation.",
      skills: ["Machine Learning", "AI Agents", "Python", "React.js", "Node.js"],
      current: true
    },
    {
      id: "exp-02",
      title: "Google Cloud Generative AI Intern",
      company: "SmartInternz",
      location: "Remote",
      duration: "Sep 2024 - Oct 2024",
      type: "Internship",
      description: "Successfully completed a Virtual Internship Program on Google Cloud Generative AI in collaboration with AICTE. Gained hands-on exposure to the fundamentals and applications of Generative AI using Google Cloud tools.",
      skills: ["Google Cloud", "Generative AI", "Machine Learning", "Python"],
      current: false
    },
    {
      id: "exp-03",
      title: "Front-End Web Development Intern",
      company: "Next24tech Technology & Services LLP",
      location: "Remote",
      duration: "May 2024 - Jul 2024",
      type: "Internship",
      description: "Completed AICTE-approved internship in Front-End Web Development. Gained hands-on experience in building user-friendly interfaces using modern web technologies.",
      skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Responsive Design"],
      current: false
    }
  ],

  skills: {
    frontend: [
      { name: "React.js", icon: "react" },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Responsive Design", icon: "mobile" }
    ],
    backend: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Python", icon: "python" },
      { name: "Express.js", icon: "express" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" }
    ],
    aicloud: [
      { name: "Machine Learning", icon: "brain" },
      { name: "AI Agents", icon: "robot" },
      { name: "Google Cloud", icon: "cloud" },
      { name: "Data Science", icon: "chart" }
    ]
  },

  projects: [
    {
      id: "proj-01",
      title: "Disaster Prediction Using Machine Learning",
      description: "Research project focusing on leveraging machine learning to predict natural disasters like earthquakes, floods, tsunamis, and landslides using Random Forest and XGBoost algorithms.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["Python", "Machine Learning", "Random Forest", "XGBoost", "Data Science"],
      features: [
        "Multi-model ML approach for disaster prediction",
        "Real-time data processing and analysis",
        "Enhanced disaster preparedness systems",
        "Published in ICMDRI 2K25 conference"
      ],
      demoUrl: "#",
      codeUrl: "https://github.com/KARINGU-RAVI/Disaster_Prediction_Using_Machine_Learning_Alogrithms",
      category: "Machine Learning"
    },
    {
      id: "proj-02",
      title: "Emoji Match Game – Fun & Interactive Memory Game",
      description: "An engaging and interactive memory-based web application designed to test users' pattern recognition skills. The game challenges players to click on unique emojis without repeating selections.",
      image: "https://res.cloudinary.com/dumu7y8az/image/upload/v1755756990/Screenshot_2025-08-21_114621_rqodgo.png",
      technologies: ["React.js", "JavaScript", "CSS3"],
      features: [
        "Dynamic Emoji Grid with random shuffling",
        "Score Tracking with current and best scores",
        "Game Logic that ends on repeated emoji clicks",
        "Responsive UI optimized for all devices"
      ],
      demoUrl: "https://raviemojigame00.ccbp.tech/",
      codeUrl: "https://github.com/KARINGU-RAVI/match_game",
      category: "Game Development"
    },
    {
      id: "proj-03",
      title: "Jobby App",
      description: "A dynamic job search platform designed to help users find employment opportunities efficiently. Provides an interactive and user-friendly interface for job seekers.",
      image: "https://res.cloudinary.com/dumu7y8az/image/upload/v1755757039/Screenshot_2025-08-21_114709_thwfos.png",
      technologies: ["React.js", "CSS3", "JavaScript", "JWT", "API Integration"],
      features: [
        "User Authentication with JWT tokens",
        "Dynamic Job Listings with real-time data",
        "Advanced Filters & Search Functionality",
        "Responsive UI built with React.js",
        "Protected Routes with authentication checks"
      ],
      demoUrl: "https://ravijobbyapp0.ccbp.tech/login",
      codeUrl: "https://github.com/KARINGU-RAVI/Jobby-App",
      category: "Web Application"
    },
    {
      id: "proj-04",
      title: "Todos Application",
      description: "A task management solution, designed to make life easier. Streamlined task management through a combination of HTML, CSS, and Bootstrap for an intuitive interface.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      features: [
        "Streamlined task management with intuitive interface",
        "Seamless CRUD operations through JavaScript event listeners",
        "Dynamic UI updates for real-time interaction",
        "Secure task persistence with local storage methods"
      ],
      demoUrl: "https://ravitodolist0.ccbp.tech",
      codeUrl: "https://github.com/KARINGU-RAVI/TodoApp",
      category: "Web Application"
    },
    {
      id: "proj-05",
      title: "Countries Search",
      description: "A global countries database and search engine, providing instant access to countries and their respective populations. Features asynchronous data retrieval through REST API calls.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["HTML", "CSS", "JavaScript", "REST API", "Bootstrap"],
      features: [
        "Asynchronous data retrieval through REST API calls",
        "Bootstrap and CSS for responsive design",
        "Local search functionality with JavaScript event listeners",
        "Array filter methods for efficient searching"
      ],
      demoUrl: "https://ravicountries0.ccbp.tech",
      codeUrl: "https://github.com/KARINGU-RAVI/Destination-Search",
      category: "Web Application"
    },
    {
      id: "proj-06",
      title: "Wikipedia Search Application",
      description: "A Wikipedia search application that simplifies access to information with features like search, user-friendly interface, and multimedia support.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      features: [
        "Simple and intuitive search interface",
        "Real-time Wikipedia content retrieval",
        "Responsive design with Bootstrap",
        "Clean and user-friendly interface"
      ],
      demoUrl: "https://raviwikipedia0.ccbp.tech",
      codeUrl: "#",
      category: "Web Application"
    },
    {
      id: "proj-07",
      title: "IPL Dashboard",
      description: "Built an interactive hub for IPL teams and matches information. Navigate seamlessly with React Router, presenting team details and matches with REST API calls.",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
      technologies: ["React JS", "React Router", "REST API", "CSS", "Bootstrap"],
      features: [
        "Interactive hub for IPL teams and matches",
        "Seamless navigation with React Router",
        "Team details and matches with REST API calls",
        "Custom 404 page for non-existent routes"
      ],
      demoUrl: "https://raviiplboard.ccbp.tech",
      codeUrl: "https://github.com/KARINGU-RAVI/IPL-Dash-Board-App",
      category: "Web Application"
    }
  ],

  achievements: [
    {
      id: "ach-01",
      title: "Class Topper - B.Tech CSE (Data Science), 4-2 Semester",
      issuer: "Siddhartha Institute of Engineering and Technology",
      date: "Apr 2025",
      description: "Recognized as Class 1st Topper in Computer Science and Engineering (Data Science) during final semester. This achievement reflects consistent academic dedication, strong problem-solving abilities, and passion for data-driven technologies.",
      image: "https://res.cloudinary.com/dumu7y8az/image/upload/v1755756938/Topper_of_class_jqytgd.jpg"
    },
    {
      id: "ach-02",
      title: "1st Place – Debugging & Technical Quiz Champion",
      issuer: "Siddhartha Institute of Engineering & Technology",
      date: "Mar 2025",
      description: "Awarded 1st place in Debugging and Technical Quiz competition competing against 500 participants. Demonstrated strong problem-solving, debugging, and technical knowledge across data structures, algorithms, and software development.",
      image: "https://res.cloudinary.com/dumu7y8az/image/upload/v1755756938/Debugging_2k25_kb33j1.jpg"
    },
    {
      id: "ach-03",
      title: "Research Publication - Disaster Prediction Using Machine Learning",
      issuer: "ICMDRI 2K25",
      date: "2025",
      description: "Published research paper 'Disaster Prediction Using Machine Learning Algorithms' in International Conference on Multi-Disciplinary Research and Innovations 2K25. Research focuses on leveraging ML to predict natural disasters using Random Forest and XGBoost algorithms.",
      image: "https://res.cloudinary.com/dumu7y8az/image/upload/v1755765436/Screenshot_2025-08-21_140607_npioce.png"
    },
    {
      id: "ach-04",
      title: "NPTEL IoT Gold Medal Achievement",
      issuer: "NPTEL",
      date: "Oct 2024",
      description: "Awarded Gold Medal in NPTEL Internet of Things (IoT) certification exam, securing 90% marks. Demonstrates strong analytical skills and deep understanding of IoT architecture, embedded systems, networking, and security.",
      image: "https://res.cloudinary.com/dumu7y8az/image/upload/v1755756938/NPTEL_certificate_uhm4is.jpg"
    },
    {
      id: "ach-05",
      title: "Technical Quiz Champion",
      issuer: "Siddhartha Institute of Engineering & Technology",
      date: "2025",
      description: "Awarded 1st place in Technical Quiz competition. Demonstrated strong technical knowledge across various programming concepts and technologies.",
      image: "https://res.cloudinary.com/dumu7y8az/image/upload/v1755756938/Technical_Quiz_dejadd.jpg"
    },
    {
      id: "ach-06",
      title: "Debugging Champion",
      issuer: "Siddhartha Institute of Engineering & Technology",
      date: "Dec 2023",
      description: "Awarded 1st place in Debugging competition at SIET. Demonstrated strong problem-solving skills by efficiently identifying and fixing complex code errors under time constraints.",
      image: "https://res.cloudinary.com/dumu7y8az/image/upload/v1755756938/Debugging_2k23_dq9nmz.jpg"
    }
  ],

  certifications: [
    {
      id: "cert-01",
      title: "Full Stack Developer",
      issuer: "OneRoadmap",
      date: "Jun 2025",
      credentialId: "CERT-9D51523E"
    },
    {
      id: "cert-02",
      title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      issuer: "Oracle",
      date: "Mar 2025",
      credentialId: "101697461OCI25AICFA"
    }
  ],

  education: [
    {
      id: "edu-01",
      degree: "Bachelor's degree in Computer Science (Data Science)",
      institution: "Siddhartha Institute of Engineering & Technology",
      duration: "2022 - 2025",
      grade: "8.35 CGPA",
      description: "Specialized in Data Science with focus on Machine Learning, AI, and Full-Stack Development."
    }
  ]
};

export default portfolioData;
